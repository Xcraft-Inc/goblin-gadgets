import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import * as styles from './styles';
import getPath from './getPath';
import Checkbox from 'goblin-gadgets/widgets/checkbox/widget';
import Separator from 'goblin-gadgets/widgets/separator/widget';
import {Unit} from 'electrum-theme';
import Shredder from 'xcraft-core-shredder';
import {ColorManipulator} from 'electrum-theme';

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

  renderScreen(w, h) {
    if (!this.isRetro) {
      return null;
    }

    w -= 4;
    h -= 4;

    return (
      <React.Fragment>
        {this.renderScreenBorder(w, h, 'screenLeft')}
        {this.renderScreenBorder(w, h, 'screenRight')}
        {this.renderScreenBorder(w, h, 'screenTop')}
        {this.renderScreenBorder(w, h, 'screenBottom')}
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

    return (
      <svg
        width={w + 'px'}
        height={h + 'px'}
        className={this.styles.classNames.grid}
      >
        <path d={getPath.getGridPath(ox, oy, dx, dy, nx, ny)} />
      </svg>
    );
  }

  renderSamplesSVG(w, h, ox, oy, dx, dy, channel, part, style) {
    return (
      <svg
        width={w + 'px'}
        height={h + 'px'}
        className={this.styles.classNames.samplesStroke}
        style={style}
      >
        <path
          d={getPath.getSamplesPath(
            ox,
            oy,
            dx,
            dy,
            channel.samples,
            channel.max || 0.0001,
            part
          )}
        />
      </svg>
    );
  }

  renderSamples(w, h, ox, oy, dx, dy, channel, color, index) {
    if (!channel.samples) {
      return null;
    }

    const styleFill = {
      fill: ColorManipulator.fade(color || this.strokeColors[0], 0.3),
    };

    const styleStroke = {
      stroke: color || this.strokeColors[0],
    };

    return (
      <React.Fragment key={index}>
        {!this.isRetro
          ? this.renderSamplesSVG(
              w,
              h,
              ox,
              oy,
              dx,
              dy,
              channel,
              'fill',
              styleFill
            )
          : null}
        {this.renderSamplesSVG(
          w,
          h,
          ox,
          oy,
          dx,
          dy,
          channel,
          'stroke',
          styleStroke
        )}
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

  renderChannel(w, h, ox, oy, dx, dy, channel, color, index) {
    const hn = 16;
    return (
      <React.Fragment key={index}>
        {this.renderSamples(w, h, ox, oy, dx, dy - hn, channel, color)}
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
      result.push(
        this.renderChannel(
          w,
          h,
          ox,
          oy,
          dx,
          dy,
          {samples: new Shredder([0, 0]), max: 1, name: 'IDLE'},
          null,
          index++
        )
      );
    } else {
      const colors = this.strokeColors;
      for (const channel of channels) {
        const colorIndex = this.isRetro ? 0 : index;
        const color = colors[colorIndex % colors.length];
        result.push(
          this.renderChannel(w, h, ox, oy, dx, dy, channel, color, index++)
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
      result.push(
        this.renderChannel(
          w,
          h,
          ox,
          oy,
          dx,
          dy,
          {samples: new Shredder([0, 0]), max: 1, name: 'IDLE'},
          null,
          index++
        )
      );
    } else {
      const hn = 16;
      const colors = this.strokeColors;
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
        {this.renderSamples(w, h, ox, oy, dx, dy, channel)}
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
