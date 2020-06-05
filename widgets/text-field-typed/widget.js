import React from 'react';
import withC from 'goblin-laboratory/widgets/connect-helpers/with-c';
import C from 'goblin-laboratory/widgets/connect-helpers/c';
import TextFieldTypedNC from '../text-field-typed-nc/widget';

const TextFieldTyped = withC(TextFieldTypedNC, {value: 'onChange'});
TextFieldTyped.displayName = 'TextFieldTyped';

export default (props) => {
  let {value, model, ...otherProps} = props;
  if (model) {
    value = C(model);
  }

  return <TextFieldTyped value={value} {...otherProps} />;
};
