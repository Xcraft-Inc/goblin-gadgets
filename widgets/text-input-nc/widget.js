//T:2019-02-27

import React from 'react';
import Widget from 'laboratory/widget';
import MouseTrap from 'mousetrap';
import * as Bool from 'gadgets/helpers/bool-helpers';
import Props from './props';
import {
  TranslatableDiv,
  TranslatableTextarea,
  TranslatableInput,
} from 'nabu/helpers/element-helpers';
import {
  makePropTypes,
  makeDefaultProps,
} from 'xcraft-core-utils/lib/prop-types';
import Label from 'gadgets/label/widget';

/******************************************************************************/

export default class TextInputNC extends Widget {
  constructor() {
    super(...arguments);
    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.setInput = this.setInput.bind(this);
    this.validate = this.validate.bind(this);
  }

  /*****************************************************************************/

  componentDidMount() {
    super.componentDidMount();
    if (Bool.isTrue(this.props.autoFocus) && this.input) {
      this.input.focus();
      if (Bool.isTrue(this.props.selectAllOnFocus)) {
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

  onFocus(e) {
    if (this.props.onFocus) {
      this.props.onFocus(e.target.value);
    }
    if (Bool.isTrue(this.props.selectAllOnFocus)) {
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
    if (Bool.isTrue(this.props.embeddedFocus)) {
      return null;
    } else {
      return <div className={`toto ${this.styles.classNames.focus}`} />;
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
        console.warn('TextInputNC: Invalid value (object or Shredder)!');
        value = 'OBJECT!';
        break;
      case 'function':
        console.warn('TextInputNC: Invalid value (function)!');
        value = 'FUNCTION!';
        break;
    }

    return (
      <TranslatableDiv
        msgid={this.props.tooltip}
        workitemId={this.context.desktopId || this.getNearestId()}
        className={this.styles.classNames.box}
      >
        {this.props.glyph ? (
          <Label
            kind="text-field-combo-glyph"
            glyph={this.props.glyph.glyph}
            glyphColor={this.props.glyph.color}
          />
        ) : null}
        {type === 'textarea' ? (
          <TranslatableTextarea
            msgid={this.props.hintText}
            workitemId={this.context.desktopId || this.getNearestId()}
            className={`${this.styles.classNames.textarea} mousetrap ${this.styles.classNames.input}`}
            value={value}
            defaultValue={this.props.defaultValue}
            rows={this.props.rows}
            disabled={
              Bool.isTrue(this.props.disabled) ||
              Bool.isTrue(this.props.readonly)
            }
            onRef={this.setInput}
            onChange={this.onChange}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
          />
        ) : (
          <TranslatableInput
            msgid={this.props.hintText}
            workitemId={this.context.desktopId || this.getNearestId()}
            className={`${this.styles.classNames.field} mousetrap ${this.styles.classNames.input}`}
            type={type || 'text'}
            value={value}
            defaultValue={this.props.defaultValue}
            disabled={
              Bool.isTrue(this.props.disabled) ||
              Bool.isTrue(this.props.readonly)
            }
            onRef={this.setInput}
            onChange={this.onChange}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
          />
        )}
        {this.renderFocusForeground()}
        {this.props.children}
      </TranslatableDiv>
    );
  }

  render() {
    if (Bool.isFalse(this.props.show)) {
      return null;
    }
    return this.renderInput();
  }
}

/******************************************************************************/

TextInputNC.propTypes = makePropTypes(Props);
TextInputNC.defaultProps = makeDefaultProps(Props);
