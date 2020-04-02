//T:2019-02-27
import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import {ColorHelpers} from 'electrum-theme';
import * as RectHelpers from '../helpers/rect-helpers.js';
import {Unit} from 'electrum-theme';
import KeyTrap from 'goblin-gadgets/widgets/key-trap.js';

import Container from 'goblin-gadgets/widgets/container/widget';
import Button from 'goblin-gadgets/widgets/button/widget';
import Separator from 'goblin-gadgets/widgets/separator/widget';
import * as styles from './styles';

/******************************************************************************/

class Combo extends Widget {
  constructor() {
    super(...arguments);
    this.styles = styles;

    this.state = {
      activeIndex: -1,
    };

    this.onCloseCombo = this.onCloseCombo.bind(this);
    this.onPrevIndex = this.onPrevIndex.bind(this);
    this.onNextIndex = this.onNextIndex.bind(this);
    this.onEnterAction = this.onEnterAction.bind(this);
    this.onActionAndClose = this.onActionAndClose.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
  }

  get activeIndex() {
    return this.state.activeIndex;
  }

  set activeIndex(value) {
    this.setState({
      activeIndex: value,
    });
  }

  componentWillMount() {
    window.document.combo = 'visible';

    KeyTrap.bind('Escape', this.onCloseCombo);
    KeyTrap.bind('ArrowUp', this.onPrevIndex);
    KeyTrap.bind('ArrowDown', this.onNextIndex);
    KeyTrap.bind('Enter', this.onEnterAction);

    let index = 0;
    for (let item of this.props.list) {
      if (item.active) {
        this.setState({
          activeIndex: index,
        });
      }
      index++;
    }
  }

  componentWillUnmount() {
    super.componentWillUnmount();
    window.document.combo = 'hidden';

    KeyTrap.unbind('Escape', this.onCloseCombo);
    KeyTrap.unbind('ArrowUp', this.onPrevIndex);
    KeyTrap.unbind('ArrowDown', this.onNextIndex);
    KeyTrap.unbind('Enter', this.onEnterAction);
  }

  onNextIndex(e) {
    let index = this.state.activeIndex;
    while (index < this.props.list.length - 1) {
      index++;
      if (!this.props.list[index].separator) {
        break;
      }
    }
    this.setState({
      activeIndex: index,
    });
    e.preventDefault();
  }

  onPrevIndex(e) {
    let index = this.state.activeIndex;
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
    e.preventDefault();
  }

  onEnterAction() {
    const index = this.activeIndex;
    if (index !== -1) {
      const item = this.props.list[index];
      this.onActionAndClose(item);
    }
  }

  onCloseCombo() {
    const close = this.props.close;
    if (close) {
      close();
    }
  }

  onMouseUp(e) {
    const node = this.node;
    const rect = node.children[0].getBoundingClientRect();
    if (!RectHelpers.isInside(rect, e.clientX, e.clientY)) {
      // If the mouse is outside the menu combo, close it.
      this.onCloseCombo();
    }
  }

  onActionAndClose(item) {
    item.action(item);
    this.onCloseCombo();
  }

  renderItem(item, index) {
    if (item.separator) {
      return <Separator key={index} kind="menu-separator" />;
    } else {
      const active = this.activeIndex === index;
      const color = ColorHelpers.getMarkColor(this.context.theme, item.color);
      if (this.props.menuType === 'wrap') {
        const width = this.props.menuItemWidth
          ? Unit.sub(
              this.props.menuItemWidth,
              Unit.multiply(this.context.theme.shapes.containerMargin, 2) // padding of Button kind='combo-wrap-item'
            )
          : null;
        return (
          <Button
            key={index}
            kind="combo-wrap-item"
            width={width}
            glyph={item.glyph}
            glyphColor={color}
            text={item.text}
            tooltip={this.props.menuItemTooltips ? item.text : null}
            shortcut={item.shortcut}
            textTransform="none"
            active={active}
            mouseUp={() => this.onActionAndClose(item)}
          />
        );
      } else {
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
            mouseUp={() => this.onActionAndClose(item)}
          />
        );
      }
    }
  }

  renderCombo() {
    const result = [];
    let index = 0;
    for (let item of this.props.list) {
      result.push(this.renderItem(item, index++));
    }
    return result;
  }

  render() {
    const fullScreenClass = this.styles.classNames.fullScreen;
    const comboClass = this.styles.classNames.combo;
    const insideClass =
      this.props.menuType === 'wrap'
        ? this.styles.classNames.insideWrap
        : this.styles.classNames.inside;

    return (
      <div
        ref={node => (this.node = node)}
        className={fullScreenClass}
        onMouseUp={this.onMouseUp}
        onTouchEnd={this.onMouseUp}
      >
        <div className={comboClass}>
          <Container
            kind={
              this.props.menuType === 'menu' ? 'flying-balloon' : 'flying-combo'
            }
            trianglePosition={
              this.props.trianglePosition
                ? this.props.trianglePosition
                : this.props.top
                ? 'top'
                : 'bottom'
            }
            triangleShift={this.props.triangleShift}
          >
            <div className={insideClass}>{this.renderCombo()}</div>
          </Container>
        </div>
      </div>
    );
  }
}

/******************************************************************************/
export default Combo;
