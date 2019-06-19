//T:2019-02-27:Nothing to translate !
import React from 'react';
import Widget from 'laboratory/widget';
import MouseTrap from 'mousetrap';
import ComboHelpers from 'gadgets/helpers/combo-helpers';
import * as Bool from 'gadgets/helpers/bool-helpers';
import {Unit} from 'electrum-theme';
import Button from 'gadgets/button/widget';
import TextFieldNC from 'gadgets/text-field-nc/widget';
import Combo from 'gadgets/combo/widget';
import {isShredder} from 'xcraft-core-shredder';

/******************************************************************************/

class TextFieldComboNC extends Widget {
  constructor() {
    super(...arguments);

    this.state = {
      showCombo: false,
      focus: false,
    };

    this.comboLocation = null;

    this.doChange = this.doChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onKeyCombo = this.onKeyCombo.bind(this);
    this.showCombo = this.showCombo.bind(this);
    this.hideCombo = this.hideCombo.bind(this);
  }

  showCombo() {
    if (!this.props.list) {
      return;
    }
    const node = this.node;

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

    this.setState({
      showCombo: true,
    });

    const x = this.props.showCombo;
    if (x) {
      x();
    }
  }

  hideCombo() {
    this.setState({
      showCombo: false,
    });
  }

  doChange(item) {
    if (this.props.onChange) {
      this.props.onChange(item.value);
    }
  }

  onFocus() {
    MouseTrap.bind('up', this.onKeyCombo, 'keydown');
    MouseTrap.bind('down', this.onKeyCombo, 'keydown');
    this.setState({
      focus: true,
    });
  }

  onBlur() {
    MouseTrap.unbind('esc');
    MouseTrap.unbind('down');
    this.setState({
      focus: false,
    });
  }

  onMouseUp() {
    if (Bool.isTrue(this.props.readonly)) {
      this.showCombo();
    }
  }

  onKeyCombo(e) {
    e.preventDefault();
    this.showCombo();
  }

  getItem(item) {
    if (typeof item === 'string') {
      item = {
        text: item,
        value: item,
      };
    }
    const active = this.props.selectedValue === item.value;
    item = {
      ...item,
      active,
      action: this.doChange,
    };
    if (this.props.menuType !== 'wrap') {
      item.glyph = active ? 'solid/check' : 'solid/none';
    }
    return item;
  }

  /******************************************************************************/

  renderTextField() {
    const autoReadonly =
      !this.state.focus &&
      this.props.selectedValue &&
      this.props.selectedValue !== '';
    const displayValue = autoReadonly ? this.props.selectedValue : null;
    const visibleReadonly = Bool.isTrue(this.props.readonly)
      ? Bool.isTrue(this.props.readonly)
      : autoReadonly;

    const s = this.props.shape ? this.props.shape : 'smooth';
    const textFieldShapes = {
      smooth: 'left-smooth',
      rounded: 'left-rounded',
    };
    const textFieldShape = textFieldShapes[s];

    const props = {
      parser: this.props.parser,
      errors: this.props.errors,
      updateOn: this.props.updateOn,
      getDisplayValue: this.props.getDisplayValue,
      getGlyph: this.props.getGlyph,
      hinter: this.props.hinter,
      hintText: this.props.hintText,
      tooltip: this.props.tooltip,
      filterKeys: this.props.filterKeys,
      spacing: 'overlap',
      shape: textFieldShape,
      flyingBalloonAnchor: this.props.flyingBalloonAnchor,
      defaultValue: this.props.defaultValue,
      width: this.props.width,
      grow: this.props.width ? null : '1',
      rows: this.props.rows,
      readonly: Bool.toString(visibleReadonly),
      disabled: this.props.disabled,
      selectAllOnFocus: this.props.selectAllOnFocus,
      defaultFocus: this.props.defaultFocus,
      visibility: this.props.visibility,
      required: this.props.required,
    };

    if (displayValue) {
      props.value = displayValue;
      props.displayValue = displayValue;
    }

    return (
      <TextFieldNC
        {...props}
        embeddedFocus="true"
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        onMouseUp={this.onMouseUp}
      />
    );
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
        glyph={glyph}
        glyphSize="120%"
        shape={buttonShape}
        disabled={this.props.disabled}
        onClick={this.showCombo}
      />
    );
  }

  renderCombo() {
    if (!this.state.showCombo) {
      return null;
    }
    let list = this.props.list;
    if (isShredder(list)) {
      list = list.toJS();
    }

    list = list.map(item => this.getItem(item));

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
        list={list}
        comboTextTransform={this.props.comboTextTransform}
        close={this.hideCombo}
      />
    );
  }

  render() {
    if (Bool.isFalse(this.props.show)) {
      return null;
    }

    const boxClass = this.state.showCombo
      ? this.styles.classNames.shadowBox
      : this.state.focus
      ? this.styles.classNames.focusedBox
      : this.styles.classNames.box;

    return (
      <span ref={node => (this.node = node)} className={boxClass}>
        {this.renderTextField()}
        {this.renderButton()}
        {this.renderCombo()}
      </span>
    );
  }
}

/******************************************************************************/
export default TextFieldComboNC;
