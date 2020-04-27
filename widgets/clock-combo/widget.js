import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';

import Label from 'goblin-gadgets/widgets/label/widget';
import AnalogClock from 'goblin-gadgets/widgets/analog-clock/widget';
import {time as TimeConverters} from 'xcraft-core-converters';
import * as styles from './styles';

/******************************************************************************/

function changeTime(time, type, inc) {
  if (type === 'hours') {
    return TimeConverters.addHours(time, inc);
  } else {
    return TimeConverters.addMinutes(time, inc);
  }
}

/******************************************************************************/

export default class ClockCombo extends Widget {
  constructor() {
    super(...arguments);
    this.styles = styles;

    this.state = {
      localTime: null,
    };

    this.handleButtonDown = this.handleButtonDown.bind(this);
    this.handleLocal = this.handleLocal.bind(this);
    this.handleButtonUp = this.handleButtonUp.bind(this);
  }

  //#region get/set
  get localTime() {
    return this.state.localTime;
  }

  set localTime(value) {
    this.setState({
      localTime: value,
    });
  }
  //#endregion

  get time() {
    return this.localTime || this.props.time;
  }

  handleButtonDown(type, inc) {
    this.localTime = changeTime(this.props.time, type, inc);
    this.timeoutCounter = 0;
    this.timer = setTimeout(() => this.handleLocal(type, inc), 300);
  }

  handleLocal(type, inc) {
    this.localTime = changeTime(this.localTime, type, inc);
    const delay = type === 'hours' ? 300 : this.timeoutCounter++ < 4 ? 300 : 50;
    this.timer = setTimeout(() => this.handleLocal(type, inc), delay);
  }

  handleButtonUp(type, inc) {
    clearTimeout(this.timer);
    this.props.onChange(this.localTime);
    this.localTime = null;
  }

  /******************************************************************************/

  renderButton(glyph, actionDown, actionUp) {
    return (
      <div
        className={this.styles.classNames.button}
        onMouseDown={actionDown}
        onMouseUp={actionUp}
      >
        <Label glyph={glyph} justify="center" grow="1" insideButton={true} />
      </div>
    );
  }
  renderPart(value, type) {
    value = value + '';
    if (value.length === 1) {
      value = '0' + value;
    }

    return (
      <div className={this.styles.classNames.part}>
        {this.renderButton(
          'solid/plus',
          () => this.handleButtonDown(type, 1),
          () => this.handleButtonUp(type, 1)
        )}
        <Label justify="center" grow="1" insideButton={true} text={value} />
        {this.renderButton(
          'solid/minus',
          () => this.handleButtonDown(type, -1),
          () => this.handleButtonUp(type, -1)
        )}
      </div>
    );
  }

  renderHour() {
    const h = TimeConverters.getHours(this.time);
    return this.renderPart(h, 'hours');
  }

  renderMinute() {
    const m = TimeConverters.getMinutes(this.time);
    return this.renderPart(m, 'minutes');
  }

  renderClock() {
    return (
      <div className={this.styles.classNames.clock}>
        <AnalogClock
          size="130px"
          look="classic"
          transition="none"
          fixedTime={this.time}
        />
      </div>
    );
  }

  render() {
    return (
      <div className={this.styles.classNames.clockCombo}>
        {this.renderHour()}
        {this.renderMinute()}
        {this.renderClock()}
      </div>
    );
  }
}

/******************************************************************************/
