//T:2019-02-27

import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import MouseTrap from 'mousetrap';
import Props from './props';
import {
  TranslatableDiv,
  TranslatableTextarea,
  TranslatableInput,
} from 'goblin-nabu/widgets/helpers/element-helpers';
import {
  makePropTypes,
  makeDefaultProps,
} from 'xcraft-core-utils/lib/prop-types';
import Label from 'goblin-gadgets/widgets/label/widget';
import T from 'nabu/t/widget';
import * as styles from './styles';

/******************************************************************************/

export default class TextInputNC extends Widget {
  constructor() {
    super(...arguments);
    this.styles = styles;

    this.onChange = this.onChange.bind(this);
    this.onChangeAndSelect = this.onChangeAndSelect.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.setInput = this.setInput.bind(this);
    this.validate = this.validate.bind(this);
  }

  /*****************************************************************************/

  componentDidMount() {
    super.componentDidMount();
    if (this.props.autoFocus && this.input) {
      this.input.focus();
      if (this.props.selectAllOnFocus) {
        this.input.select();
      }
    }
    if (this.input) {
      MouseTrap(this.input).bind('return', this.validate);
    }
  }

  componentWillUnmount() {
    super.componentWillUnmount();
    if (this.input) {
      MouseTrap(this.input).unbind('return');
    }
  }

  /*****************************************************************************/

  onChange(e) {
    if (this.props.onChange) {
      this.props.onChange(e.target.value);
    }
  }

  onChangeAndSelect(value, selectionStart, selectionEnd) {
    this.props.onChange(value, () => {
      // After state changed.
      this.input.setSelectionRange(selectionStart, selectionEnd);
    });
  }

  onFocus(e) {
    if (this.props.onFocus) {
      this.props.onFocus(e.target.value);
    }
    if (this.props.selectAllOnFocus) {
      if (this.input) {
        this.input.select();
      }
    }
  }

  onBlur(e) {
    if (this.props.onBlur) {
      this.props.onBlur(e.target.value);
    }
  }

  onKeyDown(e) {
    const f = this.props.onKeyDown;
    if (f) {
      f(e, this.onChangeAndSelect);
    }
  }

  validate() {
    if (this.props.onValidate) {
      this.props.onValidate(this.props.value);
    }
  }

  /*****************************************************************************/

  setInput(node) {
    this.input = node;
  }

  renderFocusForeground() {
    if (this.props.embeddedFocus && this.context.theme.look.name !== 'retro') {
      return null;
    } else {
      return (
        <div className={`foreground-focus ${this.styles.classNames.focus}`} />
      );
    }
  }

  renderInputReadonly(value) {
    return <T msgid={value} className={this.styles.classNames.readonly} />;
  }

  renderInputMultiline(value) {
    return (
      <TranslatableTextarea
        msgid={this.props.hintText}
        workitemId={this.context.desktopId || this.getNearestId()}
        className={`${this.styles.classNames.textarea} mousetrap ${this.styles.classNames.input}`}
        value={value}
        defaultValue={this.props.defaultValue}
        rows={this.props.rows}
        disabled={this.props.disabled || this.props.readonly}
        onRef={this.setInput}
        onChange={this.onChange}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
      />
    );
  }

  renderInputSingleline(value, type) {
    return (
      <TranslatableInput
        placeholder={this.props.hintText}
        workitemId={this.context.desktopId || this.getNearestId()}
        className={`${this.styles.classNames.field} mousetrap ${this.styles.classNames.input}`}
        type={type || 'text'}
        value={value}
        defaultValue={this.props.defaultValue}
        disabled={this.props.disabled || this.props.readonly}
        inputRef={this.setInput}
        onChange={this.onChange}
        onKeyDown={this.onKeyDown}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
      />
    );
  }

  renderInputEditable(value, type) {
    if (this.props.readonly) {
      return this.renderInputReadonly(value);
    } else if (type === 'textarea') {
      return this.renderInputMultiline(value);
    } else {
      return this.renderInputSingleline(value, type);
    }
  }

  renderInput() {
    let type = this.props.inputType;
    if (!type && this.props.rows) {
      type = 'textarea';
    }

    let value = this.props.value;
    if (value === null || value === undefined) {
      value = '';
    }
    switch (typeof value) {
      case 'number':
        console.warn(`TextInputNC: Invalid value of type 'number' (${value})`);
        value = value + ''; // convert to string
        break;
      case 'object':
        if (!this.props.readonly) {
          console.warn('TextInputNC: Invalid value (object or Shredder)!');
        }
        break;
      case 'function':
        console.warn('TextInputNC: Invalid value (function)!');
        value = 'FUNCTION!';
        break;
    }

    return (
      <TranslatableDiv
        title={this.props.tooltip}
        workitemId={this.context.desktopId || this.getNearestId()}
        className={this.styles.classNames.textInputNC}
      >
        {this.props.glyph ? (
          <Label
            kind="text-field-combo-glyph"
            glyph={this.props.glyph.glyph}
            glyphColor={this.props.glyph.color}
          />
        ) : null}
        {this.renderInputEditable(value, type)}
        {this.renderFocusForeground()}
        {this.props.children}
      </TranslatableDiv>
    );
  }

  render() {
    if (this.props.show === false) {
      return null;
    }
    return this.renderInput();
  }
}

/******************************************************************************/

TextInputNC.propTypes = makePropTypes(Props);
TextInputNC.defaultProps = makeDefaultProps(Props);
