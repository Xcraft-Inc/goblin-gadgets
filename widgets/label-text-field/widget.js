import React from 'react';
import Widget from 'laboratory/widget';

import Button from 'gadgets/button/widget';
import TextField from 'gadgets/text-field/widget';

/******************************************************************************/

class LabelTextField extends Widget {
  constructor (props) {
    super (props);
    this.state = {
      readonly: true,
    };
    this.comboLocation = null;
  }

  get readonly () {
    return this.state.readonly;
  }

  set readonly (value) {
    this.setState ({
      readonly: value,
    });
  }

  onChange (e) {
    this.onChange (e);
    const x = this.props.onChange;
    if (x) {
      x (e);
    }
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
    const actionGlyph = this.props['action-glyph'];
    if (actionGlyph) {
      return true;
    } else {
      return false;
    }
  }

  renderButton () {
    const shape = this.props.shape;
    const labelGlyph = this.props.labelGlyph;
    const labelText = this.props.labelText;
    const labelWidth = this.props.labelWidth;

    const s = shape ? shape : 'smooth';
    const buttonShapes = {
      smooth: 'left-smooth',
      rounded: 'left-rounded',
    };
    const buttonShape = buttonShapes[s];

    return (
      <Button
        glyph={labelGlyph}
        text={labelText}
        width={labelWidth}
        shape={buttonShape}
        kind="label"
        justify="left"
        spacing="overlap"
      />
    );
  }

  renderInput () {
    const field = this.props.field;
    const type = this.props.type;
    const shape = this.props.shape;
    const fieldWidth = this.props['field-width'];

    // @DR: Don't do this: setting the value as a `prop` rather than through
    // its state breaks React's forceUpdate() optimizations on the child
    // <input> element:
    //  const value            = this.read ('value');

    // @DR: We should remove the `selected-value` property altogether and
    // use the state (based on `value`) instead; but since I am not sure
    // of all the implications, I prefer not to touch this logic for now:
    const selectedValue = this.props['selected-value'];

    const hintText = this.props.hintText;
    const tooltip = this.props.tooltip;
    const messageInfo = this.props.messageInfo;
    const messageWarning = this.props.messageWarning;
    const rows = this.props.rows;
    const readonly = this.props.readonly;
    const selectAllOnFocus = this.props.selectAllOnFocus;
    const defaultFocus = this.props.defaultFocus;
    const filterKeys = this.props.filterKeys;
    const tabIndex = this.props['tab-index'];

    const autoReadonly = this.readonly && selectedValue && selectedValue !== '';
    const displayValue = autoReadonly ? selectedValue : null;
    const visibleReadonly = readonly
      ? readonly
      : autoReadonly ? 'true' : 'false';

    const s = shape ? shape : 'smooth';
    const textFieldShapes = {
      smooth: 'right-smooth',
      rounded: 'right-rounded',
    };
    const textFieldShape = textFieldShapes[s];
    const props = {
      model: this.props.model,
      parser: this.props.parser,
      errors: this.props.errors,
      beforeChange: this.props.beforeChange,
      updateOn: this.props.updateOn,
      field: field,
      type: type,
      width: fieldWidth,
      hintText: hintText,
      value: this.props.value,
      hinter: this.props.hinter,
      tooltip: tooltip,
      messageInfo: messageInfo,
      messageWarning: messageWarning,
      filterKeys: filterKeys,
      spacing: this.hasActionButton () ? 'overlap' : null,
      shape: textFieldShape,
      'tab-index': tabIndex,
      rows: rows,
      readonly: visibleReadonly,
      selectAllOnFocus: selectAllOnFocus,
      defaultFocus: defaultFocus,
    };

    if (displayValue) {
      props.value = displayValue;
    }

    return (
      <TextField {...props} onFocus={::this.onFocus} onBlur={::this.onBlur} />
    );
  }

  renderAction () {
    if (this.hasActionButton ()) {
      const actionGlyph = this.props['action-glyph'];
      return (
        <Button
          kind="combo"
          glyph={actionGlyph}
          onClick={::this.onActionClicked}
        />
      );
    } else {
      return null;
    }
  }

  render () {
    const disabled = this.props.disabled;
    const boxClass = this.styles.classNames.box;

    return (
      <span disabled={disabled} className={boxClass}>
        {this.renderButton ()}
        {this.renderInput ()}
        {this.renderAction ()}
      </span>
    );
  }
}

/******************************************************************************/
export default LabelTextField;
