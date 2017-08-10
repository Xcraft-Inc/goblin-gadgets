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
    let glyph, active;
    if (this.props.kind === 'switch') {
      glyph = this.props.checked === 'true' ? 'toggle-on' : 'toggle-off'; // [ o] [x ]
    } else if (this.props.kind === 'radio') {
      glyph = this.props.checked === 'true' ? 'stop-circle-o' : 'circle-o'; // o
    } else if (this.props.kind === 'active') {
      glyph = null;
      active = this.props.checked;
    } else {
      glyph = this.props.checked === 'true' ? 'check-square' : 'square-o'; // [v] [ ]
    }

    return (
      <Button
        onClick={::this.onButtonClicked}
        glyph={glyph}
        text={this.props.text}
        active={active}
        border="none"
        spacing={this.props.spacing}
      />
    );
  }
}

/******************************************************************************/
export default CheckButton;
