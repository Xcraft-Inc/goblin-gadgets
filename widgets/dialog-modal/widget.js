import React from 'react';
import props from './props';
import {registerWidget} from 'goblin-gadgets/widgets/widget-doc/widget-list';
import Widget from 'goblin-laboratory/widgets/widget';
import KeyTrap from 'goblin-gadgets/widgets/key-trap.js';
import Container from 'goblin-gadgets/widgets/container/widget';
import DialogResizable from 'goblin-gadgets/widgets/dialog-resizable/widget';
import RetroScrew from 'goblin-gadgets/widgets/retro-screw/widget';
import RetroGear from 'goblin-gadgets/widgets/retro-gear/widget';
import {ColorManipulator} from 'goblin-theme';
import {Unit} from 'goblin-theme';
const px = Unit.toPx;
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

  UNSAFE_componentWillMount() {
    KeyTrap.bind('Escape', this.onCloseCombo);
    if (!this.props.enterKeyStaysInside) {
      KeyTrap.bind('Enter', this.onCloseCombo);
    }
  }

  componentWillUnmount() {
    super.componentWillUnmount();
    KeyTrap.unbind('Escape', this.onCloseCombo);
    if (!this.props.enterKeyStaysInside) {
      KeyTrap.unbind('Enter', this.onCloseCombo);
    }
  }

  onCloseCombo() {
    const close = this.props.close;
    if (close) {
      close();
    }
  }

  onBackgroundClick(e) {
    if (!this.props.backgroundClose || !this.divNode) {
      return;
    }

    if (window.document.showCombo) {
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
          radius={px(radius)}
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
      <>
        {this.renderGear('gear1', color, r1, t1, d1, 'cw')}
        {this.renderGear('gear2', color, r2, t2, d2, 'ccw')}
        {this.renderGear('gear3', color, 700, 50, 250, 'ccw')}
      </>
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
      <>
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
      </>
    );
  }

  renderWithTriangle() {
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
          ref={(node) => (this.divNode = node)}
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
  }

  renderWithoutTriangle() {
    return (
      <div className={this.styles.classNames.fullScreen1}>
        {this.renderGears()}
        <div
          className={this.styles.classNames.fullScreen2}
          onMouseDown={this.onBackgroundClick}
          onTouchStart={this.onBackgroundClick}
        >
          <div
            ref={(node) => (this.divNode = node)}
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

  renderResizable() {
    const title = this.props.title;

    const width = this.props.width || '600px';
    const height = this.props.height || '400px';

    const minWidth = this.props.minWidth || Unit.multiply(width, 0.5);
    const minHeight = this.props.minHeight || Unit.multiply(width, 0.5);

    const retro = this.context.theme.look.name === 'retro';

    return (
      <div className={this.styles.classNames.fullScreen1}>
        {this.renderGears()}
        <div
          className={this.styles.classNames.fullScreen2}
          onMouseDown={this.onBackgroundClick}
          onTouchStart={this.onBackgroundClick}
        >
          <div className={this.styles.classNames.dialogModal}>
            <DialogResizable
              id={this.props.id}
              zIndex={this.props.zIndex}
              titleBarText={title}
              margin={this.props.margin || (retro ? '40px' : '30px')}
              minWidth={minWidth}
              minHeight={minHeight}
              width={width}
              height={height}
              horizontal="0px"
              vertical="0px"
              drawChildrenWhileResizing={true}
              enterKeyStaysInside={this.props.enterKeyStaysInside}
              onCloseDialog={this.onCloseCombo}
            >
              {this.renderScrews()}
              {this.props.children}
            </DialogResizable>
          </div>
        </div>
      </div>
    );
  }

  render() {
    if (
      this.props.top ||
      this.props.bottom ||
      this.props.left ||
      this.props.right
    ) {
      return this.renderWithTriangle();
    } else if (this.props.resizable) {
      return this.renderResizable();
    } else {
      return this.renderWithoutTriangle();
    }
  }
}

/******************************************************************************/

registerWidget(DialogModal, props, null, false);
