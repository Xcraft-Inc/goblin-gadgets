//T:2019-02-27
import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import Props from './props';
import * as Bool from 'gadgets/helpers/bool-helpers';
import {
  makePropTypes,
  makeDefaultProps,
} from 'xcraft-core-utils/lib/prop-types';
import Button from 'goblin-gadgets/widgets/button/widget';
import Label from 'goblin-gadgets/widgets/label/widget';

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

  /******************************************************************************/

  renderRetro(checked) {
    const styleMain = checked
      ? `main-on-hover ${this.styles.classNames.checkButtonRetroMainOn}`
      : `main-off-hover ${this.styles.classNames.checkButtonRetroMainOff}`;

    const styleTip = checked
      ? this.styles.classNames.checkButtonRetroTipOn
      : this.styles.classNames.checkButtonRetroTipOff;

    return (
      <div
        className={this.styles.classNames.checkButtonRetro}
        onClick={this.onChange}
      >
        <div className={styleMain}>
          <div className={this.styles.classNames.checkButtonRetroStem} />
          <div className={styleTip} />
        </div>
        <Label kind="button-notification" text={this.props.text} />
      </div>
    );
  }

  render() {
    let {checked, ...otherProps} = this.props;
    checked = Bool.isTrue(checked);

    if (
      this.context.theme.look.name === 'retro' &&
      (this.props.kind === 'switch' ||
        this.props.kind === 'switch-dark' ||
        this.props.kind === 'big' ||
        !this.props.kind)
    ) {
      return this.renderRetro(checked);
    }

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
