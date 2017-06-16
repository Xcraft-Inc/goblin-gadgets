import React from 'react';
import Widget from 'laboratory/widget';

/******************************************************************************/

class Splitter extends Widget {
  constructor (props) {
    super (props);
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

      return (
        <div style={containerStyle}>
          <div style={leftPaneStyle}>
            {children[0]}
          </div>
          <div style={resizerStyle} />
          <div style={rightPaneStyle}>
            {children[1]}
          </div>
        </div>
      );
    };
  }
}

/******************************************************************************/
export default Splitter;
