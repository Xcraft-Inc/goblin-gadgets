import React from 'react';
import Widget from 'laboratory/widget';

import Label from 'gadgets/label/widget';
import TranslatableCombo from 'gadgets/translatable-combo/widget';
import * as Bool from 'gadgets/helpers/bool-helpers';

import {T as ToNabuObject} from 'goblin-nabu/widgets/helpers/t.js';

/******************************************************************************/

function WrapT(...args) {
  // Otherwise extractor complains about T not being statically evaluate-able
  return ToNabuObject(...args);
}

class TranslatableTextField extends Widget {
  constructor() {
    super(...arguments);

    this.renderLabel = this.renderLabel.bind(this);
    this.renderInput = this.renderInput.bind(this);
  }

  componentDidMount() {
    const nabuId = `${this.context.entityId}${this.props.model}`;

    this.doFor(this.context.entityId, 'change', {
      path: this.props.model.startsWith('.')
        ? this.props.model.slice(1)
        : this.props.model,
      newValue: WrapT(nabuId, null, null, null, true),
    });
  }

  renderLabel() {
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

  renderInput() {
    return <TranslatableCombo component={this} {...this.props} />;
  }

  render() {
    if (Bool.isFalse(this.props.show)) {
      return null;
    }

    const disabled = this.props.disabled;
    const boxClass = this.styles.classNames.box;

    return (
      <span disabled={disabled} className={boxClass}>
        {this.renderLabel()}
        {this.renderInput()}
      </span>
    );
  }
}

/******************************************************************************/
export default TranslatableTextField;
