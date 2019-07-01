import React from 'react';
import Widget from 'laboratory/widget';

import TextFieldComboNC from 'gadgets/text-field-combo-nc/widget';
import TextFieldTypedNC from 'gadgets/text-field-typed-nc/widget';

/******************************************************************************/

export default class TextFieldTypedComboNC extends Widget {
  constructor() {
    super(...arguments);
    this.renderTextField = this.renderTextField.bind(this);
  }

  renderTextField(localProps) {
    return <TextFieldTypedNC {...localProps} type={this.props.type} />;
  }

  render() {
    return (
      <TextFieldComboNC
        {...this.props}
        renderTextField={p => this.renderTextField(p)}
      />
    );
  }
}

/******************************************************************************/
