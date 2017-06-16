import React from 'react';
import ReactDOM from 'react-dom';
import Widget from 'laboratory/widget';

/******************************************************************************/

class Splitter extends Widget {
  constructor (props) {
    super (props);
    this.state = {
      splitterValue: '200px',
    };
  }

  get splitterValue () {
    return this.state.splitterValue;
  }

  set splitterValue (value) {
    this.setState ({
      splitterValue: value,
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

  onMouseMove (e) {
    const x = e.clientX;
    const y = e.clientY;
    if (e.buttons === 1) {
      // Mouse left button pressed ?
      if (!this.isDragging) {
        const offset = this.getOffset (x, y);
        if (offset !== -1) {
          this.offset = offset;
          this.isDragging = true;
        }
      }
      if (this.isDragging) {
        const node = ReactDOM.findDOMNode (this.leftPane);
        const rect = node.getBoundingClientRect ();
        const kind = this.read ('kind');
        if (kind === 'vertical') {
          this.splitterValue = x - this.offset - rect.left + 'px';
        } else {
          this.splitterValue = y - this.offset - rect.top + 'px';
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
      }

      const children = this.props.children;
      if (children.length !== 2) {
        throw new Error ('Splitter must have 2 children');
      }

      const containerStyle = this.styles.container;
      const leftPaneStyle = this.styles.leftPane;
      const resizerStyle = this.styles.resizer;
      const rightPaneStyle = this.styles.rightPane;

      if (kind === 'vertical') {
        leftPaneStyle.width = this.splitterValue;
      } else {
        leftPaneStyle.height = this.splitterValue;
      }

      return (
        <div style={containerStyle} onMouseMove={::this.onMouseMove}>
          <div style={leftPaneStyle} ref={node => (this.leftPane = node)}>
            {children[0]}
          </div>
          <div style={resizerStyle} ref={node => (this.resizer = node)} />
          <div style={rightPaneStyle} ref={node => (this.rightPane = node)}>
            {children[1]}
          </div>
        </div>
      );
    };
  }
}

/******************************************************************************/
export default Splitter;
