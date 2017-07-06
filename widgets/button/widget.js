import React from 'react';
import Widget from 'laboratory/widget';
import * as ShortcutHelpers from '../helpers/shortcut-helpers.js';

import Menu from 'gadgets/menu/widget';
import Badge from 'gadgets/badge/widget';

class Button extends Widget {
  constructor (props) {
    super (props);
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
    const disabled = this.props.disabled;
    if (disabled === 'true') {
      return;
    }
    const mouseDown = this.props['mouse-down'];
    if (mouseDown) {
      mouseDown (e);
    }
  }

  onMouseUp (e) {
    const disabled = this.props.disabled;
    if (disabled === 'true') {
      return;
    }
    const mouseUp = this.props['mouse-up'];
    if (mouseUp) {
      mouseUp (e);
    }
  }

  renderBadge () {
    const badgeValue = this.props['badge-value'];
    if (badgeValue) {
      return <Badge value={badgeValue} layer="over" />;
    } else {
      return null;
    }
  }

  renderTriangle () {
    const kind = this.props.kind;
    const active = this.props.active;
    if (kind === 'main-tab' && active === 'true') {
      const triangleClass = this.styles.classNames.triangle;
      return <div className={triangleClass} key="triangle" />;
    }
  }

  renderMenu () {
    if (this.isMenuVisible) {
      const menu = this.props.menu;
      const menuClass = this.styles.classNames.menuBox;
      return (
        <div className={menuClass} key="menu">
          {<Menu items={menu} />}
        </div>
      );
    } else {
      return null;
    }
  }

  renderGlyph (className) {
    const glyph = this.props.glyph;
    if (glyph) {
      const rotate = this.props.rotat;
      const flip = this.props.flip;
      const spin = this.props.spin;
      return (
        <i
          key="icon"
          className={
            className +
              ` fa
            fa-${glyph}
            fa-rotate-${rotate}
            fa-flip-${flip}
            ${spin ? 'fa-spin' : ''}`
          }
        />
      );
    } else {
      return null;
    }
  }

  renderText (className) {
    const text = this.props.text;
    if (text) {
      return (
        <label key="text" className={className}>
          {text}
        </label>
      );
    } else {
      return null;
    }
  }

  renderShortcut () {
    const shortcut = this.props.shortcut;
    if (shortcut) {
      const shortcutClass = this.styles.classNames.shortcut;
      return (
        <label key="shortcut" className={shortcutClass}>
          {ShortcutHelpers.getShortcut (shortcut)}
        </label>
      );
    } else {
      return null;
    }
  }

  renderLayout (glyphClass, textClass) {
    const result = [];
    const glyphPosition = this.props.glyphPosition;
    if (glyphPosition === 'right') {
      result.push (this.renderText (textClass));
      result.push (this.renderShortcut ());
      result.push (this.renderGlyph (glyphClass));
    } else {
      result.push (this.renderGlyph (glyphClass));
      result.push (this.renderText (textClass));
      result.push (this.renderShortcut ());
    }
    return result;
  }

  render () {
    const index = this.props.index;
    const kind = this.props.kind;
    const menu = this.props.menu;
    const toAnchor = this.props.toAnchor;
    const show = this.props.show;
    const text = this.props.text;
    let tooltip = this.props.tooltip;

    if (kind === 'pane-navigator') {
      tooltip = text;
    }

    const boxClass = this.styles.classNames.box;
    const glyphClass = this.styles.classNames.glyph;
    const textClass = this.styles.classNames.text;

    if (show === 'false') {
      return null;
    } else if (kind === 'container' || kind === 'box') {
      return (
        <div
          key={index}
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
    } else if (menu) {
      return (
        <div
          key={index}
          onClick={::this.onShowMenu} // voir (*)
          onMouseDown={::this.onMouseDown}
          onMouseUp={::this.onMouseUp}
          onTouchStart={::this.onMouseDown}
          onTouchEnd={::this.onMouseUp}
          className={boxClass}
          title={tooltip}
        >
          {this.renderLayout (glyphClass, textClass)}
          {this.renderTriangle ()}
          {this.renderBadge ()}
          {this.renderMenu ()}
          {this.props.children}
        </div>
      );
    } else if (toAnchor) {
      return (
        <a
          key={index}
          onClick={::this.onClicked}
          onMouseDown={::this.onMouseDown}
          onMouseUp={::this.onMouseUp}
          onTouchStart={::this.onMouseDown}
          onTouchEnd={::this.onMouseUp}
          className={boxClass}
          title={tooltip}
          href={window.location.hash + '#' + toAnchor}
        >
          {this.renderLayout (glyphClass, textClass)}
          {this.renderTriangle ()}
          {this.renderBadge ()}
          {this.renderMenu ()}
          {this.props.children}
        </a>
      );
    } else {
      return (
        <div
          key={index}
          onClick={::this.onClicked} // voir (*)
          onMouseDown={::this.onMouseDown}
          onMouseUp={::this.onMouseUp}
          onTouchStart={::this.onMouseDown}
          onTouchEnd={::this.onMouseUp}
          className={boxClass}
          title={tooltip}
        >
          {this.renderLayout (glyphClass, textClass)}
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
