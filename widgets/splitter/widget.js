import React from 'react';
import ReactDOM from 'react-dom';
import Widget from 'laboratory/widget';
import {Unit} from 'electrum-theme';

/******************************************************************************/

class Splitter extends Widget {
  constructor (props) {
    super (props);

    this.kind = this.read ('kind');
    if (this.kind !== 'vertical' && this.kind !== 'horizontal') {
      throw new Error (`Wrong Splitter kind ${this.kind}`);
    }

    const firstValue = this.read ('first-value');
    const lastValue = this.read ('last-value');
    if (firstValue && lastValue) {
      throw new Error (
        `Splitter must have both first-value (${firstValue}) and last-value (${lastValue})`
      );
    }
    if (firstValue) {
      const x = Unit.parse (firstValue);
      this.firstValue = x.value;
      this.unit = x.unit;
      this.master = 'first';
    } else {
      const x = Unit.parse (lastValue);
      this.lastValue = x.value;
      this.unit = x.unit;
      this.master = 'last';
    }
    if (this.unit !== '%' && this.unit !== 'px') {
      throw new Error (`Wrong Splitter first-value unit ${this.unit}`);
    }

    this.firstMinValue = this.getValue ('first-min-value', 'min');
    this.firstMaxValue = this.getValue ('first-max-value', 'max');

    this.lastMinValue = this.getValue ('last-min-value', 'min');
    this.lastMaxValue = this.getValue ('last-max-value', 'max');
  }

  getValue (name, type) {
    const value = this.read (name);
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
      this.firstValue =
        100 * rx / (this.containerRect.width - this.resizerRect.width);
    } else {
      const ry = y - this.offset - this.firstPaneRect.top;
      this.firstValue =
        100 * ry / (this.containerRect.height - this.resizerRect.height);
    }
    this.lastValue = 100 - this.firstValue;

    if (this.master === 'first') {
      const min = Math.max (this.firstMinValue, 100 - this.lastMaxValue);
      const max = Math.min (this.firstMaxValue, 100 - this.lastMinValue);
      this.firstValue = Math.max (this.firstValue, min);
      this.firstValue = Math.min (this.firstValue, max);
    } else {
      const min = Math.max (this.lastMinValue, 100 - this.firstMaxValue);
      const max = Math.min (this.lastMaxValue, 100 - this.firstMinValue);
      this.lastValue = Math.max (this.lastValue, min);
      this.lastValue = Math.min (this.lastValue, max);
    }
  }

  mouseMovePixels (x, y) {
    let total;
    if (this.kind === 'vertical') {
      this.firstValue = x - this.offset - this.firstPaneRect.left;
      total = this.firstPaneRect.width + this.lastPaneRect.width;
    } else {
      this.firstValue = y - this.offset - this.firstPaneRect.top;
      total = this.firstPaneRect.height + this.lastPaneRect.height;
    }
    this.lastValue = total - this.firstValue;

    if (this.master === 'first') {
      const min = Math.max (this.firstMinValue, total - this.lastMaxValue);
      const max = Math.min (this.firstMaxValue, total - this.lastMinValue);
      this.firstValue = Math.max (this.firstValue, min);
      this.firstValue = Math.min (this.firstValue, max);
    } else {
      const min = Math.max (this.lastMinValue, total - this.firstMaxValue);
      const max = Math.min (this.lastMaxValue, total - this.firstMinValue);
      this.lastValue = Math.max (this.lastValue, min);
      this.lastValue = Math.min (this.lastValue, max);
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

  widget () {
    return props => {
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
          firstPaneStyle.flexGrow = this.firstValue;
          lastPaneStyle.flexGrow = 100 - this.firstValue;
        } else {
          lastPaneStyle.flexGrow = this.lastValue;
          firstPaneStyle.flexGrow = 100 - this.lastValue;
        }

        firstPaneStyle.flexShrink = '1';
        firstPaneStyle.flexBasis = '0%';

        lastPaneStyle.flexShrink = '1';
        lastPaneStyle.flexBasis = '0%';
      } else {
        if (this.master === 'first') {
          if (this.kind === 'vertical') {
            firstPaneStyle.width = this.firstValue + this.unit;
          } else {
            firstPaneStyle.height = this.firstValue + this.unit;
          }

          lastPaneStyle.flexGrow = '1';
          lastPaneStyle.flexShrink = '1';
          lastPaneStyle.flexBasis = '0%';
        } else {
          if (this.kind === 'vertical') {
            lastPaneStyle.width = this.lastValue + this.unit;
          } else {
            lastPaneStyle.height = this.lastValue + this.unit;
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
    };
  }
}

/******************************************************************************/
export default Splitter;
