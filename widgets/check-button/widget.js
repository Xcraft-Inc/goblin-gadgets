import React from 'react';
import Widget from 'laboratory/widget';

import Button from 'gadgets/button/widget';

/******************************************************************************/

class CheckButton extends Widget {
  constructor () {
    super (...arguments);
  }

  onButtonClicked (e) {
    const x = this.props.onClick;
    if (x) {
      x (e);
    } else {
      this.onClick (e);
    }
  }

  render () {
    const kind = this.props.kind;
    const text = this.props.text;
    const checked = this.props.checked;
    const spacing = this.props.spacing;

    let glyph, active;
    if (kind === 'switch') {
      glyph = checked === 'true' ? 'toggle-on' : 'toggle-off'; // [ o] [x ]
    } else if (kind === 'radio') {
      glyph = checked === 'true' ? 'stop-circle-o' : 'circle-o'; // o
    } else if (kind === 'active') {
      glyph = null;
      active = checked;
    } else {
      glyph = checked === 'true' ? 'check-square' : 'square-o'; // [v] [ ]
    }

    return (
      <Button
        onClick={::this.onButtonClicked}
        glyph={glyph}
        text={text}
        active={active}
        border="none"
        spacing={spacing}
      />
    );
  }
}

/******************************************************************************/
export default CheckButton;
