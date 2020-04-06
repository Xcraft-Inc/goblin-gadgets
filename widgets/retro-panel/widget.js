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

  renderGear(
    style,
    color,
    radius,
    type,
    tooths,
    thickness,
    duration,
    direction
  ) {
    return (
      <div className={this.styles.classNames[style]}>
        <RetroGear
          color={color}
          left="0px"
          top="0px"
          radius={radius + 'px'}
          type={type}
          toothCount={tooths}
          toothThickness={thickness}
          rotationDuration={duration + 's'}
          rotationDirection={direction}
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

    return (
      <React.Fragment>
        {this.renderGear('fourGear1', color, r1, 'meca', t1, 60, d1, 'cw')}
        {this.renderGear('fourGear2', color, r2, 'meca', t2, 60, d2, 'ccw')}
        {this.renderGear('fourGear3', color, r3, 'meca', t3, 60, d3, 'cw')}
        {this.renderGear('fourGear4', color, r4, 'meca', t4, 60, d4, 'ccw')}
      </React.Fragment>
    );
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

  renderWatchFix(i) {
    const className =
      i % 5 === 0
        ? this.styles.classNames.watchFix1
        : this.styles.classNames.watchFix2;

    const style = {
      transform: `rotate(${i * 6}deg)`,
    };

    return <div className={className} key={i} style={style} />;
  }

  renderWatchFixes() {
    const result = [];

    for (let i = 0; i < 60; i++) {
      result.push(this.renderWatchFix(i));
    }

    return result;
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
    const d1 = 400; // duration (s)
    const d2 = d1 / (t1 / t2); // duration (s)
    const d3 = d2 / (t2 / t3); // duration (s)
    const d4 = d3; // duration (s)

    const now = new Date(Date.now());
    const h = now.getHours() % 12;
    const m = now.getMinutes();
    const s = now.getSeconds();

    const ah = 180 + ((h + m / 60 + s / 3600) / 12) * 360;
    const am = 180 + ((m + s / 60) / 60) * 360;
    const as = 180 + (s / 60) * 360;

    return (
      <React.Fragment>
        {this.renderGear(
          'clockGear1',
          color,
          r1,
          'watch-gear',
          t1,
          30,
          d1,
          'cw'
        )}
        {this.renderGear(
          'clockGear2',
          color,
          r2,
          'watch-gear',
          t2,
          30,
          d2,
          'ccw'
        )}
        {this.renderGear(
          'clockGear3',
          color,
          r3,
          'watch-gear',
          t3,
          30,
          d3,
          'cw'
        )}
        {this.renderGear(
          'clockGear4',
          color,
          r4,
          'watch-gear',
          t4,
          30,
          d4,
          'cw'
        )}
        <div className={this.styles.classNames.watchCadran}>
          {this.renderWatchFixes()}
        </div>
        {this.renderWatchPointer('watchPointerHour', ah)}
        {this.renderWatchPointer('watchPointerMinute', am)}
        {this.renderWatchPointer('watchPointerSecond', as)}
        <div className={this.styles.classNames.watchPointerCenter} />
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
