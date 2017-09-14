import React from 'react';
import ReactDOM from 'react-dom';
import Widget from 'laboratory/widget';
import MouseTrap from 'mousetrap';
import {ColorHelpers} from 'electrum-theme';
import * as GlyphHelpers from '../helpers/glyph-helpers.js';
import * as RectHelpers from '../helpers/rect-helpers.js';
import * as Bool from '../helpers/boolean-helpers.js';
import {Unit} from 'electrum-theme';

import Container from 'gadgets/container/widget';
import Button from 'gadgets/button/widget';
import Separator from 'gadgets/separator/widget';

/******************************************************************************/

class Combo extends Widget {
  constructor () {
    super (...arguments);

    this.state = {
      activeIndex: -1,
    };

    this.onCloseCombo = this.onCloseCombo.bind (this);
    this.onPrevIndex = this.onPrevIndex.bind (this);
    this.onNextIndex = this.onNextIndex.bind (this);
    this.onEnterAction = this.onEnterAction.bind (this);
    this.onActionAndClose = this.onActionAndClose.bind (this);
    this.onMouseDown = this.onMouseDown.bind (this);
  }

  get activeIndex () {
    return this.state.activeIndex;
  }

  set activeIndex (value) {
    this.setState ({
      activeIndex: value,
    });
  }

  componentWillMount () {
    MouseTrap.bind ('esc', this.onCloseCombo);
    MouseTrap.bind ('up', this.onPrevIndex);
    MouseTrap.bind ('down', this.onNextIndex);
    MouseTrap.bind ('enter', this.onEnterAction);

    let index = 0;
    for (let item of this.props.list) {
      if (!this.props.list[index].separator) {
        if (Bool.isTrue (item.active)) {
          this.activeIndex = index;
        }
        index++;
      }
    }
  }

  componentWillUnmount () {
    MouseTrap.unbind ('esc');
    MouseTrap.unbind ('up');
    MouseTrap.unbind ('down');
    MouseTrap.unbind ('enter');
  }

  onNextIndex () {
    let index = this.activeIndex;
    while (index < this.props.list.length - 1) {
      index++;
      if (!this.props.list[index].separator) {
        break;
      }
    }
    this.activeIndex = index;
  }

  onPrevIndex () {
    let index = this.activeIndex;
    if (index === -1) {
      index = this.props.list.length;
    }
    while (index > 0) {
      index--;
      if (!this.props.list[index].separator) {
        break;
      }
    }
    this.activeIndex = index;
  }

  onEnterAction () {
    const index = this.activeIndex;
    if (index !== -1) {
      const item = this.props.list[index];
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

  renderItem (item, index) {
    if (item.separator) {
      return <Separator key={index} kind="menu-separator" />;
    } else {
      const active = Bool.toString (this.activeIndex === index);
      if (this.props.menuType === 'wrap') {
        const width = this.props.menuItemWidth
          ? Unit.sub (
              this.props.menuItemWidth,
              Unit.multiply (this.context.theme.shapes.containerMargin, 2) // padding of Button kind='combo-wrap-item'
            )
          : null;
        return (
          <Button
            key={index}
            kind="combo-wrap-item"
            width={width}
            text={item.text}
            tooltip={
              Bool.isTrue (this.props.menuItemTooltips) ? item.text : null
            }
            shortcut={item.shortcut}
            textTransform="none"
            active={active}
            mouseUp={() => this.onActionAndClose (item)}
          />
        );
      } else {
        const color = ColorHelpers.getMarkColor (
          this.context.theme,
          item.color
        );
        return (
          <Button
            key={index}
            kind={this.props.menuType === 'menu' ? 'menu-item' : 'combo-item'}
            width={this.props.menuItemWidth}
            glyph={item.glyph}
            glyphColor={color}
            text={item.text}
            shortcut={item.shortcut}
            textTransform={this.props.menuType === 'menu' ? null : 'none'}
            active={active}
            mouseUp={() => this.onActionAndClose (item)}
          />
        );
      }
    }
  }

  renderCombo () {
    const result = [];
    let index = 0;
    for (let item of this.props.list) {
      result.push (this.renderItem (item, index++));
    }
    return result;
  }

  render () {
    const fullScreenClass = this.styles.classNames.fullScreen;
    const comboClass = this.styles.classNames.combo;
    const insideClass = this.props.menuType === 'wrap'
      ? this.styles.classNames.insideWrap
      : this.styles.classNames.inside;

    return (
      <div
        className={fullScreenClass}
        onMouseDown={this.onMouseDown}
        onTouchStart={this.onMouseDown}
      >
        <div className={comboClass}>
          <Container
            kind={
              this.props.menuType === 'menu' ? 'flying-balloon' : 'flying-combo'
            }
            trianglePosition={this.props.top ? 'top' : 'bottom'}
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
