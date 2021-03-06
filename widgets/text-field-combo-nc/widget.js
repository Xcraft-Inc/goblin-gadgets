import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import props from './props';
import scenarios from './scenarios';
import {registerWidget} from 'goblin-gadgets/widgets/widget-doc/widget-list';
import KeyTrap from 'goblin-gadgets/widgets/key-trap.js';
import {isShredder} from 'xcraft-core-shredder';

import ButtonCombo from 'goblin-gadgets/widgets/button-combo/widget';
import wrapRawInput from 'goblin-gadgets/widgets/input-wrapper/widget.js';
import TextInputNC from '../text-input-nc/widget';

/******************************************************************************/

class TextFieldComboNC extends Widget {
  constructor() {
    super(...arguments);

    this.state = {
      focus: false,
    };

    this.isBinded = false;

    this.doChangeCombo = this.doChangeCombo.bind(this);
    this.doChangeTextField = this.doChangeTextField.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onEscKey = this.onEscKey.bind(this);
    this.onUpKey = this.onUpKey.bind(this);
    this.onDownKey = this.onDownKey.bind(this);
    this.onEnterKey = this.onEnterKey.bind(this);
    this.setListRef = this.setListRef.bind(this);
    this.onShowCombo = this.onShowCombo.bind(this);
    this.onHideCombo = this.onHideCombo.bind(this);
    this.setButtonComboRef = this.setButtonComboRef.bind(this);
  }

  setListRef(ref) {
    this.listRef = ref;
  }
  setButtonComboRef(ref) {
    this.buttonComboRef = ref;
  }

  doChangeTextField(id) {
    if (this.props.onChange) {
      this.props.onChange(id);
    }
  }

  doChangeCombo(item) {
    if (this.props.onValidate) {
      this.props.onValidate(item.id);
    }
  }

  onShowCombo() {
    this.bindKeys();
    if (this.props.onShowCombo) {
      this.props.onShowCombo();
    }
  }

  onHideCombo() {
    if (!this.state.focus) {
      this.unbindKeys();
    }
    if (this.props.onHideCombo) {
      this.props.onHideCombo();
    }
  }

  bindKeys() {
    if (!this.isBinded) {
      KeyTrap.bind('ArrowUp', this.onUpKey);
      KeyTrap.bind('ArrowDown', this.onDownKey);
      KeyTrap.bind('Enter', this.onEnterKey);
      KeyTrap.bind('Escape', this.onEscKey);
      this.isBinded = true;
    }
  }

  unbindKeys() {
    if (this.isBinded) {
      KeyTrap.unbind('ArrowUp', this.onUpKey);
      KeyTrap.unbind('ArrowDown', this.onDownKey);
      KeyTrap.unbind('Enter', this.onEnterKey);
      KeyTrap.unbind('Escape', this.onEscKey);
      this.isBinded = false;
    }
  }

  onFocus() {
    this.bindKeys();
    this.setState({
      focus: true,
    });
    if (this.props.onFocus) {
      this.props.onFocus(this.props.selectedId);
    }
  }

  onBlur() {
    this.unbindKeys();
    this.setState({
      focus: false,
    });
    if (this.props.onBlur) {
      this.props.onBlur(this.props.selectedId);
    }
  }

  onUpKey() {
    this.showCombo();
    if (this.listRef) {
      this.listRef.onUpKey();
    }
  }

  onDownKey() {
    this.showCombo();
    if (this.listRef) {
      this.listRef.onDownKey();
    }
  }

  onEnterKey() {
    if (this.listRef) {
      this.listRef.onEnterKey();
    }
  }

  onEscKey() {
    if (this.listRef) {
      this.listRef.onEscKey();
    }
  }

  showCombo() {
    if (this.buttonComboRef) {
      this.buttonComboRef.showCombo();
    }
  }

  convertList() {
    this.list = this.props.list || [];
    if (isShredder(this.list)) {
      this.list = this.list.toJS();
    }

    if (this.list.length > 0 || this.list.size > 0) {
      this.list = this.list.map((item) => {
        switch (typeof item) {
          case 'number':
          case 'string':
            item = {
              id: item,
              text: item,
              value: item,
              action: this.doChangeCombo,
            };
            break;
          case 'object': {
            if (item.id === undefined) {
              console.warn(
                `Id not defined for ${JSON.stringify(
                  item
                )} in TextFieldComboNC !`
              );
            }
            if (item.text === undefined) {
              console.warn(
                `Text not defined for ${JSON.stringify(
                  item
                )} in TextFieldComboNC !`
              );
            }
            const id =
              item.id !== undefined
                ? item.id
                : item.value !== undefined
                ? item.value
                : item.text;
            item = {
              id,
              text: item.text !== undefined ? item.text : id,
              value: item.value,
              glyph: item.glyph,
              color: item.color,
              action: this.doChangeCombo,
            };
            if (typeof item.glyph === 'object') {
              item.color = item.glyph.color;
              item.glyph = item.glyph.glyph;
            }
            break;
          }
          default:
            throw Error(
              'Item Format not accepted in TextFieldComboNC ! ' +
                JSON.stringify(item)
            );
        }
        return item;
      });
    }
  }

  /******************************************************************************/

  renderTextField() {
    const shape = this.props.shape || 'smooth';
    const hideButton = this.props.readonly || this.props.hideButtonCombo;
    const textFieldShapes = hideButton
      ? {
          smooth: 'smooth',
          rounded: 'rounded',
        }
      : {
          smooth: 'left-smooth',
          rounded: 'left-rounded',
        };
    const textFieldShape = textFieldShapes[shape];

    let selectedItem = this.list.find(
      (item) => item.id === this.props.selectedId
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
    if (this.props.getGlyph && glyph.glyph === null) {
      glyph = this.props.getGlyph(this.props.selectedId) || null;
    }
    if (this.props.menuType !== 'wrap' || !glyph || !glyph.glyph) {
      glyph = null;
    }

    let value = selectedItem.id || '';

    if (
      (this.props.readonly || this.props.restrictsToList) &&
      selectedItem.text
    ) {
      value = selectedItem.text;
    }

    let TextComponent = TextInputNC;
    if (this.props.renderTextField) {
      TextComponent = this.props.renderTextField;
    }

    return (
      <TextComponent
        hintText={this.props.hintText}
        tooltip={this.props.tooltip}
        horizontalSpacing="overlap"
        shape={textFieldShape}
        //flyingBalloonAnchor={this.props.flyingBalloonAnchor}
        value={value}
        glyph={glyph}
        width={this.props.fieldWidth}
        grow={this.props.fieldWidth ? null : '1'}
        rows={this.props.rows}
        readonly={this.props.restrictsToList || this.props.readonly}
        disabled={this.props.disabled}
        required={this.props.required}
        embeddedFocus={true}
        visibility={this.props.visibility}
        onChange={this.doChangeTextField}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        onValidate={this.props.onValidate}
        autoFocus={this.props.autoFocus}
        selectAllOnFocus={this.props.selectAllOnFocus}
      />
    );
  }

  render() {
    if (this.props.show === false) {
      return null;
    }

    if (!this.props.list) {
      return null;
    }

    if (this.props.list !== this.previousList) {
      this.convertList();
      this.previousList = this.props.list;
    }

    return (
      <ButtonCombo
        parentRect={this.props.parentRect}
        width={this.props.width}
        grow={this.props.grow}
        menuType={this.props.menuType}
        menuItemWidth={this.props.menuItemWidth}
        menuItemTooltips={this.props.menuItemTooltips}
        readonly={this.props.readonly}
        restrictsToList={this.props.restrictsToList}
        disabled={this.props.disabled}
        onShowCombo={this.onShowCombo}
        onHideCombo={this.onHideCombo}
        node={this.node}
        selectedId={this.props.selectedId}
        list={this.list}
        horizontalSpacing={this.props.horizontalSpacing}
        shape={this.props.shape}
        comboGlyph={this.props.comboGlyph}
        comboTextTransform={this.props.comboTextTransform}
        focus={this.state.focus}
        hideButtonCombo={this.props.hideButtonCombo}
        setListRef={this.setListRef}
        ref={this.setButtonComboRef}
      >
        {this.renderTextField()}
      </ButtonCombo>
    );
  }
}

/******************************************************************************/

registerWidget(TextFieldComboNC, props, scenarios);

/******************************************************************************/

export default wrapRawInput(TextFieldComboNC, 'selectedId');
