import React from 'react';
import Widget from 'laboratory/widget';
import * as Bool from 'gadgets/boolean-helpers';
import {time as TimeConverters} from 'xcraft-core-converters';

import TextFieldTyped from 'gadgets/text-field-typed/widget';
import Button from 'gadgets/button/widget';

/******************************************************************************/

class TextFieldTimeInterval extends Widget {
  constructor() {
    super(...arguments);

    this.onNowClicked = this.onNowClicked.bind(this);
  }

  onNowClicked() {
    const now = TimeConverters.getNowCanonical();
  }

  /******************************************************************************/

  renderStartTextField() {
    return (
      <TextFieldTyped
        fieldWidth="70px"
        spacing="overlap"
        type="time"
        labelText={this.props.labelText}
        labelGlyph={this.props.labelGlyph}
        labelWidth={this.props.labelWidth}
        hintText={this.props.startHintText || 'Début'}
        tooltip={this.props.startTooltip || 'Heure de début'}
        selectAllOnFocus={this.props.selectAllOnFocus}
        readonly={this.props.readonly}
        disabled={this.props.disabled}
        required={this.props.required}
        model={this.props.startModel}
      />
    );
  }

  renderEndTextField() {
    return (
      <TextFieldTyped
        fieldWidth="70px"
        spacing={
          Bool.isTrue(this.props.hasNowButton) ? 'overlap' : this.props.spacing
        }
        type="time"
        labelWidth="0px"
        hintText={this.props.endHintText || 'Fin'}
        tooltip={this.props.endTooltip || 'Heure de fin'}
        selectAllOnFocus={this.props.selectAllOnFocus}
        readonly={this.props.readonly}
        disabled={this.props.disabled}
        required={this.props.required}
        model={this.props.endModel}
      />
    );
  }

  renderNowButton() {
    if (Bool.isTrue(this.props.hasNowButton)) {
      return (
        <Button
          shape="right-rounded"
          glyph="solid/arrow-alt-circle-left"
          disabled={Bool.isTrue(this.props.disabled || this.props.readonly)}
          spacing={this.props.spacing}
          tooltip="Maintenant"
          onClick={this.onNowClicked}
        />
      );
    } else {
      return null;
    }
  }

  render() {
    if (Bool.isFalse(this.props.show)) {
      return null;
    }

    const boxClass = this.styles.classNames.box;

    return (
      <span disabled={this.props.disabled} className={boxClass}>
        {this.renderStartTextField()}
        {this.renderEndTextField()}
        {this.renderNowButton()}
      </span>
    );
  }
}

/******************************************************************************/
export default TextFieldTimeInterval;
