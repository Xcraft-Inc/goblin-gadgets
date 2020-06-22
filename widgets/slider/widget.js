import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import Props from './props';
import {
  makePropTypes,
  makeDefaultProps,
} from 'xcraft-core-utils/lib/prop-types';
import * as styles from './styles';

/******************************************************************************/

export default class Slider extends Widget {
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

  changeValue(e, send) {
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

    value = Math.max(value, 0);
    value = Math.min(value, 100);
    this.props.onChange(value, send);
  }

  onDragDown(e) {
    if (this.props.onChange && this.sliderNode && !this.props.disabled) {
      this.changeValue(e, false);
      this.isDragging = true;
    }
  }

  onDragMove(e) {
    if (this.props.onChange && this.sliderNode && this.isDragging) {
      this.changeValue(e, false);
    }
  }

  onDragUp(e) {
    if (this.props.onChange && this.sliderNode && this.isDragging) {
      this.changeValue(e, true);
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
    return (
      <div
        ref={(node) => (this.sliderNode = node)}
        className={this.styles.classNames.slider}
        onMouseDown={this.onDragDown}
      >
        <div className={this.styles.classNames.inside}>
          {this.renderGlider()}
          <div className={this.styles.classNames.bar} />
          <div className={this.styles.classNames.cab} />
        </div>
        {this.renderWhileDragging()}
      </div>
    );
  }
}

/******************************************************************************/

Slider.propTypes = makePropTypes(Props);
Slider.defaultProps = makeDefaultProps(Props);
