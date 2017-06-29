import React from 'react';
import Widget from 'laboratory/widget';
/******************************************************************************/

class Gauge extends Widget {
  constructor (props) {
    super (props);
  }

  render () {
    const boxClass = this.styles.classNames.box;
    const contentClass = this.styles.classNames.content;

    return (
      <div className={boxClass}>
        <div className={contentClass} />
      </div>
    );
  }
}

/******************************************************************************/
export default Gauge;
