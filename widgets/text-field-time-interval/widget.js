//T:2019-02-27
<<<<<<< HEAD
import T from 't';
=======
>>>>>>> 086b89ad22349babe9eb2ff88498386ed2ef2bb7
import React from 'react';
import Widget from 'laboratory/widget';
import T from 't';
const Bool = require('gadgets/helpers/bool-helpers');
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
    this.setModelValue(this.props.startModel, now, true);
    this.setModelValue(this.props.endModel, now, true);
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
<<<<<<< HEAD
        hintText={this.props.startHintText || T('Début', 'heure de début')}
=======
        hintText={this.props.startHintText || T('Début')}
>>>>>>> 086b89ad22349babe9eb2ff88498386ed2ef2bb7
        tooltip={this.props.startTooltip || T('Heure de début')}
        selectAllOnFocus={this.props.selectAllOnFocus}
        readonly={this.props.readonly}
        disabled={this.props.disabled}
        required={this.props.required}
        model={this.props.startModel}
        entityId={this.props.entityId}
        beforeChange={value => {
          if (
            !this.props.endValue ||
            this.props.endValue === '' ||
            value > this.props.endValue
          ) {
            this.setModelValue(this.props.endModel, value, true);
          }
        }}
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
<<<<<<< HEAD
        hintText={this.props.endHintText || T('Fin', 'heure de fin')}
=======
        hintText={this.props.endHintText || T('Fin')}
>>>>>>> 086b89ad22349babe9eb2ff88498386ed2ef2bb7
        tooltip={this.props.endTooltip || T('Heure de fin')}
        selectAllOnFocus={this.props.selectAllOnFocus}
        readonly={this.props.readonly}
        disabled={this.props.disabled}
        required={this.props.required}
        model={this.props.endModel}
        entityId={this.props.entityId}
        beforeChange={value => {
          if (
            !this.props.startValue ||
            this.props.startValue === '' ||
            value < this.props.startValue
          ) {
            this.setModelValue(this.props.startModel, value, true);
          }
        }}
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
          tooltip={T('Maintenant')}
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
