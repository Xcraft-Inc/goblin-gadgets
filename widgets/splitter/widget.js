import React from 'react';
import ReactDOM from 'react-dom';
import Widget from 'laboratory/widget';
import {Unit} from 'electrum-theme';

/******************************************************************************/

class Splitter extends Widget {
  constructor (props) {
    super (props);

    const firstGrow = this.read ('first-grow');
    if (firstGrow[firstGrow.length - 1] !== '%') {
      throw new Error (`Wrong splitter first-grow ${firstGrow}`);
    }

    this.state = {
      firstGrow: firstGrow.substring (0, firstGrow.length - 1),
    };
  }

  get firstGrow () {
    return this.state.firstGrow;
  }

  set firstGrow (value) {
    this.setState ({
      firstGrow: value,
    });
  }

  getOffset (x, y) {
    const node = ReactDOM.findDOMNode (this.resizer);
    const rect = node.getBoundingClientRect ();
    const kind = this.read ('kind');
    if (kind === 'vertical') {
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

  getScalarValue (name) {
    const v = this.read (name);
    if (v) {
      return Unit.parse (v).value;
    } else {
      return null;
    }
  }

  getNormalizedValue (value) {
    const min = this.getScalarValue ('min-size');
    if (min) {
      value = Math.max (value, min);
    }
    const max = this.getScalarValue ('max-size');
    if (max) {
      value = Math.min (value, max);
    }
    return value;
  }

  onMouseMove (e) {
    if (e.buttons === 1) {
      // Mouse left button pressed ?
      const x = e.clientX;
      const y = e.clientY;

      if (!this.isDragging) {
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
      if (this.isDragging) {
        const kind = this.read ('kind');
        if (kind === 'vertical') {
          const rx = x - this.offset - this.firstPaneRect.left;
          this.firstGrow =
            100 * rx / (this.containerRect.width - this.resizerRect.width);
        } else {
          const ry = y - this.offset - this.firstPaneRect.top;
          this.firstGrow =
            100 * ry / (this.containerRect.height - this.resizerRect.height);
        }
      }
    } else {
      // Mouse left button released ?
      this.isDragging = false;
    }
  }

  widget () {
    return props => {
      const kind = this.read ('kind');

      if (!kind) {
        throw new Error ('Undefined splitter kind');
      } else if (kind !== 'vertical' && kind !== 'horizontal') {
        throw new Error (`Wrong splitter kind ${kind}`);
      }

      const children = this.props.children;
      if (children.length !== 2) {
        throw new Error ('Splitter must have 2 children');
      }

      const containerStyle = this.styles.container;
      const firstPaneStyle = this.styles.firstPane;
      const resizerStyle = this.styles.resizer;
      const lastPaneStyle = this.styles.lastPane;

      firstPaneStyle.flexGrow = this.firstGrow;
      lastPaneStyle.flexGrow = 100 - this.firstGrow;

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
