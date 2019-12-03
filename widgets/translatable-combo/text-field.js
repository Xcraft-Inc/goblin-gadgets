import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import Form from 'goblin-laboratory/widgets/form';
import * as Bool from 'gadgets/helpers/bool-helpers';

import TextField from 'goblin-gadgets/widgets/text-field/widget';

const {
  computeMessageId,
  computeTranslationId,
} = require('goblin-nabu/lib/helpers.js');

/******************************************************************************/

class NabuTextField extends Form {
  constructor() {
    super(...arguments);

    this.mustAdd = this.mustAdd.bind(this);
  }

  componentDidMount() {
    this.mustAdd();
  }

  componentDidUpdate() {
    this.mustAdd();
  }

  mustAdd() {
    const {message, nabuId, workitemId} = this.props;
    if (!message) {
      this.cmd('nabu.add-message', {
        nabuId,
        description: '',
        custom: true,
        workitemId,
      });
    }
  }

  render() {
    const {translationId} = this.props;

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
      model: translationId ? `backend.${translationId}.text` : null,
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
      horizontalSpacing: this.props.horizontalSpacing,
      shape: textFieldShape,
      tabIndex: this.props.tabIndex,
      defaultValue: this.props.defaultValue,
      rows: this.props.rows || '1',
      readonly: visibleReadonly,
      disabled: this.props.disabled || !translationId,
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
      <Form {...this.formConfig} className={this.props.className}>
        <TextField {...props} />
      </Form>
    );
  }
}

export default Widget.connect((state, props) => {
  const {nabuId, localeName} = props;

  const messageId = computeMessageId(nabuId);

  let translationId = localeName
    ? computeTranslationId(messageId, localeName)
    : null;

  if (translationId && !state.get(`backend.${translationId}`)) {
    translationId = null;
  }

  return {
    message: state.get(`backend.${messageId}`),
    translationId,
  };
})(NabuTextField);
