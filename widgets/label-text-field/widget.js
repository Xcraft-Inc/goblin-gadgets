import React from 'react';
import Widget from 'laboratory/widget';
import * as Bool from 'gadgets/boolean-helpers';

import Button from 'gadgets/button/widget';
import Label from 'gadgets/label/widget';
import TextField from 'gadgets/text-field/widget';

/******************************************************************************/

class LabelTextField extends Widget {
  constructor () {
    super (...arguments);

    this.state = {
      readonly: true,
    };

    this.comboLocation = null;

    this.onFocus = this.onFocus.bind (this);
    this.onBlur = this.onBlur.bind (this);
    this.onActionClicked = this.onActionClicked.bind (this);
  }

  get readonly () {
    return this.state.readonly;
  }

  set readonly (value) {
    this.setState ({
      readonly: value,
    });
  }

  onFocus () {
    this.readonly = false;
    const x = this.props.onFocus;
    if (x) {
      x ();
    }
  }

  onBlur () {
    this.readonly = true;
    const x = this.props.onBlur;
    if (x) {
      x ();
    }
  }

  onActionClicked (e) {
    this.onClick (e);
  }

  hasActionButton () {
    const actionGlyph = this.props.actionGlyph;
    if (actionGlyph) {
      return true;
    } else {
      return false;
    }
  }

  renderLabel () {
    return (
      <Label
        kind="label-text-field"
        glyph={this.props.labelGlyph}
        text={this.props.labelText}
        width={this.props.labelWidth}
        disabled={this.props.disabled}
        wrap="no"
        justify="left"
      />
    );
  }

  renderInput () {
    const autoReadonly =
      this.readonly &&
      this.props.selectedValue &&
      this.props.selectedValue !== '';
    const displayValue = autoReadonly ? this.props.selectedValue : null;
    const visibleReadonly = this.props.readonly
      ? this.props.readonly
      : Bool.toString (autoReadonly);
    const textFieldShape = this.props.shape || 'smooth';
    const fieldGrow = this.props.fieldWidth ? null : '1';

    const props = {
      model: this.props.model,
      parser: this.props.parser,
      errors: this.props.errors,
      beforeChange: this.props.beforeChange,
      updateOn: this.props.updateOn,
      getDisplayValue: this.props.getDisplayValue,
      getWarning: this.props.getWarning,
      getInfo: this.props.getInfo,
      field: this.props.field,
      type: this.props.type,
      grow: fieldGrow,
      width: this.props.fieldWidth,
      justify: this.props.fieldJustify,
      hintText: this.props.hintText,
      value: this.props.value,
      hinter: this.props.hinter,
      tooltip: this.props.tooltip,
      messageInfo: this.props.messageInfo,
      messageWarning: this.props.messageWarning,
      filterKeys: this.props.filterKeys,
      spacing: this.hasActionButton () ? 'overlap' : this.props.spacing,
      shape: textFieldShape,
      tabIndex: this.props.tabIndex,
      defaultValue: this.props.defaultValue,
      rows: this.props.rows,
      readonly: visibleReadonly,
      disabled: this.props.disabled,
      selectAllOnFocus: this.props.selectAllOnFocus,
      defaultFocus: this.props.defaultFocus,
      visibility: this.props.visibility,
      required: this.props.required,
    };

    if (displayValue) {
      props.displayValue = displayValue;
      props.selectedId = this.props.selectedId;
    }

    return <TextField {...props} onFocus={this.onFocus} onBlur={this.onBlur} />;
  }

  renderAction () {
    if (this.hasActionButton ()) {
      const actionGlyph = this.props.actionGlyph;
      return (
        <Button
          kind="combo"
          glyph={actionGlyph}
          onClick={this.onActionClicked}
        />
      );
    } else {
      return null;
    }
  }

  render () {
    if (Bool.isFalse (this.props.show)) {
      return null;
    }

    const disabled = this.props.disabled;
    const boxClass = this.styles.classNames.box;

    return (
      <span disabled={disabled} className={boxClass}>
        {this.renderLabel ()}
        {this.renderInput ()}
        {this.renderAction ()}
      </span>
    );
  }
}

/******************************************************************************/
export default LabelTextField;
