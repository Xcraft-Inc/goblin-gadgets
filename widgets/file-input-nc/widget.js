import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';

export default class FileInputNC extends Widget {
  constructor() {
    super(...arguments);
    this.handleFileChange = this.handleFileChange.bind(this);
  }

  handleFileChange(ev) {
    ev.persist();
    const fileList = ev.target.files;
    const files = [];
    for (let i = 0; i < fileList.length; i++) {
      files.push(fileList[i].path);
    }
    if (files.length === 1) {
      if (this.props.onChange) {
        this.props.onChange(files[0]);
      }
    } else {
      throw new Error('Not implemented');
    }
  }

  render() {
    return (
      <input
        type="file"
        onChange={this.handleFileChange}
        accept={this.props.accept}
        ref={this.props.inputRef}
      />
    );
  }
}
