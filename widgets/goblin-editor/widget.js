import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import prettier from 'prettier/standalone';
import babelParser from 'prettier/parser-babel';

class GoblinEditor extends Widget {
  constructor() {
    super(...arguments);
    this.assign = this.assign.bind(this);
    this.init = this.init.bind(this);
    this.format = this.format.bind(this);
    this.setSource = this.setSource.bind(this);
    this.editorElement = undefined;
    this.tempSrc = null;
    this.initDone = false;
  }

  format() {
    let src = this.model.getValue();
    try {
      src = prettier.format(src, {parser: 'babel', plugins: [babelParser]});
      this.model.setValue(src);
    } catch (err) {
      console.error(err.stack);
      this.editor.deltaDecorations(
        [],
        [
          {
            range: new this.monaco.Range(3, 1, 3, 1),
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
    if (!this.initDone) {
      this.tempSrc = src;
      return;
    }
    this.model.setValue(src);
    this.format();
  }

  assign(component) {
    this.editorElement = component;
  }

  componentWillMount() {
    import('monaco-editor/esm/vs/editor/editor.api').then((mod) => {
      this.monaco = mod;
      this.init();
      if (this.tempSrc !== null) {
        this.setSource(this.tempSrc);
      }
    });
  }

  componentWillUnmount() {
    this.destroy();
  }

  destroy() {
    this._subscription && this._subscription.dispose();
    if (this.editor) {
      const model = this.editor.getModel();
      if (model) {
        model.dispose();
      }
      this.editor.dispose();
    }
    this.editorElement = undefined;
    this.tempSrc = null;
    this.initDone = false;
  }

  init() {
    const templateSrc = this.props.source;

    const model = this.monaco.editor.createModel(templateSrc, 'javascript');
    this.model = model;
    this._subscription = model.onDidChangeContent(() => {
      if (this.props.onUpdate) {
        const src = model.getValue();
        this.props.onUpdate(src);
      }
    });

    this.editor = this.monaco.editor.create(this.editorElement, {
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
    this.monaco.editor.setTheme('vs');
    this.format();
    this.initDone = true;
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
