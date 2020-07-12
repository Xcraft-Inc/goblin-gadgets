import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import RetroScrew from 'goblin-gadgets/widgets/retro-screw/widget';
import RetroGear from 'goblin-gadgets/widgets/retro-gear/widget';
import AnalogClock from 'goblin-gadgets/widgets/analog-clock/widget';
import {ColorManipulator} from 'goblin-theme';
import {Unit} from 'goblin-theme';
const px = Unit.toPx;

/******************************************************************************/

export default class RetroPanel extends Widget {
  constructor() {
    super(...arguments);
  }

  renderGear(
    style,
    color,
    radius,
    type,
    tooths,
    thickness,
    duration,
    movement,
    direction
  ) {
    return (
      <div className={this.styles.classNames[style]}>
        <RetroGear
          color={color}
          left="0px"
          top="0px"
          radius={px(radius)}
          type={type}
          toothCount={tooths}
          toothThickness={thickness}
          rotationDuration={duration + 's'}
          rotationDirection={direction}
          rotationMovement={movement}
        />
      </div>
    );
  }

  renderFourGears() {
    if (!this.context.theme.look.accessories.includes('gears')) {
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
    const t = 'meca';
    const m = 'coutinuous';

    return (
      <React.Fragment>
        {this.renderGear('fourGear1', color, r1, t, t1, 60, d1, m, 'cw')}
        {this.renderGear('fourGear2', color, r2, t, t2, 60, d2, m, 'ccw')}
        {this.renderGear('fourGear3', color, r3, t, t3, 60, d3, m, 'cw')}
        {this.renderGear('fourGear4', color, r4, t, t4, 60, d4, m, 'ccw')}
      </React.Fragment>
    );
  }

  renderClockGears() {
    if (!this.context.theme.look.accessories.includes('gears')) {
      return null;
    }

    const color = ColorManipulator.darken(
      this.context.theme.palette.light,
      0.2
    );

    const r1 = 200; // radius (px)
    const r2 = 500; // radius (px)
    const r3 = 100; // radius (px)
    const r4 = 300; // radius (px)
    const t1 = 60; // tooth count
    const t2 = 150; // tooth count
    const t3 = 30; // tooth count
    const t4 = 90; // tooth count
    const d1 = 60; // duration (s)
    const d2 = d1 / (t1 / t2); // duration (s)
    const d3 = d2 / (t2 / t3); // duration (s)
    const d4 = d3 / (t3 / t4); // duration (s)
    const t = 'watch-gear';
    const m = 'steps';

    return (
      <React.Fragment>
        {this.renderGear('clockGear1', color, r1, t, t1, 30, d1, m, 'cw')}
        {this.renderGear('clockGear2', color, r2, t, t2, 30, d2, m, 'ccw')}
        {this.renderGear('clockGear3', color, r3, t, t3, 30, d3, m, 'cw')}
        {this.renderGear('clockGear4', color, r4, t, t4, 30, d4, m, 'cw')}
        <div className={this.styles.classNames.clock}>
          <AnalogClock look="royal" size="400px" transition="none" />
        </div>
      </React.Fragment>
    );
  }

  renderHomeGadget() {
    switch (this.props.homeGadget) {
      case 'four-gears':
        return this.renderFourGears();
      case 'clock-gears':
        return this.renderClockGears();
      default:
        return null;
    }
  }

  renderScrews() {
    if (!this.context.theme.look.accessories.includes('screws')) {
      return null;
    }

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

  renderTitle() {
    if (!this.props.title) {
      return null;
    }

    return (
      <div className={this.styles.classNames.titleBox}>
        <div className={`title-hover ${this.styles.classNames.title}`}>
          {this.props.title}
        </div>
        <div className={`subtitle-hover ${this.styles.classNames.subtitle}`}>
          {this.props.subtitle}
        </div>
      </div>
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
            {this.renderTitle()}
            {this.renderHomeGadget()}
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
