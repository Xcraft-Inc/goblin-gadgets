import React from 'react';
import Widget from 'laboratory/widget';

/******************************************************************************/

class Menu extends Widget {
  constructor () {
    super (...arguments);
  }

  render () {
    const disabled = this.props.disabled;
    const inputItems = this.props.items;

    const boxClass = this.styles.classNames.box;

    return (
      <div disabled={disabled} className={boxClass}>
        {inputItems.map (item => item ())}
      </div>
    );
  }
}

/******************************************************************************/
export default Menu;
