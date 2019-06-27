//T:2019-02-27:Nothing to translate !
import React from 'react';
import Widget from 'laboratory/widget';
import ComboHelpers from 'gadgets/helpers/combo-helpers';
import * as Bool from 'gadgets/helpers/bool-helpers';
import {Unit} from 'electrum-theme';
import Button from 'gadgets/button/widget';
import Combo from 'gadgets/combo/widget';

/******************************************************************************/

class ButtonCombo extends Widget {
  constructor() {
    super(...arguments);

    this.state = {
      showCombo: false,
    };

    this.comboLocation = null;
    this.showCombo = this.showCombo.bind(this);
    this.hideCombo = this.hideCombo.bind(this);
    this.setRef = this.setRef.bind(this);
  }

  setRef(node) {
    this.node = node;
  }

  showCombo() {
    if (!this.props.list) {
      return;
    }

    const itemCount = this.props.list.length;

    const node = this.node;

    this.comboLocation = ComboHelpers.getComboLocation(
      node,
      this.context.theme.shapes.flyingBalloonTriangleSize,
      this.context.theme.shapes.flyingBalloonPadding,
      itemCount,
      this.props.menuItemWidth,
      this.context.theme.shapes.menuButtonHeight, // height of Button kind='combo-wrap-item'
      null,
      null,
      Unit.multiply(this.context.theme.shapes.dialogDistanceFromEdge, 2)
    );

    this.selectLocation = ComboHelpers.getSelectLocation(
      node,
      this.context.theme.shapes.flyingBalloonTriangleSize,
      this.context.theme.shapes.flyingBalloonPadding
    );

    this.setState({
      showCombo: true,
    });

    if (this.props.onShowCombo) {
      this.props.onShowCombo();
    }
  }

  hideCombo() {
    this.setState({
      showCombo: false,
    });
  }

  renderButton() {
    const shape = this.props.shape;
    let glyph = this.state.showCombo ? 'solid/caret-up' : 'solid/caret-down';
    if (this.props.comboGlyph) {
      glyph = this.props.comboGlyph;
    }

    const s = shape ? shape : 'smooth';
    const buttonShapes = {
      smooth: 'right-smooth',
      rounded: 'right-rounded',
    };
    const buttonShape = buttonShapes[s];

    return (
      <Button
        kind="combo"
        vpos="top"
        glyph={glyph}
        glyphSize="120%"
        shape={buttonShape}
        disabled={this.props.disabled}
        onClick={this.props.readonly ? undefined : this.showCombo}
      />
    );
  }

  renderCombo() {
    if (!this.state.showCombo) {
      return null;
    }
    return (
      <Combo
        menuType={this.props.menuType}
        menuItemWidth={
          this.props.menuItemWidth || this.comboLocation.menuItemWidth
        }
        menuItemTooltips={this.props.menuItemTooltips}
        left={this.comboLocation.center}
        triangleShift={this.comboLocation.triangleShift}
        top={this.comboLocation.top}
        bottom={this.comboLocation.bottom}
        maxHeight={this.comboLocation.maxHeight}
        width={this.comboLocation.width}
        list={this.props.list}
        comboTextTransform={this.props.comboTextTransform}
        close={this.hideCombo}
        disabled={this.props.disabled}
      />
    );
  }

  render() {
    if (Bool.isFalse(this.props.show)) {
      return null;
    }

    const boxClass = this.state.showCombo
      ? this.styles.classNames.shadowBox
      : this.props.focus
      ? this.styles.classNames.focusedBox
      : this.styles.classNames.box;

    return (
      <span
        ref={this.setRef}
        onClick={this.props.readonly ? this.showCombo : undefined}
        disabled={this.props.disabled}
        className={boxClass}
      >
        {this.props.children}
        {this.renderButton()}
        {this.renderCombo()}
      </span>
    );
  }
}

/******************************************************************************/
export default ButtonCombo;
