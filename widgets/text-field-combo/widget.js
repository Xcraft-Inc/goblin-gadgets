import React from 'react';
import ReactDOM from 'react-dom';
import Widget from 'laboratory/widget';
import * as ComboHelpers from '../helpers/combo-helpers.js';
import * as Bool from '../helpers/boolean-helpers.js';

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

    this.onFocus = this.onFocus.bind (this);
    this.onBlur = this.onBlur.bind (this);
    this.onMouseDown = this.onMouseDown.bind (this);
    this.onButtonClicked = this.onButtonClicked.bind (this);
    this.onHideCombo = this.onHideCombo.bind (this);
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

    const itemCount = this.props.list.size
      ? this.props.list.size
      : this.props.list.length; // FIXME: pouèrk !
    this.comboLocation = ComboHelpers.getComboLocation (
      node,
      this.context.theme.shapes.flyingBalloonTriangleSize,
      this.context.theme.shapes.flyingBalloonPadding,
      itemCount,
      this.props.menuItemWidth,
      this.context.theme.shapes.menuButtonHeight // height of Button kind='combo-wrap-item'
    );

    this.selectLocation = ComboHelpers.getSelectLocation (
      node,
      this.context.theme.shapes.flyingBalloonTriangleSize,
      this.context.theme.shapes.flyingBalloonPadding
    );

    this.showCombo = true;
  }

  onHideCombo () {
    this.showCombo = false;
  }

  // Called when the combo button is clicked.
  onButtonClicked () {
    if (this.props.list) {
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
    if (Bool.isTrue (this.props.readonly)) {
      this.onButtonClicked ();
    }
  }

  setText (item) {
    const x = this.props.onSetText;
    if (x) {
      x (item.text);
    }
  }

  getItem (item) {
    if (typeof item === 'string') {
      const active = this.props.defaultValue === item;
      if (this.props.menuType === 'wrap') {
        return {
          text: item,
          active: Bool.toString (active),
          action: x => this.setText (x),
        };
      } else {
        return {
          text: item,
          glyph: active ? 'check' : 'none',
          active: Bool.toString (active),
          action: x => this.setText (x),
        };
      }
    } else {
      const active = this.props.defaultValue === item.text;
      if (this.props.menuType === 'wrap') {
        return {
          text: item.text,
          glyph: item.glyph,
          active: Bool.toString (active),
          action: x => this.setText (x),
        };
      } else {
        return {
          text: item.text,
          glyph: active ? 'check' : 'none',
          active: Bool.toString (active),
          action: x => this.setText (x),
        };
      }
    }
  }

  renderTextField () {
    const autoReadonly =
      this.readonly &&
      this.props.selectedValue &&
      this.props.selectedValue !== '';
    const displayValue = autoReadonly ? this.props.selectedValue : null;
    const visibleReadonly = Bool.isTrue (this.props.readonly)
      ? Bool.isTrue (this.props.readonly)
      : autoReadonly;

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
      readonly: Bool.toString (visibleReadonly),
      selectAllOnFocus: this.props.selectAllOnFocus,
      defaultFocus: this.props.defaultFocus,
      visibility: this.props.visibility,
    };

    if (displayValue) {
      props.value = displayValue;
    }

    return (
      <TextField
        {...props}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        onMouseDown={this.onMouseDown}
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
        focusable="true"
        glyph={glyph}
        shape={buttonShape}
        onClick={this.onButtonClicked}
      />
    );
  }

  renderComboCombo (list) {
    const x = [];
    for (var item of list) {
      x.push (this.getItem (item));
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

  renderComboSelect (list) {
    const x = [];
    let index = 0;
    let defaultIndex = null;
    if (typeof list[0] === 'string') {
      for (var item of list) {
        if (this.props.defaultValue === item) {
          defaultIndex = index;
        }
        x.push ({
          text: item,
          action: x => this.setText (x),
        });
        index++;
      }
    } else {
      for (var item of list) {
        if (this.props.defaultValue === item.text) {
          defaultIndex = index;
        }
        x.push ({
          text: item.text,
          action: x => this.setText (x),
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

  renderCombo () {
    const list = this.props.list;
    if (list && this.showCombo) {
      if (this.props.menuType === 'combo' || this.props.menuType === 'wrap') {
        return this.renderComboCombo (list);
      } else {
        return this.renderComboSelect (list);
      }
    } else {
      return null;
    }
  }

  render () {
    if (Bool.isFalse (this.props.show)) {
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
