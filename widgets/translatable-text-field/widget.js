import React from 'react';
import Widget from 'laboratory/widget';

import {T as ToNabuObject} from 'goblin-nabu/widgets/helpers/t.js';
import TranslationField from 'goblin-nabu/widgets/helpers/translation-field';

const {crypto} = require('xcraft-core-utils');

/******************************************************************************/

const TranslationFieldConnected = Widget.connect((state, props) => {
  const {component, nabuId} = props;

  const messageId = `nabuMessage@${crypto.sha256(nabuId)}`;
  const localeName = 'fr-CH';
  const translationId = `nabuTranslation@${localeName}-${
    messageId.split('@')[1]
  }`;

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
})(TranslationField);

class TranslatableTextField extends Widget {
  componentDidMount() {
    const nabuId = `${this.context.entityId}${this.props.model}`;

    this.doFor(this.context.entityId, 'change', {
      path: this.props.model.startsWith('.')
        ? this.props.model.slice(1)
        : this.props.model,
      newValue: ToNabuObject(nabuId),
    });
  }

  render() {
    const {id, ...other} = this.props;
    const nabuId = `${this.context.entityId}${this.props.model}`;

    return (
      <TranslationFieldConnected nabuId={nabuId} component={this} {...other} />
    );
  }
}

/******************************************************************************/
export default TranslatableTextField;
