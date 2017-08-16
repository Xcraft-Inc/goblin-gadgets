import React from 'react';
import ReactDOM from 'react-dom';
import Widget from 'laboratory/widget';
import * as ComboHelpers from '../helpers/combo-helpers.js';

import Button from 'gadgets/button/widget';
import TextField from 'gadgets/text-field/widget';
import Combo from 'gadgets/combo/widget';
import Select from 'gadgets/select/widget';

/******************************************************************************/

class TextFieldCombo extends Widget {
  constructor () {
    super (...arguments);
    this.state = {
      showCombo: false,
      readonly: true,
    };
    this.comboLocation = null;
  }

  get showCombo () {
    return this.state.showCombo;
  }

  set showCombo (value) {
    this.setState ({
      showCombo: value,
    });
  }

  get readonly () {
    return this.state.readonly;
  }

  set readonly (value) {
    this.setState ({
      readonly: value,
    });
  }

  doShowCombo () {
    const node = ReactDOM.findDOMNode (this);

    this.comboLocation = ComboHelpers.getComboLocation (
      node,
      this.context.theme,
      'flying-balloon'
    );

    this.selectLocation = ComboHelpers.getSelectLocation (
      node,
      this.context.theme
    );

    this.showCombo = true;
  }

  onHideCombo () {
    this.showCombo = false;
  }

  // Called when the combo button is clicked.
  onButtonClicked () {
    const list = this.props.list;
    if (list) {
      this.doShowCombo ();
    }
  }

  onChange (e) {
    this.onChange (e);
    const x = this.props.onChange;
    if (x) {
      x (e);
    }
  }

  onFocus () {
    this.readonly = false;
  }

  onBlur () {
    this.readonly = true;
  }

  onMouseDown () {
    if (this.props.readonly === 'true') {
      this.onButtonClicked ();
    }
  }

  setText (text) {
    const x = this.props.onSetText;
    if (x) {
      x (text.text); // FIXME???
    }
  }

  renderTextField () {
    const autoReadonly =
      this.readonly &&
      this.props.selectedValue &&
      this.props.selectedValue !== '';
    const displayValue = autoReadonly ? this.props.selectedValue : null;
    const visibleReadonly = this.props.readonly
      ? this.props.readonly
      : autoReadonly ? 'true' : 'false';

    const s = this.props.shape ? this.props.shape : 'smooth';
    const textFieldShapes = {
      smooth: 'left-smooth',
      rounded: 'left-rounded',
    };
    const textFieldShape = textFieldShapes[s];

    const props = {
      model: this.props.model,
      parser: this.props.parser,
      errors: this.props.errors,
      updateOn: this.props.updateOn,
      getDisplayValue: this.props.getDisplayValue,
      hinter: this.props.hinter,
      hintText: this.props.hintText,
      tooltip: this.props.tooltip,
      filterKeys: this.props.filterKeys,
      spacing: 'overlap',
      shape: textFieldShape,
      flyingBalloonAnchor: this.props.flyingBalloonAnchor,
      tabIndex: this.props.tabIndex,
      defaultValue: this.props.defaultValue,
      grow: '1',
      rows: this.props.rows,
      readonly: visibleReadonly,
      selectAllOnFocus: this.props.selectAllOnFocus,
      defaultFocus: this.props.defaultFocus,
      visibility: this.props.visibility,
    };

    if (displayValue) {
      props.displayValue = displayValue;
    }

    return (
      <TextField
        {...props}
        onFocus={::this.onFocus}
        onBlur={::this.onBlur}
        onMouseDown={::this.onMouseDown}
      />
    );
  }

  renderButton () {
    const shape = this.props.shape;
    let glyph = this.showCombo ? 'caret-up' : 'caret-down';
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
        shape={buttonShape}
        onClick={::this.onButtonClicked}
      />
    );
  }

  renderComboCombo (list, menuType, menuItemWidth) {
    const x = [];
    for (var item of list) {
      const glyph = this.props.defaultValue === item ? 'check' : 'none';
      x.push ({
        text: item,
        glyph: glyph,
        action: item => this.setText (item),
      });
    }
    return (
      <Combo
        menuType={menuType}
        menuItemWidth={menuItemWidth}
        center={this.comboLocation.center}
        top={this.comboLocation.top}
        bottom={this.comboLocation.bottom}
        maxHeight={this.comboLocation.maxHeight}
        list={x}
        comboTextTransform={this.props.comboTextTransform}
        close={::this.onHideCombo}
      />
    );
  }

  renderComboSelect (list, menuType, menuItemWidth) {
    const x = [];
    let index = 0;
    let defaultIndex = null;
    for (var item of list) {
      if (this.props.defaultValue === item) {
        defaultIndex = index;
      }
      x.push ({
        text: item,
        action: item => this.setText (item),
      });
      index++;
    }
    return (
      <Select
        menuType={menuType}
        menuItemWidth={menuItemWidth}
        left={this.selectLocation.left}
        width={this.selectLocation.width}
        top={this.selectLocation.top}
        bottom={this.selectLocation.bottom}
        maxHeight={this.selectLocation.maxHeight}
        list={x}
        defaultIndex={defaultIndex}
        comboTextTransform={this.props.comboTextTransform}
        close={::this.onHideCombo}
      />
    );
  }

  renderCombo () {
    const list = this.props.list;
    if (list && this.showCombo) {
      let menuType = this.props.menuType;
      let menuItemWidth = this.props.menuItemWidth;
      if (!menuType || menuType === 'auto') {
        const long = list.size > 30;
        menuType = long ? 'wrap' : 'select';
        if (!long) {
          menuItemWidth = null;
        }
      }
      if (menuType === 'combo' || menuType === 'wrap') {
        return this.renderComboCombo (list, menuType, menuItemWidth);
      } else {
        return this.renderComboSelect (list, menuType, menuItemWidth);
      }
    } else {
      return null;
    }
  }

  render () {
    if (this.props.show === 'false') {
      return null;
    }

    const boxClass = this.showCombo
      ? this.styles.classNames.shadowBox
      : this.styles.classNames.box;

    return (
      <span disabled={this.props.disabled} className={boxClass}>
        {this.renderTextField ()}
        {this.renderButton ()}
        {this.renderCombo ()}
      </span>
    );
  }
}

/******************************************************************************/
export default TextFieldCombo;
