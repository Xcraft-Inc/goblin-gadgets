import React from 'react';
import Widget from 'laboratory/widget';

/******************************************************************************/

class Menu extends Widget {
  constructor (props) {
    super (props);
  }

  render () {
    const {state} = this.props;
    const disabled = this.read ('disabled');
    const inputItems = this.read ('items');

    const boxStyle = this.styles.box;

    return (
      <div disabled={disabled} style={boxStyle}>
        {inputItems.map (item => item ())}
      </div>
    );
  }
}

/******************************************************************************/
export default Menu;
