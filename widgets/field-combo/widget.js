//T:2019-02-2019
import React from 'react';
import ReactDOM from 'react-dom';
import Widget from 'laboratory/widget';
import MouseTrap from 'mousetrap';
import ComboHelpers from 'gadgets/helpers/combo-helpers';
const Bool = require('gadgets/helpers/bool-helpers');
import {Unit} from 'electrum-theme';
import {isImmutable} from 'immutable';

import Button from 'gadgets/button/widget';
import Label from 'gadgets/label/widget';
import Combo from 'gadgets/combo/widget';
import Select from 'gadgets/select/widget';

/******************************************************************************/

class FieldCombo extends Widget {
  constructor() {
    super(...arguments);

    this.state = {
      showCombo: false,
      focus: false,
    };

    this.comboLocation = null;

    this.onShowCombo = this.onShowCombo.bind(this);
    this.onHideCombo = this.onHideCombo.bind(this);
  }

  get showCombo() {
    return this.state.showCombo;
  }

  set showCombo(value) {
    this.setState({
      showCombo: value,
    });
  }

  get focus() {
    return this.state.focus;
  }

  set focus(value) {
    this.setState({
      focus: value,
    });
  }

  onShowCombo() {
    if (!this.props.list) {
      return;
    }
    const node = ReactDOM.findDOMNode(this);

    const itemCount = this.props.list.size
      ? this.props.list.size
      : this.props.list.length; // FIXME: pouèrk !

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

    this.showCombo = true;
  }

  onHideCombo() {
    this.showCombo = false;
  }

  setText(value) {
    const x = this.props.onChange;
    if (x) {
      x(value);
    }
  }

  getItem(item) {
    if (typeof item === 'string') {
      const active = this.props.defaultValue === item;
      if (this.props.menuType === 'wrap') {
        return {
          text: item,
          active: Bool.toString(active),
          action: () => this.setText(item),
        };
      } else {
        return {
          text: item,
          glyph: active ? 'check' : 'none',
          active: Bool.toString(active),
          action: () => this.setText(item),
        };
      }
    } else {
      const active = this.props.defaultValue === item.text;
      if (this.props.menuType === 'wrap') {
        return {
          text: item.text,
          value: item.value,
          glyph: item.glyph,
          color: item.color,
          active: Bool.toString(active),
          action: () => this.setText(item.value),
        };
      } else {
        return {
          text: item.text,
          value: item.value,
          glyph: active ? 'check' : 'none',
          active: Bool.toString(active),
          action: () => this.setText(item.value),
        };
      }
    }
  }

  /******************************************************************************/

  renderTextField() {
    const s = this.props.shape ? this.props.shape : 'smooth';
    const textFieldShapes = {
      smooth: 'left-smooth',
      rounded: 'left-rounded',
    };
    const textFieldShape = textFieldShapes[s];

    const props = {
      glyph: this.props.glyph,
      glyphColor: this.props.glyphColor,
      text: this.props.defaultValue,
      tooltip: this.props.tooltip,
      spacing: 'overlap',
      shape: textFieldShape,
      flyingBalloonAnchor: this.props.flyingBalloonAnchor,
      grow: '1',
      rows: this.props.rows,
      disabled: this.props.disabled,
      visibility: this.props.visibility,
      required: this.props.required,
    };

    return (
      <Label
        {...props}
        kind="field-combo"
        wrap="no-strict"
        onClick={this.onShowCombo}
      />
    );
  }

  renderButton() {
    const shape = this.props.shape;
    let glyph = this.showCombo ? 'solid/caret-up' : 'solid/caret-down';
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
        glyph={glyph}
        glyphSize="120%"
        shape={buttonShape}
        disabled={this.props.disabled}
        onClick={this.onShowCombo}
      />
    );
  }

  renderComboCombo(list) {
    const x = [];
    for (var item of list) {
      x.push(this.getItem(item));
    }
    // const x = list.map(item => this.getItem(item));
    return (
      <Combo
        menuType={this.props.menuType}
        menuItemWidth={
          this.props.menuType === 'wrap'
            ? this.comboLocation.menuItemWidth
            : this.props.menuItemWidth
        }
        menuItemTooltips={this.props.menuItemTooltips}
        left={this.comboLocation.center}
        triangleShift={this.comboLocation.triangleShift}
        top={this.comboLocation.top}
        bottom={this.comboLocation.bottom}
        maxHeight={this.comboLocation.maxHeight}
        width={this.comboLocation.width}
        list={x}
        comboTextTransform={this.props.comboTextTransform}
        close={this.onHideCombo}
      />
    );
  }

  renderComboSelect(list) {
    const x = [];
    let index = 0;
    let defaultIndex = null;
    if (typeof list[0] === 'string') {
      for (let item of list) {
        if (this.props.defaultValue === item) {
          defaultIndex = index;
        }
        x.push({
          text: item,
          action: () => this.setText(item),
        });
        index++;
      }
    } else {
      for (let item of list) {
        if (this.props.defaultValue === item.text) {
          defaultIndex = index;
        }
        x.push({
          text: item.text,
          action: () => this.setText(item.value),
        });
        index++;
      }
    }
    return (
      <Select
        menuType={this.props.menuType}
        menuItemWidth={this.props.menuItemWidth}
        left={this.selectLocation.left}
        width={this.selectLocation.width}
        top={this.selectLocation.top}
        bottom={this.selectLocation.bottom}
        maxHeight={this.selectLocation.maxHeight}
        list={x}
        defaultIndex={defaultIndex}
        comboTextTransform={this.props.comboTextTransform}
        close={this.onHideCombo}
      />
    );
  }

  renderCombo() {
    if (!this.props.list || !this.showCombo) {
      return null;
    }
    let list = this.props.list;
    if (isImmutable(list)) {
      list = list.toJS();
    }
    if (this.props.menuType === 'combo' || this.props.menuType === 'wrap') {
      return this.renderComboCombo(list);
    } else {
      return this.renderComboSelect(list);
    }
  }

  render() {
    if (Bool.isFalse(this.props.show)) {
      return null;
    }

    const boxClass = this.showCombo
      ? this.styles.classNames.shadowBox
      : this.focus
        ? this.styles.classNames.focusedBox
        : this.styles.classNames.box;

    return (
      <span disabled={this.props.disabled} className={boxClass}>
        {this.renderTextField()}
        {this.renderButton()}
        {this.renderCombo()}
      </span>
    );
  }
}

/******************************************************************************/
export default FieldCombo;
