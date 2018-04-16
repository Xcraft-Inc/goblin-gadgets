import React from 'react';
import ReactDOM from 'react-dom';
import Widget from 'laboratory/widget';
import {Unit} from 'electrum-theme';
import * as Bool from 'gadgets/boolean-helpers';
import DragCarrier from 'gadgets/drag-carrier/widget';

/******************************************************************************/

function isInside(rect, x, y) {
  if (rect && rect.left <= rect.right && rect.top <= rect.bottom) {
    return (
      x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom
    );
  } else {
    return true;
  }
}

function getBoundingRect(theme, container) {
  const node = ReactDOM.findDOMNode(container);
  return node.getBoundingClientRect();
}

// Return the property 'dragController' of the rectangle targeted by the
// mouse (x, y). If there are several imbricated rectangles, it is necessary
// to take the one whose surface is the smallest !
function findDragController(theme, x, y) {
  let dc = null;
  let minSurface = Number.MAX_SAFE_INTEGER;
  for (var container of window.document.dragControllers) {
    const rect = getBoundingRect(theme, container);
    const surface = rect.width * rect.height;
    if (isInside(rect, x, y) && surface < minSurface) {
      dc = container.props.dragController;
      minSurface = surface;
    }
  }
  return dc;
}

/******************************************************************************/

class DragCab extends Widget {
  constructor() {
    super(...arguments);

    this.state = {
      dragInProcess: false,
      dragStarting: false,
    };

    this.dragWidth = 0;
    this.dragHeight = 0;

    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onDragEnding = this.onDragEnding.bind(this);
  }

  get dragInProcess() {
    return this.state.dragInProcess;
  }

  set dragInProcess(value) {
    this.setState({
      dragInProcess: value,
    });
  }

  get dragStarting() {
    return this.state.dragStarting;
  }

  set dragStarting(value) {
    this.setState({
      dragStarting: value,
    });
  }

  componentDidMount() {
    super.componentDidMount();

    if (!this.props.dragOwnerId) {
      throw new Error('DragCab has not dragOwnerId');
    }
    if (!window.document.dragCabs) {
      window.document.dragCabs = [];
    }
    window.document.dragCabs.push(this);
  }

  componentWillUnmount() {
    const index = window.document.dragCabs.indexOf(this);
    if (index !== -1) {
      window.document.dragCabs.splice(index, 1);
    }
  }

  onMouseDown(e) {
    if (window.document.combo === 'visible') {
      // Does a child have an open combo-menu ?
      return;
    }
    const mouseDown = this.props.mouseDown;
    if (mouseDown && mouseDown(e)) {
      return;
    }
    if (Bool.isTrue(this.props.noDrag)) {
      return; // if drag prohibited, don't initiate drag & drop ?
    }
    const dc = findDragController(this.props.theme, e.clientX, e.clientY);
    if (!dc || dc !== this.props.dragController) {
      // When clicking in a ticket of a messenger, 2 different drags try to start.
      // The first to move the ticket (dragController = 'ticket') and the second
      // to move the messenger (dragController = 'roadbook').
      // The second one should not be started. It must start only when a click in
      // the header of the messenger !
      return;
    }
    const node = ReactDOM.findDOMNode(this);
    if (this.props.dragWidthtDetect) {
      const w = Unit.parse(this.props.dragWidthtDetect).value;
      const rect = node.getBoundingClientRect();
      if (e.clientX > rect.left + w) {
        return;
      }
    }
    if (this.props.dragHeightDetect) {
      const h = Unit.parse(this.props.dragHeightDetect).value;
      const rect = node.getBoundingClientRect();
      if (e.clientY > rect.top + h) {
        return;
      }
    }
    this.dragWidth = node.clientWidth;
    this.dragHeight = node.clientHeight;
    this.dragInProcess = true;
  }

  onMouseUp(e) {
    if (window.document.combo === 'visible') {
      // Does a child have an open combo-menu ?
      return;
    }
    const mouseUp = this.props.mouseUp;
    if (mouseUp && mouseUp(e)) {
      return;
    }
    if (Bool.isTrue(this.props.noDrag)) {
      // Simple click when drag prohibited ?
      this.doClickAction(e);
    }
  }

  onDragEnding(e, isDragDoing) {
    this.dragInProcess = false;
    this.dragStarting = false;
    if (!isDragDoing) {
      // Simple click done ?
      this.doClickAction(e);
    }
  }

  doClickAction(e) {
    const action = this.props.doClickAction;
    if (action) {
      action(e);
    }
  }

  /******************************************************************************/

  renderDragCarrier() {
    return (
      <DragCarrier
        direction={this.props.direction}
        color={this.props.color}
        thickness={this.props.thickness}
        radius={this.props.radius}
        overSpacing={this.props.overSpacing}
        mode={this.props.mode}
        data={this.props.data}
        doDragEnding={this.props.doDragEnding}
        dragEnding={this.onDragEnding}
        dragWidth={this.dragWidth}
        dragHeight={this.dragHeight}
        dragController={this.props.dragController}
        dragOwnerId={this.props.dragOwnerId}
        dragToDelete={this.props.dragToDelete}
      />
    );
  }

  renderChildren(isDragged, dragStarting) {
    return React.Children.map(this.props.children, c => {
      if (c !== null) {
        return React.cloneElement(c, {
          isDragged: isDragged,
          hasHeLeft: dragStarting,
        });
      }
    });
  }

  renderForDrag(isDragged, index) {
    const htmlDragCarrier =
      this.dragInProcess && !isDragged ? this.renderDragCarrier() : null;

    const boxStyle = {
      position: 'relative',
      userSelect: 'none',
    };
    if (this.props.direction === 'horizontal') {
      boxStyle.display = 'flex';
      boxStyle.flexDirection = 'column';
      boxStyle.flexGrow = isDragged && this.dragStarting ? 1 : null;
    }

    // The use of "data-id" sets a property "id" accessed later by "node.dataset.id"
    // "data-vertical-spacing" is accessed by "node.dataset.verticalSpacing".
    // Don't rename "data-id" to "dataId" !
    if (this.props.dragMode === 'handle') {
      const detectClass = this.styles.classNames.detect;
      const handleClass = this.styles.classNames.handle;

      return (
        <div
          key={index}
          style={boxStyle}
          data-id={this.props.dragOwnerId}
          data-vertical-spacing={this.props.verticalSpacing}
        >
          <div className={handleClass} />
          <div
            className={detectClass}
            onMouseDown={this.onMouseDown}
            onMouseUp={this.onMouseUp}
            onTouchStart={this.onMouseDown}
            onTouchEnd={this.onMouseUp}
          />
          {this.renderChildren(isDragged, this.dragStarting)}
          {htmlDragCarrier}
        </div>
      );
    } else {
      return (
        <div
          key={index}
          style={boxStyle}
          data-id={this.props.dragOwnerId}
          data-vertical-spacing={this.props.verticalSpacing}
          onMouseDown={this.onMouseDown}
          onMouseUp={this.onMouseUp}
          onTouchStart={this.onMouseDown}
          onTouchEnd={this.onMouseUp}
        >
          {this.renderChildren(isDragged, this.dragStarting)}
          {htmlDragCarrier}
        </div>
      );
    }
  }

  render() {
    return this.renderForDrag(false);
  }
}

/******************************************************************************/
export default DragCab;
