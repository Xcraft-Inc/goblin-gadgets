import React from 'react';
import Widget from 'laboratory/widget';
import * as Converters from '../helpers/converters';

import LabelTextField from 'gadgets/label-text-field/widget';

/******************************************************************************/

class TextFieldTyped extends Widget {
  constructor (props) {
    super (props);
    this.internalStore = Store.create (); // FIXME
    this.localBus = this; // for access to property notify

    this.type = this.read ('type');
    const canonicalValue = this.read ('value');
    const displayedValue = this.canonicalToDisplayed (canonicalValue);
    this.internalStore.select ('value').set ('value', displayedValue);
  }

  canonicalToDisplayed (canonicalValue) {
    switch (this.type) {
      case 'date':
        return Converters.getDisplayedDate (canonicalValue);
      case 'time':
        return Converters.getDisplayedTime (canonicalValue);
      default:
        throw new Error (`Invalid type ${this.type}`);
    }
  }

  parseEditedValue (displayedValue) {
    let parsed;
    switch (this.type) {
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

  linkValueEdited () {
    // FIXME
    return {
      ...this.link (),
      state: this.internalStore.select ('value'),
      bus: this.localBus,
    };
  }

  // Return the top line of FlyingBalloon, displayed in bold.
  // Contains the optional error message.
  getMessageWarning () {
    return this.internalStore.select ('value').get ('warning');
  }

  // Return the bottom line of FlyingBalloon.
  // Contains the final value.
  getMessageInfo () {
    const displayedValue = this.internalStore.select ('value').get ('value');
    const message = this.internalStore.select ('value').get ('info');
    if (message !== displayedValue) {
      return message;
    } else {
      return null;
    }
  }

  // LocalBus.notify
  notify (props, source, value) {
    if (source.type === 'change') {
      const parsed = this.parseEditedValue (value);
      this.internalStore
        .select ('value')
        .set (
          'value',
          value,
          'info',
          parsed.displayedFinalValue,
          'warning',
          parsed.warning
        );

      if (parsed.canonicalValue !== this.read ('value')) {
        this.props.bus.notify (this.props, source, parsed.canonicalValue);
      }

      this.forceUpdate (); // to update message-info
    } else if (source.type === 'defocus') {
      // When defocus, complete the edited value and hide the FlyingBalloon (which
      // contains the message). By example, '12' is replaced by '12.05.2017'.
      const displayedValue = this.internalStore.select ('value').get ('value');
      const parsed = this.parseEditedValue (displayedValue);
      this.internalStore.select ('value').set (
        'value',
        parsed.displayedFinalValue, // no 'info' -> hide FlyingBalloon
        'info',
        null,
        'warning',
        null
      );
      this.forceUpdate (); // to update message-info
    }
  }

  widget () {
    return props => {
      const hintText = this.read ('hint-text');
      const tooltip = this.read ('tooltip');
      const labelGlyph = this.read ('label-glyph');
      const labelText = this.read ('label-text');
      const labelWidth = this.read ('label-width');
      const grow = this.read ('grow');
      const spacing = this.read ('spacing');
      const readonly = this.read ('readonly');
      const selectAllOnFocus = this.read ('select-all-on-focus');
      const defaultFocus = this.read ('default-focus');

      return  (
        <LabelTextField
          hint-text={hintText}
          tooltip={tooltip}
          label-glyph={labelGlyph}
          label-text={labelText}
          label-width={labelWidth}
          grow={grow}
          spacing={spacing}
          readonly={readonly}
          select-all-on-focus={selectAllOnFocus}
          default-focus={defaultFocus}
          message-warning={this.getMessageWarning ()}
          message-info={this.getMessageInfo ()}
          {...this.linkValueEdited ()}
        />
      );
    };
  }
}

/******************************************************************************/
