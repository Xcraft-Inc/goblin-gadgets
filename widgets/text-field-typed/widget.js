import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import withC from 'goblin-laboratory/widgets/connect-helpers/with-c';
import C from 'goblin-laboratory/widgets/connect-helpers/c';
import TextFieldTypedNC from '../text-field-typed-nc/widget';

const TextFieldTyped = withC(TextFieldTypedNC, {value: 'onChange'});
TextFieldTyped.displayName = 'TextFieldTyped';

const Component = (props) => {
  let {value, model, ...otherProps} = props;
  if (model) {
    value = C(model);
  }

  return <TextFieldTyped value={value} {...otherProps} />;
};

// If property 'entity' is present, use description in schema to edit field.
export default Widget.connect((state, props) => {
  let required = null;
  let defaultValue = null;
  let min = null;
  let max = null;

  const entityName = props.entity;
  if (entityName) {
    let propName = props.model;
    if (propName.startsWith('.')) {
      propName = propName.substring(1);
    }

    const conf = state.get(`backend.entity-schema@${entityName}.${propName}`);
    if (conf) {
      required = conf.get('required');
      defaultValue = conf.get('defaultValue');
      min = conf.get('min');
      max = conf.get('max');
    }
  }

  return {
    required,
    defaultValue,
    min,
    max,
  };
})(Component);
