import React from 'react';
import withC from 'goblin-laboratory/widgets/connect-helpers/with-c';
import C from 'goblin-laboratory/widgets/connect-helpers/c';
import TextFieldComboNC from '../text-field-combo-nc/widget';

const TextFieldCombo = withC(TextFieldComboNC, {selectedId: 'onChange'});
TextFieldCombo.displayName = 'TextFieldCombo';

// export default TextFieldCombo;

// Convert model to value for backward compatibility, should be removed
export default props => {
  let {selectedId, model, ...otherProps} = props;
  if (model) {
    selectedId = C(model);
  }
  return <TextFieldCombo {...otherProps} selectedId={selectedId} />;
};
