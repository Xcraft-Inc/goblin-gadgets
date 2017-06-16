import React from 'react';
import ReactDOM from 'react-dom';
import Widget from 'laboratory/widget';
import MouseTrap from 'mousetrap';
import {ColorHelpers} from 'electrum-theme';
import * as GlyphHelpers from '../helpers/glyph-helpers.js';
import * as RectHelpers from '../helpers/rect-helpers.js';

import Container from 'gadgets/container/widget';
import Button from 'gadgets/button/widget';
import Separator from 'gadgets/separator/widget';

/******************************************************************************/

class Combo extends Widget {
  constructor (props) {
    super (props);
    this.state = {
      focusedIndex: -1,
    };
  }

  get focusedIndex () {
    return this.state.focusedIndex;
  }

  set focusedIndex (value) {
    this.setState ({
      focusedIndex: value,
    });
  }

  componentWillMount () {
    // Trace.log ('Combo.componentWillMount');
    MouseTrap.bind ('esc', this.onCloseCombo);
    MouseTrap.bind ('up', this.onPrevIndex);
    MouseTrap.bind ('down', this.onNextIndex);
    MouseTrap.bind ('enter', this.onEnterAction);
  }

  componentWillUnmount () {
    // Trace.log ('Combo.componentWillUnmount');
    MouseTrap.unbind ('esc');
    MouseTrap.unbind ('up');
    MouseTrap.unbind ('down');
    MouseTrap.unbind ('enter');
  }

  get styleProps () {
    return {
      center: this.read ('center'),
      right: this.read ('right'),
      top: this.read ('top'),
      bottom: this.read ('bottom'),
      width: this.read ('width'),
    };
  }

  onNextIndex () {
    const list = this.read ('list');
    let index = this.focusedIndex;
    while (index < list.length - 1) {
      index++;
      if (!list[index].separator) {
        break;
      }
    }
    this.focusedIndex = index;
  }

  onPrevIndex () {
    const list = this.read ('list');
    let index = this.focusedIndex;
    if (index === -1) {
      index = list.length;
    }
    while (index > 0) {
      index--;
      if (!list[index].separator) {
        break;
      }
    }
    this.focusedIndex = index;
  }

  onEnterAction () {
    const index = this.focusedIndex;
    if (index !== -1) {
      const list = this.read ('list');
      const item = list[index];
      this.onActionAndClose (item);
    }
  }

  onCloseCombo () {
    const close = this.read ('close');
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

  onActionAndClose (item) {
    item.action (item);
    this.onCloseCombo ();
  }

  renderItem (item, focused, index) {
    if (item.separator) {
      return <Separator key={index} kind="menu-separator" />;
    } else {
      const g = GlyphHelpers.getGlyph (item.glyph);
      const color = ColorHelpers.getMarkColor (this.props.theme, g.color);
      const active = focused ? 'focused' : item.active;
      return (
        <Button
          key={index}
          kind="menu-item"
          glyph={g.glyph}
          glyph-color={color}
          text={item.text}
          shortcut={item.shortcut}
          active={active}
          mouse-up={() => ::this.onActionAndClose (item)}
        />
      );
    }
  }

  renderCombo () {
    const list = this.read ('list');
    const result = [];
    const focusedIndex = this.focusedIndex;
    let index = 0;
    for (let item of list) {
      const focused = index === focusedIndex;
      result.push (this.renderItem (item, focused, index++));
    }
    return result;
  }

  widget () {
    return props => {
      const top = this.read ('top');
      const width = this.read ('width');

      const fullScreenStyle = this.styles.fullScreen;
      const comboStyle = this.styles.combo;

      return (
        <div
          style={fullScreenStyle}
          onMouseDown={::this.onMouseDown}
          onTouchStart={::this.onMouseDown}
        >
          <div style={comboStyle}>
            <Container
              kind="flying-balloon"
              triangle-position={top ? 'top' : 'bottom'}
              width={width}
            >
              {this.renderCombo ()}
            </Container>
          </div>
        </div>
      );
    };
  }
}

/******************************************************************************/
export default Combo;
