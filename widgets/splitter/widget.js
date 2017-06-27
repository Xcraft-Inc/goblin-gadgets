import React from 'react';
import ReactDOM from 'react-dom';
import Widget from 'laboratory/widget';
import {Unit} from 'electrum-theme';

/******************************************************************************/

class Splitter extends Widget {
  constructor (props) {
    super (props);

    this.kind = this.props.kind;
    if (this.kind !== 'vertical' && this.kind !== 'horizontal') {
      throw new Error (`Wrong Splitter kind ${this.kind}`);
    }

    const firstSize = this.props['first-size'];
    const lastSize = this.props['last-size'];
    if (firstSize && lastSize) {
      throw new Error (
        `Splitter must have both first-size (${firstSize}) and last-size (${lastSize})`
      );
    }
    if (firstSize) {
      const x = Unit.parse (firstSize);
      this.firstSize = x.value;
      this.unit = x.unit;
      this.master = 'first';
    } else {
      const x = Unit.parse (lastSize);
      this.lastSize = x.value;
      this.unit = x.unit;
      this.master = 'last';
    }
    if (this.unit !== '%' && this.unit !== 'px') {
      throw new Error (`Wrong Splitter first-size unit ${this.unit}`);
    }

    this.firstMinSize = this.getValue ('first-min-size', 'min');
    this.firstMaxSize = this.getValue ('first-max-size', 'max');

    this.lastMinSize = this.getValue ('last-min-size', 'min');
    this.lastMaxSize = this.getValue ('last-max-size', 'max');
  }

  getValue (name, type) {
    const value = this.props[name];
    if (value) {
      const x = Unit.parse (value);
      if (x.unit !== this.unit) {
        throw new Error (`Wrong Splitter unit in ${name} (${value})`);
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

  getOffset (x, y) {
    const node = ReactDOM.findDOMNode (this.resizer);
    const rect = node.getBoundingClientRect ();
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

  mouseDown (x, y) {
    const offset = this.getOffset (x, y);
    if (offset !== -1) {
      this.offset = offset;

      const containerNode = ReactDOM.findDOMNode (this.container);
      this.containerRect = containerNode.getBoundingClientRect ();

      const firstPaneNode = ReactDOM.findDOMNode (this.firstPane);
      this.firstPaneRect = firstPaneNode.getBoundingClientRect ();

      const resizerNode = ReactDOM.findDOMNode (this.resizer);
      this.resizerRect = resizerNode.getBoundingClientRect ();

      const lastPaneNode = ReactDOM.findDOMNode (this.lastPane);
      this.lastPaneRect = lastPaneNode.getBoundingClientRect ();

      this.isDragging = true;
    }
  }

  mouseMovePercents (x, y) {
    if (this.kind === 'vertical') {
      const rx = x - this.offset - this.firstPaneRect.left;
      this.firstSize =
        100 * rx / (this.containerRect.width - this.resizerRect.width);
    } else {
      const ry = y - this.offset - this.firstPaneRect.top;
      this.firstSize =
        100 * ry / (this.containerRect.height - this.resizerRect.height);
    }
    this.lastSize = 100 - this.firstSize;

    if (this.master === 'first') {
      const min = Math.max (this.firstMinSize, 100 - this.lastMaxSize);
      const max = Math.min (this.firstMaxSize, 100 - this.lastMinSize);
      this.firstSize = Math.max (this.firstSize, min);
      this.firstSize = Math.min (this.firstSize, max);
    } else {
      const min = Math.max (this.lastMinSize, 100 - this.firstMaxSize);
      const max = Math.min (this.lastMaxSize, 100 - this.firstMinSize);
      this.lastSize = Math.max (this.lastSize, min);
      this.lastSize = Math.min (this.lastSize, max);
    }
  }

  mouseMovePixels (x, y) {
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
      const min = Math.max (this.firstMinSize, total - this.lastMaxSize);
      const max = Math.min (this.firstMaxSize, total - this.lastMinSize);
      this.firstSize = Math.max (this.firstSize, min);
      this.firstSize = Math.min (this.firstSize, max);
    } else {
      const min = Math.max (this.lastMinSize, total - this.firstMaxSize);
      const max = Math.min (this.lastMaxSize, total - this.firstMinSize);
      this.lastSize = Math.max (this.lastSize, min);
      this.lastSize = Math.min (this.lastSize, max);
    }
  }

  mouseMove (x, y) {
    if (this.unit === '%') {
      this.mouseMovePercents (x, y);
    } else {
      this.mouseMovePixels (x, y);
    }

    this.forceUpdate ();
  }

  onMouseMove (e) {
    if (e.buttons === 1) {
      // Mouse left button pressed ?
      const x = e.clientX;
      const y = e.clientY;

      if (!this.isDragging) {
        this.mouseDown (x, y);
      }
      if (this.isDragging) {
        this.mouseMove (x, y);
      }
    } else {
      // Mouse left button released ?
      this.isDragging = false;
    }
  }

  render () {
    const children = this.props.children;
    if (children.length !== 2) {
      throw new Error ('Splitter must have 2 children');
    }

    const containerStyle = this.styles.container;
    const firstPaneStyle = this.styles.firstPane;
    const resizerStyle = this.styles.resizer;
    const lastPaneStyle = this.styles.lastPane;

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
        style={containerStyle}
        ref={node => (this.container = node)}
        onMouseMove={::this.onMouseMove}
      >
        <div style={firstPaneStyle} ref={node => (this.firstPane = node)}>
          {children[0]}
        </div>
        <div style={resizerStyle} ref={node => (this.resizer = node)} />
        <div style={lastPaneStyle} ref={node => (this.lastPane = node)}>
          {children[1]}
        </div>
      </div>
    );
  }
}

/******************************************************************************/
export default Splitter;
