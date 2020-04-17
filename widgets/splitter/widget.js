import React from 'react';
import ReactDOM from 'react-dom';
import Props from './props';
import Widget from 'goblin-laboratory/widgets/widget';
import Label from 'goblin-gadgets/widgets/label/widget';
import {Unit} from 'electrum-theme';
import * as styles from './styles';

import {
  makePropTypes,
  makeDefaultProps,
} from 'xcraft-core-utils/lib/prop-types';

/******************************************************************************/

export default class Splitter extends Widget {
  constructor() {
    super(...arguments);
    this.styles = styles;

    this.state = {
      localState: {},
    };

    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
  }

  //#region get/set
  get localState() {
    return this.state.localState;
  }

  set localState(value) {
    this.setState({
      localState: value,
    });
  }
  //#endregion

  error(message) {
    if (this.props.widgetDocPreview) {
      return (
        <Label
          glyph="solid/exclamation-triangle"
          text={message}
          glyphColor="red"
          textColor="red"
        />
      );
    } else {
      throw new Error(message);
    }
  }

  saveProps() {
    this.initialKind = this.props.kind;
    this.initialFirstSize = this.props.firstSize;
    this.initialLastSize = this.props.lastSize;
    this.initialFirstMinSize = this.props.firstMinSize;
    this.initialFirstMaxSize = this.props.firstMaxSize;
    this.initialLastMinSize = this.props.lastMinSize;
    this.initialLastMaxSize = this.props.lastMaxSize;
  }

  get havePropsChanged() {
    return (
      this.initialKind !== this.props.kind ||
      this.initialFirstSize !== this.props.firstSize ||
      this.initialLastSize !== this.props.lastSize ||
      this.initialFirstMinSize !== this.props.firstMinSize ||
      this.initialFirstMaxSize !== this.props.firstMaxSize ||
      this.initialLastMinSize !== this.props.lastMinSize ||
      this.initialLastMaxSize !== this.props.lastMaxSize
    );
  }

  update() {
    if (!this.havePropsChanged) {
      this.recentUpdate = false;
      return null; // ok
    }
    this.saveProps();

    this.kind = this.props.kind;
    if (this.kind !== 'vertical' && this.kind !== 'horizontal') {
      return this.error(`Splitter: Wrong kind '${this.kind}'`);
    }

    if (this.props.firstSize && this.props.lastSize) {
      return this.error(
        `Splitter: Must have both firstSize (${this.props.firstSize}) and lastSize (${this.props.lastSize})`
      );
    }
    if (!this.props.firstSize && !this.props.lastSize) {
      return this.error(
        'Splitter: One of the two values firstSize or lastSize must be defined'
      );
    }

    if (this.props.firstSize) {
      const x = Unit.parse(this.props.firstSize);
      this.firstSize = x.value;
      this.unit = x.unit;
      this.master = 'first';
    } else {
      const x = Unit.parse(this.props.lastSize);
      this.lastSize = x.value;
      this.unit = x.unit;
      this.master = 'last';
    }
    if (this.unit !== '%' && this.unit !== 'px') {
      return this.error(
        `Splitter: Wrong firstSize or lastSize unit '${this.unit}'`
      );
    }

    let err;
    err = this.checkValue('firstMinSize');
    if (err) {
      return err;
    }
    err = this.checkValue('firstMaxSize');
    if (err) {
      return err;
    }
    err = this.checkValue('lastMinSize');
    if (err) {
      return err;
    }
    err = this.checkValue('lastMaxSize');
    if (err) {
      return err;
    }

    this.firstMinSize = this.getValue('firstMinSize', 'min');
    this.firstMaxSize = this.getValue('firstMaxSize', 'max');

    this.lastMinSize = this.getValue('lastMinSize', 'min');
    this.lastMaxSize = this.getValue('lastMaxSize', 'max');

    this.recentUpdate = true;
    return null; // ok
  }

  checkValue(name) {
    const value = this.props[name];
    if (value) {
      const x = Unit.parse(value);
      if (x.unit !== this.unit) {
        return this.error(`Splitter: Wrong unit in '${name}' (${value})`);
      }
    }
    return null; // ok
  }

  getValue(name, type) {
    const value = this.props[name];
    if (value) {
      const x = Unit.parse(value);
      return x.value;
    } else {
      if (type === 'min') {
        return 0;
      } else {
        return this.unit === '%' ? 100 : 1000000;
      }
    }
  }

  getLocalState() {
    if (this.recentUpdate) {
      // If recent update, synthesizes a local state.
      return {
        firstSize: this.firstSize,
        lastSize: this.lastSize,
        isDragging: false,
      };
    } else {
      return this.localState;
    }
  }

  getOffset(x, y) {
    const node = ReactDOM.findDOMNode(this.resizerNode);
    const rect = node.getBoundingClientRect();
    if (this.kind === 'vertical') {
      if (x >= rect.left && x <= rect.right) {
        return x - rect.left;
      }
    } else {
      if (y >= rect.top && y <= rect.bottom) {
        return y - rect.top;
      }
    }
    return -1;
  }

  mouseDown(x, y) {
    const offset = this.getOffset(x, y);
    if (offset !== -1) {
      this.offset = offset;

      const containerNode = ReactDOM.findDOMNode(this.containerNode);
      this.containerRect = containerNode.getBoundingClientRect();

      const firstPaneNode = ReactDOM.findDOMNode(this.firstPaneNode);
      this.firstPaneRect = firstPaneNode.getBoundingClientRect();

      const resizerNode = ReactDOM.findDOMNode(this.resizerNode);
      this.resizerRect = resizerNode.getBoundingClientRect();

      const lastPaneNode = ReactDOM.findDOMNode(this.lastPaneNode);
      this.lastPaneRect = lastPaneNode.getBoundingClientRect();
    }

    this.localState = {...this.getLocalState(), isDragging: true};
  }

  mouseMovePercents(x, y) {
    let firstSize, lastSize;

    if (this.kind === 'vertical') {
      const rx = x - this.offset - this.firstPaneRect.left;
      firstSize =
        (100 * rx) / (this.containerRect.width - this.resizerRect.width);
    } else {
      const ry = y - this.offset - this.firstPaneRect.top;
      firstSize =
        (100 * ry) / (this.containerRect.height - this.resizerRect.height);
    }
    lastSize = 100 - firstSize;

    if (this.master === 'first') {
      const min = Math.max(this.firstMinSize, 100 - this.lastMaxSize);
      const max = Math.min(this.firstMaxSize, 100 - this.lastMinSize);
      firstSize = Math.max(firstSize, min);
      firstSize = Math.min(firstSize, max);
    } else {
      const min = Math.max(this.lastMinSize, 100 - this.firstMaxSize);
      const max = Math.min(this.lastMaxSize, 100 - this.firstMinSize);
      lastSize = Math.max(lastSize, min);
      lastSize = Math.min(lastSize, max);
    }

    this.localState = {firstSize, lastSize, isDragging: true};
  }

  mouseMovePixels(x, y) {
    let firstSize, lastSize;
    let total;

    if (this.kind === 'vertical') {
      firstSize = x - this.offset - this.firstPaneRect.left;
      total = this.firstPaneRect.width + this.lastPaneRect.width;
    } else {
      firstSize = y - this.offset - this.firstPaneRect.top;
      total = this.firstPaneRect.height + this.lastPaneRect.height;
    }
    lastSize = total - firstSize;

    if (this.master === 'first') {
      const min = Math.max(this.firstMinSize, total - this.lastMaxSize);
      const max = Math.min(this.firstMaxSize, total - this.lastMinSize);
      firstSize = Math.max(firstSize, min);
      firstSize = Math.min(firstSize, max);
    } else {
      const min = Math.max(this.lastMinSize, total - this.firstMaxSize);
      const max = Math.min(this.lastMaxSize, total - this.firstMinSize);
      lastSize = Math.max(lastSize, min);
      lastSize = Math.min(lastSize, max);
    }

    this.localState = {firstSize, lastSize, isDragging: true};
  }

  mouseMove(x, y) {
    if (this.unit === '%') {
      this.mouseMovePercents(x, y);
    } else {
      this.mouseMovePixels(x, y);
    }
  }

  onMouseDown(e) {
    if (e.buttons === 1) {
      // Mouse left button pressed ?
      this.mouseDown(e.clientX, e.clientY);
    }
  }

  onMouseMove(e) {
    if (this.localState.isDragging) {
      this.mouseMove(e.clientX, e.clientY);
    }
  }

  onMouseUp() {
    if (this.localState.isDragging) {
      this.localState = {...this.localState, isDragging: false};
    }
  }

  /******************************************************************************/

  render() {
    const err = this.update();
    if (err) {
      return err;
    }

    let children = this.props.children;
    if (children && children.props) {
      // This mic-mac is used to resolve <React.Fragment>!
      children = children.props.children;
    }
    if (!children || children.length !== 2) {
      return this.error('Splitter: Must have 2 children');
    }

    const firstPaneStyle = {
      display: 'flex',
      overflow: 'hidden',
    };

    const lastPaneStyle = {
      display: 'flex',
      overflow: 'hidden',
    };

    const localState = this.getLocalState();

    if (this.unit === '%') {
      if (this.master === 'first') {
        firstPaneStyle.flexGrow = localState.firstSize;
        lastPaneStyle.flexGrow = 100 - localState.firstSize;
      } else {
        lastPaneStyle.flexGrow = localState.lastSize;
        firstPaneStyle.flexGrow = 100 - localState.lastSize;
      }

      firstPaneStyle.flexShrink = '1';
      firstPaneStyle.flexBasis = '0%';

      lastPaneStyle.flexShrink = '1';
      lastPaneStyle.flexBasis = '0%';
    } else {
      if (this.master === 'first') {
        if (this.kind === 'vertical') {
          firstPaneStyle.width = localState.firstSize + this.unit;
        } else {
          firstPaneStyle.height = localState.firstSize + this.unit;
        }

        lastPaneStyle.flexGrow = '1';
        lastPaneStyle.flexShrink = '1';
        lastPaneStyle.flexBasis = '0%';
      } else {
        if (this.kind === 'vertical') {
          lastPaneStyle.width = localState.lastSize + this.unit;
        } else {
          lastPaneStyle.height = localState.lastSize + this.unit;
        }

        firstPaneStyle.flexGrow = '1';
        firstPaneStyle.flexShrink = '1';
        firstPaneStyle.flexBasis = '0%';
      }
    }

    const resizerClass = this.localState.isDragging
      ? this.styles.classNames.resizerDragging
      : this.styles.classNames.resizer;

    return (
      <div
        ref={(node) => (this.containerNode = node)}
        className={this.styles.classNames.container}
        onMouseDown={this.onMouseDown}
        onMouseMove={this.onMouseMove}
        onMouseUp={this.onMouseUp}
      >
        <div ref={(node) => (this.firstPaneNode = node)} style={firstPaneStyle}>
          {children[0]}
        </div>
        <div
          ref={(node) => (this.resizerNode = node)}
          className={resizerClass}
        />
        <div ref={(node) => (this.lastPaneNode = node)} style={lastPaneStyle}>
          {children[1]}
        </div>
      </div>
    );
  }
}

/******************************************************************************/

Splitter.propTypes = makePropTypes(Props);
Splitter.defaultProps = makeDefaultProps(Props);
