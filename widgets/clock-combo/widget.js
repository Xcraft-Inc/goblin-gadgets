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

  renderPart(value, action, bigInc) {
    value = value + '';
    if (value.length === 1) {
      value = '0' + value;
    }

    return (
      <div className={this.styles.classNames.part}>
        <div className={this.styles.classNames.vsep} />
        <Button
          border="none"
          width="52px"
          height="28px"
          glyph="solid/chevron-double-up"
          onClick={() => action(bigInc)}
        />
        <Button
          border="none"
          width="52px"
          height="28px"
          glyph="solid/chevron-up"
          onClick={() => action(1)}
        />
        <div className={this.styles.classNames.vsep} />
        <TextInputNC
          width="50px"
          justify="center"
          readonly={true}
          value={value}
        />
        <div className={this.styles.classNames.vsep} />
        <Button
          border="none"
          width="52px"
          height="28px"
          glyph="solid/chevron-down"
          onClick={() => action(-1)}
        />
        <Button
          border="none"
          width="52px"
          height="28px"
          glyph="solid/chevron-double-down"
          onClick={() => action(-bigInc)}
        />
        <div className={this.styles.classNames.vsep} />
      </div>
    );
  }

  renderPart_TEXT(value, action, bigInc) {
    value = value + '';
    if (value.length === 1) {
      value = '0' + value;
    }

    const littleInc = 1;

    return (
      <div className={this.styles.classNames.part}>
        <Button
          width="52px"
          height="28px"
          text={`+${bigInc}`}
          fontSize="80%"
          onClick={() => action(bigInc)}
        />
        <Button
          width="52px"
          height="28px"
          text={`+${littleInc}`}
          fontSize="80%"
          onClick={() => action(1)}
        />
        <div className={this.styles.classNames.vsep} />
        <TextInputNC
          width="50px"
          justify="center"
          readonly={true}
          value={value}
        />
        <div className={this.styles.classNames.vsep} />
        <Button
          width="52px"
          height="28px"
          text={`−${littleInc}`} // U+2212
          fontSize="80%"
          onClick={() => action(-1)}
        />
        <Button
          width="52px"
          height="28px"
          text={`−${bigInc}`} // U+2212
          fontSize="80%"
          onClick={() => action(-bigInc)}
        />
      </div>
    );
  }

  renderHour() {
    const h = TimeConverters.getHours(this.props.time);
    return this.renderPart(h, this.incHour, 2);
  }

  renderMinute() {
    const m = TimeConverters.getMinutes(this.props.time);
    return this.renderPart(m, this.incMinute, 10);
  }

  renderClock() {
    return (
      <div className={this.styles.classNames.clock}>
        <AnalogClock
          size="180px"
          look="classic"
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
