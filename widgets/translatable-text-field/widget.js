import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import ReactDOM from 'react-dom';

import MouseTrap from 'mousetrap';
import ComboHelpers from 'goblin-gadgets/widgets/helpers/combo-helpers';
import {Unit} from 'goblin-theme';
import Button from 'goblin-gadgets/widgets/button/widget';
import Combo from 'goblin-gadgets/widgets/combo/widget';
import Select from 'goblin-gadgets/widgets/select/widget';

import {isShredder} from 'xcraft-core-shredder';
import NabuTextField from './text-field';
import ToNabuObject from 'goblin-nabu/widgets/helpers/t.js';

import * as styles from './styles';

/******************************************************************************/

function WrapT(...args) {
  // Otherwise extractor complains about T not being statically evaluate-able
  return ToNabuObject(...args);
}

class TranslatableTextField extends Widget {
  constructor() {
    super(...arguments);
    this.styles = styles;

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

  componentDidMount() {
    const nabuId = `${this.context.entityId}${this.props.model}`;

    this.doFor(this.context.entityId, 'change', {
      path: this.props.model.startsWith('.')
        ? this.props.model.slice(1)
        : this.props.model,
      newValue: WrapT(nabuId, null, null, null, true),
    });
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
    if (this.props.readonly) {
      this.onShowCombo();
    }
  }

  onKeyCombo(e) {
    e.preventDefault();
    this.onShowCombo();
  }

  setValue(value) {
    this.setState({
      selectedValue: value,
    });
  }

  getItem(item) {
    const active =
      this.state.selectedValue === item.value ||
      (!this.state.selectedValue && this.props.defaultValue === item.value);

    if (this.props.menuType === 'wrap') {
      return {
        text: item.text,
        value: item.value,
        glyph: item.glyph,
        color: item.color,
        active: active,
        action: () => this.setValue(item.value),
      };
    } else {
      return {
        text: item.text,
        value: item.value,
        glyph: active ? 'check' : 'none',
        active: active,
        action: () => this.setValue(item.value),
      };
    }
  }

  /******************************************************************************/

  renderTextField() {
    const {shape, list, model, defaultValue, ...other} = this.props;

    const s = shape || 'smooth';
    const textFieldShapes = {
      smooth: 'left-smooth',
      rounded: 'left-rounded',
    };
    const textFieldShape = textFieldShapes[s];
    const nabuId = `${this.context.entityId}${model}`;

    return (
      <NabuTextField
        nabuId={nabuId}
        localeName={this.state.selectedValue || defaultValue}
        workitemId={this.props.id || this.context.id}
        shape={textFieldShape}
        embeddedFocus={true}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        onMouseUp={this.onMouseUp}
        className={this.styles.classNames.nabuTextField}
        {...other}
      />
    );
  }

  renderButton() {
    const shape = this.props.shape;
    let glyph = 'solid/flag';
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
        glyphSize="100%"
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

    for (let item of list) {
      if (
        this.state.selectedValue === item.value ||
        (!this.state.selectedValue && this.props.defaultValue === item.value)
      ) {
        defaultIndex = index;
      }
      x.push({
        text: item.text,
        action: () => this.setValue(item.value),
      });
      index++;
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
    let list = this.props.list || [];
    if (isShredder(list)) {
      list = list.toJS();
    }
    list = list.map((locale) => ({
      value: locale.name,
      text: locale.text || locale.name,
    }));

    if (this.showCombo) {
      if (this.props.menuType === 'combo' || this.props.menuType === 'wrap') {
        return this.renderComboCombo(list);
      } else {
        return this.renderComboSelect(list);
      }
    }
  }

  render() {
    if (this.props.show === false) {
      return null;
    }

    const boxClass = this.showCombo
      ? this.styles.classNames.translatableTextFieldShadow
      : this.focus
      ? this.styles.classNames.translatableTextFieldFocused
      : this.styles.classNames.translatableTextField;

    return (
      <div disabled={this.props.disabled} className={boxClass}>
        {this.renderTextField()}
        {this.renderButton()}
        {this.renderCombo()}
      </div>
    );
  }
}

/******************************************************************************/

export default Widget.connect((state, props) => {
  const locales = state.get('backend.nabu.locales');

  if (!locales || locales.length === 0) {
    return {};
  }

  const selectedLocaleId = Widget.getUserSession(state).get('locale');
  const defaultLocale =
    locales.find((locale) => locale.get('id') === selectedLocaleId) ||
    locales.first();

  return {
    list: locales,
    defaultValue: defaultLocale.get('name'),
  };
})(TranslatableTextField);
