import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import Props from './props';
import {
  makePropTypes,
  makeDefaultProps,
} from 'xcraft-core-utils/lib/prop-types';
import * as styles from './styles';
import {color as ColorConverters} from 'xcraft-core-converters';

/******************************************************************************/

export default class SliderXY extends Widget {
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

  changeValue(e, send) {
    const rect = this.sliderNode.getBoundingClientRect();

    let x = ((e.clientX - rect.left) * 100) / rect.width;
    let y = ((rect.bottom - e.clientY) * 100) / rect.height;

    x = Math.max(x, 0);
    x = Math.min(x, 100);

    y = Math.max(y, 0);
    y = Math.min(y, 100);

    this.props.onChange(x, y, send);
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

  renderHSLFragment(colorUp, colorDown, index) {
    const style = {
      background: `linear-gradient(0deg, ${colorDown}, ${colorUp})`,
    };

    return (
      <div
        key={index}
        className={this.styles.classNames.hslFragment}
        style={style}
      />
    );
  }

  renderHSL_OLD() {
    const result = [];

    const colorUL = '#fff';
    const colorUR = this.props.hue;
    const colorDL = '#000';
    const colorDR = '#000';

    const n = 50;
    for (let i = 0; i < n; i++) {
      const colorUp = ColorConverters.slide(colorUL, colorUR, i / (n - 1));
      const colorDown = ColorConverters.slide(colorDL, colorDR, i / (n - 1));
      result.push(this.renderHSLFragment(colorUp, colorDown, i));
    }

    return result;
  }

  renderHSL() {
    return (
      <React.Fragment>
        <div className={this.styles.classNames.hslUL} />
        <div className={this.styles.classNames.hslUR} />
        <div className={this.styles.classNames.hslD} />
      </React.Fragment>
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
    return (
      <div
        className={
          this.isDragging
            ? this.styles.classNames.sliderXYdragging
            : this.styles.classNames.sliderXY
        }
        onMouseDown={this.onDragDown}
      >
        <div
          ref={(node) => (this.sliderNode = node)}
          className={this.styles.classNames.inside}
        >
          {this.renderHSL()}
          <div
            className={
              this.isDragging
                ? this.styles.classNames.cabDragging
                : this.styles.classNames.cab
            }
          />
        </div>
        {this.renderWhileDragging()}
      </div>
    );
  }
}

/******************************************************************************/

SliderXY.propTypes = makePropTypes(Props);
SliderXY.defaultProps = makeDefaultProps(Props);
