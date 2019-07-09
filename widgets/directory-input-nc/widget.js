import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import FileInput from 'goblin-gadgets/widgets/file-input/widget';

export default class DirectoryInput extends Widget {
  constructor() {
    super(...arguments);
  }

  handleInputRef(n) {
    if (n) {
      n.directory = true;
      n.webkitdirectory = true;
    }
  }

  render() {
    return <FileInput {...this.props} inputRef={this.handleInputRef} />;
  }
}
