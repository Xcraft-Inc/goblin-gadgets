import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import RetroScrew from 'goblin-gadgets/widgets/retro-screw/widget';
import RetroGear from 'goblin-gadgets/widgets/retro-gear/widget';
import {ColorManipulator} from 'electrum-theme';
import {Unit} from 'electrum-theme';

/******************************************************************************/

export default class RetroPanel extends Widget {
  constructor() {
    super(...arguments);
  }

  renderGear(style, color, radius, tooths, duration, direction) {
    return (
      <div className={this.styles.classNames[style]}>
        <RetroGear
          color={color}
          left="0px"
          top="0px"
          radius={radius + 'px'}
          toothCount={tooths}
          rotationDuration={duration + 's'}
          rotationDirection={direction}
        />
      </div>
    );
  }
  renderGears() {
    if (this.props.gears !== 'four') {
      return null;
    }

    const color = ColorManipulator.darken(
      this.context.theme.palette.light,
      0.2
    );

    const r1 = 500; // radius (px)
    const r2 = 200; // radius (px)
    const r3 = 300; // radius (px)
    const r4 = 150; // radius (px)
    const t1 = 36; // tooth count
    const t2 = 14; // tooth count
    const t3 = 20; // tooth count
    const t4 = 9; // tooth count
    const d1 = 400; // duration (s)
    const d2 = d1 / (t1 / t2); // duration (s)
    const d3 = d2 / (t2 / t3); // duration (s)
    const d4 = d3 / (t3 / t4); // duration (s)

    return (
      <React.Fragment>
        {this.renderGear('gear1', color, r1, t1, d1, 'cw')}
        {this.renderGear('gear2', color, r2, t2, d2, 'ccw')}
        {this.renderGear('gear3', color, r3, t3, d3, 'cw')}
        {this.renderGear('gear4', color, r4, t4, d4, 'ccw')}
      </React.Fragment>
    );
  }

  renderScrews() {
    const lum = ColorManipulator.getLuminance(
      this.context.theme.palette.textColor
    );
    const backgroundBrigtness = lum < 0.3 ? 'light' : 'dark';

    const r = Unit.multiply(this.props.radius, 0.5);
    const d =
      this.props.position === 'absolute'
        ? Unit.add(this.props.margin, this.props.radius)
        : this.props.radius;

    return (
      <React.Fragment>
        <RetroScrew
          backgroundBrigtness={backgroundBrigtness}
          radius={r}
          top={d}
          left={d}
          angle="-30deg"
        />
        <RetroScrew
          backgroundBrigtness={backgroundBrigtness}
          radius={r}
          top={d}
          right={d}
          angle="65deg"
        />
        <RetroScrew
          backgroundBrigtness={backgroundBrigtness}
          radius={r}
          bottom={d}
          left={d}
          angle="10deg"
        />
        <RetroScrew
          backgroundBrigtness={backgroundBrigtness}
          radius={r}
          bottom={d}
          right={d}
          angle="-70deg"
        />
      </React.Fragment>
    );
  }

  renderAbsolute() {
    switch (this.props.kind) {
      case 'metal-plate':
        return (
          <React.Fragment>
            <div
              className={this.styles.classNames.retroPanelMetalPlateAbsolute}
            />
            {this.renderScrews()}
            {this.renderGears()}
            {this.props.children}
          </React.Fragment>
        );
      default:
        return null;
    }
  }

  renderRelative() {
    switch (this.props.kind) {
      case 'metal-plate':
        return (
          <div className={this.styles.classNames.retroPanelMetalPlateRelative}>
            {this.renderScrews()}
            {this.props.children}
          </div>
        );
      default:
        return null;
    }
  }

  render() {
    if (this.props.position === 'absolute') {
      return this.renderAbsolute();
    } else {
      return this.renderRelative();
    }
  }
}

/******************************************************************************/
