import React from 'react';
import Widget from 'laboratory/widget';
import * as ShortcutHelpers from '../helpers/shortcut-helpers.js';

import Menu from 'gadgets/menu/widget';
import Badge from 'gadgets/badge/widget';

class Button extends Widget {
  constructor (props) {
    super (props);
    this.state = {
      isMenuVisible: false,
    };
  }

  get isMenuVisible () {
    return this.state.isMenuVisible;
  }

  set isMenuVisible (value) {
    this.setState ({
      isMenuVisible: value,
    });
  }

  get wiring () {
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
    // Trace.log ('>>>> showMenu <<<<');
    this.isMenuVisible = !this.isMenuVisible;
  }

  onMouseDown (e) {
    // Trace.log ('Button.mouseDown');
    const disabled = this.read ('disabled');
    if (disabled === 'true') {
      return;
    }
    const mouseDown = this.read ('mouse-down');
    if (mouseDown) {
      mouseDown (e);
    }
  }

  onMouseUp (e) {
    const disabled = this.read ('disabled');
    if (disabled === 'true') {
      return;
    }
    const mouseUp = this.read ('mouse-up');
    if (mouseUp) {
      mouseUp (e);
    }
  }

  get route () {
    const route = window.location.href;
    const i = route.indexOf ('#');
    if (i === -1) {
      return route;
    } else {
      return route.substring (0, i);
    }
  }

  renderBadge () {
    const badgeValue = this.read ('badge-value');
    if (badgeValue) {
      return <Badge value={badgeValue} layer="over" />;
    } else {
      return null;
    }
  }

  renderTriangle () {
    const kind = this.read ('kind');
    const active = this.read ('active');
    if (kind === 'main-tab' && active === 'true') {
      const style = this.styles.triangle;
      return <div style={style} key="triangle" />;
    } else {
      return null;
    }
  }

  renderMenu () {
    if (this.isMenuVisible) {
      const menu = this.read ('menu');
      const style = this.styles.menuBox;
      return (
        <div style={style} key="menu">
          {<Menu items={menu} />}
        </div>
      );
    } else {
      return null;
    }
  }

  renderGlyph (style) {
    const glyph = this.read ('glyph');
    if (glyph) {
      const rotate = this.read ('rotate');
      const flip = this.read ('flip');
      const spin = this.read ('spin');
      return (
        <i
          key="icon"
          style={style}
          className={`fa
            fa-${glyph}
            fa-rotate-${rotate}
            fa-flip-${flip}
            ${spin ? 'fa-spin' : ''}`}
        />
      );
    } else {
      return null;
    }
  }

  renderText (style) {
    const text = this.read ('text');
    if (text) {
      return (
        <label key="text" style={style}>
          {text}
        </label>
      );
    } else {
      return null;
    }
  }

  renderShortcut () {
    const shortcut = this.read ('shortcut');
    if (shortcut) {
      const style = this.styles.shortcut;
      return (
        <label key="shortcut" style={style}>
          {ShortcutHelpers.getShortcut (shortcut)}
        </label>
      );
    } else {
      return null;
    }
  }

  renderLayout (glyphStyle, textStyle) {
    const result = [];
    const glyphPosition = this.read ('glyph-position');
    if (glyphPosition === 'right') {
      result.push (this.renderText (textStyle));
      result.push (this.renderShortcut ());
      result.push (this.renderGlyph (glyphStyle));
    } else {
      result.push (this.renderGlyph (glyphStyle));
      result.push (this.renderText (textStyle));
      result.push (this.renderShortcut ());
    }
    return result;
  }

  widget () {
    return props => {
      const index = this.read ('index');
      const kind = this.read ('kind');
      const menu = this.read ('menu');
      const toAnchor = this.read ('to-anchor');
      const show = this.read ('show');
      const text = this.read ('text');
      let tooltip = this.read ('tooltip');

      if (kind === 'pane-navigator') {
        tooltip = text;
      }

      const boxStyle = this.styles.box;
      const glyphStyle = this.styles.glyph;
      const textStyle = this.styles.text;

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
            style={boxStyle}
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
            style={boxStyle}
            title={tooltip}
          >
            {this.renderLayout (glyphStyle, textStyle)}
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
            onClick={::this.onClicked} // voir (*)
            onMouseDown={::this.onMouseDown}
            onMouseUp={::this.onMouseUp}
            onTouchStart={::this.onMouseDown}
            onTouchEnd={::this.onMouseUp}
            style={boxStyle}
            title={tooltip}
            href={this.route + '#' + toAnchor}
          >
            {this.renderLayout (glyphStyle, textStyle)}
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
            style={boxStyle}
            title={tooltip}
          >
            {this.renderLayout (glyphStyle, textStyle)}
            {this.renderTriangle ()}
            {this.renderBadge ()}
            {this.renderMenu ()}
            {this.props.children}
          </div>
        );
      }
    };
    // (*) je n'arrive pas à généraliser cela !!!
  }
}

export default Button;
