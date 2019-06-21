import React from 'react';
import withC from 'goblin-laboratory/widgets/connect-helpers/with-c';
import C from 'goblin-laboratory/widgets/connect-helpers/c';
import TextFieldTypedNC from '../text-field-typed-nc/widget';
import LabelRow from '../label-row/widget';

const TextFieldTyped = withC(TextFieldTypedNC, {value: 'onChange'});
TextFieldTyped.displayName = 'TextFieldTyped';

// export default TextFieldTyped;

// Add label for backward compatibility, should be removed
export default props => {
  let {
    labelGlyph,
    labelText,
    labelWidth,
    model,
    value,
    fieldWidth,
    fieldJustify,
    textFieldShape,
    ...otherProps
  } = props;
  if (model) {
    value = C(model);
  }
  return (
    <LabelRow
      labelGlyph={labelGlyph}
      labelText={labelText}
      labelWidth={labelWidth}
      disabled={props.disabled}
      verticalSpacing="compact"
    >
      <TextFieldTyped
        value={value}
        width={fieldWidth}
        justify={fieldJustify}
        shape={textFieldShape}
        {...otherProps}
      />
    </LabelRow>
  );
};
