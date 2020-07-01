import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import Props from './props';
import {
  makePropTypes,
  makeDefaultProps,
} from 'xcraft-core-utils/lib/prop-types';
import * as styles from './styles';
import {color as ColorConverters} from 'xcraft-core-converters';
import wrapRawInput from 'goblin-gadgets/widgets/input-wrapper/widget.js';

/******************************************************************************/

function clipAngleDeg(angle) {
  // Retourne un angle normalisé, c'est-à-dire compris entre 0 et 360°.
  angle = angle % 360.0;
  return angle < 0.0 ? 360.0 + angle : angle;
}

function degToRad(angle) {
  return (angle * Math.PI) / 180.0;
}

function radToDeg(angle) {
  return (angle * 180.0) / Math.PI;
}

function rotatePointDeg(center, angle, p) {
  return rotatePointRad(center, degToRad(angle), p);
}

function rotatePointRad(center, angle, p) {
  //	Fait tourner un point autour d'un centre.
  //	L'angle est exprimé en radians.
  //	Un angle positif est horaire (CW), puisque Y va de haut en bas.

  const a = {x: 0, y: 0};
  const b = {x: 0, y: 0};

  a.x = p.x - center.x;
  a.y = p.y - center.y;

  const sin = Math.sin(angle);
  const cos = Math.cos(angle);

  b.x = a.x * cos - a.y * sin;
  b.y = a.x * sin + a.y * cos;

  b.x += center.x;
  b.y += center.y;

  return b;
}

function computeAngleDegFromPoints(c, a) {
  return radToDeg(computeAngleRadFromXY(a.x - c.x, a.y - c.y));
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

/******************************************************************************/

function px(n) {
  return n + 'px';
}

function n(n) {
  if (typeof n === 'string' && n.endsWith('px')) {
    return parseInt(n.substring(0, n.length - 2));
  }
  return n;
}

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

    const a = computeAngleDegFromPoints({x: w / 2, y: h / 2}, {x, y});
    const value = clipAngleDeg(a + 90);

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

    const p = rotatePointDeg({x: w / 2, y: h / 2}, cabValue, {
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
        onMouseDown={this.onDragDown}
      >
        <div className={this.styles.classNames.inside} />
        <div className={this.styles.classNames.cab} style={cabStyle} />
        {this.renderWhileDragging()}
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
