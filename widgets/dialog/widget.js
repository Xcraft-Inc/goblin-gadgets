import React from 'react';
import Widget from 'laboratory/widget';

/******************************************************************************/

class Dialog extends Widget {
  constructor () {
    super (...arguments);
  }

  render () {
    const disabled = this.props.disabled;
    const boxClass = this.styles.classNames.box;

    return (
      <div disabled={disabled} className={boxClass}>
        {this.props.children}
      </div>
    );
  }
}

/******************************************************************************/
export default Dialog;
