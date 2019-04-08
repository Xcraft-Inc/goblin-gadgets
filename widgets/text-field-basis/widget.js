//T:2019-02-27

import React from 'react';
import Widget from 'laboratory/widget';
import * as Bool from 'gadgets/helpers/bool-helpers';
import {
  TranslatableDiv,
  TranslatableTextarea,
  TranslatableInput,
} from 'nabu/helpers/element-helpers';

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
      <TranslatableDiv
        msgid={this.props.tooltip}
        workitemId={this.context.desktopId || this.getNearestId()}
        className={boxClass}
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
            className={`${fieldClass} ${inputClass}`}
            value={this.props.value || ''}
            onChange={this.onChange}
          />
        ) : (
          <TranslatableInput
            msgid={this.props.hintText}
            workitemId={this.context.desktopId || this.getNearestId()}
            className={`${fieldClass} ${inputClass}`}
            type="text"
            value={this.props.value || ''}
            onChange={this.onChange}
          />
        )}
        {this.renderFocusForeground()}
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
