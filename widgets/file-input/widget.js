import React from 'react';
import withC from 'goblin-laboratory/widgets/connect-helpers/with-c';
import C from 'goblin-laboratory/widgets/connect-helpers/c';
import FileInputNC from '../file-input-nc/widget';

const FileInput = withC(FileInputNC, {value: 'onChange'});
FileInput.displayName = 'FileInput';

// export default FileInput;

// Convert model to value for backward compatibility, should be removed
export default (props) => {
  let {value, model, ...otherProps} = props;
  if (model) {
    value = C(model);
  }
  return <FileInput {...otherProps} value={value} />;
};
