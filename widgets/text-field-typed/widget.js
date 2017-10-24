import React from 'react';
import Widget from 'laboratory/widget';
import * as Converters from '../helpers/converters';

import LabelTextField from 'gadgets/label-text-field/widget';

/******************************************************************************/

class TextFieldTyped extends Widget {
  constructor () {
    super (...arguments);
  }

  canonicalToDisplayed (canonicalValue) {
    switch (this.props.type) {
      case 'date':
        return Converters.getDisplayedDate (canonicalValue);
      case 'time':
        return Converters.getDisplayedTime (canonicalValue);
      default:
        throw new Error (`Invalid type ${this.props.type}`);
    }
  }

  parseEditedValue (displayedValue) {
    let parsed;
    switch (this.props.type) {
      case 'date':
        parsed = Converters.parseEditedDate (displayedValue);
        break;
      case 'time':
        parsed = Converters.parseEditedTime (displayedValue, '12:00:00');
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
