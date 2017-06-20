import React from 'react';
import Widget from 'laboratory/widget';

/******************************************************************************/

class Dialog extends Widget {
  constructor (props) {
    super (props);
  }

  render () {
    const {state} = this.props;
    const disabled = this.read ('disabled');

    const boxStyle = this.styles.box;

    return (
      <div disabled={disabled} style={boxStyle}>
        {this.props.children}
      </div>
    );
  }
}

/******************************************************************************/
export default Dialog;
