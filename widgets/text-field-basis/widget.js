import React from 'react';
import Widget from 'laboratory/widget';
const Bool = require('gadgets/helpers/bool-helpers');
const Tooltip = require('gadgets/helpers/tooltip-helpers');

import Label from 'gadgets/label/widget';

/******************************************************************************/

export default class TextFieldBasis extends Widget {
  constructor() {
    super(...arguments);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    if (this.props.onChange) {
      this.props.onChange(e.target.value);
    }
  }

  renderFocusForeground() {
    if (Bool.isTrue(this.props.embeddedFocus)) {
      return null;
    } else {
      const focusClass = this.styles.classNames.focus;
      return <div className={`toto ${focusClass}`} />;
    }
  }

  renderInput() {
    const boxClass = Bool.isTrue(this.props.required)
      ? this.styles.classNames.boxRequired
      : this.styles.classNames.box;

    const type = this.props.rows ? 'textarea' : 'text';
    const fieldClass =
      type === 'textarea'
        ? this.styles.classNames.textarea + ' mousetrap'
        : this.styles.classNames.field + ' mousetrap';

    const inputClass = this.styles.classNames.input;

    return (
      <div className={boxClass} title={Tooltip.prepare(this.props.tooltip)}>
        {this.props.glyph ? (
          <Label
            kind="text-field-combo-glyph"
            glyph={this.props.glyph.glyph}
            glyphColor={this.props.glyph.color}
          />
        ) : null}
        {type === 'textarea' ? (
          <textarea
            className={`${fieldClass} ${inputClass}`}
            placeholder={this.props.hintText}
            value={this.props.value || ''}
            onChange={this.onChange}
          />
        ) : (
          <input
            className={`${fieldClass} ${inputClass}`}
            type="text"
            placeholder={this.props.hintText}
            value={this.props.value || ''}
            onChange={this.onChange}
          />
        )}
        {this.renderFocusForeground()}
      </div>
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
