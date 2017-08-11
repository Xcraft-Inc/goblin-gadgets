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
    const width = this.props.width;
    const height = this.props.height;
    const top = this.props.top;
    const bottom = this.props.bottom;
    const triangleShift = this.props.triangleShift;

    const fullScreenClass = this.styles.classNames.fullScreen;

    if (top || bottom) {
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
              trianglePosition={top ? 'top' : 'bottom'}
              width={width}
              height={height}
              triangleShift={triangleShift}
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
            width={width}
            height={height}
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
