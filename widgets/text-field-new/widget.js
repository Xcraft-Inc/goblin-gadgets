import React from 'react';
import TextFieldNC from '../text-field-nc/widget';
import withC from 'goblin-laboratory/widgets/connect-helpers/with-c';
import C from 'goblin-laboratory/widgets/connect-helpers/c';
import wrapRawInput from 'goblin-laboratory/widgets/input-wrapper/widget.js';

const TextField = withC(wrapRawInput(TextFieldNC), {value: 'onChange'});
TextField.displayName = 'TextFieldNew';

// export default TextField;

// Convert model to value for backward compatibility, should be removed
export default props => {
  let {value, model, ...otherProps} = props;
  if (model) {
    value = C(model);
  }
  return <TextField {...otherProps} value={value} />;
};
