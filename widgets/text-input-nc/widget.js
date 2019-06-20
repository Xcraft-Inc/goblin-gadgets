//T:2019-02-27

import React from 'react';
import Widget from 'laboratory/widget';
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

class TextInputNC extends Widget {
  constructor() {
    super(...arguments);
    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onFocus = this.onFocus.bind(this);
  }

  onChange(e) {
    if (this.props.onChange) {
      this.props.onChange(e.target.value);
    }
  }

  onFocus(e) {
    if (this.props.onFocus) {
      this.props.onFocus(e.target.value);
    }
  }

  onBlur(e) {
    if (this.props.onBlur) {
      this.props.onBlur(e.target.value);
    }
  }

  /******************************************************************************/

  renderFocusForeground() {
    if (Bool.isTrue(this.props.embeddedFocus)) {
      return null;
    } else {
      return <div className={`toto ${this.styles.classNames.focus}`} />;
    }
  }

  renderInput() {
    const type = this.props.rows ? 'textarea' : 'text';

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
            value={this.props.value}
            defaultValue={this.props.defaultValue}
            rows={this.props.rows}
            disabled={
              Bool.isTrue(this.props.disabled) ||
              Bool.isTrue(this.props.readonly)
            }
            onChange={this.onChange}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
          />
        ) : (
          <TranslatableInput
            msgid={this.props.hintText}
            workitemId={this.context.desktopId || this.getNearestId()}
            className={`${this.styles.classNames.field} mousetrap ${this.styles.classNames.input}`}
            type="text"
            value={this.props.value}
            defaultValue={this.props.defaultValue}
            disabled={
              Bool.isTrue(this.props.disabled) ||
              Bool.isTrue(this.props.readonly)
            }
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

/******************************************************************************/
export default TextInputNC;
