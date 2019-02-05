import React from 'react';
import Widget from 'laboratory/widget';
import Form from 'laboratory/form';
const Bool = require('gadgets/helpers/bool-helpers');

import TextField from 'gadgets/text-field/widget';

const {crypto} = require('xcraft-core-utils');

/******************************************************************************/

class NabuTextField extends Form {
  render() {
    const {translationId} = this.props;

    if (!translationId) {
      return <div />;
    }

    const Form = this.Form;

    const autoReadonly =
      this.readonly &&
      this.props.selectedValue &&
      this.props.selectedValue !== '';
    const displayValue = autoReadonly ? this.props.selectedValue : null;
    const visibleReadonly = this.props.readonly
      ? this.props.readonly
      : Bool.toString(autoReadonly);
    const textFieldShape = this.props.shape || 'smooth';
    const fieldGrow = this.props.fieldWidth ? null : '1';

    const props = {
      id: this.props.id,
      model: `backend.${translationId}.text`,
      parser: this.props.parser,
      errors: this.props.errors,
      beforeChange: this.props.beforeChange,
      onDebouncedChange: this.props.onDebouncedChange,
      updateOn: this.props.updateOn,
      getDisplayValue: this.props.getDisplayValue,
      getGlyph: this.props.getGlyph,
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
      spacing: this.props.spacing,
      shape: textFieldShape,
      tabIndex: this.props.tabIndex,
      defaultValue: this.props.defaultValue,
      rows: this.props.rows || '1',
      readonly: visibleReadonly,
      disabled: this.props.disabled,
      selectAllOnFocus: this.props.selectAllOnFocus,
      defaultFocus: this.props.defaultFocus,
      verticalSpacing: this.props.verticalSpacing || 'compact',
      visibility: this.props.visibility,
      required: this.props.required,
    };

    if (displayValue) {
      props.displayValue = displayValue;
      props.selectedId = this.props.selectedId;
    }

    return (
      <Form {...this.formConfig}>
        <TextField {...props} />
      </Form>
    );
  }
}

export default Widget.connect((state, props) => {
  const {component, nabuId} = props;

  const messageId = `nabuMessage@${crypto.sha256(nabuId)}`;
  const localeName = 'fr-CH';
  let translationId = `nabuTranslation@${localeName}-${
    messageId.split('@')[1]
  }`;

  if (!state.get(`backend.${translationId}`)) {
    translationId = null;
  }

  const message = state.get(`backend.${messageId}`);
  if (!message) {
    component.cmd('nabu.add-message', {
      nabuId,
      description: '',
      workitemId: component.props.id || component.context.id,
    });
  }

  return {
    component,
    translationId,
  };
})(NabuTextField);
