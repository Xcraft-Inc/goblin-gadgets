import React from 'react';
import ReactDOM from 'react-dom';
import Widget from 'laboratory/widget';
import MouseTrap from 'mousetrap';
import * as RectHelpers from '../helpers/rect-helpers.js';

import Container from 'gadgets/container/widget';

/******************************************************************************/

class DialogModal extends Widget {
  constructor (props) {
    super (props);
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
    const close = this.read ('close');
    if (close) {
      close ();
    }
  }

  onMyMouseDown (e) {
    const node = ReactDOM.findDOMNode (this);
    const rect = node.children[0].getBoundingClientRect ();
    if (!RectHelpers.isInside (rect, e.clientX, e.clientY)) {
      // If the mouse is outside the menu combo, close it.
      this.onCloseCombo ();
    }
  }

  widget () {
    return props => {
      const width = this.read ('width');
      const height = this.read ('height');
      const top = this.read ('top');
      const bottom = this.read ('bottom');

      const fullScreenStyle = this.styles.fullScreen;

      if (top || bottom) {
        const comboStyle = this.styles.combo;
        return (
          <div
            style={fullScreenStyle}
            onMouseDown={::this.onMyMouseDown}
            onTouchStart={::this.onMyMouseDown}
          >
            <div style={comboStyle}>
              <Container
                kind="flying-dialog"
                triangle-position={top ? 'top' : 'bottom'}
                width={width}
                height={height}
                cursor="default"
              >
                {this.props.children}
              </Container>
            </div>
          </div>
        );
      } else {
        return (
          <div style={fullScreenStyle} onMouseDown={::this.onMyMouseDown}>
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
    };
  }
}

/******************************************************************************/
export default DialogModal;
