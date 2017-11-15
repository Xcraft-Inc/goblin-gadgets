import React from 'react';
import Widget from 'laboratory/widget';
import {
  date as DateConverters,
  time as TimeConverters,
  price as PriceConverters,
  weight as WeightConverters,
  volume as VolumeConverters,
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
        return WeightConverters.getDisplayed (canonicalValue);
      case 'volume':
        return VolumeConverters.getDisplayed (canonicalValue);
      default:
        throw new Error (`Invalid type ${this.props.type}`);
    }
  }

  parseEditedValue (displayedValue) {
    let parsed;
    switch (this.props.type) {
      case 'date':
        parsed = DateConverters.parseEdited (displayedValue);
        break;
      case 'time':
        parsed = TimeConverters.parseEdited (displayedValue, '12:00:00');
        break;
      case 'price':
        parsed = PriceConverters.parseEdited (displayedValue);
        break;
      case 'weight':
        parsed = WeightConverters.parseEdited (displayedValue);
        break;
      case 'volume':
        parsed = VolumeConverters.parseEdited (displayedValue);
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
          return this.parseEditedValue (val).canonicalValue;
        }}
        getDisplayValue={(model, view) => {
          if (model && view) {
            if (view === model) {
              return this.canonicalToDisplayed (view);
            }
          }
          return view ? view : '';
        }}
        getWarning={(model, view) => {
          return this.parseEditedValue (view).warning;
        }}
        getInfo={(model, view) => {
          const parsed = this.parseEditedValue (view);
          const canon = parsed.canonicalValue;
          if (canon !== model) {
            return parsed.displayedFinalValue;
          }
          return null;
        }}
        model={this.props.model}
        hintText={this.props.hintText}
        tooltip={this.props.tooltip}
        labelGlyph={this.props.labelGlyph}
        labelText={this.props.labelText}
        labelWidth={this.props.labelWidth}
        fieldWidth={this.props.fieldWidth}
        fieldJustify={this.props.type === 'price' ? 'right' : 'left'}
        grow={this.props.grow}
        spacing={this.props.spacing}
        readonly={this.props.readonly}
        disabled={this.props.disabled}
        selectAllOnFocus={this.props.selectAllOnFocus}
        defaultFocus={this.props.defaultFocus}
      />
    );
  }
}

/******************************************************************************/
export default TextFieldTyped;
