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
      positions: this.getPositions(this.props),
    };

    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
  }

  //#region get/set
  get positions() {
    return this.state.positions;
  }

  set positions(value) {
    this.setState({
      positions: value,
    });
  }
  //#endregion

  getPositions(props) {
    const positions = {isDragging: false};

    if (props.firstSize !== undefined) {
      const x = Unit.parse(props.firstSize);
      positions.first = x.value;
      this.unit = x.unit;
      this.master = 'first';
    }

    if (props.lastSize !== undefined) {
      const x = Unit.parse(props.lastSize);
      positions.last = x.value;
      this.unit = x.unit;
      this.master = 'last';
    }

    return positions;
  }

  componentDidMount() {
    this.positions = this.getPositions(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.positions = this.getPositions(nextProps);
  }

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

  update() {
    if (this.props.kind !== 'vertical' && this.props.kind !== 'horizontal') {
      return this.error(`Splitter: Wrong kind '${this.props.kind}'`);
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

  getOffset(x, y) {
    const node = ReactDOM.findDOMNode(this.resizerNode);
    const rect = node.getBoundingClientRect();
    if (this.props.kind === 'vertical') {
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

    this.positions = {...this.positions, isDragging: true};
  }

  mouseMovePercents(x, y) {
    let first, last;

    if (this.props.kind === 'vertical') {
      const rx = x - this.offset - this.firstPaneRect.left;
      first = (100 * rx) / (this.containerRect.width - this.resizerRect.width);
    } else {
      const ry = y - this.offset - this.firstPaneRect.top;
      first =
        (100 * ry) / (this.containerRect.height - this.resizerRect.height);
    }
    last = 100 - first;

    if (this.master === 'first') {
      const min = Math.max(this.firstMinSize, 100 - this.lastMaxSize);
      const max = Math.min(this.firstMaxSize, 100 - this.lastMinSize);
      first = Math.max(first, min);
      first = Math.min(first, max);
    } else {
      const min = Math.max(this.lastMinSize, 100 - this.firstMaxSize);
      const max = Math.min(this.lastMaxSize, 100 - this.firstMinSize);
      last = Math.max(last, min);
      last = Math.min(last, max);
    }

    this.positions = {first, last, isDragging: true};
  }

  mouseMovePixels(x, y) {
    let first, last;
    let total;

    if (this.props.kind === 'vertical') {
      first = x - this.offset - this.firstPaneRect.left;
      total = this.firstPaneRect.width + this.lastPaneRect.width;
    } else {
      first = y - this.offset - this.firstPaneRect.top;
      total = this.firstPaneRect.height + this.lastPaneRect.height;
    }
    last = total - first;

    if (this.master === 'first') {
      const min = Math.max(this.firstMinSize, total - this.lastMaxSize);
      const max = Math.min(this.firstMaxSize, total - this.lastMinSize);
      first = Math.max(first, min);
      first = Math.min(first, max);
    } else {
      const min = Math.max(this.lastMinSize, total - this.firstMaxSize);
      const max = Math.min(this.lastMaxSize, total - this.firstMinSize);
      last = Math.max(last, min);
      last = Math.min(last, max);
    }

    this.positions = {first, last, isDragging: true};
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
    if (this.positions.isDragging) {
      this.mouseMove(e.clientX, e.clientY);
    }
  }

  onMouseUp() {
    if (this.positions.isDragging) {
      this.positions = {...this.positions, isDragging: false};
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

    if (this.unit === '%') {
      if (this.master === 'first') {
        firstPaneStyle.flexGrow = this.positions.first;
        lastPaneStyle.flexGrow = 100 - this.positions.first;
      } else {
        lastPaneStyle.flexGrow = this.positions.last;
        firstPaneStyle.flexGrow = 100 - this.positions.last;
      }

      firstPaneStyle.flexShrink = 1;
      firstPaneStyle.flexBasis = '0%';

      lastPaneStyle.flexShrink = 1;
      lastPaneStyle.flexBasis = '0%';
    } else {
      if (this.master === 'first') {
        if (this.props.kind === 'vertical') {
          firstPaneStyle.width = this.positions.first + this.unit;
        } else {
          firstPaneStyle.height = this.positions.first + this.unit;
        }

        lastPaneStyle.flexGrow = 1;
        lastPaneStyle.flexShrink = 1;
        lastPaneStyle.flexBasis = '0%';
      } else {
        if (this.props.kind === 'vertical') {
          lastPaneStyle.width = this.positions.last + this.unit;
        } else {
          lastPaneStyle.height = this.positions.last + this.unit;
        }

        firstPaneStyle.flexGrow = 1;
        firstPaneStyle.flexShrink = 1;
        firstPaneStyle.flexBasis = '0%';
      }
    }

    const resizerClass = this.positions.isDragging
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
