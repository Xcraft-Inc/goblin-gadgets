import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';

/******************************************************************************/

export default class AnalogClock extends Widget {
  constructor() {
    super(...arguments);
  }

  renderFix(i) {
    const className =
      i % 5 === 0 ? this.styles.classNames.fix1 : this.styles.classNames.fix2;

    const style = {
      transform: `rotate(${i * 6}deg)`,
    };

    return <div className={className} key={i} style={style} />;
  }

  renderFixes() {
    const result = [];

    for (let i = 0; i < 60; i++) {
      result.push(this.renderFix(i));
    }

    return result;
  }

  renderWatchPointer(styleName, initialAngle) {
    const style = {
      transform: `rotate(${initialAngle}deg)`,
    };

    return (
      <div className={this.styles.classNames.watchPointers} style={style}>
        <div className={this.styles.classNames[styleName]} />
      </div>
    );
  }

  render() {
    const now = new Date(Date.now());
    const h = now.getHours() % 12;
    const m = now.getMinutes();
    const s = now.getSeconds();

    const ah = 180 + ((h + m / 60 + s / 3600) / 12) * 360;
    const am = 180 + ((m + s / 60) / 60) * 360;
    const as = 180 + (s / 60) * 360;

    return (
      <div className={this.styles.classNames.analogClock}>
        <div className={this.styles.classNames.cadran1} />
        <div className={this.styles.classNames.cadran2} />
        {this.renderFixes()}
        {this.renderWatchPointer('watchPointerHour', ah)}
        {this.renderWatchPointer('watchPointerMinute', am)}
        {this.renderWatchPointer('watchPointerSecond', as)}
        <div className={this.styles.classNames.watchPointerCenter} />
      </div>
    );
  }
}

/******************************************************************************/
