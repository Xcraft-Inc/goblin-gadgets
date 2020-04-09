//T:2019-02-27

import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import {
  date as DateConverters,
  time as TimeConverters,
  datetime as DateTimeConverters,
  price as PriceConverters,
  weight as WeightConverters,
  length as LengthConverters,
  volume as VolumeConverters,
  number as NumberConverters,
  percent as PercentConverters,
  delay as DelayConverters,
} from 'xcraft-core-converters';

import LabelTextField from 'goblin-gadgets/widgets/label-text-field/widget';

/******************************************************************************/

export default class TextFieldTypedOld extends Widget {
  constructor() {
    super(...arguments);

    this.getDisplayValue = this.getDisplayValue.bind(this);
    this.getWarning = this.getWarning.bind(this);
    this.getInfo = this.getInfo.bind(this);
  }

  canonicalToDisplayed(canonicalValue) {
    switch (this.props.type) {
      case 'date':
        return DateConverters.getDisplayed(canonicalValue);
      case 'time':
        return TimeConverters.getDisplayed(canonicalValue);
      case 'datetime':
        return DateTimeConverters.getDisplayed(canonicalValue);
      case 'price':
        return PriceConverters.getDisplayed(canonicalValue);
      case 'weight':
        return WeightConverters.getDisplayed(canonicalValue, this.props.unit);
      case 'length':
        return LengthConverters.getDisplayed(canonicalValue, this.props.unit);
      case 'volume':
        return VolumeConverters.getDisplayed(canonicalValue, this.props.unit);
      case 'number':
        return NumberConverters.getDisplayed(
          canonicalValue,
          this.props.decimals
        );
      case 'percent':
        return PercentConverters.getDisplayed(
          canonicalValue,
          this.props.decimals
        );
      case 'delay':
        return DelayConverters.getDisplayed(canonicalValue, this.props.unit);
      default:
        throw new Error(`Invalid type ${this.props.type}`);
    }
  }

  parseEditedValue(displayedValue) {
    let parsed;
    switch (this.props.type) {
      case 'date':
        parsed = DateConverters.parseEdited(
          displayedValue,
          null,
          this.props.minDate,
          this.props.maxDate,
          this.props.mode
        );
        break;
      case 'time':
        parsed = TimeConverters.parseEdited(
          displayedValue,
          '12:00:00',
          this.props.minTime,
          this.props.maxTime,
          this.props.mode
        );
        break;
      case 'datetime':
        parsed = DateTimeConverters.parseEdited(
          displayedValue,
          null,
          this.props.defaultDate,
          this.props.defaultTime,
          this.props.minDate,
          this.props.minDate,
          this.props.maxDate,
          this.props.mode
        );
        break;
      case 'price':
        parsed = PriceConverters.parseEdited(displayedValue);
        break;
      case 'weight':
        parsed = WeightConverters.parseEdited(displayedValue, this.props.unit);
        break;
      case 'length':
        parsed = LengthConverters.parseEdited(displayedValue, this.props.unit);
        break;
      case 'volume':
        parsed = VolumeConverters.parseEdited(displayedValue, this.props.unit);
        break;
      case 'number':
        parsed = NumberConverters.parseEdited(displayedValue);
        break;
      case 'percent':
        parsed = PercentConverters.parseEdited(displayedValue);
        break;
      case 'delay':
        parsed = DelayConverters.parseEdited(displayedValue, this.props.unit);
        break;
      default:
        throw new Error(`Invalid type ${this.type}`);
    }
    const finalValue = this.canonicalToDisplayed(parsed.value);
    return {
      canonicalValue: parsed.value,
      warning: parsed.error,
      displayedFinalValue: finalValue,
    };
  }

  getDisplayValue(value, onFocus, onBlur) {
    if (onFocus) {
      // When field set the focus, value is canonical value.
      // Don't change the displayed value.
      return this.canonicalToDisplayed(value);
    } else if (onBlur) {
      // When field lost the focus, value is canonical value.
      // Set the formated value based on canonical value.
      return this.canonicalToDisplayed(value);
    } else {
      // When text is changing, value is editing text.
      // Use the edited value.
      return value || '';
    }
  }

  getWarning(value, onFocus, onBlur) {
    if (!onFocus && !onBlur) {
      return this.parseEditedValue(value).warning;
    } else {
      // When field lost the focus (blur), hide the flying-balloon.
      return null;
    }
  }

  getInfo(value, onFocus, onBlur) {
    if (!onFocus && !onBlur) {
      const parse = this.parseEditedValue(value);
      if (parse.displayedFinalValue === value) {
        return null;
      } else {
        return parse.displayedFinalValue;
      }
    } else {
      // When field lost the focus (blur), hide the flying-balloon.
      return null;
    }
  }

  render() {
    return (
      <LabelTextField
        updateOn="blur"
        beforeChange={(value) => {
          const cv = this.parseEditedValue(value).canonicalValue;
          if (this.props.beforeChange) {
            this.props.beforeChange(cv);
          }
          return cv;
        }}
        getDisplayValue={this.getDisplayValue}
        getGlyph={this.props.getGlyph}
        getWarning={this.getWarning}
        getInfo={this.getInfo}
        model={this.props.model}
        hintText={this.props.hintText}
        tooltip={this.props.tooltip}
        labelGlyph={this.props.labelGlyph}
        labelText={this.props.labelText}
        labelWidth={this.props.labelWidth}
        fieldWidth={this.props.fieldWidth}
        fieldJustify={
          this.props.type === 'price' ||
          this.props.type === 'weight' ||
          this.props.type === 'length' ||
          this.props.type === 'number' ||
          this.props.type === 'percent'
            ? 'right'
            : 'left'
        }
        grow={this.props.grow}
        horizontalSpacing={this.props.horizontalSpacing}
        readonly={this.props.readonly}
        disabled={this.props.disabled}
        required={this.props.required}
        selectAllOnFocus={this.props.selectAllOnFocus}
        defaultFocus={this.props.defaultFocus}
      />
    );
  }
}

/******************************************************************************/
