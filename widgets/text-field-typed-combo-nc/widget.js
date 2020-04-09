import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';

import TextFieldComboNC from 'goblin-gadgets/widgets/text-field-combo-nc/widget';
import TextFieldTypedNC from 'goblin-gadgets/widgets/text-field-typed-nc/widget';

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
        renderTextField={(p) => this.renderTextField(p)}
      />
    );
  }
}

/******************************************************************************/
