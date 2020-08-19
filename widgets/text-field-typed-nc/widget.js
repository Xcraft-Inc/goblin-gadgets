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
  pixel as PixelConverters,
  volume as VolumeConverters,
  number as NumberConverters,
  integer as IntegerConverters,
  double as DoubleConverters,
  percent as PercentConverters,
  delay as DelayConverters,
  color as ColorConverters,
} from 'xcraft-core-converters';
import {
  makePropTypes,
  makeDefaultProps,
} from 'xcraft-core-utils/lib/prop-types';
import TextFieldNC from 'goblin-gadgets/widgets/text-field-nc/widget';
import ButtonCombo from 'goblin-gadgets/widgets/button-combo/widget';
import Button from 'goblin-gadgets/widgets/button/widget';
import Slider from 'goblin-gadgets/widgets/slider/widget';
import Separator from 'goblin-gadgets/widgets/separator/widget';
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

function parseValue(value) {
  if (typeof value === 'string') {
    value = parseFloat(value);
    if (isNaN(value)) {
      value = 0;
    }
  } else if (typeof value === 'number') {
    // ok
  } else {
    value = null;
  }

  return value;
}

/******************************************************************************/

export default class TextFieldTypedNC extends Widget {
  constructor() {
    super(...arguments);

    this.format = this.format.bind(this);
    this.parse = this.parse.bind(this);
    this.check = this.check.bind(this);
    this.handleIncNumber = this.handleIncNumber.bind(this);
    this.handleSliderNumber = this.handleSliderNumber.bind(this);
    this.handleDateClicked = this.handleDateClicked.bind(this);
    this.handleTimeChanged = this.handleTimeChanged.bind(this);
    this.handleUpDown = this.handleUpDown.bind(this);
    this.handleColorChanged = this.handleColorChanged.bind(this);
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
      case 'pixel':
        return PixelConverters.getDisplayed(canonicalValue);
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
      case 'color':
        return ColorConverters.getDisplayed(canonicalValue);
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
      case 'pixel':
        return PixelConverters.parseEdited(displayedValue);
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
      case 'color':
        return ColorConverters.parseEdited(displayedValue);
      default:
        throw new Error(`Invalid type ${this.type}`);
    }
  }

  incEdited(edited, cursorPosition, direction) {
    switch (this.props.type) {
      case 'date':
        return DateConverters.incEdited(
          edited,
          cursorPosition,
          direction,
          1,
          this.props.minDate,
          this.props.maxDate
        );
      case 'time':
        return TimeConverters.incEdited(
          edited,
          cursorPosition,
          direction,
          1,
          this.props.minTime,
          this.props.maxTime
        );
      case 'datetime':
        return DateTimeConverters.incEdited(
          edited,
          cursorPosition,
          direction,
          1,
          this.props.minDate,
          this.props.maxDate
        );
      case 'number':
        return NumberConverters.incEdited(
          edited,
          cursorPosition,
          direction,
          this.props.step,
          this.props.min,
          this.props.max
        );
      case 'integer':
        return IntegerConverters.incEdited(
          edited,
          cursorPosition,
          direction,
          this.props.step,
          this.props.min,
          this.props.max
        );
      case 'percent':
        return PercentConverters.incEdited(
          edited,
          cursorPosition,
          direction,
          this.props.step,
          this.props.min,
          this.props.max
        );
      case 'price':
        return PriceConverters.incEdited(
          edited,
          cursorPosition,
          direction,
          this.props.step,
          this.props.min,
          this.props.max
        );
      case 'pixel':
        return PixelConverters.incEdited(
          edited,
          cursorPosition,
          direction,
          this.props.step,
          this.props.min,
          this.props.max
        );
      default:
        return null;
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
    if (this.props.onChange) {
      this.props.onChange(date);
    }
  }

  handleTimeChanged(time) {
    if (this.props.onChange) {
      this.props.onChange(time);
    }
  }

  handleUpDown(e, onChangeAndSelect) {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      const cursorPosition =
        (e.target.selectionStart + e.target.selectionEnd) / 2;
      const direction = e.key === 'ArrowUp' ? 1 : -1;
      const result = this.incEdited(e.target.value, cursorPosition, direction);
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

  get value() {
    return parseValue(this.props.value);
  }

  get min() {
    return parseValue(this.props.min);
  }

  get max() {
    return parseValue(this.props.max);
  }

  handleIncNumber(direction) {
    if (!this.props.onChange) {
      return;
    }

    let n =
      this.props.value !== null && this.props.value !== undefined
        ? this.props.value
        : this.min || 0;
    n = this.getDisplayed(n);

    const result = this.incEdited(n, 0, direction);
    if (result.edited) {
      n = this.parseEdited(result.edited);
      if (!n.error) {
        this.props.onChange(n.value);
      }
    }
  }

  handleSliderNumber(value) {
    if (!this.props.onChange) {
      return;
    }

    this.props.onChange(value);
  }

  get isPlusEnabled() {
    return this.max === null || this.value === null || this.value < this.max;
  }

  get isMinusEnabled() {
    return this.min === null || this.value === null || this.value > this.min;
  }

  handleColorChanged(color) {
    if (this.props.onChange) {
      this.props.onChange(color);
    }
  }

  /******************************************************************************/

  renderDate(otherProps, width, tooltip, justify, shape) {
    const hideButton = this.props.readonly || this.props.hideButtonCombo;

    return (
      <ButtonCombo
        parentRect={this.props.parentRect}
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
          onKeyDown={this.handleUpDown}
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
          onKeyDown={this.handleUpDown}
        />
      </ButtonCombo>
    );
  }

  renderNumberSlider() {
    if (this.props.min === undefined || this.props.max === undefined) {
      return null;
    }

    return (
      <React.Fragment>
        <Separator kind="exact" height="10px" />
        <Slider
          direction="horizontal"
          grow="1"
          barColor={this.context.theme.palette.base}
          min={this.props.min}
          max={this.props.max}
          step={1}
          changeMode="throttled"
          throttleDelay={20}
          value={this.props.value}
          onChange={this.handleSliderNumber}
        />
      </React.Fragment>
    );
  }

  renderNumber(otherProps, width, tooltip, justify) {
    return (
      <div className={this.styles.classNames.textFieldNCNumber}>
        <div className={this.styles.classNames.textFieldNCNumberField}>
          <TextFieldNC
            {...otherProps}
            width={width}
            tooltip={tooltip}
            justify={justify}
            format={this.format}
            parse={this.parse}
            check={this.check}
            horizontalSpacing="overlap"
            onKeyDown={this.handleUpDown}
          />
          {otherProps.readonly === true ? null : (
            <React.Fragment>
              <Button
                kind="combo"
                glyph="solid/minus"
                horizontalSpacing="overlap"
                disabled={!this.isMinusEnabled}
                onClick={() => this.handleIncNumber(-1)}
              />
              <Button
                kind="combo"
                glyph="solid/plus"
                horizontalSpacing={this.props.horizontalSpacing}
                disabled={!this.isPlusEnabled}
                onClick={() => this.handleIncNumber(1)}
              />
            </React.Fragment>
          )}
        </div>
        {this.renderNumberSlider()}
      </div>
    );
  }

  renderColor(otherProps, width, tooltip) {
    return (
      <ButtonCombo
        width={width}
        tooltip={tooltip}
        grow={this.props.grow}
        comboType="color"
        value={this.props.value}
        minDate={this.props.minDate}
        maxDate={this.props.maxDate}
        readonly={this.props.readonly}
        disabled={this.props.disabled}
        node={this.node}
        horizontalSpacing={this.props.horizontalSpacing}
        shape={this.props.shape}
        comboGlyph="solid/square"
        comboGlyphHide="regular/square"
        hideButtonCombo={this.props.hideButtonCombo}
        ref={this.setButtonComboRef}
        changeComboMode={this.props.changeComboMode}
        onColorChanged={this.handleColorChanged}
      ></ButtonCombo>
    );
  }

  renderDefault(otherProps, width, tooltip, justify) {
    const type = this.props.type;
    if (
      (type === 'price' || type === 'percent' || type === 'pixel') &&
      this.props.step
    ) {
      return this.renderNumber(otherProps, width, tooltip, justify);
    }

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
        type === 'percent' ||
        type === 'pixel'
          ? 'right'
          : 'left';
    }

    if (!width) {
      switch (type) {
        case 'number':
        case 'integer':
        case 'pixel':
          width = '90px';
          break;
        case 'datetime':
          width = '160px';
          break;
        case 'volume':
        case 'delay':
          width = '200px';
          break;
        case 'color':
          width = '50px';
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
      case 'color':
        return this.renderColor(otherProps, width, tooltip);
      default:
        return this.renderDefault(otherProps, width, tooltip, justify);
    }
  }
}

/******************************************************************************/

TextFieldTypedNC.propTypes = makePropTypes(Props);
TextFieldTypedNC.defaultProps = makeDefaultProps(Props);
