import React from 'react';
import Widget from 'laboratory/widget';

/******************************************************************************/

class Separator extends Widget {
  constructor (props) {
    super (props);
  }

  widget () {
    return props => {
      const {state} = this.props;
      const disabled = this.read ('disabled');

      const boxStyle = this.styles.box;

      return <div disabled={disabled} style={boxStyle} />;
    };
  }
}

/******************************************************************************/
