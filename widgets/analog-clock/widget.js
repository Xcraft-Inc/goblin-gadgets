import React from 'react';
import Props from './props';
import Widget from 'goblin-laboratory/widgets/widget';
import * as styles from './styles';

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
    };

    this.start = this.start.bind(this);
    this.updateAngles = this.updateAngles.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
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
  //#endregion

  componentDidMount() {
    super.componentDidMount();

    // Calculates the initial delay corresponding to the rest of the time to wait
    // until the first synchronous second.
    const ms = Date.now();
    const initialDelay = 1000 - (ms % 1000);
    this.timer1 = setTimeout(() => this.start(), initialDelay);

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
    const now = new Date(Date.now());
    const h = now.getHours() % 12;
    const m = now.getMinutes();
    const s = now.getSeconds();

    const ah = ((h + m / 60 + s / 3600) / 12) * 360; // continuous rotation
    const am = (m / 60) * 360; // jump every minute
    const as = (s / 60) * 360; // jump every second

    this.angles = {ah, am, as};
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
    const style = {
      transform: `rotate(${initialAngle}deg)`,
    };

    return <div className={this.styles.classNames[styleName]} style={style} />;
  }

  render() {
    const angles = this.angles;

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
        </div>
      </div>
    );
  }
}

/******************************************************************************/

AnalogClock.propTypes = makePropTypes(Props);
AnalogClock.defaultProps = makeDefaultProps(Props);
