import React from 'react';
import Widget from 'laboratory/widget';
import * as Converters from '../helpers/converters';

import LabelTextField from 'gadgets/label-text-field/widget';

/******************************************************************************/

class TextFieldTyped extends Widget {
  constructor (props) {
    super (props);
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
    const displayedValue = this.props.value;
    const message = this.props.message;
    if (message !== displayedValue) {
      return message;
    } else {
      return null;
    }
  }

  render () {
    const hintText = this.props.hintText;
    const tooltip = this.props.tooltip;
    const labelGlyph = this.props.labelGlyph;
    const labelText = this.props.labelText;
    const labelWidth = this.props.labelWidth;
    const grow = this.props.grow;
    const spacing = this.props.spacing;
    const readonly = this.props.readonly;
    const selectAllOnFocus = this.props.selectAllOnFocus;
    const defaultFocus = this.props.defaultFocus;

    return (
      <LabelTextField
        updateOn="blur"
        beforeChange={val => {
          return this.parseEditedValue (val).canonicalValue;
        }}
        errors={{warning: val => this.parseEditedValue (val).warning}}
        getDisplayValue={(model, view, state) => {
          console.log (`${this.props.model}: ${model} / ${view}`);
          console.dir (state);
          if (model && view) {
            if (view === model) {
              return this.canonicalToDisplayed (view);
            }
          }
          return view ? view : '';
        }}
        model={this.props.model}
        hintText={hintText}
        tooltip={tooltip}
        labelGlyph={labelGlyph}
        labelText={labelText}
        labelWidth={labelWidth}
        grow={grow}
        spacing={spacing}
        readonly={readonly}
        selectAllOnFocus={selectAllOnFocus}
        defaultFocus={defaultFocus}
        messageWarning={this.getMessageWarning ()}
        messageInfo={this.getMessageInfo ()}
      />
    );
  }
}

/******************************************************************************/
export default TextFieldTyped;
