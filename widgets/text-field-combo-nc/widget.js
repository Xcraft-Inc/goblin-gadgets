//T:2019-02-27:Nothing to translate !
import React from 'react';
import Widget from 'laboratory/widget';
import MouseTrap from 'mousetrap';
import * as Bool from 'gadgets/helpers/bool-helpers';
import ButtonCombo from 'gadgets/button-combo/widget';
import TextFieldNC from 'gadgets/text-field-nc/widget';
import {isShredder} from 'xcraft-core-shredder';

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
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onKeyCombo = this.onKeyCombo.bind(this);
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
              active: this.props.selectedId === id,
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
    if (this.props.getGlyph && glyph.glyph === null) {
      glyph = this.props.getGlyph(this.props.selectedId) || null;
    }
    if (this.props.menuType !== 'wrap' || !glyph || !glyph.glyph) {
      glyph = null;
    }

    let value = selectedItem.id || '';

    if (
      (this.props.readonly || this.props.comboReadonly) &&
      selectedItem.text
    ) {
      value = selectedItem.text;
    }

    return (
      <TextFieldNC
        hintText={this.props.hintText}
        tooltip={this.props.tooltip}
        spacing={'overlap'}
        shape={textFieldShape}
        flyingBalloonAnchor={this.props.flyingBalloonAnchor}
        value={value}
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

  render() {
    if (Bool.isFalse(this.props.show)) {
      return null;
    }

    this.convertList();

    return (
      <ButtonCombo
        menuType={this.props.menuType}
        menuItemWidth={this.props.menuItemWidth}
        menuItemTooltips={this.props.menuItemTooltips}
        readonly={this.props.readonly}
        disabled={this.props.disabled}
        onShowCombo={this.props.onShowCombo}
        node={this.node}
        list={this.list}
        shape={this.props.shape}
        comboGlyph={this.props.comboGlyph}
        comboTextTransform={this.props.comboTextTransform}
        focus={this.state.focus}
        grow={this.props.grow}
        hideButtonCombo={this.props.hideButtonCombo}
      >
        {this.renderTextField()}
      </ButtonCombo>
    );
  }
}

/******************************************************************************/
export default TextFieldComboNC;
