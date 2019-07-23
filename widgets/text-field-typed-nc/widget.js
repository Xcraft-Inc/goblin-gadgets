//T:2019-02-27

import React from 'react';
import Widget from 'laboratory/widget';
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
  percent as PercentConverters,
  delay as DelayConverters,
} from 'xcraft-core-converters';
import {
  makePropTypes,
  makeDefaultProps,
} from 'xcraft-core-utils/lib/prop-types';
import TextFieldNC from '../text-field-nc/widget';
import Props from './props';

/******************************************************************************/

export default class TextFieldTypedNC extends Widget {
  constructor() {
    super(...arguments);

    this.format = this.format.bind(this);
    this.parse = this.parse.bind(this);
    this.check = this.check.bind(this);
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
        return PriceConverters.parseEdited(displayedValue);
      case 'weight':
        return WeightConverters.parseEdited(displayedValue, this.props.unit);
      case 'length':
        return LengthConverters.parseEdited(displayedValue, this.props.unit);
      case 'volume':
        return VolumeConverters.parseEdited(displayedValue, this.props.unit);
      case 'number':
        return NumberConverters.parseEdited(displayedValue);
      case 'percent':
        return PercentConverters.parseEdited(displayedValue);
      case 'delay':
        return DelayConverters.parseEdited(displayedValue, this.props.unit);
      default:
        throw new Error(`Invalid type ${this.type}`);
    }
  }

  format(value) {
    return this.getDisplayed(value);
  }

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
        type === 'percent'
          ? 'right'
          : 'left';
    }

    if (!width) {
      switch (type) {
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
}

/******************************************************************************/

TextFieldTypedNC.propTypes = makePropTypes(Props);
TextFieldTypedNC.defaultProps = makeDefaultProps(Props);
