import React from 'react';
import Widget from 'laboratory/widget';
/******************************************************************************/

class Gauge extends Widget {
  constructor (props) {
    super (props);
  }

  render () {
    const boxStyle = this.styles.box;
    const contentStyle = this.styles.content;

    return (
      <div style={boxStyle}>
        <div style={contentStyle} />
      </div>
    );
  }
}

/******************************************************************************/
export default Gauge;
