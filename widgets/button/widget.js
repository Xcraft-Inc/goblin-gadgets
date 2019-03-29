import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import Widget from 'laboratory/widget';
import MouseTrap from 'mousetrap';
import * as ShortcutHelpers from '../helpers/shortcut-helpers.js';
import * as Bool from 'gadgets/helpers/bool-helpers';
import {ConnectedDiv, ConnectedA} from 'nabu/helpers/tooltip-helpers';

import Label from 'gadgets/label/widget';
import Badge from 'gadgets/badge/widget';

/******************************************************************************/

class Button extends Widget {
  constructor() {
    super(...arguments);

    this.state = {
      focus: false,
    };

    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
    this.onKeySpace = this.onKeySpace.bind(this);
  }

  componentDidMount() {
    super.componentDidMount();
  }

  //#region get/set
  get focus() {
    return this.state.focus;
  }

  set focus(value) {
    this.setState({
      focus: value,
    });
  }
  //#endregion

  static get wiring() {
    return {
      id: 'id',
      kind: 'kind',
      text: 'text',
      glyph: 'glyph',
    };
  }

  get disabled() {
    return (
      Bool.isTrue(this.props.disabled) ||
      Bool.isTrue(this.props.readonly) ||
      Bool.isTrue(this.props.busy)
    );
  }

  onFocus() {
    if (Bool.isTrue(this.props.focusable) && !this.disabled) {
      this.focus = true;
      MouseTrap.bind('space', this.onKeySpace, 'keydown');
    }
  }

  onBlur() {
    if (Bool.isTrue(this.props.focusable) && !this.disabled) {
      this.focus = false;
      MouseTrap.unbind('space');
    }
  }

  onKeySpace(e) {
    e.preventDefault();

    /* ensure that space is immediatly available for other */
    MouseTrap.unbind('space');

    if (this.disabled && !Bool.isTrue(this.props.focusable)) {
      return;
    }
    if (this.props.onClick) {
      this.props.onClick();
    }
  }

  onMouseDown(e) {
    if (this.disabled) {
      return;
    }
    const x = this.props.mouseDown;
    if (x) {
      x(e);
    }
  }

  onMouseUp(e) {
    if (this.disabled) {
      return;
    }
    const x = this.props.mouseUp;
    if (x) {
      x(e);
    }
    // Do not connect to onClick, because it's never called when button
    // dont have the focus.
    if (this.props.onClick) {
      this.props.onClick(e);
    }
  }

  onMouseOver(e) {
    if (this.disabled) {
      return;
    }
    const x = this.props.mouseOver;
    if (x) {
      x(e);
    }
  }

  onMouseOut(e) {
    if (this.disabled) {
      return;
    }
    const x = this.props.mouseOut;
    if (x) {
      x(e);
    }
  }

  renderBusy() {
    if (Bool.isTrue(this.props.busy)) {
      const busyBoxClass = this.styles.classNames.busyBox;
      const busyGlyphClass = this.styles.classNames.busyGlyph;
      return (
        <div className={busyBoxClass}>
          <div className={busyGlyphClass}>
            <FontAwesomeIcon icon={[`fas`, 'spinner']} size={'2x'} pulse />
          </div>
        </div>
      );
    } else {
      return null;
    }
  }

  renderBadge() {
    if (this.props.badgeValue) {
      return (
        <Badge
          value={this.props.badgeValue}
          layer={this.props.badgePosition || 'over'}
          shape={this.props.badgeShape}
          color={this.props.badgeColor}
          size={this.props.badgeSize}
          disabled={this.props.calendarDimmed}
        />
      );
    } else {
      return null;
    }
  }

  renderTriangle() {
    if (this.props.kind === 'main-tab' && Bool.isTrue(this.props.active)) {
      const triangleClass = this.styles.classNames.triangle;
      return <div className={triangleClass} key="triangle" />;
    }
  }

  renderShortcut(boxStyle) {
    if (this.props.shortcut) {
      return (
        <Label
          key="shortcut"
          shortcut="true"
          kind={this.props.kind}
          subkind={this.props.subkind}
          disabled={this.disabled}
          readonly={this.readonly}
          active={this.props.active}
          textColor={this.props.textColor}
          buttonBackgroundColor={boxStyle.backgroundColor}
          text={ShortcutHelpers.getShortcut(this.props.shortcut)}
          wrap="no"
          insideButton="true"
        />
      );
    } else {
      return null;
    }
  }

  renderLabel(boxStyle) {
    const {tooltip, ...otherProps} = this.props;
    return (
      <Label
        key="label"
        {...otherProps}
        disabled={this.disabled}
        grow="1"
        buttonBackgroundColor={boxStyle.backgroundColor}
        insideButton={this.props.insideButton || 'true'}
      />
    );
  }

  renderFocusedForeground() {
    if (this.focus && this.props.kind === 'check-button') {
      const styleClass = this.styles.classNames.focusedForeground;
      return <div key="focusedForeground" className={styleClass} />;
    } else {
      return null;
    }
  }

  renderLayout() {
    if (this.props.kind === 'box' || this.props.kind === 'container') {
      return null;
    }
    const result = [];
    const boxStyle = Object.assign({}, this.styles.props.box);
    result.push(this.renderLabel(boxStyle));
    result.push(this.renderShortcut(boxStyle));
    result.push(this.renderFocusedForeground());
    return result;
  }

  render() {
    if (Bool.isFalse(this.props.show)) {
      return null;
    }

    let tooltip = this.props.tooltip;
    if (this.props.kind === 'pane-navigator') {
      tooltip = this.props.text;
    }

    const propsTabIndex = {};
    if (Bool.isTrue(this.props.focusable)) {
      propsTabIndex.tabIndex = 0;
    }

    const boxClass = this.styles.classNames.box;

    if (this.props.kind === 'container' || this.props.kind === 'box') {
      return (
        <ConnectedDiv
          self={this}
          tooltip={tooltip}
          key={this.props.index}
          {...propsTabIndex}
          onDoubleClick={this.props.onDoubleClick}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onMouseDown={this.onMouseDown}
          onMouseUp={this.onMouseUp}
          onTouchStart={this.onMouseDown}
          onTouchEnd={this.onMouseUp}
          onMouseOver={this.onMouseOver}
          onMouseOut={this.onMouseOut}
          className={boxClass}
        >
          {this.props.children}
        </ConnectedDiv>
      );
    } else if (this.props.toAnchor) {
      return (
        <ConnectedA // <AConnected
          self={this}
          tooltip={tooltip}
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
          href={window.location.hash + '#' + this.props.toAnchor}
        >
          {this.renderLayout()}
          {this.renderTriangle()}
          {this.renderBadge()}
          {this.renderBusy()}
          {this.props.children}
        </ConnectedA>
      );
    } else {
      return (
        <ConnectedDiv
          self={this}
          tooltip={tooltip}
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
        >
          {this.renderLayout()}
          {this.renderTriangle()}
          {this.renderBadge()}
          {this.renderBusy()}
          {this.props.children}
        </ConnectedDiv>
      );
    }
  }
  // (*) je n'arrive pas à généraliser cela !!!
}

export default Button;
