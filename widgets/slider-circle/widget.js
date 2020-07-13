import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import Props from './props';
import {
  makePropTypes,
  makeDefaultProps,
} from 'xcraft-core-utils/lib/prop-types';
import * as styles from './styles';
import wrapRawInput from 'goblin-gadgets/widgets/input-wrapper/widget.js';
import geom from '../helpers/geom-helpers';
import {Unit} from 'goblin-theme';
const px = Unit.toPx;
const n = Unit.toValue;

/******************************************************************************/

class SliderCircle extends Widget {
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

  changeValue(e, mouse) {
    const rect = this.sliderNode.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const w = n(this.props.width);
    const h = n(this.props.height);

    const a = geom.computeAngleDegFromPoints({x: w / 2, y: h / 2}, {x, y});
    const value = geom.clipAngleDeg(a + 90);

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

  render() {
    const w = n(this.props.width);
    const h = n(this.props.height);
    const hasCab = this.props.value !== null && this.props.value !== undefined;
    const cabValue = hasCab
      ? Math.max(Math.min(this.props.value, 360), 0)
      : null; // 0..360

    const gliderThickness = {
      small: 10,
      default: 20,
      large: 30,
    }[this.props.gliderSize || 'default'];

    const cabThickness = {
      small: 8,
      default: 14,
      large: 18,
    }[this.props.cabSize || 'default'];

    const p = geom.rotatePointDeg({x: w / 2, y: h / 2}, cabValue, {
      x: w / 2,
      y: h / 2 - h / 2 + gliderThickness / 2,
    });

    const cabStyle = {
      left: px(p.x - cabThickness / 2),
      top: px(p.y - cabThickness / 2),
      display: hasCab ? null : 'none',
    };

    return (
      <div
        ref={(node) => (this.sliderNode = node)}
        className={this.styles.classNames.sliderCircle}
        onPointerDown={this.onDragDown}
        onPointerMove={this.onDragMove}
        onPointerUp={this.onDragUp}
      >
        <div className={this.styles.classNames.inside} />
        <div className={this.styles.classNames.cab} style={cabStyle} />
      </div>
    );
  }
}

/******************************************************************************/

SliderCircle.propTypes = makePropTypes(Props);
SliderCircle.defaultProps = makeDefaultProps(Props);

/******************************************************************************/

const wrappedSliderCircle = wrapRawInput(SliderCircle);
wrappedSliderCircle.displayName = 'WrappedSliderCircle';

export default wrappedSliderCircle;
