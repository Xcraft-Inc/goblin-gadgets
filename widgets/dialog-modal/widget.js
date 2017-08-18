import React from 'react';
import ReactDOM from 'react-dom';
import Widget from 'laboratory/widget';
import MouseTrap from 'mousetrap';
import * as RectHelpers from '../helpers/rect-helpers.js';

import Container from 'gadgets/container/widget';

/******************************************************************************/

class DialogModal extends Widget {
  constructor () {
    super (...arguments);
  }

  componentWillMount () {
    MouseTrap.bind ('esc', this.onCloseCombo);
    MouseTrap.bind ('enter', this.onCloseCombo);
  }

  componentWillUnmount () {
    MouseTrap.unbind ('esc');
    MouseTrap.unbind ('enter');
  }

  onCloseCombo () {
    const close = this.props.close;
    if (close) {
      close ();
    }
  }

  onMouseDown (e) {
    const node = ReactDOM.findDOMNode (this);
    const rect = node.children[0].getBoundingClientRect ();
    if (!RectHelpers.isInside (rect, e.clientX, e.clientY)) {
      // If the mouse is outside the menu combo, close it.
      this.onCloseCombo ();
    }
  }

  render () {
    const fullScreenClass = this.styles.classNames.fullScreen;

    if (this.props.top || this.props.bottom) {
      const comboClass = this.styles.classNames.combo;
      return (
        <div
          className={fullScreenClass}
          onMouseDown={::this.onMouseDown}
          onTouchStart={::this.onMouseDown}
        >
          <div className={comboClass}>
            <Container
              kind="flying-dialog"
              trianglePosition={this.props.top ? 'top' : 'bottom'}
              width={this.props.width}
              height={this.props.height}
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
          onMouseDown={::this.onMouseDown}
          onTouchStart={::this.onMouseDown}
        >
          <Container
            kind="floating"
            cursor="default"
            width={this.props.width}
            height={this.props.height}
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
