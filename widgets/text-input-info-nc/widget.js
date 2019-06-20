import React from 'react';
import Widget from 'laboratory/widget';
import TextInputNC from '../text-input-nc/widget';

export default class TextInputInfoNC extends Widget {
  render() {
    let checkProps;
    if (this.props.check) {
      checkProps = this.props.check(this.props.value);
    }
    return <TextInputNC {...checkProps} {...this.props} />;
  }
}
