import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import T from 't';
import {
  date as DateConverters,
  time as TimeConverters,
  datetime as DateTimeConverters,
  price as PriceConverters,
  weight as WeightConverters,
  length as LengthConverters,
  volume as VolumeConverters,
  number as NumberConverters,
  integer as IntegerConverters,
  double as DoubleConverters,
  percent as PercentConverters,
  delay as DelayConverters,
} from 'xcraft-core-converters';
import {
  makePropTypes,
  makeDefaultProps,
} from 'xcraft-core-utils/lib/prop-types';
import TextFieldNC from 'goblin-gadgets/widgets/text-field-nc/widget';
import ButtonCombo from 'goblin-gadgets/widgets/button-combo/widget';
import Button from 'goblin-gadgets/widgets/button/widget';
import Props from './props';

/******************************************************************************/

function getTextFieldShape(shape, hideButton) {
  const textFieldShapes = hideButton
    ? {
        smooth: 'smooth',
        rounded: 'rounded',
      }
    : {
        smooth: 'left-smooth',
        rounded: 'left-rounded',
      };
  return textFieldShapes[shape || 'smooth'];
}

/******************************************************************************/

export default class TextFieldTypedNC extends Widget {
  constructor() {
    super(...arguments);

    this.format = this.format.bind(this);
    this.parse = this.parse.bind(this);
    this.check = this.check.bind(this);
    this.incNumber = this.incNumber.bind(this);
    this.handleDateClicked = this.handleDateClicked.bind(this);
    this.handleTimeChanged = this.handleTimeChanged.bind(this);
    this.handleDateUpDown = this.handleDateUpDown.bind(this);
    this.handleTimeUpDown = this.handleTimeUpDown.bind(this);
  }

  getDisplayed(canonicalValue) {
    switch (this.props.type) {
      case 'date':
        return DateConverters.getDisplayed(canonicalValue);
      case 'time':
        return TimeConverters.getDisplayed(canonicalValue);
      case 'datetime':
        return DateTimeConverters.getDisplayed(canonicalValue);
      case 'price':
        return PriceConverters.getDisplayed(canonicalValue);
      case 'weight':
        return WeightConverters.getDisplayed(canonicalValue, this.props.unit);
      case 'length':
        return LengthConverters.getDisplayed(canonicalValue, this.props.unit);
      case 'volume':
        return VolumeConverters.getDisplayed(canonicalValue, this.props.unit);
      case 'number':
        return NumberConverters.getDisplayed(
          canonicalValue,
          this.props.decimals
        );
      case 'integer':
        return IntegerConverters.getDisplayed(canonicalValue);
      case 'double':
        return DoubleConverters.getDisplayed(canonicalValue);
      case 'percent':
        return PercentConverters.getDisplayed(
          canonicalValue,
          this.props.decimals
        );
      case 'delay':
        return DelayConverters.getDisplayed(canonicalValue, this.props.unit);
      default:
        throw new Error(`Invalid type ${this.props.type}`);
    }
  }

  parseEdited(displayedValue) {
    if (
      this.props.required &&
      (displayedValue === null ||
        displayedValue === undefined ||
        displayedValue === '')
    ) {
      return {value: this.props.defaultValue, error: T('Champ requis')};
    }

    switch (this.props.type) {
      case 'date':
        return DateConverters.parseEdited(
          displayedValue,
          null,
          this.props.minDate,
          this.props.maxDate,
          this.props.mode
        );
      case 'time':
        return TimeConverters.parseEdited(
          displayedValue,
          '12:00:00',
          this.props.minTime,
          this.props.maxTime,
          this.props.mode
        );
      case 'datetime':
        return DateTimeConverters.parseEdited(
          displayedValue,
          null,
          this.props.defaultDate,
          this.props.defaultTime,
          this.props.minDate,
          this.props.minDate,
          this.props.maxDate,
          this.props.mode
        );
      case 'price':
        return PriceConverters.parseEdited(
          displayedValue,
          this.props.min,
          this.props.max
        );
      case 'weight':
        return WeightConverters.parseEdited(displayedValue, this.props.unit);
      case 'length':
        return LengthConverters.parseEdited(displayedValue, this.props.unit);
      case 'volume':
        return VolumeConverters.parseEdited(displayedValue, this.props.unit);
      case 'number':
        return NumberConverters.parseEdited(
          displayedValue,
          this.props.min,
          this.props.max
        );
      case 'integer':
        return IntegerConverters.parseEdited(
          displayedValue,
          this.props.min,
          this.props.max
        );
      case 'double':
        return DoubleConverters.parseEdited(
          displayedValue,
          this.props.min,
          this.props.max
        );
      case 'percent':
        return PercentConverters.parseEdited(
          displayedValue,
          this.props.min,
          this.props.max
        );
      case 'delay':
        return DelayConverters.parseEdited(displayedValue, this.props.unit);
      default:
        throw new Error(`Invalid type ${this.type}`);
    }
  }

  // Called by InputWrapper.
  format(value) {
    return this.getDisplayed(value);
  }

  // Called by InputWrapper.
  parse(value) {
    return this.parseEdited(value).value;
  }

  check(value) {
    const {value: parsedValue, error} = this.parseEdited(value);
    const finalValue = this.getDisplayed(parsedValue);
    let info;
    if (finalValue !== value) {
      info = finalValue;
    }
    return {
      info,
      warning: error,
    };
  }

  handleDateClicked(date) {
    this.props.onChange(date);
  }

  handleTimeChanged(time) {
    this.props.onChange(time);
  }

  handleDateUpDown(e, onChangeAndSelect) {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      const cursorPosition =
        (e.target.selectionStart + e.target.selectionEnd) / 2;
      const inc = e.key === 'ArrowUp' ? 1 : -1;
      const result = DateConverters.incEdited(
        e.target.value,
        cursorPosition,
        inc
      );
      if (result.edited) {
        onChangeAndSelect(
          result.edited,
          result.selectionStart,
          result.selectionEnd
        );
      }
      e.preventDefault();
    }
  }

  handleTimeUpDown(e, onChangeAndSelect) {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      const cursorPosition =
        (e.target.selectionStart + e.target.selectionEnd) / 2;
      const inc = e.key === 'ArrowUp' ? 1 : -1;
      const result = TimeConverters.incEdited(
        e.target.value,
        cursorPosition,
        inc
      );
      if (result.edited) {
        onChangeAndSelect(
          result.edited,
          result.selectionStart,
          result.selectionEnd
        );
      }
      e.preventDefault();
    }
  }

  incNumber(inc) {
    let n = this.props.value || 0;
    if (typeof n === 'string') {
      n = parseInt(n);
      if (isNaN(n)) {
        n = 0;
      }
    }
    this.props.onChange(n + inc);
  }

  get isPlusEnabled() {
    return (
      this.props.max === null ||
      this.props.max === undefined ||
      this.props.value < this.props.max
    );
  }

  get isMinusEnabled() {
    return (
      this.props.min === null ||
      this.props.min === undefined ||
      this.props.value > this.props.min
    );
  }

  /******************************************************************************/

  renderDate(otherProps, width, tooltip, justify, shape) {
    const hideButton = this.props.readonly || this.props.hideButtonCombo;

    return (
      <ButtonCombo
        width={this.props.width}
        grow={this.props.grow}
        comboType="calendar"
        value={this.props.value}
        minDate={this.props.minDate}
        maxDate={this.props.maxDate}
        readonly={this.props.readonly}
        disabled={this.props.disabled}
        node={this.node}
        horizontalSpacing={this.props.horizontalSpacing}
        shape={this.props.shape}
        comboGlyph="regular/calendar-alt"
        comboGlyphHide="regular/calendar"
        hideButtonCombo={this.props.hideButtonCombo}
        useTips={this.props.useTips}
        ref={this.setButtonComboRef}
        onDateClicked={this.handleDateClicked}
      >
        <TextFieldNC
          {...otherProps}
          width={width}
          tooltip={tooltip}
          justify={justify}
          shape={getTextFieldShape(shape, hideButton)}
          format={this.format}
          parse={this.parse}
          check={this.check}
          horizontalSpacing="overlap"
          onKeyDown={this.handleDateUpDown}
        />
      </ButtonCombo>
    );
  }

  renderTime(otherProps, width, tooltip, justify, shape) {
    const hideButton = this.props.readonly || this.props.hideButtonCombo;

    return (
      <ButtonCombo
        width={this.props.width}
        grow={this.props.grow}
        comboType="clock"
        value={this.props.value}
        minDate={this.props.minDate}
        maxDate={this.props.maxDate}
        readonly={this.props.readonly}
        disabled={this.props.disabled}
        node={this.node}
        horizontalSpacing={this.props.horizontalSpacing}
        shape={this.props.shape}
        comboGlyph="regular/clock"
        comboGlyphHide="regular/circle"
        hideButtonCombo={this.props.hideButtonCombo}
        ref={this.setButtonComboRef}
        onTimeChanged={this.handleTimeChanged}
      >
        <TextFieldNC
          {...otherProps}
          width={width}
          tooltip={tooltip}
          justify={justify}
          shape={getTextFieldShape(shape, hideButton)}
          format={this.format}
          parse={this.parse}
          check={this.check}
          horizontalSpacing="overlap"
          onKeyDown={this.handleTimeUpDown}
        />
      </ButtonCombo>
    );
  }

  renderNumber(otherProps, width, tooltip, justify) {
    return (
      <React.Fragment>
        <TextFieldNC
          {...otherProps}
          width={width}
          tooltip={tooltip}
          justify={justify}
          format={this.format}
          parse={this.parse}
          check={this.check}
          horizontalSpacing="overlap"
        />
        <Button
          kind="combo"
          glyph="solid/minus"
          horizontalSpacing="overlap"
          disabled={!this.isMinusEnabled}
          onClick={() => this.incNumber(-1)}
        />
        <Button
          kind="combo"
          glyph="solid/plus"
          horizontalSpacing={this.props.horizontalSpacing}
          disabled={!this.isPlusEnabled}
          onClick={() => this.incNumber(1)}
        />
      </React.Fragment>
    );
  }

  renderDefault(otherProps, width, tooltip, justify) {
    return (
      <TextFieldNC
        {...otherProps}
        width={width}
        tooltip={tooltip}
        justify={justify}
        format={this.format}
        parse={this.parse}
        check={this.check}
      />
    );
  }

  render() {
    let {
      type,
      unit,
      decimals,
      minDate,
      maxDate,
      minTime,
      maxTime,
      mode,
      defaultDate,
      defaultTime,
      shape,
      justify,
      width,
      tooltip,
      ...otherProps
    } = this.props;

    if (!justify) {
      justify =
        type === 'price' ||
        type === 'weight' ||
        type === 'length' ||
        type === 'number' ||
        type === 'integer' ||
        type === 'double' ||
        type === 'percent'
          ? 'right'
          : 'left';
    }

    if (!width) {
      switch (type) {
        case 'number':
        case 'integer':
          width = '90px';
          break;
        case 'datetime':
          width = '160px';
          break;
        case 'volume':
        case 'delay':
          width = '200px';
          break;
        default:
          width = '120px';
          break;
      }
    }

    if (!tooltip) {
      switch (type) {
        case 'delay':
          tooltip = T(
            '1a = 1 année\n2mo = 2 mois\n3j = 3 jours\n4h = 4 heures\n5m = 5 minutes'
          );
          break;
      }
    }

    switch (type) {
      case 'date':
        return this.renderDate(otherProps, width, tooltip, justify, shape);
      case 'time':
        return this.renderTime(otherProps, width, tooltip, justify, shape);
      case 'number':
      case 'integer':
        return this.renderNumber(otherProps, width, tooltip, justify);
      default:
        return this.renderDefault(otherProps, width, tooltip, justify);
    }
  }
}

/******************************************************************************/

TextFieldTypedNC.propTypes = makePropTypes(Props);
TextFieldTypedNC.defaultProps = makeDefaultProps(Props);
