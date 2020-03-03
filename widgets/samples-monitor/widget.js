import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import * as styles from './styles';
import getPath from './getPath';
import Checkbox from 'goblin-gadgets/widgets/checkbox/widget';
import {Unit} from 'electrum-theme';
import Shredder from 'xcraft-core-shredder';

/******************************************************************************/

export default class SamplesMonitor extends Widget {
  constructor() {
    super(...arguments);
    this.styles = styles;

    this.state = {
      mode: 'grouped',
    };
  }

  //#region get/set
  get mode() {
    return this.state.mode;
  }

  set mode(value) {
    this.setState({
      mode: value,
    });
  }
  //#endregion

  /******************************************************************************/

  get strokeColor() {
    return this.context.theme.look.name === 'retro' ? '#15f2b6' : '#0f0';
  }

  /******************************************************************************/

  renderBackgroundCRT() {
    return <div className={this.styles.classNames.backgroundCRT} />;
  }

  renderForegroundCRT() {
    return (
      <React.Fragment>
        <div className={this.styles.classNames.foregroundCRT1} />
        <div className={this.styles.classNames.foregroundCRT2} />
      </React.Fragment>
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

    return (
      <svg width={w} height={h} className={this.styles.classNames.powerOff}>
        <path d={getPath.getPowerOffPath(w - 80, h - 80)} />
      </svg>
    );
  }

  renderScreenBorder(w, h, styleName) {
    return (
      <svg
        width={w + 'px'}
        height={h + 'px'}
        className={this.styles.classNames[styleName]}
      >
        <path d={getPath.getScreenPath(w, h, styleName)} />
      </svg>
    );
  }

  renderBackgroundScreen(w, h) {
    if (this.context.theme.look.name !== 'retro') {
      return null;
    }

    w -= 4;
    h -= 4;

    return <React.Fragment>{this.renderBackgroundCRT()}</React.Fragment>;
  }

  renderForegroundScreen(w, h) {
    if (this.context.theme.look.name !== 'retro') {
      return null;
    }

    w -= 4;
    h -= 4;

    return (
      <React.Fragment>
        {this.renderForegroundCRT()}
        {this.renderScreenBorder(w, h, 'screenLeft')}
        {this.renderScreenBorder(w, h, 'screenRight')}
        {this.renderScreenBorder(w, h, 'screenTop')}
        {this.renderScreenBorder(w, h, 'screenBottom')}
        {this.renderFlare()}
        {this.renderPowerOff(w, h)}
      </React.Fragment>
    );
  }

  renderGrid(w, h) {
    let ox = 40;
    let oy = 40;
    const dx = w - 80;
    const dy = h - 80;

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
        width={w + 'px'}
        height={h + 'px'}
        className={`grid-hover ${this.styles.classNames.grid}`}
      >
        <path d={getPath.getGridPath(ox, oy, dx, dy, nx, ny)} />
      </svg>
    );
  }

  renderSamples(w, h, ox, oy, dx, dy, channel, color, index) {
    if (!channel.samples) {
      return null;
    }

    const style = {
      stroke: color || this.strokeColor,
    };

    return (
      <svg
        key={index}
        width={w + 'px'}
        height={h + 'px'}
        className={`samples-hover ${this.styles.classNames.samples}`}
        style={style}
      >
        <path
          d={getPath.getSamplesPath(
            ox,
            oy,
            dx,
            dy,
            channel.samples,
            channel.max
          )}
        />
      </svg>
    );
  }

  renderSampleName(ox, oy, dx, dy, channel, color, index) {
    const style = {
      left: ox + 'px',
      width: dx + 'px',
      top: oy + 'px',
      height: dy + 'px',
      color: color || this.strokeColor,
    };

    return (
      <div
        key={index}
        className={this.styles.classNames.sampleName}
        style={style}
      >
        {channel.name}
      </div>
    );
  }

  renderChannel(w, h, ox, oy, dx, dy, channel, index) {
    const hn = 16;
    return (
      <React.Fragment key={index}>
        {this.renderSamples(w, h, ox, oy, dx, dy - hn, channel)}
        {this.renderSampleName(ox, oy + dy - hn, dx, hn, channel)}
      </React.Fragment>
    );
  }

  renderSeparateChannels(w, h) {
    const channels = this.props.channels.filter(c => c.max > 0);

    let ox = 40;
    let oy = 40;
    const my = 5;
    const dx = w - 80;
    const dy = (h - 80 + my) / Math.max(channels.length, 1) - my;

    const result = [];
    let index = 0;

    if (channels.length === 0) {
      // Simple horizontal line.
      result.push(
        this.renderChannel(
          w,
          h,
          ox,
          oy,
          dx,
          dy,
          {samples: new Shredder([0, 0]), max: 1, name: 'IDLE'},
          index++
        )
      );
    } else {
      for (const channel of channels) {
        result.push(this.renderChannel(w, h, ox, oy, dx, dy, channel, index++));
        oy += dy + my;
      }
    }

    return result;
  }

  renderStackedChannels(w, h) {
    const channels = this.props.channels.filter(c => c.max > 0);

    let ox = 40;
    let oy = 40;
    const dx = w - 80;
    const dy = h - 80;

    const result = [];
    let index = 0;

    if (channels.length === 0) {
      // Simple horizontal line.
      result.push(
        this.renderChannel(
          w,
          h,
          ox,
          oy,
          dx,
          dy,
          {samples: new Shredder([0, 0]), max: 1, name: 'IDLE'},
          index++
        )
      );
    } else {
      const hn = 16;
      const colors = [
        this.strokeColor,
        '#3ff215',
        '#cbf215',
        '#f2cb15',
        '#f27d15',
        '#fb45df',
        '#ac45fb',
      ];
      // Display samples on same rectangle.
      let colorIndex = 0;
      for (const channel of channels) {
        result.push(
          this.renderSamples(
            w,
            h,
            ox,
            oy,
            dx,
            dy - hn,
            channel,
            colors[colorIndex++ % colors.length],
            index++
          )
        );
      }
      // Display names, from left to right.
      colorIndex = 0;
      const tx = dx / channels.length;
      for (const channel of channels) {
        result.push(
          this.renderSampleName(
            ox,
            oy + dy - hn,
            tx,
            hn,
            channel,
            colors[colorIndex++ % colors.length],
            index++
          )
        );
        ox += tx;
      }
    }

    return result;
  }

  renderGroupedChannels(w, h) {
    let ox = 40;
    let oy = 40;
    const dx = w - 80;
    const dy = h - 80;

    const samples = [];
    samples.length = 100;
    samples.fill(0);

    let max = 0.0001;
    for (const channel of this.props.channels) {
      for (let i = 0; i < channel.samples.size; i++) {
        const s = channel.samples.get(i);
        max = Math.max(max, s);
        samples[i] = Math.max(samples[i], s);
      }
    }

    const channel = {
      samples: new Shredder(samples),
      max,
    };

    return (
      <React.Fragment>
        {this.renderSamples(w, h, ox, oy, dx, dy, channel)}
      </React.Fragment>
    );
  }

  renderChannels(w, h) {
    if (this.mode === 'grouped') {
      return this.renderGroupedChannels(w, h);
    } else if (this.mode === 'colored-stack') {
      return this.renderStackedChannels(w, h);
    } else {
      return this.renderSeparateChannels(w, h);
    }
  }

  renderRightPanel() {
    return (
      <div className={this.styles.classNames.panel}>
        <Checkbox
          kind="radio"
          glyphSize="150%"
          checked={this.mode === 'grouped'}
          onChange={() => (this.mode = 'grouped')}
        />
        <Checkbox
          kind="radio"
          glyphSize="150%"
          checked={this.mode === 'colored-stack'}
          onChange={() => (this.mode = 'colored-stack')}
        />
        <Checkbox
          kind="radio"
          glyphSize="150%"
          checked={this.mode === 'separate'}
          onChange={() => (this.mode = 'separate')}
        />
      </div>
    );
  }

  render() {
    const ww = this.props.width;
    const hh = this.props.height;
    if (!ww || !hh) {
      throw new Error('Undefined Monitor width or height');
    }

    const w = Unit.parse(ww).value - 50;
    const h = Unit.parse(hh).value;

    return (
      <div className={this.styles.classNames.monitor}>
        <div className={this.styles.classNames.tube}>
          {this.renderBackgroundScreen(w, h)}
          {this.renderGrid(w, h)}
          <div className={this.styles.classNames.channels}>
            {this.renderChannels(w, h)}
          </div>
          {this.renderForegroundScreen(w, h)}
          <div className={this.styles.classNames.border} />
        </div>
        {this.renderRightPanel()}
      </div>
    );
  }
}

/******************************************************************************/
