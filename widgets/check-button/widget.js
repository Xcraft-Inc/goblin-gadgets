import React from 'react';
import Widget from 'laboratory/widget';
import * as Bool from 'gadgets/boolean-helpers';

import Button from 'gadgets/button/widget';

/******************************************************************************/

class CheckButton extends Widget {
  constructor () {
    super (...arguments);

    this.onButtonClicked = this.onButtonClicked.bind (this);
  }

  onButtonClicked (e) {
    const x = this.props.onClick;
    if (x) {
      x (e);
    }
  }

  render () {
    let kind, border, glyph, active;
    const checked = Bool.isTrue (this.props.checked);
    if (this.props.kind === 'switch') {
      kind = 'check-button';
      glyph = checked ? 'toggle-on' : 'toggle-off'; // [ o] [x ]
    } else if (this.props.kind === 'radio') {
      kind = 'check-button';
      glyph = checked ? 'dot-circle-o' : 'circle-o'; // o
    } else if (this.props.kind === 'active') {
      border = 'none';
      glyph = null;
      active = Bool.toString (checked);
    } else {
      kind = 'check-button';
      glyph = checked ? 'check-square' : 'square-o'; // [v] [ ]
    }

    return (
      <Button
        kind={kind}
        border={border}
        onClick={this.onButtonClicked}
        glyph={glyph}
        text={this.props.text}
        active={active}
        disabled={this.props.disabled}
        readonly={this.props.readonly}
        focusable={this.props.focusable}
        spacing={this.props.spacing}
        heightStrategy={this.props.heightStrategy}
      />
    );
  }
}

/******************************************************************************/
export default CheckButton;
