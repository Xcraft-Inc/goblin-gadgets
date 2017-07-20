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
  }

  componentWillMount () {
    MouseTrap.bind ('esc', ::this.onCloseCombo);
    MouseTrap.bind ('up', ::this.onPrevIndex);
    MouseTrap.bind ('down', ::this.onNextIndex);
    MouseTrap.bind ('enter', ::this.onEnterAction);
  }

  componentWillUnmount () {
    MouseTrap.unbind ('esc');
    MouseTrap.unbind ('up');
    MouseTrap.unbind ('down');
    MouseTrap.unbind ('enter');
  }

  get styleProps () {
    return {
      center: this.props.center,
      right: this.props.right,
      top: this.props.top,
      bottom: this.props.bottom,
      width: this.props.width,
    };
  }

  onNextIndex () {
    const list = this.props.list;
    let index = this.focusedIndex;
    while (index < list.length - 1) {
      index++;
      if (!list[index].separator) {
        break;
      }
    }
    this.focusedIndex = index;
    this.forceUpdate ();
  }

  onPrevIndex () {
    const list = this.props.list;
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
    this.forceUpdate ();
  }

  onEnterAction () {
    const index = this.focusedIndex;
    if (index !== -1) {
      const list = this.props.list;
      const item = list[index];
      this.onActionAndClose (item);
    }
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

  onActionAndClose (item) {
    item.action (item);
    this.onCloseCombo ();
  }

  renderItem (item, focused, index) {
    if (item.separator) {
      return <Separator key={index} kind="menu-separator" />;
    } else {
      const g = GlyphHelpers.getGlyph (item.glyph);
      const color = ColorHelpers.getMarkColor (this.context.theme, g.color);
      const active = focused ? 'focused' : item.active;
      return (
        <Button
          key={index}
          kind="menu-item"
          glyph={g.glyph}
          glyphColor={color}
          text={item.text}
          shortcut={item.shortcut}
          active={active}
          mouseUp={() => ::this.onActionAndClose (item)}
        />
      );
    }
  }

  renderCombo () {
    const list = this.props.list;
    const result = [];
    let index = 0;
    for (let item of list) {
      const focused = index === this.focusedIndex;
      result.push (this.renderItem (item, focused, index++));
    }
    return result;
  }

  render () {
    const top = this.props.top;
    const width = this.props.width;

    const fullScreenClass = this.styles.classNames.fullScreen;
    const comboClass = this.styles.classNames.combo;
    const insideClass = this.styles.classNames.inside;

    return (
      <div
        className={fullScreenClass}
        onMouseDown={::this.onMouseDown}
        onTouchStart={::this.onMouseDown}
      >
        <div className={comboClass}>
          <Container
            kind="flying-balloon"
            trianglePosition={top ? 'top' : 'bottom'}
            width={width}
          >
            <div className={insideClass}>
              {this.renderCombo ()}
            </div>
          </Container>
        </div>
      </div>
    );
  }
}

/******************************************************************************/
export default Combo;
