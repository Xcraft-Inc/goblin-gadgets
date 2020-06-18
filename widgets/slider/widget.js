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

    this.isDragging = false;

    this.onDragDown = this.onDragDown.bind(this);
    this.onDragMove = this.onDragMove.bind(this);
    this.onDragUp = this.onDragUp.bind(this);
    this.onDragOut = this.onDragOut.bind(this);
  }

  get isHorizontal() {
    return this.props.direction === 'horizontal';
  }

  changeValue(e) {
    console.log('Slider.changeValue');
    const rect = this.sliderNode.getBoundingClientRect();
    const sliderThickness = 24; // same as style!

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
    console.log('Slider.onDragDown');
    if (this.props.onChange && this.sliderNode) {
      this.changeValue(e);
      this.isDragging = true;
    }
  }

  onDragMove(e) {
    console.log('Slider.onDragMove');
    if (this.props.onChange && this.sliderNode && this.isDragging) {
      this.changeValue(e);
    }
  }

  onDragUp() {
    console.log('Slider.onDragUp');
    this.isDragging = false;
  }

  onDragOut() {
    console.log('Slider.onDragOut');
    //?this.isDragging = false;
  }

  /******************************************************************************/

  render() {
    return (
      <div
        ref={(node) => (this.sliderNode = node)}
        className={this.styles.classNames.slider}
        onMouseDown={this.onDragDown}
        onMouseMove={this.onDragMove}
        onMouseUp={this.onDragUp}
        onMouseOut={this.onDragOut}
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
