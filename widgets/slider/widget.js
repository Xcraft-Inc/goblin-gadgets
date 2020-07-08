import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import Props from './props';
import {
  makePropTypes,
  makeDefaultProps,
} from 'xcraft-core-utils/lib/prop-types';
import * as styles from './styles';
import {TranslatableDiv} from 'nabu/helpers/element-helpers';
import Label from 'goblin-gadgets/widgets/label/widget';
import wrapRawInput from 'goblin-gadgets/widgets/input-wrapper/widget.js';

/******************************************************************************/

function px(n) {
  return n + 'px';
}

function pc(n) {
  return n + '%';
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

  valueToSlider(value) {
    const min = this.props.min || 0;
    const max = this.props.max || 100;

    const s = min;
    const d = max - min;
    value = ((value - s) / d) * 100;

    value = Math.max(value, 0);
    value = Math.min(value, 100);

    return value;
  }

  sliderToValue(value) {
    const min = this.props.min || 0;
    const max = this.props.max || 100;

    const s = min;
    const d = max - min;
    value = s + (value / 100) * d;

    const step = this.props.step || 1;
    value = Math.round(value / step) * step;

    value = Math.max(value, min);
    value = Math.min(value, max);

    return value;
  }

  changeValue(e, mouse) {
    const rect = this.sliderNode.getBoundingClientRect();
    const sliderThickness = 24; // as defined in style!

    let value;
    if (this.props.direction === 'horizontal') {
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
  }

  /******************************************************************************/

  renderRainbowFragment(color1, color2) {
    const horizontal = this.props.direction === 'horizontal';
    const a = horizontal ? '90deg' : '0deg';

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

  renderTooltip(hasCab, cabValue) {
    if (
      !this.props.displayTooltipWhileDragging ||
      !hasCab ||
      !this.isDragging
    ) {
      return null;
    }

    const style = {};
    if (this.props.direction === 'horizontal') {
      style.top = '20px';
      style.left = `calc(${pc(cabValue)} - 100px)`;
      style.width = '200px';
    } else {
      style.bottom = `calc(${pc(cabValue)} - 25px)`;
      style.left = '20px';
      style.width = '100px';
      style.height = '50px';
    }

    let text = this.props.value;
    if (this.props.formatTooltip) {
      text = this.props.formatTooltip(text);
    }

    return (
      <div className={this.styles.classNames.tooltip} style={style}>
        <div className={this.styles.classNames.tooltipLabel}>
          <Label text={text} justify="center" />
        </div>
      </div>
    );
  }

  renderWhileDragging() {
    if (!this.isDragging || !this.sliderNode) {
      return null;
    }

    return (
      <div
        className={this.styles.classNames.fullscreen}
        onMouseMove={this.onDragMove}
        onMouseUp={this.onDragUp}
      />
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
      if (this.props.direction === 'horizontal') {
        barStyle.width = `calc(${pc(cabValue)} + ${px(gliderThickness / 2)})`;
        cabStyle.left = `calc(${pc(cabValue)} - ${px(cabWidth / 2)})`;
      } else {
        barStyle.height = `calc(${pc(cabValue)} + ${px(gliderThickness / 2)})`;
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
        onMouseDown={this.onDragDown}
      >
        <TranslatableDiv title={this.props.tooltip}>
          <div className={this.styles.classNames.inside}>
            {this.renderGlider()}
            <div className={this.styles.classNames.bar} style={barStyle} />
            <div className={this.styles.classNames.cab} style={cabStyle} />
            {this.renderTooltip(hasCab, cabValue)}
          </div>
          {this.renderWhileDragging()}
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
