import React from 'react';
import Widget from 'laboratory/widget';

/******************************************************************************/

class Menu extends Widget {
  constructor () {
    super (...arguments);
  }

  render () {
    const boxClass = this.styles.classNames.box;

    return (
      <div disabled={this.props.disabled} className={boxClass}>
        {this.props.items.map (item => item ())}
      </div>
    );
  }
}

/******************************************************************************/
export default Menu;
