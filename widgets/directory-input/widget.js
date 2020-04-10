import React from 'react';
import withC from 'goblin-laboratory/widgets/connect-helpers/with-c';
import C from 'goblin-laboratory/widgets/connect-helpers/c';
import DirectoryInputNC from '../directory-input-nc/widget';

const DirectoryInput = withC(DirectoryInputNC, {value: 'onChange'});
DirectoryInput.displayName = 'DirectoryInput';

// export default DirectoryInput;

// Convert model to value for backward compatibility, should be removed
export default (props) => {
  let {value, model, ...otherProps} = props;
  if (model) {
    value = C(model);
  }
  return <DirectoryInput {...otherProps} value={value} />;
};
