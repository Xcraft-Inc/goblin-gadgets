import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import Form from 'goblin-laboratory/widgets/form';

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
      : autoReadonly;
    const textFieldShape = this.props.shape || 'smooth';
    const fieldGrow = this.props.fieldWidth ? null : '1';

    const {
      fieldWidth,
      fieldJustify,
      rows,
      disabled,
      verticalSpacing,
      ...otherProps
    } = this.props;

    const props = {
      model: translationId ? `backend.${translationId}.text` : null,
      grow: fieldGrow,
      width: fieldWidth,
      justify: fieldJustify,
      shape: textFieldShape,
      rows: rows || '1',
      readonly: visibleReadonly,
      disabled: disabled || !translationId,
      verticalSpacing: verticalSpacing || 'compact',
      ...otherProps,
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
