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

export default class AnalogClock extends Widget {
  constructor() {
    super(...arguments);
    this.styles = styles;

    this.state = {
      angles: {},
      draggingInProcess: false,
    };

    this.start = this.start.bind(this);
    this.updateAngles = this.updateAngles.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
    this.onDragDown = this.onDragDown.bind(this);
    this.onDragMove = this.onDragMove.bind(this);
    this.onDragUp = this.onDragUp.bind(this);
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

  get draggingInProcess() {
    return this.state.draggingInProcess;
  }

  set draggingInProcess(value) {
    this.setState({
      draggingInProcess: value,
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

  computeAngles(now) {
    const h = TimeConverters.getHours(now) % 12;
    const m = TimeConverters.getMinutes(now);
    const s = TimeConverters.getSeconds(now);

    const ah = ((h + m / 60 + s / 3600) / 12) * 360; // continuous rotation
    const am = (m / 60) * 360; // jump every minute
    const as = (s / 60) * 360; // jump every second

    return {ah, am, as};
  }

  updateAngles() {
    const now = TimeConverters.getNowCanonical('exact');
    this.angles = this.computeAngles(now);
  }

  onMouseOver() {
    const x = this.props.mouseOver;
    if (x) {
      x();
    }
  }

  onMouseOut() {
    const x = this.props.mouseOut;
    if (x) {
      x();
    }
  }

  onDragDown(e) {
    const rect = this.draggingLayerNode.getBoundingClientRect();
    this.draggingCenter = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };
    this.draggingMinutes = TimeConverters.getMinutes(this.props.fixedTime);

    this.draggingInProcess = true;
  }

  onDragMove(e) {
    if (this.draggingInProcess) {
      const p = {x: e.clientX, y: e.clientY};
      const a = svg.computeAngleDegFromPoints(this.draggingCenter, p);
      const m = a / 6; // 0..59
      const time = TimeConverters.addMinutes(
        this.props.fixedTime,
        m - this.draggingMinutes
      );
      this.props.onTimeChanged(time);
    }
  }

  onDragUp(e) {
    this.draggingInProcess = false;
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

  renderWatchPointer(styleName, initialAngle) {
    if (this.props.fixedTime && styleName === 'watchPointerSecond') {
      return null;
    }

    const style = {
      transform: `rotate(${initialAngle}deg)`,
    };

    return <div className={this.styles.classNames[styleName]} style={style} />;
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
      />
    );
  }

  render() {
    let angles;
    if (this.props.fixedTime) {
      const now = this.props.fixedTime;
      angles = this.computeAngles(now);
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
