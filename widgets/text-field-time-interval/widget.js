//T:2019-02-27
import T from 't';
import React from 'react';
import Widget from 'laboratory/widget';
import * as Bool from 'gadgets/helpers/bool-helpers';
import {time as TimeConverters} from 'xcraft-core-converters';
import TextFieldTyped from 'gadgets/text-field-typed/widget';
import Button from 'gadgets/button/widget';

/******************************************************************************/

class TextFieldTimeInterval extends Widget {
  constructor() {
    super(...arguments);

    this.onNowClicked = this.onNowClicked.bind(this);
    this.endBeforeChange = this.endBeforeChange.bind(this);
    this.startBeforeChange = this.startBeforeChange.bind(this);
  }

  onNowClicked() {
    const now = TimeConverters.getNowCanonical();
    this.setModelValue(this.props.startModel, now, true);
    this.setModelValue(this.props.endModel, now, true);
  }

  endBeforeChange(value) {
    if (
      !this.props.endValue ||
      this.props.endValue === '' ||
      value > this.props.endValue
    ) {
      this.setModelValue(this.props.endModel, value, true);
    }
  }

  startBeforeChange(value) {
    if (
      !this.props.startValue ||
      this.props.startValue === '' ||
      value < this.props.startValue
    ) {
      this.setModelValue(this.props.startModel, value, true);
    }
  }

  /******************************************************************************/

  renderStartTextField() {
    return (
      <TextFieldTyped
        fieldWidth="70px"
        horizontalSpacing="overlap"
        type="time"
        labelText={this.props.labelText}
        labelGlyph={this.props.labelGlyph}
        labelWidth={this.props.labelWidth}
        hintText={this.props.startHintText || T('Début', 'heure de début')}
        tooltip={this.props.startTooltip || T('Heure de début')}
        selectAllOnFocus={this.props.selectAllOnFocus}
        readonly={this.props.readonly}
        disabled={this.props.disabled}
        required={this.props.required}
        model={this.props.startModel}
        entityId={this.props.entityId}
        beforeChange={this.endBeforeChange}
      />
    );
  }

  renderEndTextField() {
    return (
      <TextFieldTyped
        fieldWidth="70px"
        horizontalSpacing={
          Bool.isTrue(this.props.hasNowButton)
            ? 'overlap'
            : this.props.horizontalSpacing
        }
        type="time"
        labelWidth="0px"
        hintText={this.props.endHintText || T('Fin', 'heure de fin')}
        tooltip={this.props.endTooltip || T('Heure de fin')}
        selectAllOnFocus={this.props.selectAllOnFocus}
        readonly={this.props.readonly}
        disabled={this.props.disabled}
        required={this.props.required}
        model={this.props.endModel}
        entityId={this.props.entityId}
        beforeChange={this.startBeforeChange}
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
          horizontalSpacing={this.props.horizontalSpacing}
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
