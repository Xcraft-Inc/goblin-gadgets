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

    this.doChangeCombo = this.doChangeCombo.bind(this);
    this.doChangeTextField = this.doChangeTextField.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onKeyCombo = this.onKeyCombo.bind(this);
    this.showCombo = this.showCombo.bind(this);
    this.hideCombo = this.hideCombo.bind(this);
  }

  showCombo() {
    if (!this.list) {
      return;
    }
    const node = this.node;

    const itemCount = this.list.length;

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

    if (this.props.showCombo) {
      this.props.showCombo();
    }
  }

  hideCombo() {
    this.setState({
      showCombo: false,
    });
  }

  doChangeTextField(id) {
    if (this.props.onChange) {
      this.props.onChange(id);
    }
  }

  doChangeCombo(item) {
    if (this.props.onChange) {
      this.props.onChange(item.id);
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
    MouseTrap.unbind('up');
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

  convertList() {
    this.list = this.props.list || [];
    if (isShredder(this.list)) {
      this.list = this.list.toJS();
    }

    if (this.list.length > 0 || this.list.size > 0) {
      this.list = this.list.map(item => {
        switch (typeof item) {
          case 'string':
            item = {
              id: item,
              text: item,
              value: item,
              active: this.props.selectedId === item,
              action: this.doChangeCombo,
            };
            break;
          case 'object': {
            const id = item.id !== undefined ? item.id : item.value;
            item = {
              id,
              text: item.text,
              value: item.value,
              glyph: item.glyph,
              color: item.color,
              active: this.props.selectedId === id,
              action: this.doChangeCombo,
            };
            break;
          }
          default:
            throw Error('Item Format not accepted in TextFieldComboNC !');
        }
        if (this.props.menuType !== 'wrap') {
          item.glyph = item.active ? 'solid/check' : 'solid/none';
        }
        return item;
      });
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

    let selectedItem = this.list.find(
      item => item.id === this.props.selectedId
    );

    if (!selectedItem) {
      selectedItem = {
        id: this.props.selectedId,
        text: this.props.selectedId,
        value: this.props.selectedId,
        glyph: null,
      };
    }

    let glyph = {glyph: selectedItem.glyph, color: selectedItem.color};
    if (this.props.menuType !== 'wrap' || !selectedItem.glyph) {
      glyph = null;
    }

    return (
      <TextFieldNC
        hintText={this.props.hintText}
        tooltip={this.props.tooltip}
        spacing={'overlap'}
        shape={textFieldShape}
        flyingBalloonAnchor={this.props.flyingBalloonAnchor}
        value={selectedItem.id}
        glyph={glyph}
        width={this.props.width}
        grow={this.props.width ? null : '1'}
        rows={this.props.rows}
        readonly={Bool.toString(this.props.readonly)}
        disabled={this.props.disabled}
        required={this.props.required}
        embeddedFocus="true"
        visibility={this.props.visibility}
        onChange={this.doChangeTextField}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        onMouseUp={this.onMouseUp}
        autoFocus={this.props.autoFocus}
        selectAllOnFocus={this.props.selectAllOnFocus}
        //hinter={this.props.hinter}
        //getDisplayValue={this.props.getDisplayValue}
        //getGlyph={this.props.getGlyph}
        //parser={this.props.parser} <Control prop from redux-form>
        //errors={this.props.errors} <Control prop from redux-form>
        //updateOn={this.props.updateOn} <Control prop from redux-form>
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
        list={this.list}
        comboTextTransform={this.props.comboTextTransform}
        close={this.hideCombo}
      />
    );
  }

  render() {
    if (Bool.isFalse(this.props.show)) {
      return null;
    }

    this.convertList();

    const boxClass = this.state.showCombo
      ? this.styles.classNames.shadowBox
      : this.state.focus
      ? this.styles.classNames.focusedBox
      : this.styles.classNames.box;

    return (
      <span
        ref={node => (this.node = node)}
        onClick={this.props.readonly ? this.showCombo : undefined}
        disabled={this.props.disabled}
        className={boxClass}
      >
        {this.renderTextField()}
        {this.renderButton()}
        {this.renderCombo()}
      </span>
    );
  }
}

/******************************************************************************/
export default TextFieldComboNC;
