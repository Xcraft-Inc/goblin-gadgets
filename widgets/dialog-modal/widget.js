//T:2019-02-27
import React from 'react';
import ReactDOM from 'react-dom';
import Widget from 'goblin-laboratory/widgets/widget';
import KeyTrap from 'goblin-gadgets/widgets/key-trap.js';
import * as RectHelpers from '../helpers/rect-helpers.js';

import Container from 'goblin-gadgets/widgets/container/widget';
import * as styles from './styles';

/******************************************************************************/

class DialogModal extends Widget {
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
            {this.props.children}
          </div>
        </div>
      );
    }
  }
}

/******************************************************************************/
const ConnectedDialogModal = Widget.connect((state, props) => {
  const look = state.get(`backend.${props.labId}.look`);
  return {
    look,
  };
})(DialogModal);

export default class extends Widget {
  render() {
    return <ConnectedDialogModal labId={this.context.labId} {...this.props} />;
  }
}
