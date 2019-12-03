//T:2019-02-27:Nothing to translate !
import React from 'react';
import ReactDOM from 'react-dom';
import Widget from 'goblin-laboratory/widgets/widget';
import {Unit} from 'electrum-theme';

/******************************************************************************/

class Splitter extends Widget {
  constructor() {
    super(...arguments);

    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);

    this.kind = this.props.kind;
    if (this.kind !== 'vertical' && this.kind !== 'horizontal') {
      throw new Error(`Wrong Splitter kind ${this.kind}`);
    }

    if (this.props.firstSize && this.props.lastSize) {
      throw new Error(
        `Splitter must have both firstSize (${
          this.props.firstSize
        }) and lastSize (${this.props.lastSize})`
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
      throw new Error(`Wrong Splitter firstSize unit ${this.unit}`);
    }

    this.firstMinSize = this.getValue('firstMinSize', 'min');
    this.firstMaxSize = this.getValue('firstMaxSize', 'max');

    this.lastMinSize = this.getValue('lastMinSize', 'min');
    this.lastMaxSize = this.getValue('lastMaxSize', 'max');
  }

  getValue(name, type) {
    const value = this.props[name];
    if (value) {
      const x = Unit.parse(value);
      if (x.unit !== this.unit) {
        throw new Error(`Wrong Splitter unit in ${name} (${value})`);
      }
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
    const node = ReactDOM.findDOMNode(this.resizer);
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

      const containerNode = ReactDOM.findDOMNode(this.container);
      this.containerRect = containerNode.getBoundingClientRect();

      const firstPaneNode = ReactDOM.findDOMNode(this.firstPane);
      this.firstPaneRect = firstPaneNode.getBoundingClientRect();

      const resizerNode = ReactDOM.findDOMNode(this.resizer);
      this.resizerRect = resizerNode.getBoundingClientRect();

      const lastPaneNode = ReactDOM.findDOMNode(this.lastPane);
      this.lastPaneRect = lastPaneNode.getBoundingClientRect();

      this.isDragging = true;
    }
  }

  mouseMovePercents(x, y) {
    if (this.kind === 'vertical') {
      const rx = x - this.offset - this.firstPaneRect.left;
      this.firstSize =
        (100 * rx) / (this.containerRect.width - this.resizerRect.width);
    } else {
      const ry = y - this.offset - this.firstPaneRect.top;
      this.firstSize =
        (100 * ry) / (this.containerRect.height - this.resizerRect.height);
    }
    this.lastSize = 100 - this.firstSize;

    if (this.master === 'first') {
      const min = Math.max(this.firstMinSize, 100 - this.lastMaxSize);
      const max = Math.min(this.firstMaxSize, 100 - this.lastMinSize);
      this.firstSize = Math.max(this.firstSize, min);
      this.firstSize = Math.min(this.firstSize, max);
    } else {
      const min = Math.max(this.lastMinSize, 100 - this.firstMaxSize);
      const max = Math.min(this.lastMaxSize, 100 - this.firstMinSize);
      this.lastSize = Math.max(this.lastSize, min);
      this.lastSize = Math.min(this.lastSize, max);
    }
  }

  mouseMovePixels(x, y) {
    let total;
    if (this.kind === 'vertical') {
      this.firstSize = x - this.offset - this.firstPaneRect.left;
      total = this.firstPaneRect.width + this.lastPaneRect.width;
    } else {
      this.firstSize = y - this.offset - this.firstPaneRect.top;
      total = this.firstPaneRect.height + this.lastPaneRect.height;
    }
    this.lastSize = total - this.firstSize;

    if (this.master === 'first') {
      const min = Math.max(this.firstMinSize, total - this.lastMaxSize);
      const max = Math.min(this.firstMaxSize, total - this.lastMinSize);
      this.firstSize = Math.max(this.firstSize, min);
      this.firstSize = Math.min(this.firstSize, max);
    } else {
      const min = Math.max(this.lastMinSize, total - this.firstMaxSize);
      const max = Math.min(this.lastMaxSize, total - this.firstMinSize);
      this.lastSize = Math.max(this.lastSize, min);
      this.lastSize = Math.min(this.lastSize, max);
    }
  }

  mouseMove(x, y) {
    if (this.unit === '%') {
      this.mouseMovePercents(x, y);
    } else {
      this.mouseMovePixels(x, y);
    }

    this.forceUpdate();
  }

  onMouseDown(e) {
    this.isMouseDown = true;
    if (e.buttons === 1) {
      // Mouse left button pressed ?
      this.mouseDown(e.clientX, e.clientY);
    }
  }

  onMouseMove(e) {
    if (this.isDragging) {
      this.mouseMove(e.clientX, e.clientY);
    }
  }

  onMouseUp() {
    if (this.isDragging) {
      this.isDragging = false;
      this.forceUpdate();
    }
    this.isMouseDown = false;
  }

  render() {
    const children = this.props.children;
    if (children.length !== 2) {
      throw new Error('Splitter must have 2 children');
    }

    const containerClass = this.styles.classNames.container;
    const firstPaneClass = this.styles.classNames.firstPane;
    const resizerClass = this.isDragging
      ? this.styles.classNames.resizerDragging
      : this.styles.classNames.resizer;
    const lastPaneClass = this.styles.classNames.lastPane;

    // FIXME: it's a bad idea to mutate the styles in the render, see styles.js
    const firstPaneStyle = Object.assign({}, this.styles.props.firstPane);
    const lastPaneStyle = Object.assign({}, this.styles.props.lastPane);

    if (this.unit === '%') {
      if (this.master === 'first') {
        firstPaneStyle.flexGrow = this.firstSize;
        lastPaneStyle.flexGrow = 100 - this.firstSize;
      } else {
        lastPaneStyle.flexGrow = this.lastSize;
        firstPaneStyle.flexGrow = 100 - this.lastSize;
      }

      firstPaneStyle.flexShrink = '1';
      firstPaneStyle.flexBasis = '0%';

      lastPaneStyle.flexShrink = '1';
      lastPaneStyle.flexBasis = '0%';
    } else {
      if (this.master === 'first') {
        if (this.kind === 'vertical') {
          firstPaneStyle.width = this.firstSize + this.unit;
        } else {
          firstPaneStyle.height = this.firstSize + this.unit;
        }

        lastPaneStyle.flexGrow = '1';
        lastPaneStyle.flexShrink = '1';
        lastPaneStyle.flexBasis = '0%';
      } else {
        if (this.kind === 'vertical') {
          lastPaneStyle.width = this.lastSize + this.unit;
        } else {
          lastPaneStyle.height = this.lastSize + this.unit;
        }

        firstPaneStyle.flexGrow = '1';
        firstPaneStyle.flexShrink = '1';
        firstPaneStyle.flexBasis = '0%';
      }
    }

    return (
      <div
        className={containerClass}
        ref={node => (this.container = node)}
        onMouseDown={this.onMouseDown}
        onMouseMove={this.onMouseMove}
        onMouseUp={this.onMouseUp}
      >
        <div
          className={firstPaneClass}
          style={firstPaneStyle}
          ref={node => (this.firstPane = node)}
        >
          {children[0]}
        </div>
        <div className={resizerClass} ref={node => (this.resizer = node)} />
        <div
          className={lastPaneClass}
          style={lastPaneStyle}
          ref={node => (this.lastPane = node)}
        >
          {children[1]}
        </div>
      </div>
    );
  }
}

/******************************************************************************/
export default Splitter;
