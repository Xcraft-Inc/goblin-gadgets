import React from 'react';
import Widget from 'laboratory/widget';
import {
  date as DateConverters,
  time as TimeConverters,
  price as PriceConverters,
  weight as WeightConverters,
  volume as VolumeConverters,
  number as NumberConverters,
  percent as PercentConverters,
  delay as DelayConverters,
} from 'xcraft-core-converters';

import LabelTextField from 'gadgets/label-text-field/widget';

/******************************************************************************/

class TextFieldTyped extends Widget {
  constructor () {
    super (...arguments);
  }

  canonicalToDisplayed (canonicalValue) {
    switch (this.props.type) {
      case 'date':
        return DateConverters.getDisplayed (canonicalValue);
      case 'time':
        return TimeConverters.getDisplayed (canonicalValue);
      case 'price':
        return PriceConverters.getDisplayed (canonicalValue);
      case 'weight':
        return WeightConverters.getDisplayed (canonicalValue, this.props.unit);
      case 'volume':
        return VolumeConverters.getDisplayed (canonicalValue, this.props.unit);
      case 'number':
        return NumberConverters.getDisplayed (canonicalValue);
      case 'percent':
        return PercentConverters.getDisplayed (canonicalValue);
      case 'delay':
        return DelayConverters.getDisplayed (canonicalValue, this.props.unit);
      default:
        throw new Error (`Invalid type ${this.props.type}`);
    }
  }

  parseEditedValue (displayedValue) {
    let parsed;
    switch (this.props.type) {
      case 'date':
        parsed = DateConverters.parseEdited (
          displayedValue,
          null,
          this.props.minDate,
          this.props.maxDate
        );
        break;
      case 'time':
        parsed = TimeConverters.parseEdited (
          displayedValue,
          '12:00:00',
          this.props.minTime,
          this.props.maxTime
        );
        break;
      case 'price':
        parsed = PriceConverters.parseEdited (displayedValue);
        break;
      case 'weight':
        parsed = WeightConverters.parseEdited (displayedValue, this.props.unit);
        break;
      case 'volume':
        parsed = VolumeConverters.parseEdited (displayedValue, this.props.unit);
        break;
      case 'number':
        parsed = NumberConverters.parseEdited (displayedValue);
        break;
      case 'percent':
        parsed = PercentConverters.parseEdited (displayedValue);
        break;
      case 'delay':
        parsed = DelayConverters.parseEdited (displayedValue, this.props.unit);
        break;
      default:
        throw new Error (`Invalid type ${this.type}`);
    }
    const finalValue = this.canonicalToDisplayed (parsed.value);
    return {
      canonicalValue: parsed.value,
      warning: parsed.error,
      displayedFinalValue: finalValue,
    };
  }

  render () {
    return (
      <LabelTextField
        updateOn="blur"
        beforeChange={val => {
          //const p = this.parseEditedValue (val);
          //console.log (
          //  `TextFieldTyped.beforeChange canonicalValue=${p.canonicalValue} warning=${p.warning} displayedFinalValue=${p.displayedFinalValue}`
          //);
          return this.parseEditedValue (val).canonicalValue;
        }}
        getDisplayValue={(value, onFocus, onBlur) => {
          //console.log (
          //  `TextFieldTyped.getDisplayValue value=${value} onFocus=${onFocus} onBlur=${onBlur}`
          //);
          if (onFocus) {
            // When field set the focus, value is canonical value.
            // Don't change the displayed value.
            return this.canonicalToDisplayed (value);
          } else if (onBlur) {
            // When field lost the focus, value is canonical value.
            // Set the formated value based on canonical value.
            return this.canonicalToDisplayed (value);
          } else {
            // When text is changing, value is editing text.
            // Use the edited value.
            return value || '';
          }
        }}
        getWarning={(value, onFocus, onBlur) => {
          //console.log (
          //  `TextFieldTyped.getWarning value=${value} onFocus=${onFocus} onBlur=${onBlur}`
          //);
          if (!onFocus && !onBlur) {
            return this.parseEditedValue (value).warning;
          } else {
            // When field lost the focus (blur), hide the flying-balloon.
            return null;
          }
        }}
        getInfo={(value, onFocus, onBlur) => {
          //console.log (
          //  `TextFieldTyped.getInfo value=${value} onFocus=${onFocus} onBlur=${onBlur}`
          //);
          if (!onFocus && !onBlur) {
            const parse = this.parseEditedValue (value);
            if (parse.displayedFinalValue === value) {
              return null;
            } else {
              return parse.displayedFinalValue;
            }
          } else {
            // When field lost the focus (blur), hide the flying-balloon.
            return null;
          }
        }}
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
            this.props.type === 'number' ||
            this.props.type === 'percent'
            ? 'right'
            : 'left'
        }
        grow={this.props.grow}
        spacing={this.props.spacing}
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
export default TextFieldTyped;
