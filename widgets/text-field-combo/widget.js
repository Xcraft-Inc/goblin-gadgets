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

    // @DR: Don't do this: setting the value as a `prop` rather than through
    // its state breaks React's forceUpdate() optimizations on the child
    // <input> element:
    //  const value          = this.read ('value');

    // @DR: We should remove the `selected-value` property altogether and
    // use the state (based on `value`) instead; but since I am not sure
    // of all the implications, I prefer not to touch this logic for now:
    const selectedValue = this.props['selected-value'];

    const hintText = this.props['hint-text'];
    const tooltip = this.props.tooltip;
    const flyingBalloonAnchor = this.props['flying-balloon-anchor'];
    const rows = this.props.rows;
    const readonly = this.props.readonly;
    const selectAllOnFocus = this.props['select-all-on-focus'];
    const defaultFocus = this.props['default-focus'];
    const filterKeys = this.props['filter-keys'];
    const tabIndex = this.props['tab-index'];

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
      value: this.props.value,
      hinter: this.props.hinter,
      'hint-text': hintText,
      tooltip: tooltip,
      'filter-keys': filterKeys,
      spacing: 'overlap',
      shape: textFieldShape,
      'flying-balloon-anchor': flyingBalloonAnchor,
      'tab-index': tabIndex,
      width: width,
      rows: rows,
      readonly: visibleReadonly,
      'select-all-on-focus': selectAllOnFocus,
      'default-focus': defaultFocus,
    };

    if (displayValue) {
      props.value = displayValue;
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
    const glyph = this.props['combo-glyph'];

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
        on-click={::this.onButtonClicked}
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
    const {state} = this.props;
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
