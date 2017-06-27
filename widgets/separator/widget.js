import React from 'react';
import Widget from 'laboratory/widget';

/******************************************************************************/

class Separator extends Widget {
  constructor (props) {
    super (props);
  }

  render () {
    const {state} = this.props;
    const disabled = this.props.disabled;

    const boxStyle = this.styles.box;

    return <div disabled={disabled} style={boxStyle} />;
  }
}

/******************************************************************************/
export default Separator;
