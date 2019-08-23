import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import T from 't';
import Label from '../label/widget';

let count = 0;
export default class FileInputNC extends Widget {
  constructor() {
    super(...arguments);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.state = {files: []};
    this.id = 'FileInput-' + count;
    count++;
  }

  handleFileChange(ev) {
    ev.persist();
    const fileList = ev.target.files;
    const files = [];
    for (let i = 0; i < fileList.length; i++) {
      files.push(fileList[i].path);
    }
    this.setState({files});
    if (files.length === 1) {
      if (this.props.onChange) {
        this.props.onChange(files[0]);
      }
    } else if (files.length > 1) {
      if (this.props.onChange) {
        this.props.onChange(files);
      }
    }
  }

  render() {
    const filesCount = this.state.files.length;
    let label = T('Choix du fichier');
    if (this.props.multiple) {
      label = T('Choix du/des fichiers');
    }
    if (filesCount === 1) {
      label = this.state.files[0];
      label = label.substring(label.lastIndexOf('\\') + 1);
    } else if (filesCount > 1) {
      label = T('{filesCount} fichiers selectionnés', null, {filesCount});
    }

    if (this.props.multiple) {
      return (
        <React.Fragment>
          <input
            id={this.id}
            type="file"
            onChange={this.handleFileChange}
            accept={this.props.accept}
            ref={this.props.inputRef}
            className={this.styles.classNames.inputfile}
            multiple
          />
          <label for={this.id} className={this.styles.classNames.label}>
            <Label text={label} glyph="solid/upload" />
          </label>
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <input
          id={this.id}
          type="file"
          onChange={this.handleFileChange}
          accept={this.props.accept}
          ref={this.props.inputRef}
          className={this.styles.classNames.inputfile}
        />
        <label for={this.id} className={this.styles.classNames.label}>
          <Label text={label} glyph="solid/upload" />
        </label>
      </React.Fragment>
    );
  }
}
