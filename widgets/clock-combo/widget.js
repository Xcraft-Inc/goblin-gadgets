import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';

import Button from 'goblin-gadgets/widgets/button/widget';
import AnalogClock from 'goblin-gadgets/widgets/analog-clock/widget';
import TextInputNC from 'goblin-gadgets/widgets/text-input-nc/widget';
import {time as TimeConverters} from 'xcraft-core-converters';
import * as styles from './styles';

/******************************************************************************/

export default class ClockCombo extends Widget {
  constructor() {
    super(...arguments);
    this.styles = styles;
    this.incHour = this.incHour.bind(this);
    this.incMinute = this.incMinute.bind(this);
  }

  incHour(inc) {
    let time = this.props.time;
    time = TimeConverters.addHours(time, inc);
    this.props.onChange(time);
  }

  incMinute(inc) {
    let time = this.props.time;
    time = TimeConverters.addMinutes(time, inc);
    this.props.onChange(time);
  }

  /******************************************************************************/

  renderPart(value, action) {
    value = value + '';
    if (value.length === 1) {
      value = '0' + value;
    }

    return (
      <div className={this.styles.classNames.part}>
        <Button width="52px" glyph="solid/plus" onClick={() => action(1)} />
        <div className={this.styles.classNames.vsep} />
        <TextInputNC
          width="50px"
          justify="center"
          readonly={true}
          value={value}
        />
        <div className={this.styles.classNames.vsep} />
        <Button width="52px" glyph="solid/minus" onClick={() => action(-1)} />
      </div>
    );
  }

  renderHour() {
    const h = TimeConverters.getHours(this.props.time);
    return this.renderPart(h, this.incHour);
  }

  renderMinute() {
    const m = TimeConverters.getMinutes(this.props.time);
    return this.renderPart(m, this.incMinute);
  }

  renderClock() {
    return (
      <div className={this.styles.classNames.clock}>
        <AnalogClock
          size="110px"
          look={this.context.theme.look.clockParams.initialLook}
          transition="none"
          fixedTime={this.props.time}
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
