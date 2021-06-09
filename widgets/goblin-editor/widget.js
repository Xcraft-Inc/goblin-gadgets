import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import prettier from 'prettier';

class GoblinEditor extends Widget {
  constructor() {
    super(...arguments);
    this.assign = this.assign.bind(this);
    this.init = this.init.bind(this);
    this.format = this.format.bind(this);
    this.editorElement = undefined;
  }

  format() {
    let src = this.model.getValue();
    try {
      src = prettier.format(src, {parser: 'babel'});
      this.model.setValue(src);
    } catch (err) {
      console.error(err.stack);
      this.editor.deltaDecorations(
        [],
        [
          {
            range: new monaco.Range(3, 1, 3, 1),
            options: {
              isWholeLine: true,
              className: 'prettierError',
              glyphMarginClassName: 'prettierError',
            },
          },
        ]
      );
    }
  }

  setSource(src) {
    this.model.setValue(src);
    this.format();
  }

  assign(component) {
    this.editorElement = component;
  }

  componentDidMount() {
    this.init();
  }

  componentWillUnmount() {
    this.destroy();
  }

  destroy() {
    if (this.editor) {
      this.editor.dispose();
      const model = this.editor.getModel();
      if (model) {
        model.dispose();
      }
    }
    this._subscription && this._subscription.dispose();
  }

  init() {
    const templateSrc = this.props.source;

    const model = monaco.editor.createModel(templateSrc, 'javascript');
    this.model = model;
    this._subscription = model.onDidChangeContent(() => {
      if (this.props.onUpdate) {
        const src = model.getValue();
        this.props.onUpdate(src);
      }
    });

    this.editor = monaco.editor.create(this.editorElement, {
      language: 'javascript',
      lineNumbers: 'on',
      scrollbar: {
        vertical: 'auto',
        horizontal: 'auto',
      },
      theme: 'vs',
      automaticLayout: true,
    });

    this.editor.setModel(model);
    if (this.props.onUpdate) {
      this.props.onUpdate(templateSrc);
    }
    monaco.editor.setTheme('vs');
    this.format();
  }

  render() {
    return (
      <div
        id="editor"
        style={{width: '100%', height: '100%'}}
        ref={this.assign}
      />
    );
  }
}
export default GoblinEditor;
