import React from 'react';
import Widget from 'laboratory/widget';
import MouseTrap from 'mousetrap';
import * as ShortcutHelpers from '../helpers/shortcut-helpers.js';
import * as Bool from '../helpers/boolean-helpers.js';

import Label from 'gadgets/label/widget';
import Menu from 'gadgets/menu/widget';
import Badge from 'gadgets/badge/widget';

/******************************************************************************/

class Button extends Widget {
  constructor () {
    super (...arguments);

    this.state = {
      focus: false,
    };

    this.onFocus = this.onFocus.bind (this);
    this.onBlur = this.onBlur.bind (this);
    this.onMouseDown = this.onMouseDown.bind (this);
    this.onMouseUp = this.onMouseUp.bind (this);
    this.onMouseOver = this.onMouseOver.bind (this);
    this.onMouseOut = this.onMouseOut.bind (this);
    this.onShowMenu = this.onShowMenu.bind (this);
    this.onKeySpace = this.onKeySpace.bind (this);
  }

  get focus () {
    return this.state.focus;
  }

  set focus (value) {
    this.setState ({
      focus: value,
    });
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

  onFocus () {
    if (Bool.isTrue (this.props.focusable)) {
      this.focus = true;
      MouseTrap.bind ('space', this.onKeySpace, 'keydown');
    }
  }

  onBlur () {
    if (Bool.isTrue (this.props.focusable)) {
      this.focus = false;
      MouseTrap.unbind ('space');
    }
  }

  onKeySpace (e) {
    e.preventDefault ();
    if (
      Bool.isTrue (this.props.disabled) &&
      !Bool.isTrue (this.props.focusable)
    ) {
      return;
    }
    if (this.props.onClick) {
      this.props.onClick ();
    }
  }

  // Called when the button is clicked.
  onShowMenu () {
    this.isMenuVisible = !this.isMenuVisible;
    this.forceUpdate ();
  }

  onMouseDown (e) {
    if (Bool.isTrue (this.props.disabled)) {
      return;
    }
    const x = this.props.mouseDown;
    if (x) {
      x (e);
    }
  }

  onMouseUp (e) {
    if (Bool.isTrue (this.props.disabled)) {
      return;
    }
    const x = this.props.mouseUp;
    if (x) {
      x (e);
    }
    // Do not connect to onClick, because it's never called when button
    // dont have the focus.
    if (this.props.onClick) {
      this.props.onClick (e);
    }
  }

  onMouseOver (e) {
    if (Bool.isTrue (this.props.disabled)) {
      return;
    }
    const x = this.props.mouseOver;
    if (x) {
      x (e);
    }
  }

  onMouseOut (e) {
    if (Bool.isTrue (this.props.disabled)) {
      return;
    }
    const x = this.props.mouseOut;
    if (x) {
      x (e);
    }
  }

  renderBusy () {
    if (Bool.isTrue (this.props.busy)) {
      const busyBoxClass = this.styles.classNames.busyBox;
      const busyGlyphClass = this.styles.classNames.busyGlyph;
      return (
        <div className={busyBoxClass}>
          <i className={`${busyGlyphClass} fa fa-spinner fa-2x fa-pulse`} />
        </div>
      );
    } else {
      return null;
    }
  }

  renderBadge () {
    if (this.props.badgeValue) {
      return <Badge value={this.props.badgeValue} layer="over" />;
    } else {
      return null;
    }
  }

  renderTriangle () {
    if (this.props.kind === 'main-tab' && Bool.isTrue (this.props.active)) {
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

  renderShortcut (boxStyle) {
    if (this.props.shortcut) {
      return (
        <Label
          key="shortcut"
          shortcut="true"
          kind={this.props.kind}
          disabled={this.props.disabled}
          active={this.props.active}
          textColor={this.props.textColor}
          buttonBackgroundColor={boxStyle.backgroundColor}
          text={ShortcutHelpers.getShortcut (this.props.shortcut)}
          wrap="no"
          insideButton="true"
        />
      );
    } else {
      return null;
    }
  }

  renderLabel (boxStyle) {
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

  renderFocusedForeground () {
    if (this.focus && this.props.kind === 'check-button') {
      const styleClass = this.styles.classNames.focusedForeground;
      return <div key="focusedForeground" className={styleClass} />;
    } else {
      return null;
    }
  }

  renderLayout () {
    if (this.props.kind === 'box' || this.props.kind === 'container') {
      return null;
    }
    const result = [];
    const boxStyle = Object.assign ({}, this.styles.props.box);
    result.push (this.renderLabel (boxStyle));
    result.push (this.renderShortcut (boxStyle));
    result.push (this.renderFocusedForeground ());
    return result;
  }

  render () {
    if (Bool.isFalse (this.props.show)) {
      return null;
    }

    let tooltip = this.props.tooltip;
    if (this.props.kind === 'pane-navigator') {
      tooltip = this.props.text;
    }

    const propsTabIndex = {};
    if (Bool.isTrue (this.props.focusable)) {
      propsTabIndex.tabIndex = 0;
    }

    const boxClass = this.styles.classNames.box;

    if (this.props.kind === 'container' || this.props.kind === 'box') {
      return (
        <div
          key={this.props.index}
          {...propsTabIndex}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onMouseDown={this.onMouseDown}
          onMouseUp={this.onMouseUp}
          onTouchStart={this.onMouseDown}
          onTouchEnd={this.onMouseUp}
          onMouseOver={this.onMouseOver}
          onMouseOut={this.onMouseOut}
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
          {...propsTabIndex}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onMouseDown={this.onMouseDown}
          onMouseUp={this.onMouseUp}
          onTouchStart={this.onMouseDown}
          onTouchEnd={this.onMouseUp}
          onMouseOver={this.onMouseOver}
          onMouseOut={this.onMouseOut}
          className={boxClass}
          title={tooltip}
        >
          {this.renderLayout ()}
          {this.renderTriangle ()}
          {this.renderBadge ()}
          {this.renderMenu ()}
          {this.renderBusy ()}
          {this.props.children}
        </div>
      );
    } else if (this.props.toAnchor) {
      return (
        <a
          key={this.props.index}
          {...propsTabIndex}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onMouseDown={this.onMouseDown}
          onMouseUp={this.onMouseUp}
          onTouchStart={this.onMouseDown}
          onTouchEnd={this.onMouseUp}
          onMouseOver={this.onMouseOver}
          onMouseOut={this.onMouseOut}
          className={boxClass}
          title={tooltip}
          href={window.location.hash + '#' + this.props.toAnchor}
        >
          {this.renderLayout ()}
          {this.renderTriangle ()}
          {this.renderBadge ()}
          {this.renderMenu ()}
          {this.renderBusy ()}
          {this.props.children}
        </a>
      );
    } else {
      return (
        <div
          key={this.props.index}
          {...propsTabIndex}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onMouseDown={this.onMouseDown}
          onMouseUp={this.onMouseUp}
          onTouchStart={this.onMouseDown}
          onTouchEnd={this.onMouseUp}
          onMouseOver={this.onMouseOver}
          onMouseOut={this.onMouseOut}
          className={boxClass}
          title={tooltip}
        >
          {this.renderLayout ()}
          {this.renderTriangle ()}
          {this.renderBadge ()}
          {this.renderMenu ()}
          {this.renderBusy ()}
          {this.props.children}
        </div>
      );
    }
  }
  // (*) je n'arrive pas à généraliser cela !!!
}

export default Button;
