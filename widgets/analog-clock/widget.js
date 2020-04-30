import React from 'react';
import Props from './props';
import Widget from 'goblin-laboratory/widgets/widget';
import * as styles from './styles';
import {time as TimeConverters} from 'xcraft-core-converters';
import svg from '../helpers/svg-helpers';

import {
  makePropTypes,
  makeDefaultProps,
} from 'xcraft-core-utils/lib/prop-types';

/******************************************************************************/

// Compute 3 angles (for hours, minutes and seconds) according to time.
function computeAngles(time) {
  const h = TimeConverters.getHours(time) % 12;
  const m = TimeConverters.getMinutes(time);
  const s = TimeConverters.getSeconds(time);

  const ah = ((h + m / 60 + s / 3600) / 12) * 360; // continuous rotation
  const am = (m / 60) * 360; // jump every minute
  const as = (s / 60) * 360; // jump every second

  return {ah, am, as};
}

// If abs(minutes) are lower than 30, return same value:
//   m =  25 ->  25
//   m = -25 -> -25
// If abs(minutes) are greater then 30, return opposite value:
//   m =  35 -> -25 (Replaces a 35 minute advance with a 25 minute return)
//   m = -35 ->  25 (Replaces a 35 minute return with a 25 minute advance)
function trunc30(minutes) {
  if (minutes > 30) {
    return minutes - 60; // replace a advance with a return
  } else if (minutes < -30) {
    return minutes + 60; // replace a return with an advance
  } else {
    return minutes;
  }
}

/******************************************************************************/

export default class AnalogClock extends Widget {
  constructor() {
    super(...arguments);
    this.styles = styles;

    this.state = {
      angles: {},
      hoverMinutes: null,
      draggingAdditionalMinutes: null,
    };

    this.start = this.start.bind(this);
    this.updateAngles = this.updateAngles.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
    this.onDragDown = this.onDragDown.bind(this);
    this.onDragMove = this.onDragMove.bind(this);
    this.onDragUp = this.onDragUp.bind(this);
    this.onDragOut = this.onDragOut.bind(this);
  }

  //#region get/set
  get angles() {
    return this.state.angles;
  }

  set angles(value) {
    this.setState({
      angles: value,
    });
  }

  get hoverMinutes() {
    return this.state.hoverMinutes;
  }

  set hoverMinutes(value) {
    this.setState({
      hoverMinutes: value,
    });
  }

  get draggingAdditionalMinutes() {
    return this.state.draggingAdditionalMinutes;
  }

  set draggingAdditionalMinutes(value) {
    this.setState({
      draggingAdditionalMinutes: value,
    });
  }
  //#endregion

  componentDidMount() {
    super.componentDidMount();

    if (!this.props.fixedTime) {
      // Calculates the initial delay corresponding to the rest of the time to wait
      // until the first synchronous second.
      const ms = Date.now();
      const initialDelay = 1000 - (ms % 1000);
      this.timer1 = setTimeout(() => this.start(), initialDelay);
    }

    this.updateAngles(); // initialise for first render
  }

  componentWillUnmount() {
    super.componentWillUnmount();

    if (this.timer1) {
      clearInterval(this.timer1);
    }
    if (this.timer2) {
      clearInterval(this.timer2);
    }
  }

  /******************************************************************************/

  // Starts a timer synchronized with system seconds.
  // So, precisely at each change of second, the watch pointer jumps.
  start() {
    this.timer2 = setInterval(() => this.updateAngles(), 1000); // one tick each second
    this.updateAngles();
  }

  updateAngles() {
    const now = TimeConverters.getNowCanonical('exact');
    this.angles = computeAngles(now);
  }

  onMouseOver() {
    const f = this.props.mouseOver;
    if (f) {
      f();
    }
  }

  onMouseOut() {
    const f = this.props.mouseOut;
    if (f) {
      f();
    }
  }

  // Returns the minutes with decimals (0..59.9999) according to the position of the mouse.
  getMouseMinutes(e) {
    const rect = this.draggingLayerNode.getBoundingClientRect();
    const center = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };
    const mouse = {x: e.clientX, y: e.clientY};
    let angle = svg.computeAngleDegFromPoints(center, mouse) + 90;
    if (angle < 0) {
      angle += 360;
    }
    return ((angle * 60) / 360) % 60; // 0..59.9999
  }

  getDraggingTime(additionalMinutes) {
    return TimeConverters.addMinutes(
      this.props.fixedTime,
      Math.round(additionalMinutes)
    );
  }

  onDragDown(e) {
    if (!this.props.fixedTime || !this.props.onTimeChanged) {
      return;
    }

    const initialMinutes = TimeConverters.getMinutes(this.props.fixedTime);
    const mouseMinutes = this.getMouseMinutes(e);
    const additionalMinutes = trunc30(mouseMinutes - initialMinutes);
    this.draggingAdditionalMinutes = additionalMinutes;
    this.draggingLastMinutes = mouseMinutes;
    this.hoverMinutes = null;

    if (this.props.onDragStarted) {
      this.props.onDragStarted(this.getDraggingTime(additionalMinutes));
    }
  }

  onDragMove(e) {
    if (this.draggingAdditionalMinutes === null) {
      this.hoverMinutes = this.getMouseMinutes(e);
    } else {
      const mouseMinutes = this.getMouseMinutes(e);
      const deltaMinutes = trunc30(mouseMinutes - this.draggingLastMinutes);
      this.draggingLastMinutes = mouseMinutes;
      const additionalMinutes = this.draggingAdditionalMinutes + deltaMinutes;
      this.draggingAdditionalMinutes = additionalMinutes;

      if (this.props.onDragMoved) {
        this.props.onDragMoved(this.getDraggingTime(additionalMinutes));
      }
    }
  }

  onDragUp(e) {
    if (this.draggingAdditionalMinutes !== null) {
      this.props.onTimeChanged(
        this.getDraggingTime(this.draggingAdditionalMinutes)
      );
      this.draggingAdditionalMinutes = null;

      if (this.props.onDragEnded) {
        this.props.onDragEnded();
      }
    }
  }

  onDragOut() {
    this.hoverMinutes = null;
    this.draggingAdditionalMinutes = null;

    if (this.props.onDragEnded) {
      this.props.onDragEnded();
    }
  }

  /******************************************************************************/

  renderFixedMark(i) {
    const className =
      i % 15 === 0
        ? this.styles.classNames.fixedMark15
        : i % 5 === 0
        ? this.styles.classNames.fixedMark5
        : this.styles.classNames.fixedMark1;

    const style = {
      transform: `rotate(${i * 6}deg)`,
    };

    return <div className={className} key={i} style={style} />;
  }

  renderFixedMarks() {
    const result = [];

    for (let i = 0; i < 60; i++) {
      result.push(this.renderFixedMark(i));
    }

    return result;
  }

  renderWatchPointer(styleName, angle) {
    if (this.props.fixedTime && styleName === 'watchPointerSecond') {
      return null;
    }

    const style = {
      transform: `rotate(${angle}deg)`,
    };

    return <div className={this.styles.classNames[styleName]} style={style} />;
  }

  renderWatchPointerHover() {
    if (this.hoverMinutes === null) {
      return null;
    }

    const am = (Math.round(this.hoverMinutes) / 60) * 360;
    const style = {
      transform: `rotate(${am}deg)`,
    };

    return (
      <div className={this.styles.classNames.hoverMinutes} style={style} />
    );
  }

  renderDraggingLayer() {
    if (!this.props.draggingEnabled) {
      return null;
    }

    return (
      <div
        ref={(node) => (this.draggingLayerNode = node)}
        className={this.styles.classNames.draggingLayer}
        onMouseDown={this.onDragDown}
        onMouseMove={this.onDragMove}
        onMouseUp={this.onDragUp}
        onMouseOut={this.onDragOut}
      />
    );
  }

  render() {
    let angles;
    if (this.props.fixedTime) {
      let time = this.props.fixedTime;

      if (this.draggingAdditionalMinutes !== null) {
        time = TimeConverters.addMinutes(
          time,
          Math.round(this.draggingAdditionalMinutes)
        );
      }

      angles = computeAngles(time);
    } else {
      angles = this.angles;
    }

    return (
      <div
        className={this.styles.classNames.analogClock}
        onMouseOver={this.onMouseOver}
        onMouseOut={this.onMouseOut}
      >
        <div className={this.styles.classNames.center}>
          <div className={this.styles.classNames.dial1} />
          <div className={this.styles.classNames.dial2} />
          {this.renderFixedMarks()}
          {this.renderWatchPointerHover()}
          {this.renderWatchPointer('watchPointerHour', angles.ah)}
          {this.renderWatchPointer('watchPointerMinute', angles.am)}
          {this.renderWatchPointer('watchPointerSecond', angles.as)}
          <div className={this.styles.classNames.watchPointerCenter} />
          {this.renderDraggingLayer()}
        </div>
      </div>
    );
  }
}

/******************************************************************************/

AnalogClock.propTypes = makePropTypes(Props);
AnalogClock.defaultProps = makeDefaultProps(Props);
