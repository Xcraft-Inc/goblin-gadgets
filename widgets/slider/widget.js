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

  changeValue(e) {
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
      value = ((e.clientY - bottom) * 100) / height;
    }

    value = Math.max(value, 0);
    value = Math.min(value, 100);
    this.props.onChange(value);
  }

  onDragDown(e) {
    if (this.props.onChange && this.sliderNode) {
      this.changeValue(e);
      this.isDragging = true;
    }
  }

  onDragMove(e) {
    if (this.props.onChange && this.sliderNode && this.isDragging) {
      this.changeValue(e);
    }
  }

  onDragUp() {
    this.isDragging = false;
  }

  /******************************************************************************/

  renderWhileDragging() {
    const rect = this.sliderNode.getBoundingClientRect();
    const style = {
      position: 'absolute',
      left: rect.left,
      width: rect.width,
      top: rect.top,
      height: rect.height,
    };

    return (
      <div
        className={this.styles.classNames.fullscreen}
        onMouseMove={this.onDragMove}
        onMouseUp={this.onDragUp}
      >
        <div
          ref={(node) => (this.sliderNode = node)}
          className={this.styles.classNames.slider}
          style={style}
        >
          <div className={this.styles.classNames.inside}>
            <div className={this.styles.classNames.glider} />
            <div className={this.styles.classNames.bar} />
            <div className={this.styles.classNames.cab} />
          </div>
        </div>
      </div>
    );
  }

  render() {
    if (this.isDragging && this.sliderNode) {
      return this.renderWhileDragging();
    }

    return (
      <div
        ref={(node) => (this.sliderNode = node)}
        className={this.styles.classNames.slider}
        onMouseDown={this.onDragDown}
      >
        <div className={this.styles.classNames.inside}>
          <div className={this.styles.classNames.glider} />
          <div className={this.styles.classNames.bar} />
          <div className={this.styles.classNames.cab} />
        </div>
      </div>
    );
  }
}

/******************************************************************************/

Slider.propTypes = makePropTypes(Props);
Slider.defaultProps = makeDefaultProps(Props);
