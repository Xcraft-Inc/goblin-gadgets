import React from 'react';
import CheckboxNC from '../checkbox-nc/widget';
import withC from 'goblin-laboratory/widgets/connect-helpers/with-c';
import C from 'goblin-laboratory/widgets/connect-helpers/c';

const Checkbox = withC(CheckboxNC, {checked: 'onChange'});
Checkbox.displayName = 'Checkbox';

export default (props) => {
  let {checked, model, ...otherProps} = props;
  if (model) {
    checked = C(model);
  }
  return <Checkbox {...otherProps} checked={checked} />;
};
