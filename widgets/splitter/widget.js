import React from 'react';
import ReactDOM from 'react-dom';
import Widget from 'laboratory/widget';

/******************************************************************************/

// With '45%', return '45'.
function getPercentValue (text) {
  const len = text.length;
  if (!text || len < 2 || text[len - 1] != '%') {
    throw new Error (`Invalid Splitter value ${text}`);
  }
  return text.substring (0, len - 1);
}

/******************************************************************************/

class Splitter extends Widget {
  constructor (props) {
    super (props);

    const firstGrow = this.read ('first-grow');
    this.state = {
      firstGrow: getPercentValue (firstGrow),
    };

    this.kind = this.read ('kind');
    if (this.kind !== 'vertical' && this.kind !== 'horizontal') {
      throw new Error (`Wrong Splitter kind ${this.kind}`);
    }
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
      this.lastPaneRect = firstPaneNode.getBoundingClientRect ();

      this.isDragging = true;
    }
  }

  mouseMove (x, y) {
    if (this.kind === 'vertical') {
      const rx = x - this.offset - this.firstPaneRect.left;
      this.firstGrow =
        100 * rx / (this.containerRect.width - this.resizerRect.width);
    } else {
      const ry = y - this.offset - this.firstPaneRect.top;
      this.firstGrow =
        100 * ry / (this.containerRect.height - this.resizerRect.height);
    }
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
