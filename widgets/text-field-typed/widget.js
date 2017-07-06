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
    const labelGlyph = this.props['label-glyph'];
    const labelText = this.props.labelText;
    const labelWidth = this.props.labelWidth;
    const grow = this.props.grow;
    const spacing = this.props.spacing;
    const readonly = this.props.readonly;
    const selectAllOnFocus = this.props['select-all-on-focus'];
    const defaultFocus = this.props['default-focus'];

    return (
      <LabelTextField
        updateOn="blur"
        beforeChange={val => this.parseEditedValue (val).canonicalValue}
        errors={{warning: val => this.parseEditedValue (val).warning}}
        model={this.props.model}
        hintText={hintText}
        tooltip={tooltip}
        label-glyph={labelGlyph}
        labelText={labelText}
        labelWidth={labelWidth}
        grow={grow}
        spacing={spacing}
        readonly={readonly}
        select-all-on-focus={selectAllOnFocus}
        default-focus={defaultFocus}
        message-warning={this.getMessageWarning ()}
        message-info={this.getMessageInfo ()}
      />
    );
  }
}

/******************************************************************************/
export default TextFieldTyped;
