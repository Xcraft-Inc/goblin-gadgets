import React from 'react';
import ReactDOM from 'react-dom';
import Widget from 'laboratory/widget';
import * as ComboHelpers from '../helpers/combo-helpers.js';

import Button from 'gadgets/button/widget';
import TextField from 'gadgets/text-field/widget';
import Combo from 'gadgets/combo/widget';

/******************************************************************************/

class TextFieldCombo extends Widget {
  constructor (props) {
    super (props);
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
      this.props.theme,
      'flying-balloon'
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
    const readonly = this.props.readonly;
    if (readonly === 'true') {
      this.onButtonClicked ();
    }
  }

  renderTextField () {
    const width = this.props.width;
    const shape = this.props.shape;
    const selectedValue = this.props.selectedValue;

    const hintText = this.props.hintText;
    const tooltip = this.props.tooltip;
    const flyingBalloonAnchor = this.props.flyingBalloonAnchor;
    const rows = this.props.rows;
    const readonly = this.props.readonly;
    const selectAllOnFocus = this.props.selectAllOnFocus;
    const defaultFocus = this.props.defaultFocus;
    const filterKeys = this.props.filterKeys;
    const tabIndex = this.props.tabIndex;

    const autoReadonly = this.readonly && selectedValue && selectedValue !== '';
    const displayValue = autoReadonly ? selectedValue : null;
    const visibleReadonly = readonly
      ? readonly
      : autoReadonly ? 'true' : 'false';

    const s = shape ? shape : 'smooth';
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
      hintText: hintText,
      tooltip: tooltip,
      filterKeys: filterKeys,
      spacing: 'overlap',
      shape: textFieldShape,
      flyingBalloonAnchor: flyingBalloonAnchor,
      tabIndex: tabIndex,
      defaultValue: this.props.defaultValue,
      width: width,
      rows: rows,
      readonly: visibleReadonly,
      selectAllOnFocus: selectAllOnFocus,
      defaultFocus: defaultFocus,
    };

    if (displayValue) {
      props.displayValue = displayValue;
    }

    const isComboVisible = this.showCombo ? 'true' : 'false';

    return (
      <TextField
        {...props}
        active={isComboVisible}
        onFocus={::this.onFocus}
        onBlur={::this.onBlur}
        onMouseDown={::this.onMouseDown}
      />
    );
  }

  renderButton () {
    const shape = this.props.shape;
    const glyph = this.props.comboGlyph;

    const s = shape ? shape : 'smooth';
    const buttonShapes = {
      smooth: 'right-smooth',
      rounded: 'right-rounded',
    };
    const buttonShape = buttonShapes[s];

    const isComboVisible = this.showCombo ? 'true' : 'false';

    return (
      <Button
        kind="combo"
        glyph={glyph}
        shape={buttonShape}
        active={isComboVisible}
        onClick={::this.onButtonClicked}
      />
    );
  }

  renderCombo () {
    const list = this.props.list;
    if (list && this.showCombo) {
      return (
        <Combo
          center={::this.comboLocation.center}
          top={::this.comboLocation.top}
          bottom={::this.comboLocation.bottom}
          list={list}
          close={::this.onHideCombo}
        />
      );
    } else {
      return null;
    }
  }

  render () {
    const disabled = this.props.disabled;
    const boxClass = this.styles.classNames.box;

    return (
      <span disabled={disabled} className={boxClass}>
        {this.renderTextField ()}
        {this.renderButton ()}
        {this.renderCombo ()}
      </span>
    );
  }
}

/******************************************************************************/
export default TextFieldCombo;
