import React from 'react';
import Widget from 'laboratory/widget';
import ReactDOM from 'react-dom';

import MouseTrap from 'mousetrap';
import ComboHelpers from 'gadgets/helpers/combo-helpers';
import * as Bool from 'gadgets/helpers/bool-helpers';
import {Unit} from 'electrum-theme';
import Button from 'gadgets/button/widget';
import Combo from 'gadgets/combo/widget';
import Select from 'gadgets/select/widget';

import {isShredder} from 'xcraft-core-shredder';
import NabuTextField from './text-field';

/******************************************************************************/

class TranslatableCombo extends Widget {
  constructor() {
    super(...arguments);

    this.state = {
      showCombo: false,
      focus: false,
    };

    this.comboLocation = null;

    this.renderTextField = this.renderTextField.bind(this);
    this.renderButton = this.renderButton.bind(this);
    this.renderCombo = this.renderCombo.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onKeyCombo = this.onKeyCombo.bind(this);
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

  // get focus () {
  //   const state = this.getState ();
  //   const parentModel = this.context.model;
  //   const model = this.props.model;
  //   const forms = Widget.shred (state.forms);
  //   const form = forms.get (`${parentModel}${model}`);
  //   if (form) {
  //     return form.get ('focus');
  //   }
  //   return false;
  // }

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

    const x = this.props.onShowCombo;
    if (x) {
      x();
    }
  }

  onHideCombo() {
    this.showCombo = false;
  }

  onChange(e) {
    this.onChange(e);
    const x = this.props.onChange;
    if (x) {
      x(e);
    }
  }

  onFocus() {
    //- console.log ('text-field-combo.onFocus');
    MouseTrap.bind('up', this.onKeyCombo, 'keydown');
    MouseTrap.bind('down', this.onKeyCombo, 'keydown');
    this.focus = true;

    if (this.props.onFocus) {
      this.props.onFocus();
    }
  }

  onBlur() {
    //- console.log ('text-field-combo.onBlur');
    MouseTrap.unbind('esc');
    MouseTrap.unbind('down');
    this.focus = false;

    if (this.props.onBlur) {
      this.props.onBlur();
    }
  }

  onMouseUp() {
    if (Bool.isTrue(this.props.readonly)) {
      this.onShowCombo();
    }
  }

  onKeyCombo(e) {
    e.preventDefault();
    this.onShowCombo();
  }

  setText(item) {
    const x = this.props.onSetText;
    if (x) {
      if (item.value) {
        x(item.value);
      } else {
        x(item.text);
      }
    }
  }

  getItem(item) {
    if (typeof item === 'string') {
      const active = this.props.defaultValue === item;
      if (this.props.menuType === 'wrap') {
        return {
          text: item,
          active: Bool.toString(active),
          action: x => this.setText(x),
        };
      } else {
        return {
          text: item,
          glyph: active ? 'check' : 'none',
          active: Bool.toString(active),
          action: x => this.setText(x),
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
          action: x => this.setText(x),
        };
      } else {
        return {
          text: item.text,
          value: item.value,
          glyph: active ? 'check' : 'none',
          active: Bool.toString(active),
          action: x => this.setText(x),
        };
      }
    }
  }

  /******************************************************************************/

  renderTextField() {
    const {shape, list, component, ...other} = this.props;

    const s = shape || 'smooth';
    const textFieldShapes = {
      smooth: 'left-smooth',
      rounded: 'left-rounded',
    };
    const textFieldShape = textFieldShapes[s];
    const nabuId = `${this.context.entityId}${this.props.model}`;

    return (
      <NabuTextField
        nabuId={nabuId}
        component={component}
        shape={textFieldShape}
        embeddedFocus="true"
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        onMouseUp={this.onMouseUp}
        {...other}
      />
    );
  }

  renderButton() {
    const shape = this.props.shape;
    let glyph = this.showCombo ? 'regular/flag' : 'solid/flag';
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
          action: x => this.setText(x),
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
          action: x => this.setText(x),
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
    let list = this.props.list;
    if (isShredder(list)) {
      list = list.toJS();
    }
    if (list && this.showCombo) {
      if (this.props.menuType === 'combo' || this.props.menuType === 'wrap') {
        return this.renderComboCombo(list);
      } else {
        return this.renderComboSelect(list);
      }
    } else {
      return null;
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
export default Widget.connect((state, props) => {
  return {
    list: state.get(`backend.nabu.locales`)
      ? state
          .get(`backend.nabu.locales`)
          .map(locale => locale.get('name'))
          .toJS()
      : [],
  };
})(TranslatableCombo);