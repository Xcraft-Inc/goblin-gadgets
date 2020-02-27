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

  renderRadioRetro() {
    return (
      <div
        className={this.styles.classNames.buttonRetro}
        onClick={this.onChange}
      >
        <div className={`main-hover ${this.styles.classNames.buttonRetroMain}`}>
          <div className={this.styles.classNames.radioButtonRetroBullet} />
        </div>
        <Label kind="check-button" text={this.props.text} />
      </div>
    );
  }

  renderCheckRetro() {
    return (
      <div
        className={this.styles.classNames.buttonRetro}
        onClick={this.onChange}
      >
        <div className={`main-hover ${this.styles.classNames.buttonRetroMain}`}>
          <div className={this.styles.classNames.checkButtonRetroStem} />
          <div className={this.styles.classNames.checkButtonRetroTip} />
        </div>
        <Label kind="check-button" text={this.props.text} />
      </div>
    );
  }

  render() {
    if (
      this.context.theme.look.name === 'retro' &&
      this.props.look !== 'modern' &&
      this.props.kind !== 'active'
    ) {
      if (this.props.kind === 'radio') {
        return this.renderRadioRetro();
      } else {
        return this.renderCheckRetro();
      }
    }

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
