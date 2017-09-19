import React from 'react';
import Widget from 'laboratory/widget';
import * as Bool from '../helpers/boolean-helpers.js';

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
    let glyph, active;
    const checked = Bool.isTrue (this.props.checked);
    if (this.props.kind === 'switch') {
      glyph = checked ? 'toggle-on' : 'toggle-off'; // [ o] [x ]
    } else if (this.props.kind === 'radio') {
      glyph = checked ? 'dot-circle-o' : 'circle-o'; // o
    } else if (this.props.kind === 'active') {
      glyph = null;
      active = Bool.toString (checked);
    } else {
      glyph = checked ? 'check-square' : 'square-o'; // [v] [ ]
    }

    return (
      <Button
        onClick={this.onButtonClicked}
        glyph={glyph}
        text={this.props.text}
        active={active}
        disabled={this.props.disabled}
        border="none"
        spacing={this.props.spacing}
      />
    );
  }
}

/******************************************************************************/
export default CheckButton;
