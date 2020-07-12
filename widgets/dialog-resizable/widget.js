import React from 'react';
import Props from './props';
import Widget from 'goblin-laboratory/widgets/widget';
import DialogResizableNC from 'goblin-gadgets/widgets/dialog-resizable-nc/widget';
import KeyTrap from 'goblin-gadgets/widgets/key-trap.js';
import _ from 'lodash';
import {
  makePropTypes,
  makeDefaultProps,
} from 'xcraft-core-utils/lib/prop-types';
import {Unit} from 'goblin-theme';
const px = Unit.toPx;

/******************************************************************************/

function clipRectangle(rectangle) {
  // Clip position of center (horizontal and vertical) into viewport.
  const viewportWidth = window.visualViewport.width;
  const viewportHeight = window.visualViewport.height;

  rectangle.width = Math.min(rectangle.width, viewportWidth);
  rectangle.height = Math.min(rectangle.height, viewportHeight);

  const h = viewportWidth / 2 - rectangle.width / 2;
  const v = viewportHeight / 2 - rectangle.height / 2;

  rectangle.horizontal = Math.max(rectangle.horizontal, -h);
  rectangle.horizontal = Math.min(rectangle.horizontal, h);
  rectangle.vertical = Math.max(rectangle.vertical, -v);
  rectangle.vertical = Math.min(rectangle.vertical, v);
}

/******************************************************************************/

class DialogResizable extends Widget {
  constructor() {
    super(...arguments);

    let rectangle;
    if (this.props.rectangle) {
      rectangle = this.props.rectangle;
    } else {
      rectangle = {
        horizontal: Unit.parse(this.props.horizontal).value,
        vertical: Unit.parse(this.props.vertical).value,
        width: Unit.parse(this.props.width).value,
        height: Unit.parse(this.props.height).value,
      };
    }

    this.state = {
      rectangle: rectangle,
      resizingElement: null,
    };

    this.minWidth = Unit.parse(this.props.minWidth || '100px').value;
    this.minHeight = Unit.parse(this.props.minHeight || '100px').value;

    this.startingRectangle = null;
    this.originX = null;
    this.originY = null;

    this.onMinimize = this.onMinimize.bind(this);
    this.onRestore = this.onRestore.bind(this);
    this.onMaximize = this.onMaximize.bind(this);
    this.onCloseDialog = this.onCloseDialog.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);

    this.doMove = _.throttle(this.doMove.bind(this), 50);
  }

  //#region get/set
  get rectangle() {
    return this.state.rectangle;
  }
  set rectangle(value) {
    this.setState({
      rectangle: value,
    });
  }

  get resizingElement() {
    return this.state.resizingElement;
  }
  set resizingElement(value) {
    this.setState({
      resizingElement: value,
    });
  }
  //#endregion

  componentWillMount() {
    KeyTrap.bind('Escape', this.onCloseDialog);
    KeyTrap.bind('Enter', this.onCloseDialog);
  }

  componentWillUnmount() {
    super.componentWillUnmount();
    KeyTrap.unbind('Escape', this.onCloseDialog);
    KeyTrap.unbind('Enter', this.onCloseDialog);
  }

  changeRectangle(rectangle) {
    if (!this.props.id) {
      return;
    }

    this.doFor(this.props.clientSessionId, 'set-dialogs', {
      dialogId: this.props.id,
      state: {rectangle},
    });
  }

  onMinimize() {
    const rectangle = {
      ...this.rectangle,
      width: this.minWidth,
      height: this.minHeight,
    };
    this.rectangle = rectangle;
    this.changeRectangle(rectangle);
  }

  onRestore() {
    const rectangle = {
      ...this.rectangle,
      width: Unit.parse(this.props.width).value,
      height: Unit.parse(this.props.height).value,
    };
    this.rectangle = rectangle;
    this.changeRectangle(rectangle);
  }

  onMaximize() {
    const rectangle = {
      horizontal: 0,
      vertical: 0,
      width: window.visualViewport.width,
      height: window.visualViewport.height,
    };
    this.rectangle = rectangle;
    this.changeRectangle(rectangle);
  }

  onCloseDialog() {
    this.props.onCloseDialog();
  }

  onMouseDown(e, element) {
    if (e.buttons === 1 && element) {
      // Mouse left button pressed ?
      this.resizingElement = element;
      this.originX = e.clientX;
      this.originY = e.clientY;

      const rectangle = {...this.rectangle};
      clipRectangle(rectangle);
      this.startingRectangle = rectangle;
      this.rectangle = rectangle;
    }
  }

  onMouseMove(e) {
    if (this.resizingElement) {
      const dx = e.clientX - this.originX;
      const dy = e.clientY - this.originY;
      this.doMove(dx, dy);
    }
  }

  doMove(dx, dy) {
    if (!this.resizingElement) {
      return;
    }

    const newRectangle = {...this.rectangle};

    const elements = this.resizingElement.split('+');

    // Move title bar.
    if (elements.includes('title')) {
      newRectangle.horizontal = this.startingRectangle.horizontal + dx;
      newRectangle.vertical = this.startingRectangle.vertical + dy;
    }

    // Move border and/or corner.
    if (elements.includes('left')) {
      dx = Math.min(dx, this.startingRectangle.width - this.minWidth);
      newRectangle.width = this.startingRectangle.width - dx;
      newRectangle.horizontal = this.startingRectangle.horizontal + dx / 2;
    }

    if (elements.includes('right')) {
      dx = Math.max(dx, this.minWidth - this.startingRectangle.width);
      newRectangle.width = this.startingRectangle.width + dx;
      newRectangle.horizontal = this.startingRectangle.horizontal + dx / 2;
    }

    if (elements.includes('top')) {
      dy = Math.min(dy, this.startingRectangle.height - this.minHeight);
      newRectangle.height = this.startingRectangle.height - dy;
      newRectangle.vertical = this.startingRectangle.vertical + dy / 2;
    }

    if (elements.includes('bottom')) {
      dy = Math.max(dy, this.minHeight - this.startingRectangle.height);
      newRectangle.height = this.startingRectangle.height + dy;
      newRectangle.vertical = this.startingRectangle.vertical + dy / 2;
    }

    this.rectangle = newRectangle;
  }

  onMouseUp() {
    if (this.resizingElement) {
      this.resizingElement = null;
      this.changeRectangle(this.rectangle);
    }
  }

  /******************************************************************************/

  renderFinal() {
    const {width, height, horizontal, vertical, ...otherProps} = this.props;

    const rectangle = {...this.rectangle};
    clipRectangle(rectangle);

    return (
      <DialogResizableNC
        {...otherProps}
        horizontal={px(rectangle.horizontal)}
        vertical={px(rectangle.vertical)}
        width={px(rectangle.width)}
        height={px(rectangle.height)}
        resizing={!!this.resizingElement}
        onMinimize={this.onMinimize}
        onRestore={this.onRestore}
        onMaximize={this.onMaximize}
        onCloseDialog={this.props.onCloseDialog ? this.onCloseDialog : null}
        onMouseDown={this.onMouseDown}
        onMouseMove={this.onMouseMove}
        onMouseUp={this.onMouseUp}
      />
    );
  }

  renderOriginal() {
    const {width, height, horizontal, vertical, ...otherProps} = this.props;

    return (
      <DialogResizableNC
        {...otherProps}
        horizontal={px(this.props.rectangle.horizontal)}
        vertical={px(this.props.rectangle.vertical)}
        width={px(this.props.rectangle.width)}
        height={px(this.props.rectangle.height)}
        resizing={false}
        onMinimize={this.onMinimize}
        onRestore={this.onRestore}
        onMaximize={this.onMaximize}
        onCloseDialog={this.props.onCloseDialog ? this.onCloseDialog : null}
        onMouseDown={this.onMouseDown}
        onMouseMove={this.onMouseMove}
        onMouseUp={this.onMouseUp}
      />
    );
  }

  renderResizing() {
    const {
      width,
      height,
      horizontal,
      vertical,
      children,
      ...otherProps
    } = this.props;

    const rectangle = {...this.rectangle};
    clipRectangle(rectangle);

    return (
      <DialogResizableNC
        {...otherProps}
        horizontal={px(rectangle.horizontal)}
        vertical={px(rectangle.vertical)}
        width={px(rectangle.width)}
        height={px(rectangle.height)}
        resizing={true}
        opacity={0.3}
        onMinimize={this.onMinimize}
        onRestore={this.onRestore}
        onMaximize={this.onMaximize}
        onCloseDialog={this.props.onCloseDialog ? this.onCloseDialog : null}
        onMouseDown={this.onMouseDown}
        onMouseMove={this.onMouseMove}
        onMouseUp={this.onMouseUp}
      />
    );
  }

  render() {
    if (this.props.drawChildrenWhileResizing) {
      // Always draw the final dialogue.
      return this.renderFinal();
    } else {
      if (this.resizingElement) {
        // During resizing, draw the original dialog (not yet moved) and
        // a skeleton of the new dialog.
        return (
          <React.Fragment>
            {this.renderOriginal()}
            {this.renderResizing()}
          </React.Fragment>
        );
      } else {
        return this.renderFinal();
      }
    }
  }
}

/******************************************************************************/

export default Widget.connect((state, props) => {
  const userSession = Widget.getUserSession(state);
  const clientSessionId = userSession.get('id');
  const data = userSession.get(`dialogs.${props.id}`);
  const rectangle = data ? data.get('rectangle').toJS() : null;

  return {clientSessionId, rectangle};
})(DialogResizable);

/******************************************************************************/

DialogResizable.propTypes = makePropTypes(Props);
DialogResizable.defaultProps = makeDefaultProps(Props);
