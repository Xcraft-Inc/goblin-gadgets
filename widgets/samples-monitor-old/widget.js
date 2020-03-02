import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import * as styles from './styles';
import getPath from './getPath';
import Gauge from 'goblin-gadgets/widgets/gauge/widget';
import {Unit} from 'electrum-theme';

/******************************************************************************/

export default class SamplesMonitor extends Widget {
  constructor() {
    super(...arguments);
    this.styles = styles;
  }

  /******************************************************************************/

  renderScreenBorder(w, h, styleName) {
    return (
      <svg width={w} height={h} className={this.styles.classNames[styleName]}>
        <path d={getPath.getScreenPath(w, h, styleName)} />
      </svg>
    );
  }

  renderScreen(w, h) {
    if (this.context.theme.look.name !== 'retro') {
      return null;
    }

    w = Unit.sub(w, '4px');
    h = Unit.sub(h, '4px');

    return (
      <React.Fragment>
        {this.renderScreenBorder(w, h, 'screenLeft')}
        {this.renderScreenBorder(w, h, 'screenRight')}
        {this.renderScreenBorder(w, h, 'screenTop')}
        {this.renderScreenBorder(w, h, 'screenBottom')}
      </React.Fragment>
    );
  }

  renderGrid(w, h) {
    let nx, ny;
    if (this.context.theme.look.name === 'retro') {
      nx = 10;
      ny = 8;
    } else {
      nx = 1;
      ny = 1;
    }

    return (
      <svg
        width={w}
        height={h}
        className={`grid-hover ${this.styles.classNames.grid}`}
      >
        <path d={getPath.getGridPath(w, h, nx, ny)} />
      </svg>
    );
  }

  renderSamples(w, h) {
    if (!this.props.samples) {
      return null;
    }

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
    if (this.context.theme.look.name !== 'retro') {
      return null;
    }

    return <div className={`flare-hover ${this.styles.classNames.flare}`} />;
  }

  renderPowerOff(w, h) {
    if (this.context.theme.look.name !== 'retro') {
      return null;
    }

    w = Unit.sub(w, '80px');
    h = Unit.sub(h, '80px');

    return (
      <svg width={w} height={h} className={this.styles.classNames.powerOff}>
        <path d={getPath.getPowerOffPath(w, h)} />
      </svg>
    );
  }

  renderGauge() {
    const hasGauge = this.props.current && this.props.total;
    const value = hasGauge ? (this.props.current / this.props.total) * 100 : 0;

    return (
      <div className={this.styles.classNames.panel}>
        {hasGauge ? (
          <Gauge
            kind={this.context.theme.look.name === 'retro' ? 'rounded' : ''}
            gradient="red-yellow-green"
            direction="vertical"
            height="100%"
            width="15px"
            value={value}
          />
        ) : null}
      </div>
    );
  }

  render() {
    const wt = this.props.width;
    const h = this.props.height;
    if (!wt || !h) {
      throw new Error('Undefined Monitor width or height');
    }
    const w = Unit.sub(wt, '50px');

    return (
      <div className={this.styles.classNames.monitor}>
        <div className={this.styles.classNames.tube}>
          {this.renderScreen(w, h)}
          {this.renderGrid(w, h)}
          {this.renderSamples(w, h)}
          {this.renderFlare()}
          {this.renderPowerOff(w, h)}
          <div className={this.styles.classNames.border} />
        </div>
        {this.renderGauge()}
      </div>
    );
  }
}

/******************************************************************************/
