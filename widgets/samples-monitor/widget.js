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
