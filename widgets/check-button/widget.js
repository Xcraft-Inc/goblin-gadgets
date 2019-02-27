//T:2019-02-27
import React from 'react';
import Widget from 'laboratory/widget';
const Bool = require('gadgets/helpers/bool-helpers');

import Button from 'gadgets/button/widget';

/******************************************************************************/

class CheckButton extends Widget {
  constructor() {
    super(...arguments);

    this.onButtonClicked = this.onButtonClicked.bind(this);
  }

  onButtonClicked(e) {
    const x = this.props.onClick;
    if (x) {
      x(e);
    }
  }

  render() {
    let kind, border, glyph, active;
    const checked = Bool.isTrue(this.props.checked);
    if (this.props.kind === 'switch') {
      kind = 'check-button';
      glyph = checked ? 'light/toggle-on' : 'light/toggle-off'; // [ o] [x ]
    } else if (this.props.kind === 'radio') {
      kind = 'check-button';
      glyph = checked ? 'regular/dot-circle' : 'regular/circle'; // o
    } else if (this.props.kind === 'active') {
      border = 'none';
      glyph = this.props.glyph;
      active = Bool.toString(checked);
    } else {
      kind = 'check-button';
      glyph = checked ? 'solid/check-square' : 'regular/square'; // [v] [ ]
    }

    return (
      <Button
        kind={kind}
        border={border}
        glyph={glyph}
        width={this.props.width}
        text={this.props.text}
        tooltip={this.props.tooltip}
        active={active}
        disabled={this.props.disabled}
        readonly={this.props.readonly}
        focusable={this.props.focusable}
        spacing={this.props.spacing}
        heightStrategy={this.props.heightStrategy}
        justify={this.props.justify}
        onClick={this.onButtonClicked}
      />
    );
  }
}

/******************************************************************************/
export default CheckButton;
