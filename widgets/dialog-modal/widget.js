//T:2019-02-27
import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import KeyTrap from 'goblin-gadgets/widgets/key-trap.js';
import Container from 'goblin-gadgets/widgets/container/widget';
import Screw from 'goblin-gadgets/widgets/screw/widget';
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
        <Screw
          backgroundBrigtness={backgroundBrigtness}
          top="8px"
          left="8px"
          angle="45deg"
        />
        <Screw
          backgroundBrigtness={backgroundBrigtness}
          top="8px"
          right="8px"
          angle="-20deg"
        />
        <Screw
          backgroundBrigtness={backgroundBrigtness}
          bottom="8px"
          left="8px"
          angle="70deg"
        />
        <Screw
          backgroundBrigtness={backgroundBrigtness}
          bottom="8px"
          right="8px"
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
          className={this.styles.classNames.fullScreen}
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
        <div
          className={this.styles.classNames.fullScreen}
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
      );
    }
  }
}

/******************************************************************************/
