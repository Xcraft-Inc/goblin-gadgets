import React from 'react';
import Widget from 'laboratory/widget';

import TranslationField from 'goblin-nabu/widgets/helpers/translation-field';

const {crypto} = require('xcraft-core-utils');

/******************************************************************************/

const TranslationFieldConnected = Widget.connect((state, props) => {
  const {entityId, component} = props;
  const nabuId = `${entityId}${component.props.model}`;
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
  render() {
    const {id, ...other} = this.props;
    return (
      <TranslationFieldConnected
        entityId={this.context.entityId}
        component={this}
        {...other}
      />
    );
  }
}

/******************************************************************************/
export default TranslatableTextField;
