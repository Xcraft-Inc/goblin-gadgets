import React from 'react';
import Widget from 'laboratory/widget';
import * as ShortcutHelpers from '../helpers/shortcut-helpers.js';
import * as Bool from '../helpers/boolean-helpers.js';

import Label from 'gadgets/label/widget';
import Menu from 'gadgets/menu/widget';
import Badge from 'gadgets/badge/widget';

class Button extends Widget {
  constructor () {
    super (...arguments);

    // FIXME: why don't work ?
    //? this.onClick = this.onClicked.bind (this);
    //? this.onMouseDown = this.onMouseDown.bind (this);
    //? this.onMouseUp = this.onMouseUp.bind (this);
    //? this.onTouchStart = this.onMouseDown.bind (this);
    //? this.onTouchEnd = this.onMouseUp.bind (this);
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
    if (Bool.isTrue (this.props.disabled)) {
      return;
    }
    const mouseDown = this.props.mouseDown;
    if (mouseDown) {
      mouseDown (e);
    }
  }

  onMouseUp (e) {
    if (Bool.isTrue (this.props.disabled)) {
      return;
    }
    const mouseUp = this.props.mouseUp;
    if (mouseUp) {
      mouseUp (e);
    }
  }

  renderBusy () {
    if (Bool.isTrue (this.props.busy)) {
      // return null; // TOOD:DR
      const busyClass = this.styles.classNames.busy;
      return (
        <div className={busyClass}>
          <Label glyph="spinner" glyphSpin="yes" />
        </div>
      );
    } else {
      return null;
    }
  }

  renderBadge () {
    if (this.props.badgeValue) {
      return (
        <Badge
          value={this.props.badgeValue}
          layer="over"
          visibility={!Bool.isTrue (this.props.busy)}
        />
      );
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
        visibility={!Bool.isTrue (this.props.busy)}
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
    if (Bool.isFalse (this.props.show)) {
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
          {this.renderBusy ()}
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
          {this.renderBusy ()}
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
          {this.renderBusy ()}
          {this.props.children}
        </div>
      );
    }
  }
  // (*) je n'arrive pas à généraliser cela !!!
}

export default Button;
