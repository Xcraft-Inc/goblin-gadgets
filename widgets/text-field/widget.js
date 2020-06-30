import React from 'react';
import withC from 'goblin-laboratory/widgets/connect-helpers/with-c';
import C from 'goblin-laboratory/widgets/connect-helpers/c';
import TextFieldNC from '../text-field-nc/widget';

const TextField = withC(TextFieldNC, {value: 'onChange'});
TextField.displayName = 'TextField';

// export default TextField;

// Convert model to value for backward compatibility, should be removed
export default (props) => {
  let {value, model, ...otherProps} = props;
  if (model) {
    value = C(model);
  }
  return <TextField {...otherProps} value={value} />;
};
