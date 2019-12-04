import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import T from 't';
import Label from '../label/widget';

let count = 0;
export default class FileInputNC extends Widget {
  constructor() {
    super(...arguments);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.id = 'FileInput-' + count;
    count++;
  }

  handleFileChange(ev) {
    ev.persist();
    const fileList = ev.target.files;
    const files = [];
    if (fileList.length === 0) {
      return;
    }
    for (let i = 0; i < fileList.length; i++) {
      files.push(fileList[i].path);
    }
    if (!this.props.multiple) {
      if (this.props.onChange) {
        this.props.onChange(files[0]);
      }
    } else {
      if (this.props.onChange) {
        this.props.onChange(files);
      }
    }
  }

  render() {
    let label = T('Choix du fichier');
    if (this.props.multiple) {
      label = T('Choix des fichiers');
      if (this.props.value && this.props.value.size > 0) {
        const filesCount = this.props.value.size;
        label = T('{filesCount} fichier(s) selectionné(s)', null, {filesCount});
      }
    } else {
      if (this.props.value) {
        label = this.props.value;
        label = label.substring(label.lastIndexOf('\\') + 1);
      }
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
          <label htmlFor={this.id} className={this.styles.classNames.label}>
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
        <label htmlFor={this.id} className={this.styles.classNames.label}>
          <Label text={label} glyph="solid/upload" />
        </label>
      </React.Fragment>
    );
  }
}
