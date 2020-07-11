import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import Props from './props';
import {
  makePropTypes,
  makeDefaultProps,
} from 'xcraft-core-utils/lib/prop-types';
import * as styles from './styles';
import wrapRawInput from 'goblin-gadgets/widgets/input-wrapper/widget.js';
import px from '../helpers/px-helpers';

/******************************************************************************/

class SliderXY extends Widget {
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

  componentDidMount() {
    this.updateCanvas();
  }

  componentDidUpdate(prevProps) {
    if (this.props.hue !== prevProps.hue) {
      this.updateCanvas();
    }
  }

  get insideWidth() {
    if (
      typeof this.props.width === 'string' &&
      this.props.width.endsWith('px')
    ) {
      const width = parseInt(
        this.props.width.substring(0, this.props.width.length - 2)
      );

      // Compute insideMargin, according to style.
      const insideMargin = {
        zero: 0,
        small: 8,
        default: 12,
        large: 20,
      }[this.props.marginSize || 'default'];

      return width - insideMargin * 2;
    }

    console.error(`SliderXY: Invalid width '${this.props.width}'`);
    return 10;
  }

  updateCanvas() {
    // Use GPU to generate the complex gradient.
    // See https://stackoverflow.com/questions/41524641/draw-saturation-brightness-gradient
    const width = this.insideWidth;

    const ctx = this.canvasNode.getContext('2d');

    var gradB = ctx.createLinearGradient(0, 0, 0, width);
    gradB.addColorStop(0, 'white');
    gradB.addColorStop(1, 'black');

    const hueValue = this.props.hue;
    var gradC = ctx.createLinearGradient(0, 0, width, 0);
    gradC.addColorStop(0, `hsla(${hueValue},100%,50%,0)`);
    gradC.addColorStop(1, `hsla(${hueValue},100%,50%,1)`);

    ctx.fillStyle = gradB;
    ctx.fillRect(0, 0, width, width);
    ctx.fillStyle = gradC;
    ctx.globalCompositeOperation = 'multiply';
    ctx.fillRect(0, 0, width, width);
    ctx.globalCompositeOperation = 'source-over';
  }

  changeValue(e, mouse) {
    const rect = this.sliderNode.getBoundingClientRect();

    let x = ((e.clientX - rect.left) * 100) / rect.width;
    let y = ((rect.bottom - e.clientY) * 100) / rect.height;

    x = Math.max(x, 0);
    x = Math.min(x, 100);

    y = Math.max(y, 0);
    y = Math.min(y, 100);

    const value = `${x};${y}`;

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

  renderHSL() {
    const width = this.insideWidth;

    return (
      <canvas
        ref={(node) => (this.canvasNode = node)}
        width={width}
        height={width}
      />
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

    const cabThickness = {
      default: 14,
      large: 18,
    }[this.props.cabSize || 'default'];

    let cabValueX, cabValueY;
    if (hasCab) {
      const p = this.props.value.split(';');
      cabValueX = Math.max(Math.min(p[0], 100), 0); // 0..100
      cabValueY = Math.max(Math.min(p[1], 100), 0); // 0..100
    }

    const cabStyle = {
      left: `calc(${px.toPc(cabValueX)} - ${px.toPx(cabThickness / 2)})`,
      bottom: `calc(${px.toPc(cabValueY)} - ${px.toPx(cabThickness / 2)})`,
      display: hasCab ? null : 'none',
    };

    const cabDraggingStyle = {
      left: `calc(${px.toPc(cabValueX)} - ${px.toPx(cabThickness / 4)})`,
      bottom: `calc(${px.toPc(cabValueY)} - ${px.toPx(cabThickness / 4)})`,
    };

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
            style={this.isDragging ? cabDraggingStyle : cabStyle}
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

/******************************************************************************/

const wrappedSliderXY = wrapRawInput(SliderXY);
wrappedSliderXY.displayName = 'WrappedSliderXY';

export default wrappedSliderXY;
