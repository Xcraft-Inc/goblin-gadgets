import React from 'react';
import ReactDOM from 'react-dom';
import Widget from 'laboratory/widget';
import {Unit} from 'electrum-theme';

/******************************************************************************/

class Splitter extends Widget {
  constructor (props) {
    super (props);

    this.state = {
      firstValue: null,
      minValue: null,
      maxValue: null,
    };

    this.firstValue = this.getValue ('first-value', {value: 50, unit: '%'});
    if (this.firstValue.unit !== '%' && this.firstValue.unit !== 'px') {
      throw new Error (`Wrong Splitter unit value ${this.firstValue.unit}`);
    }
    this.minValue = this.getValue ('min-value', {
      value: 0,
      unit: this.firstValue.unit,
    });
    if (this.minValue.unit !== '%' && this.minValue.unit !== 'px') {
      throw new Error (`Wrong Splitter unit value ${this.minValue.unit}`);
    }

    const max = this.firstValue.unit === '%' ? 100 : 1000000;
    this.maxValue = this.getValue ('max-value', {
      value: max,
      unit: this.firstValue.unit,
    });
    if (this.maxValue.unit !== '%' && this.maxValue.unit !== 'px') {
      throw new Error (`Wrong Splitter unit value ${this.maxValue.unit}`);
    }

    this.kind = this.read ('kind');
    if (this.kind !== 'vertical' && this.kind !== 'horizontal') {
      throw new Error (`Wrong Splitter kind ${this.kind}`);
    }
  }

  // get firstValue () {
  //   return this.state.firstValue;
  // }
  //
  // set firstValue (value) {
  //   this.setState ({
  //     firstValue: value,
  //   });
  // }
  //
  // get minValue () {
  //   return this.state.minValue;
  // }
  //
  // set minValue (value) {
  //   this.setState ({
  //     minValue: value,
  //   });
  // }
  //
  // get maxValue () {
  //   return this.state.maxValue;
  // }
  //
  // set maxValue (value) {
  //   this.setState ({
  //     maxValue: value,
  //   });
  // }

  getValue (name, def) {
    const value = this.read (name);
    if (value) {
      return Unit.parse (value);
    } else {
      return def;
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

  getLimitedValue (value) {
    value = Math.max (value, this.minValue.value);
    value = Math.min (value, this.maxValue.value);
    return value;
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
      this.lastPaneRect = firstPaneNode.getBoundingClientRect ();

      this.isDragging = true;
    }
  }

  mouseMovePercents (x, y) {
    if (this.kind === 'vertical') {
      const rx = x - this.offset - this.firstPaneRect.left;
      this.firstValue.value = this.getLimitedValue (
        100 * rx / (this.containerRect.width - this.resizerRect.width)
      );
    } else {
      const ry = y - this.offset - this.firstPaneRect.top;
      this.firstValue.value = this.getLimitedValue (
        100 * ry / (this.containerRect.height - this.resizerRect.height)
      );
    }
  }

  mouseMovePixels (x, y) {
    if (this.kind === 'vertical') {
      this.firstValue.value = this.getLimitedValue (
        x - this.offset - this.firstPaneRect.left
      );
    } else {
      this.firstValue.value = this.getLimitedValue (
        y - this.offset - this.firstPaneRect.top
      );
    }
  }

  mouseMove (x, y) {
    if (this.firstValue.unit === '%') {
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

      if (this.firstValue.unit === '%') {
        firstPaneStyle.display = 'flex';
        firstPaneStyle.flexGrow = this.firstValue.value;
        firstPaneStyle.flexShrink = '1';
        firstPaneStyle.flexBasis = '0%';

        lastPaneStyle.display = 'flex';
        lastPaneStyle.flexGrow = 100 - this.firstValue.value;
        lastPaneStyle.flexShrink = '1';
        lastPaneStyle.flexBasis = '0%';
      } else {
        if (this.kind === 'vertical') {
          firstPaneStyle.width = this.firstValue.value + this.firstValue.unit;
        } else {
          firstPaneStyle.height = this.firstValue.value + this.firstValue.unit;
        }

        lastPaneStyle.display = 'flex';
        lastPaneStyle.flexGrow = '1';
        lastPaneStyle.flexShrink = '1';
        lastPaneStyle.flexBasis = '0%';
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
