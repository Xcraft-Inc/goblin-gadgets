import React from 'react';
import Widget from 'laboratory/widget';

import LabelTextField from 'gadgets/label-text-field/widget';

/******************************************************************************/

class TranslatableTextField extends Widget {
  render() {
    const {...other} = this.props;

    return <LabelTextField {...other} />;
  }
}

/******************************************************************************/
export default TranslatableTextField;
