//T:2019-02-27
import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import KeyTrap from 'goblin-gadgets/widgets/key-trap.js';
import Container from 'goblin-gadgets/widgets/container/widget';
import RetroScrew from 'goblin-gadgets/widgets/retro-screw/widget';
import RetroGear from 'goblin-gadgets/widgets/retro-gear/widget';
import {ColorManipulator} from 'electrum-theme';
import * as RectHelpers from '../helpers/rect-helpers.js';
import * as styles from './styles';

/******************************************************************************/

export default class DialogModal extends Widget {
  constructor() {
    super(...arguments);
    this.styles = styles;

    this.onBackgroundClick = this.onBackgroundClick.bind(this);
    this.onCloseCombo = this.onCloseCombo.bind(this);
  }

  componentWillMount() {
    KeyTrap.bind('Escape', this.onCloseCombo);
    KeyTrap.bind('Enter', this.onCloseCombo);
  }

  componentWillUnmount() {
    super.componentWillUnmount();
    KeyTrap.unbind('Escape', this.onCloseCombo);
    KeyTrap.unbind('Enter', this.onCloseCombo);
  }

  onCloseCombo() {
    const close = this.props.close;
    if (close) {
      close();
    }
  }

  onBackgroundClick(e) {
    if (!this.props.backgroundClose) {
      return;
    }

    const rect = this.divNode.getBoundingClientRect();
    if (!RectHelpers.isInside(rect, e.clientX, e.clientY)) {
      // If the mouse is outside the menu combo, close it.
      this.onCloseCombo();
    }
  }

  /******************************************************************************/

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
    if (this.context.theme.look.name !== 'retro') {
      return null;
    }

    const color = ColorManipulator.darken(
      this.context.theme.palette.light,
      0.2
    );

    const r1 = 500; // radius (px)
    const r2 = 200; // radius (px)
    const t1 = 36; // tooth count
    const t2 = 14; // tooth count
    const d1 = 60; // duration (s)
    const d2 = d1 / (t1 / t2); // duration (s)

    return (
      <React.Fragment>
        {this.renderGear('gear1', color, r1, t1, d1, 'cw')}
        {this.renderGear('gear2', color, r2, t2, d2, 'ccw')}
        {this.renderGear('gear3', color, 700, 50, 250, 'ccw')}
      </React.Fragment>
    );
  }

  renderScrews() {
    if (this.context.theme.look.name !== 'retro') {
      return null;
    }

    const lum = ColorManipulator.getLuminance(
      this.context.theme.palette.textColor
    );
    const backgroundBrigtness = lum < 0.3 ? 'light' : 'dark';

    return (
      <React.Fragment>
        <RetroScrew
          backgroundBrigtness={backgroundBrigtness}
          radius="8px"
          top="15px"
          left="15px"
          angle="45deg"
        />
        <RetroScrew
          backgroundBrigtness={backgroundBrigtness}
          radius="8px"
          top="15px"
          right="15px"
          angle="-20deg"
        />
        <RetroScrew
          backgroundBrigtness={backgroundBrigtness}
          radius="8px"
          bottom="15px"
          left="15px"
          angle="70deg"
        />
        <RetroScrew
          backgroundBrigtness={backgroundBrigtness}
          radius="8px"
          bottom="15px"
          right="15px"
          angle="0deg"
        />
      </React.Fragment>
    );
  }

  render() {
    if (
      this.props.top ||
      this.props.bottom ||
      this.props.left ||
      this.props.right
    ) {
      let tp = null;
      if (this.props.top) {
        tp = 'top';
      } else if (this.props.bottom) {
        tp = 'bottom';
      } else if (this.props.left) {
        tp = 'left';
      } else if (this.props.right) {
        tp = 'right';
      }

      return (
        <div
          className={this.styles.classNames.fullScreen2}
          onMouseDown={this.onBackgroundClick}
          onTouchStart={this.onBackgroundClick}
        >
          <div
            ref={node => (this.divNode = node)}
            className={this.styles.classNames.combo}
          >
            <Container
              kind="flying-dialog"
              subkind={this.props.subkind}
              trianglePosition={tp}
              triangleShift={this.props.triangleShift}
              cursor="default"
            >
              {this.props.children}
            </Container>
          </div>
        </div>
      );
    } else {
      return (
        <div className={this.styles.classNames.fullScreen1}>
          {this.renderGears()}
          <div
            className={this.styles.classNames.fullScreen2}
            onMouseDown={this.onBackgroundClick}
            onTouchStart={this.onBackgroundClick}
          >
            <div
              ref={node => (this.divNode = node)}
              className={this.styles.classNames.dialogModal}
            >
              <div className={this.styles.classNames.dialogModalInside}>
                {this.renderScrews()}
                {this.props.children}
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

/******************************************************************************/
