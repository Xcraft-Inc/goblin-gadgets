import React from 'react';
import Widget from 'laboratory/widget';
import * as ShortcutHelpers from '../helpers/shortcut-helpers.js';

import Label from 'gadgets/label/widget';
import Menu from 'gadgets/menu/widget';
import Badge from 'gadgets/badge/widget';

class Button extends Widget {
  constructor () {
    super (...arguments);
  }

  static get wiring () {
    return {
      id: 'id',
      kind: 'kind',
      text: 'text',
      glyph: 'glyph',
    };
  }

  setText (text) {
    this.do ('text', {text});
  }

  setKind (kind) {
    this.do ('kind', {kind});
  }

  onClicked (e) {
    if (this.props.onClick) {
      this.props.onClick (e);
    }
  }

  // Called when the button is clicked.
  onShowMenu () {
    this.isMenuVisible = !this.isMenuVisible;
    this.forceUpdate ();
  }

  onMouseDown (e) {
    if (this.props.disabled === 'true') {
      return;
    }
    const mouseDown = this.props.mouseDown;
    if (mouseDown) {
      mouseDown (e);
    }
  }

  onMouseUp (e) {
    if (this.props.disabled === 'true') {
      return;
    }
    const mouseUp = this.props.mouseUp;
    if (mouseUp) {
      mouseUp (e);
    }
  }

  renderBadge () {
    if (this.props.disabledbadgeValue) {
      return <Badge value={this.props.disabledbadgeValue} layer="over" />;
    } else {
      return null;
    }
  }

  renderTriangle () {
    if (this.props.kind === 'main-tab' && this.props.active === 'true') {
      const triangleClass = this.styles.classNames.triangle;
      return <div className={triangleClass} key="triangle" />;
    }
  }

  renderMenu () {
    if (this.isMenuVisible) {
      const menuClass = this.styles.classNames.menuBox;
      return (
        <div className={menuClass} key="menu">
          {<Menu items={this.props.menu} />}
        </div>
      );
    } else {
      return null;
    }
  }

  renderShortcut () {
    if (this.props.shortcut) {
      const shortcutClass = this.styles.classNames.shortcut;
      return (
        <label key="shortcut" className={shortcutClass}>
          {ShortcutHelpers.getShortcut (this.props.shortcut)}
        </label>
      );
    } else {
      return null;
    }
  }

  renderLabel () {
    const boxStyle = Object.assign ({}, this.styles.props.box);
    return (
      <Label
        key="label"
        {...this.props}
        grow="1"
        buttonBackgroundColor={boxStyle.backgroundColor}
        insideButton="true"
      />
    );
  }

  renderLayout () {
    if (this.props.kind === 'box' || this.props.kind === 'container') {
      return null;
    }
    const result = [];
    result.push (this.renderLabel ());
    result.push (this.renderShortcut ());
    return result;
  }

  render () {
    if (this.props.show === 'false') {
      return null;
    }

    let tooltip = this.props.tooltip;
    if (this.props.kind === 'pane-navigator') {
      tooltip = this.props.text;
    }

    const boxClass = this.styles.classNames.box;

    if (this.props.kind === 'container' || this.props.kind === 'box') {
      return (
        <div
          key={this.props.index}
          onClick={::this.onClicked} // voir (*)
          onMouseDown={::this.onMouseDown}
          onMouseUp={::this.onMouseUp}
          onTouchStart={::this.onMouseDown}
          onTouchEnd={::this.onMouseUp}
          className={boxClass}
          title={tooltip}
        >
          {this.props.children}
        </div>
      );
    } else if (this.props.menu) {
      return (
        <div
          key={this.props.index}
          onClick={::this.onShowMenu} // voir (*)
          onMouseDown={::this.onMouseDown}
          onMouseUp={::this.onMouseUp}
          onTouchStart={::this.onMouseDown}
          onTouchEnd={::this.onMouseUp}
          className={boxClass}
          title={tooltip}
        >
          {this.renderLayout ()}
          {this.renderTriangle ()}
          {this.renderBadge ()}
          {this.renderMenu ()}
          {this.props.children}
        </div>
      );
    } else if (this.props.toAnchor) {
      return (
        <a
          key={this.props.index}
          onClick={::this.onClicked}
          onMouseDown={::this.onMouseDown}
          onMouseUp={::this.onMouseUp}
          onTouchStart={::this.onMouseDown}
          onTouchEnd={::this.onMouseUp}
          className={boxClass}
          title={tooltip}
          href={window.location.hash + '#' + this.props.toAnchor}
        >
          {this.renderLayout ()}
          {this.renderTriangle ()}
          {this.renderBadge ()}
          {this.renderMenu ()}
          {this.props.children}
        </a>
      );
    } else {
      return (
        <div
          key={this.props.index}
          onClick={::this.onClicked} // voir (*)
          onMouseDown={::this.onMouseDown}
          onMouseUp={::this.onMouseUp}
          onTouchStart={::this.onMouseDown}
          onTouchEnd={::this.onMouseUp}
          className={boxClass}
          title={tooltip}
        >
          {this.renderLayout ()}
          {this.renderTriangle ()}
          {this.renderBadge ()}
          {this.renderMenu ()}
          {this.props.children}
        </div>
      );
    }
  }
  // (*) je n'arrive pas à généraliser cela !!!
}

export default Button;
