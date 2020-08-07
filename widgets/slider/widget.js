import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import Props from './props';
import {
  makePropTypes,
  makeDefaultProps,
} from 'xcraft-core-utils/lib/prop-types';
import * as styles from './styles';
import {TranslatableDiv} from 'goblin-nabu/widgets/helpers/element-helpers';
import Label from 'goblin-gadgets/widgets/label/widget';
import wrapRawInput from 'goblin-gadgets/widgets/input-wrapper/widget.js';
import {Unit} from 'goblin-theme';
const px = Unit.toPx;
const pc = Unit.toPc;
const BigNumber = require('bignumber.js');

/******************************************************************************/

const parseFormat = {
  decimalSeparator: '.',
  groupSeparator: '',
  groupSize: 0,
  secondaryGroupSize: 0,
  fractionGroupSeparator: ' ',
  fractionGroupSize: 0,
};

function configBigNumber() {
  BigNumber.config({FORMAT: parseFormat, DECIMAL_PLACES: 9});
}

// See https://github.com/MikeMcl/bignumber.js/
function toRange(value, min, max) {
  if (value.isLessThan(min)) {
    return min;
  }

  if (value.isGreaterThan(max)) {
    return max;
  }

  return value;
}

/******************************************************************************/

class Slider extends Widget {
  constructor() {
    super(...arguments);
    this.styles = styles;

    this.state = {
      isDragging: false,
    };

    this.onDragDown = this.onDragDown.bind(this);
    this.onDragMove = this.onDragMove.bind(this);
    this.onDragUp = this.onDragUp.bind(this);
  }

  //#region get/set
  get isDragging() {
    return this.state.isDragging;
  }
  set isDragging(value) {
    this.setState({
      isDragging: value,
    });
  }
  //#endregion

  get isHorizontal() {
    return this.props.direction === 'horizontal';
  }

  get min() {
    return new BigNumber(this.props.min || 0);
  }

  get max() {
    return new BigNumber(this.props.max || 100);
  }

  get range() {
    return this.max.minus(this.min);
  }

  get step() {
    return new BigNumber(this.props.step || 1);
  }

  // [min..max] -> [0..100]
  valueToSlider(value) {
    configBigNumber();
    value = new BigNumber(value);
    value = value.minus(this.min).dividedBy(this.range).multipliedBy(100);
    value = toRange(value, new BigNumber(0), new BigNumber(100));
    return value.toNumber();
  }

  // [0..100] -> [min..max]
  // prettier-ignore
  sliderToValue(value) {
    configBigNumber();
    value = new BigNumber(value);
    value = value.dividedBy(100).multipliedBy(this.range).plus(this.min);
    value = value.dividedBy(this.step).integerValue(BigNumber.ROUND_HALF_UP).multipliedBy(this.step);
    value = toRange(value, this.min, this.max);
    return value.toNumber();
  }

  changeValue(e, mouse) {
    const rect = this.sliderNode.getBoundingClientRect();
    const sliderThickness = 24; // as defined in style!

    let value;
    if (this.isHorizontal) {
      const left = rect.left + sliderThickness / 2;
      const width = rect.width - sliderThickness;
      value = ((e.clientX - left) * 100) / width;
    } else {
      const bottom = rect.bottom - sliderThickness / 2;
      const height = rect.height - sliderThickness;
      value = ((bottom - e.clientY) * 100) / height;
    }

    value = this.sliderToValue(value);

    // Call input-wrapper:
    switch (mouse) {
      case 'down':
        this.props.onFocus();
        this.props.onChange(value);
        break;
      case 'move':
        this.props.onChange(value);
        break;
      case 'up':
        this.props.onBlur(value);
        break;
    }
  }

  onDragDown(e) {
    if (this.props.onChange && this.sliderNode && !this.props.disabled) {
      e.target.setPointerCapture(e.pointerId);
      this.isDragging = true;
      this.changeValue(e, 'down');
    }
  }

  onDragMove(e) {
    if (this.props.onChange && this.sliderNode && this.isDragging) {
      this.changeValue(e, 'move');
    }
  }

  onDragUp(e) {
    if (this.props.onChange && this.sliderNode && this.isDragging) {
      this.changeValue(e, 'up');
    }
    this.isDragging = false;
    e.target.releasePointerCapture(e.pointerId);
  }

  /******************************************************************************/

  renderRainbowFragment(color1, color2) {
    const a = this.isHorizontal ? '90deg' : '0deg';

    const style = {
      background: `linear-gradient(${a}, ${color1}, ${color2})`,
    };

    return (
      <div
        key={color1}
        className={this.styles.classNames.rainbowFragment}
        style={style}
      />
    );
  }

  renderGlider() {
    if (this.props.gradient === 'rainbow') {
      return (
        <div className={this.styles.classNames.rainbow}>
          <div className={this.styles.classNames.rainbowInside} />
          <div className={this.styles.classNames.rainbowShadow} />
        </div>
      );
    } else {
      return <div className={this.styles.classNames.glider} />;
    }
  }

  renderValue(hasCab, cabValue) {
    if (
      !this.props.displayValue ||
      this.props.displayValue === 'never' ||
      (this.props.displayValue === 'dragging' && !this.isDragging) ||
      !hasCab
    ) {
      return null;
    }

    const style = {};
    if (this.isHorizontal) {
      style.bottom = '10px';
      style.left = `calc(${pc(cabValue)} - 100px)`;
      style.width = '200px';
    } else {
      style.bottom = `calc(${pc(cabValue)} - 25px)`;
      style.right = '10px';
      style.width = '100px';
      style.height = '50px';
    }

    let text = this.props.value;
    if (this.props.getDisplayedValue) {
      text = this.props.getDisplayedValue(text);
    }

    return (
      <div className={this.styles.classNames.value} style={style}>
        <div className={this.styles.classNames.valueLabel}>
          <Label text={text} justify="center" />
        </div>
      </div>
    );
  }

  render() {
    const hasCab = this.props.value !== null && this.props.value !== undefined;
    const cabValue = hasCab ? this.valueToSlider(this.props.value) : null; // 0..100

    const gliderThickness = {
      small: 4,
      default: 8,
      large: 14,
    }[this.props.gliderSize || 'default'];

    let cabThickness = {
      small: 8,
      default: 14,
      large: 18,
    }[this.props.cabSize || 'default'];

    let cabWidth = cabThickness;
    if (this.props.cabType === 'thin') {
      cabWidth = 4;
      cabThickness *= 1.5;
    }

    const barStyle = {};
    const cabStyle = {};

    if (hasCab) {
      if (this.isHorizontal) {
        if (this.props.barPosition === 'end') {
          barStyle.left = pc(cabValue);
          barStyle.width = `calc(${pc(100 - cabValue)} + ${px(
            gliderThickness / 2
          )})`;
        } else {
          barStyle.width = `calc(${pc(cabValue)} + ${px(gliderThickness / 2)})`;
        }
        cabStyle.left = `calc(${pc(cabValue)} - ${px(cabWidth / 2)})`;
      } else {
        if (this.props.barPosition === 'end') {
          barStyle.bottom = pc(cabValue);
          barStyle.height = `calc(${pc(100 - cabValue)} + ${px(
            gliderThickness / 2
          )})`;
        } else {
          barStyle.height = `calc(${pc(cabValue)} + ${px(
            gliderThickness / 2
          )})`;
        }
        cabStyle.bottom = `calc(${pc(cabValue)} - ${px(cabWidth / 2)})`;
      }
    } else {
      barStyle.display = 'none';
      cabStyle.display = 'none';
    }

    return (
      <div
        ref={(node) => (this.sliderNode = node)}
        className={this.styles.classNames.slider}
        onPointerDown={this.onDragDown}
        onPointerMove={this.onDragMove}
        onPointerUp={this.onDragUp}
      >
        <TranslatableDiv title={this.props.tooltip}>
          <div className={this.styles.classNames.inside}>
            {this.renderGlider()}
            <div className={this.styles.classNames.bar} style={barStyle} />
            {this.renderValue(hasCab, cabValue)}
            <div className={this.styles.classNames.cab} style={cabStyle} />
          </div>
        </TranslatableDiv>
      </div>
    );
  }
}

/******************************************************************************/

Slider.propTypes = makePropTypes(Props);
Slider.defaultProps = makeDefaultProps(Props);

/******************************************************************************/

const wrappedSlider = wrapRawInput(Slider);
wrappedSlider.displayName = 'WrappedSlider';

export default wrappedSlider;
