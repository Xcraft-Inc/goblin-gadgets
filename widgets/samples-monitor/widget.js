import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import * as styles from './styles';
import Checkbox from 'goblin-gadgets/widgets/checkbox/widget';
import Separator from 'goblin-gadgets/widgets/separator/widget';
import {Unit} from 'electrum-theme';
import Shredder from 'xcraft-core-shredder';
import {ColorManipulator} from 'electrum-theme';
import helpers from './helpers';
import svg from '../helpers/svg-helpers';

/******************************************************************************/

export default class SamplesMonitor extends Widget {
  constructor() {
    super(...arguments);
    this.styles = styles;

    this.state = {
      mode: 'grouped',
    };

    this.onOff = this.onOff.bind(this);
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

  onOff() {
    if (this.props.onOff) {
      this.props.onOff();
    }
  }

  /******************************************************************************/

  get isRetro() {
    return this.context.theme.look.name === 'retro';
  }

  get strokeColors() {
    if (this.isRetro) {
      return [
        '#15f2b6',
        '#3ff215',
        '#cbf215',
        '#f2cb15',
        '#f27d15',
        '#fb45df',
        '#ac45fb',
      ];
    } else {
      return [
        '#0f0',
        '#fbdb45',
        '#fb8145',
        '#fb45ca',
        '#a745fb',
        '#3b48fd',
        '#45dbfb',
      ];
    }
  }

  /******************************************************************************/

  renderBackgroundCRT() {
    if (!this.isRetro) {
      return null;
    }

    return <div className={this.styles.classNames.backgroundCRT} />;
  }

  renderForegroundCRT() {
    if (!this.isRetro) {
      return null;
    }

    return (
      <React.Fragment>
        <div className={this.styles.classNames.foregroundCRT1} />
        <div className={this.styles.classNames.foregroundCRT2} />
        <div className={this.styles.classNames.foregroundCRT3} />
      </React.Fragment>
    );
  }

  renderFlare() {
    if (!this.isRetro) {
      return null;
    }

    return <div className={`flare-hover ${this.styles.classNames.flare}`} />;
  }

  renderScreen(w, h) {
    if (!this.isRetro) {
      return null;
    }

    w -= 4;
    h -= 4;

    const screenElements = helpers.getScreenElements(w, h);

    return (
      <React.Fragment>
        {svg.renderElements(this.styles.classNames.screen, screenElements)}
        {this.renderFlare()}
        <div className={this.styles.classNames.border} />
      </React.Fragment>
    );
  }

  renderGrid(w, h, channels) {
    let ox = 40;
    let oy = 40;
    const dx = w - 80;
    const dy = h - 80;

    const channelCount =
      this.mode === 'separate' || this.mode === 'all'
        ? Math.max(channels.length, 1)
        : 1;

    let nx, ny;
    if (this.isRetro) {
      nx = 10;
      ny = {3: 9, 5: 5, 6: 6, 7: 7, 9: 9, 10: 5}[channelCount] || 8;
    } else {
      nx = 1;
      ny = channelCount;
    }

    const strokeColor = this.isRetro
      ? 'rgba(0,255,0,0.2)'
      : 'rgba(255,255,255,0.1)';

    const elements = helpers.getGridElements(
      ox,
      oy,
      dx,
      dy,
      nx,
      ny,
      strokeColor
    );

    return svg.renderElements(this.styles.classNames.grid, elements);
  }

  renderSamplesSVG(ox, oy, dx, dy, channel, part, color) {
    if (this.isRetro && part === 'fill') {
      return null;
    }

    const strokeWidth = this.isRetro ? '2px' : '1px';
    const strokeColor =
      part === 'fill' ? 'transparent' : color || this.strokeColors[0];
    const fillColor =
      part === 'stroke'
        ? 'transparent'
        : ColorManipulator.fade(color || this.strokeColors[0], 0.3);

    const elements = helpers.getSampleElements(
      ox,
      oy,
      dx,
      dy,
      channel.samples,
      channel.max || 0.0001,
      part,
      strokeWidth,
      strokeColor,
      fillColor
    );

    return svg.renderElements(this.styles.classNames.samples, elements);
  }

  renderSamples(ox, oy, dx, dy, channel, color, index) {
    if (!channel.samples) {
      return null;
    }

    return (
      <React.Fragment key={index}>
        {this.renderSamplesSVG(ox, oy, dx, dy, channel, 'fill', color)}
        {this.renderSamplesSVG(ox, oy, dx, dy, channel, 'stroke', color)}
      </React.Fragment>
    );
  }

  renderSampleName(ox, oy, dx, dy, channel, color, index) {
    const style = {
      left: ox + 'px',
      width: dx + 'px',
      top: oy + 'px',
      height: dy + 'px',
      color: color || this.strokeColors[0],
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

  renderChannel(ox, oy, dx, dy, channel, color, index) {
    const hn = 16;
    return (
      <React.Fragment key={index}>
        {this.renderSamples(ox, oy, dx, dy - hn, channel, color)}
        {this.renderSampleName(ox, oy + dy - hn, dx, hn, channel, color)}
      </React.Fragment>
    );
  }

  renderSeparateChannels(w, h, channels) {
    let ox = 40;
    let oy = 40;
    const my = 5;
    const dx = w - 80;
    const dy = (h - 80 + my) / Math.max(channels.length, 1) - my;

    const result = [];
    let index = 0;

    if (channels.length === 0) {
      // Simple horizontal line.
      const flat = {samples: new Shredder([0, 0]), max: 1, name: 'IDLE'};
      result.push(this.renderChannel(ox, oy, dx, dy, flat, null, index++));
    } else {
      const colors = this.strokeColors;
      for (const channel of channels) {
        const colorIndex = this.isRetro ? 0 : index;
        const color = colors[colorIndex % colors.length];
        result.push(
          this.renderChannel(ox, oy, dx, dy, channel, color, index++)
        );
        oy += dy + my;
      }
    }

    return result;
  }

  renderStackedChannels(w, h, channels) {
    let ox = 40;
    let oy = 40;
    const dx = w - 80;
    const dy = h - 80;

    const result = [];
    let index = 0;

    if (channels.length === 0) {
      // Simple horizontal line.
      const flat = {samples: new Shredder([0, 0]), max: 1, name: 'IDLE'};
      result.push(this.renderChannel(ox, oy, dx, dy, flat, null, index++));
    } else {
      const hn = 16;
      const colors = this.strokeColors;
      // Display samples on same rectangle.
      let colorIndex = 0;
      for (const channel of channels) {
        const color = colors[colorIndex++ % colors.length];
        result.push(
          this.renderSamples(ox, oy, dx, dy - hn, channel, color, index++)
        );
      }
      // Display names, from left to right.
      colorIndex = 0;
      const tx = dx / channels.length;
      for (const channel of channels) {
        const color = colors[colorIndex++ % colors.length];
        result.push(
          this.renderSampleName(
            ox,
            oy + dy - hn,
            tx,
            hn,
            channel,
            color,
            index++
          )
        );
        ox += tx;
      }
    }

    return result;
  }

  renderGroupedChannels(w, h, channels) {
    let ox = 40;
    let oy = 40;
    const dx = w - 80;
    const dy = h - 80;

    const samples = [];
    samples.length = 100;
    samples.fill(0);

    let max = 0.0001;
    for (const channel of channels) {
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
        {this.renderSamples(ox, oy, dx, dy, channel)}
      </React.Fragment>
    );
  }

  renderChannels(w, h, channels) {
    if (this.mode === 'grouped') {
      return this.renderGroupedChannels(w, h, channels);
    } else if (this.mode === 'colored-stack') {
      return this.renderStackedChannels(w, h, channels);
    } else {
      return this.renderSeparateChannels(w, h, channels);
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
        <Checkbox
          kind="radio"
          glyphSize="150%"
          checked={this.mode === 'all'}
          onChange={() => (this.mode = 'all')}
        />
        {this.isRetro ? <Separator kind="exact" height="30px" /> : null}
        {this.isRetro ? (
          <Checkbox
            kind="switch"
            glyphSize="150%"
            checked={this.props.showed}
            onChange={this.onOff}
          />
        ) : null}
      </div>
    );
  }

  renderCRT(w, h) {
    const channels =
      this.mode === 'all'
        ? this.props.channels
        : this.props.channels.filter(c => c.max > 0);

    return (
      <div className={this.styles.classNames.crt}>
        {this.renderBackgroundCRT()}
        {this.renderGrid(w, h, channels)}
        <div className={this.styles.classNames.channels}>
          {this.renderChannels(w, h, channels)}
        </div>
        {this.renderForegroundCRT()}
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
          {this.renderCRT(w, h)}
          {this.renderScreen(w, h)}
        </div>
        {this.renderRightPanel()}
      </div>
    );
  }
}

/******************************************************************************/
