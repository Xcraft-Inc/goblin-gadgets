import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';

import Button from 'goblin-gadgets/widgets/button/widget';
import FlatList from 'goblin-gadgets/widgets/flat-list/widget';
import ComboContainer from 'goblin-gadgets/widgets/combo-container/widget';
import Calendar from 'goblin-gadgets/widgets/calendar/widget';
import ClockCombo from 'goblin-gadgets/widgets/clock-combo/widget';
import ColorPicker from 'goblin-gadgets/widgets/color-picker/widget';
import {
  date as DateConverters,
  time as TimeConverters,
  color as ColorConverters,
} from 'xcraft-core-converters';
import * as styles from './styles';

/******************************************************************************/

export default class ButtonCombo extends Widget {
  constructor() {
    super(...arguments);
    this.styles = styles;

    this.state = {
      showCombo: false,
    };

    this.comboLocation = null;
    this.showCombo = this.showCombo.bind(this);
    this.hideCombo = this.hideCombo.bind(this);
    this.setRef = this.setRef.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleDateClicked = this.handleDateClicked.bind(this);
    this.handleTimeChanged = this.handleTimeChanged.bind(this);
    this.handleColorChanged = this.handleColorChanged.bind(this);
  }

  setRef(node) {
    this.node = node;
  }

  showCombo() {
    this.setState({
      showCombo: true,
    });

    if (this.props.onShowCombo) {
      this.props.onShowCombo();
    }

    window.document.showCombo = true;
  }

  hideCombo() {
    this.setState({
      showCombo: false,
    });

    if (this.props.onHideCombo) {
      this.props.onHideCombo();
    }

    if (
      this.props.comboType === 'color' &&
      this.props.changeComboMode === 'whenClosed'
    ) {
      if (this.props.onColorChanged) {
        this.props.onColorChanged(this.color);
      }
    }

    window.document.showCombo = false;
  }

  onChange(item) {
    if (this.props.onChange) {
      this.props.onChange(item);
    }
    this.hideCombo();
  }

  handleDateClicked(date) {
    if (this.props.onDateClicked) {
      this.props.onDateClicked(date);
    }
    this.hideCombo();
  }

  handleTimeChanged(time) {
    if (this.props.onTimeChanged) {
      this.props.onTimeChanged(time);
    }
  }

  handleColorChanged(color) {
    if (this.props.changeComboMode === 'whenClosed') {
      this.color = color;
    } else {
      if (this.props.onColorChanged) {
        this.props.onColorChanged(color);
      }
    }
  }

  /******************************************************************************/

  renderButtonColor() {
    const color = ColorConverters.toRGB(this.props.value);

    return (
      <Button
        width={this.props.width}
        active={true}
        activeColor={color}
        tooltip={this.props.tooltip}
        onClick={() => (this.props.readonly ? null : this.showCombo())}
      />
    );
  }

  renderButton() {
    if (this.props.comboType === 'color') {
      return this.renderButtonColor();
    }

    if (this.props.readonly || this.props.hideButtonCombo) {
      return;
    }

    let glyph = this.state.showCombo ? 'solid/caret-up' : 'solid/caret-down';
    if (this.props.comboGlyph) {
      glyph = this.state.showCombo
        ? this.props.comboGlyphHide || this.props.comboGlyph
        : this.props.comboGlyph;
    }

    const shape = this.props.shape || 'smooth';
    const buttonShapes = {
      smooth: 'right-smooth',
      rounded: 'right-rounded',
    };
    const buttonShape = buttonShapes[shape];

    return (
      <Button
        kind="combo"
        vpos="top"
        glyph={glyph}
        glyphSize="120%"
        shape={buttonShape}
        disabled={this.props.disabled || this.props.readonly}
        onClick={this.showCombo}
      />
    );
  }

  renderComboList() {
    return (
      <ComboContainer
        parentRect={this.props.parentRect}
        show={this.state.showCombo}
        positionRef={this.node}
        onClose={this.hideCombo}
      >
        <FlatList
          list={this.props.list}
          selectedId={this.props.selectedId}
          menuType={this.props.menuType}
          menuItemWidth={this.props.menuItemWidth}
          onChange={this.onChange}
          onEscKey={this.hideCombo}
          ref={this.props.setListRef}
          containerWidth={this.node ? this.node.offsetWidth : undefined}
        />
      </ComboContainer>
    );
  }

  renderComboCalendar() {
    let date = this.props.value;
    if (!date) {
      date = DateConverters.getNowCanonical();
    }

    return (
      <ComboContainer
        parentRect={this.props.parentRect}
        show={this.state.showCombo}
        positionRef={this.node}
        onClose={this.hideCombo}
      >
        <Calendar
          margin={this.context.theme.spacing.lineSpacing}
          frame={false}
          shadow={true}
          visibleDate={date}
          startDate={this.props.minDate}
          endDate={this.props.maxDate}
          dates={this.props.value ? [this.props.value] : null}
          useTips={this.props.useTips !== undefined ? this.props.useTips : true}
          dateClicked={this.handleDateClicked}
          onEscKey={this.hideCombo}
        />
      </ComboContainer>
    );
  }

  renderComboClock() {
    const time = this.props.value || TimeConverters.getNowCanonical();

    return (
      <ComboContainer
        parentRect={this.props.parentRect}
        show={this.state.showCombo}
        positionRef={this.node}
        onClose={this.hideCombo}
      >
        <ClockCombo time={time} onChange={this.handleTimeChanged} />
      </ComboContainer>
    );
  }

  renderComboColor() {
    const color = this.props.value;

    return (
      <ComboContainer
        parentRect={this.props.parentRect}
        show={this.state.showCombo}
        positionRef={this.node}
        onClose={this.hideCombo}
      >
        <ColorPicker
          color={color}
          width="500px"
          onChange={this.handleColorChanged}
        />
      </ComboContainer>
    );
  }

  renderCombo() {
    switch (this.props.comboType) {
      case 'calendar':
        return this.renderComboCalendar();
      case 'clock':
        return this.renderComboClock();
      case 'color':
        return this.renderComboColor();
      default:
        return this.renderComboList();
    }
  }

  render() {
    if (this.props.show === false) {
      return null;
    }

    const boxClass = this.state.showCombo
      ? this.styles.classNames.shadowBox
      : this.props.focus
      ? this.styles.classNames.focusedBox
      : this.styles.classNames.box;

    return (
      <span
        ref={this.setRef}
        onClick={
          this.props.restrictsToList &&
          !this.props.readonly &&
          !this.state.showCombo
            ? this.showCombo
            : undefined
        }
        disabled={this.props.disabled || this.props.readonly}
        className={boxClass}
      >
        {this.props.children}
        {this.renderButton()}
        {this.renderCombo()}
      </span>
    );
  }
}

/******************************************************************************/
