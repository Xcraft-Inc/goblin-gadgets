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

  getDisplayValue (model, view) {}

  // Return the top line of FlyingBalloon, displayed in bold.
  // Contains the optional error message.
  getMessageWarning () {
    return this.props.warning;
  }

  // Return the bottom line of FlyingBalloon.
  // Contains the final value.
  getMessageInfo () {
    if (this.props.message !== this.props.value) {
      return this.props.message;
    } else {
      return null;
    }
  }

  render () {
    return (
      <LabelTextField
        updateOn="blur"
        beforeChange={val => {
          return this.parseEditedValue (val).canonicalValue;
        }}
        errors={{warning: val => this.parseEditedValue (val).warning}}
        getDisplayValue={(model, view) => {
          if (model && view) {
            if (view === model) {
              return this.canonicalToDisplayed (view);
            }
          }
          return view ? view : '';
        }}
        model={this.props.model}
        hintText={this.props.hintText}
        tooltip={this.props.tooltip}
        labelGlyph={this.props.labelGlyph}
        labelText={this.props.labelText}
        labelWidth={this.props.labelWidth}
        grow={this.props.grow}
        spacing={this.props.spacing}
        readonly={this.props.readonly}
        selectAllOnFocus={this.props.selectAllOnFocus}
        defaultFocus={this.props.defaultFocus}
        messageWarning={this.getMessageWarning ()}
        messageInfo={this.getMessageInfo ()}
      />
    );
  }
}

/******************************************************************************/
export default TextFieldTyped;
