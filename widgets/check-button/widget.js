//T:2019-02-27
import React from 'react';
import Widget from 'laboratory/widget';
import * as Bool from 'gadgets/helpers/bool-helpers';

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
      x(e, this.props.userData);
    }
  }

  render() {
    let {checked, ...otherProps} = this.props;
    checked = Bool.isTrue(checked);

    let kind, border, glyph, active;
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
        {...otherProps}
        kind={kind}
        border={border}
        glyph={glyph}
        active={active}
        onClick={this.onButtonClicked}
      />
    );
  }
}

/******************************************************************************/
export default CheckButton;
