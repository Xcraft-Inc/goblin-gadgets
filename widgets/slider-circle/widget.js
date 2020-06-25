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

function radToDeg(angle) {
  return (angle * 180.0) / Math.PI;
}

function computeAngleDegFromPoints(c, a) {
  return radToDeg(computeAngleRadFromXY(a.x - c.x, a.y - c.y));
}

function computeAngleRadFromPoints(c, a) {
  return computeAngleRadFromXY(a.x - c.x, a.y - c.y);
}

//	Calcule l'angle d'un triangle rectangle.
//	L'angle est anti-horaire (CCW), compris entre 0 et 2*PI.
//	Pour obtenir un angle horaire (CW), il suffit de passer -y.
//
//	    ^
//	    |
//	  y o----o
//	    |  / |
//	    |/)a |
//	----o----o-->
//	    |    x
//	    |
function computeAngleRadFromXY(x, y) {
  if (x === 0.0 && y === 0.0) {
    return 0.0;
  }

  return Math.atan2(y, x);
}

function n(n) {
  if (typeof n === 'string' && n.endsWith('px')) {
    return parseInt(n.substring(0, n.length - 2));
  }
  return n;
}

/******************************************************************************/

export default class SliderCircle extends Widget {
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
    let y = ((e.clientY - rect.bottom) * 100) / rect.height;

    const w = n(this.props.width);
    const h = n(this.props.height);

    const a = computeAngleDegFromPoints({x: w / 2, y: h / 2}, {x, y});

    this.props.onChange(a, send);
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
        className={this.styles.classNames.sliderCircle}
        onMouseDown={this.onDragDown}
      >
        <div className={this.styles.classNames.inside}>
          <div className={this.styles.classNames.cab} />
        </div>
        {this.renderWhileDragging()}
      </div>
    );
  }
}

/******************************************************************************/

SliderCircle.propTypes = makePropTypes(Props);
SliderCircle.defaultProps = makeDefaultProps(Props);
