//T:2019-02-27:Nothing to translate !
import React from 'react';
import Widget from 'laboratory/widget';
import MouseTrap from 'mousetrap';
import {isShredder} from 'xcraft-core-shredder';
import * as Bool from 'gadgets/helpers/bool-helpers';

import ButtonCombo from 'gadgets/button-combo/widget';
import TextFieldNC from 'gadgets/text-field-nc/widget';
import wrapRawInput from 'goblin-laboratory/widgets/input-wrapper/widget.js';

/******************************************************************************/

class TextFieldComboNC extends Widget {
  constructor() {
    super(...arguments);

    this.state = {
      focus: false,
    };

    this.doChangeCombo = this.doChangeCombo.bind(this);
    this.doChangeTextField = this.doChangeTextField.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onEscKey = this.onEscKey.bind(this);
    this.onUpKey = this.onUpKey.bind(this);
    this.onDownKey = this.onDownKey.bind(this);
    this.onEnterKey = this.onEnterKey.bind(this);
    this.setListRef = this.setListRef.bind(this);
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

  onFocus() {
    MouseTrap.bind('up', this.onUpKey, 'keydown');
    MouseTrap.bind('down', this.onDownKey, 'keydown');
    MouseTrap.bind('enter', this.onEnterKey, 'keydown');
    MouseTrap.bind('esc', this.onEscKey, 'keydown');
    this.setState({
      focus: true,
    });
    if (this.props.onFocus) {
      this.props.onFocus(this.props.selectedId);
    }
  }

  onBlur() {
    MouseTrap.unbind('up');
    MouseTrap.unbind('down');
    MouseTrap.unbind('enter');
    MouseTrap.unbind('esc');
    this.setState({
      focus: false,
    });
    if (this.props.onBlur) {
      this.props.onBlur(this.props.selectedId);
    }
  }

  onUpKey() {
    if (this.buttonComboRef) {
      this.buttonComboRef.showCombo();
    }
    if (this.listRef) {
      this.listRef.onUpKey();
    }
  }

  onDownKey() {
    if (this.buttonComboRef) {
      this.buttonComboRef.showCombo();
    }
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
      this.list = this.list.map(item => {
        switch (typeof item) {
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
    const textFieldShapes = {
      smooth: 'left-smooth',
      rounded: 'left-rounded',
    };
    const textFieldShape = textFieldShapes[shape];

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

    let TextComponent = TextFieldNC;
    if (this.props.renderTextField) {
      TextComponent = this.prop.renderTextField;
    }
    return (
      <TextComponent
        hintText={this.props.hintText}
        tooltip={this.props.tooltip}
        horizontalSpacing="overlap"
        shape={textFieldShape}
        flyingBalloonAnchor={this.props.flyingBalloonAnchor}
        value={value}
        glyph={glyph}
        width={this.props.fieldWidth}
        grow={this.props.fieldWidth ? null : '1'}
        rows={this.props.rows}
        readonly={this.props.restrictsToList}
        changeMode={'passthrough'}
        disabled={this.props.disabled}
        required={this.props.required}
        embeddedFocus="true"
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
    if (Bool.isFalse(this.props.show)) {
      return null;
    }

    if (this.props.list !== this.previousList) {
      this.convertList();
      this.previousList = this.props.list;
    }

    return (
      <ButtonCombo
        width={this.props.width}
        grow={this.props.grow}
        menuType={this.props.menuType}
        menuItemWidth={this.props.menuItemWidth}
        menuItemTooltips={this.props.menuItemTooltips}
        readonly={this.props.readonly}
        restrictsToList={this.props.restrictsToList}
        disabled={this.props.disabled}
        onShowCombo={this.props.onShowCombo}
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

export default wrapRawInput(TextFieldComboNC, 'selectedId');
