import React from 'react';
import Widget from 'laboratory/widget';

/******************************************************************************/

class Separator extends Widget {
  constructor (props) {
    super (props);
  }

  render () {
    const disabled = this.props.disabled;
    const boxClass = this.styles.classNames.box;

    return <div disabled={disabled} className={boxClass} />;
  }
}

/******************************************************************************/
export default Separator;
