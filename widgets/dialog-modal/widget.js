import React from 'react';
import ReactDOM from 'react-dom';
import Widget from 'laboratory/widget';
import MouseTrap from 'mousetrap';
import * as RectHelpers from '../helpers/rect-helpers.js';

import Container from 'gadgets/container/widget';

/******************************************************************************/

class DialogModal extends Widget {
  constructor() {
    super(...arguments);

    this.onMouseDown = this.onMouseDown.bind(this);
    this.onContentClick = this.onContentClick.bind(this);
  }

  componentWillMount() {
    MouseTrap.bind('esc', this.onCloseCombo);
    MouseTrap.bind('enter', this.onCloseCombo);
  }

  componentWillUnmount() {
    MouseTrap.unbind('esc');
    MouseTrap.unbind('enter');
  }

  onCloseCombo() {
    const close = this.props.close;
    if (close) {
      close();
    }
  }

  onMouseDown(e) {
    const node = ReactDOM.findDOMNode(this);
    const rect = node.children[0].getBoundingClientRect();
    if (!RectHelpers.isInside(rect, e.clientX, e.clientY)) {
      // If the mouse is outside the menu combo, close it.
      this.onCloseCombo();
    }
  }

  onContentClick(e) {
    if (this.props.onBackgroundClick) {
      e.stopPropagation();
    }
  }

  render() {
    const fullScreenClass = this.styles.classNames.fullScreen;

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
      const comboClass = this.styles.classNames.combo;
      return (
        <div
          className={fullScreenClass}
          onMouseDown={this.onMouseDown}
          onTouchStart={this.onMouseDown}
        >
          <div className={comboClass}>
            <Container
              kind="flying-dialog"
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
          className={fullScreenClass}
          onMouseDown={this.onMouseDown}
          onTouchStart={this.onMouseDown}
          onClick={this.props.onBackgroundClick}
        >
          <Container
            kind="floating"
            subkind={this.props.subkind}
            cursor="default"
            width={this.props.width}
            onClick={this.onContentClick}
          >
            {this.props.children}
          </Container>
        </div>
      );
    }
  }
}

/******************************************************************************/
export default DialogModal;
