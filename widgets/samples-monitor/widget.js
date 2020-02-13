import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import * as styles from './styles';
import getPath from './getPath';
import {Unit} from 'electrum-theme';

/******************************************************************************/

export default class SamplesMonitor extends Widget {
  constructor() {
    super(...arguments);
    this.styles = styles;

    this.timer = setInterval(() => this.update(), this.props.period || 1000);
  }

  componentWillUnmount() {
    super.componentWillUnmount();
    clearInterval(this.timer);
  }

  update() {
    if (this.props.showed) {
      this.forceUpdate();
    }
  }

  /******************************************************************************/

  renderScreen(w, h) {
    w = Unit.sub(w, '4px');
    h = Unit.sub(h, '4px');

    return (
      <React.Fragment>
        <svg width={w} height={h} className={this.styles.classNames.screenLeft}>
          <path d={getPath.getScreenPath(w, h, 'left')} />
        </svg>
        <svg
          width={w}
          height={h}
          className={this.styles.classNames.screenRight}
        >
          <path d={getPath.getScreenPath(w, h, 'right')} />
        </svg>
        <svg width={w} height={h} className={this.styles.classNames.screenTop}>
          <path d={getPath.getScreenPath(w, h, 'top')} />
        </svg>
        <svg
          width={w}
          height={h}
          className={this.styles.classNames.screenBottom}
        >
          <path d={getPath.getScreenPath(w, h, 'bottom')} />
        </svg>
      </React.Fragment>
    );
  }

  renderGrid(w, h) {
    w = Unit.sub(w, '80px');
    h = Unit.sub(h, '80px');

    return (
      <svg
        width={w}
        height={h}
        className={`grid-hover ${this.styles.classNames.grid}`}
      >
        <path d={getPath.getGridPath(w, h, 10, 8)} />
      </svg>
    );
  }

  renderSamples(w, h) {
    if (!this.props.samples) {
      return null;
    }

    w = Unit.sub(w, '80px');
    h = Unit.sub(h, '80px');

    return (
      <svg
        width={w}
        height={h}
        className={`samples-hover ${this.styles.classNames.samples}`}
      >
        <path d={getPath.getSamplesPath(w, h, this.props.samples)} />
      </svg>
    );
  }

  renderFlare() {
    return <div className={`flare-hover ${this.styles.classNames.flare}`} />;
  }

  renderPowerOff(w, h) {
    w = Unit.sub(w, '80px');
    h = Unit.sub(h, '80px');

    return (
      <svg width={w} height={h} className={this.styles.classNames.powerOff}>
        <path d={getPath.getPowerOffPath(w, h)} />
      </svg>
    );
  }

  render() {
    const w = this.props.width;
    const h = this.props.height;
    if (!w || !h) {
      throw new Error('Undefined Monitor width or height');
    }

    return (
      <div className={this.styles.classNames.monitor}>
        {this.renderScreen(w, h)}
        {this.renderGrid(w, h)}
        {this.renderSamples(w, h)}
        {this.renderFlare()}
        {this.renderPowerOff(w, h)}
        <div className={this.styles.classNames.border} />
      </div>
    );
  }
}

/******************************************************************************/
