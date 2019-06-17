//T:2019-02-27
import React from 'react';
import Widget from 'laboratory/widget';
import Props from './props';
import * as Bool from 'gadgets/helpers/bool-helpers';
import {
  makePropTypes,
  makeDefaultProps,
} from 'xcraft-core-utils/lib/prop-types';
import Button from 'gadgets/button/widget';

/******************************************************************************/

export default class CheckboxNC extends Widget {
  constructor() {
    super(...arguments);
    this.onChange = this.onChange.bind(this);
  }

  onChange() {
    const checked = !Bool.isTrue(this.props.checked);
    if (this.props.onChange) {
      this.props.onChange(checked);
    }
  }

  render() {
    let {checked, ...otherProps} = this.props;
    checked = Bool.isTrue(checked);

    let kind, border, glyph, glyphColor, active;
    if (this.props.kind === 'switch') {
      kind = 'check-button';
      glyph = checked ? 'light/toggle-on' : 'light/toggle-off'; // [ o] [x ]
    } else if (this.props.kind === 'big') {
      kind = null;
      glyph = 'solid/check';
      glyphColor = checked ? this.props.glyphColor : 'transparent';
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
        glyphColor={glyphColor}
        active={active}
        onClick={this.onChange}
      />
    );
  }
}

/******************************************************************************/

CheckboxNC.propTypes = makePropTypes(Props);
CheckboxNC.defaultProps = makeDefaultProps(Props);

/******************************************************************************/
