//T:2019-02-27
import React from 'react';
import Props from './props';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import Widget from 'goblin-laboratory/widgets/widget';
import MouseTrap from 'mousetrap';
import * as ShortcutHelpers from '../helpers/shortcut-helpers.js';
import * as Bool from 'goblin-gadgets/widgets/helpers/bool-helpers';
import {TranslatableDiv, TranslatableA} from 'nabu/helpers/element-helpers';
import {
  makePropTypes,
  makeDefaultProps,
} from 'xcraft-core-utils/lib/prop-types';

import Label from 'goblin-gadgets/widgets/label/widget';
import Badge from 'goblin-gadgets/widgets/badge/widget';
import RetroIlluminatedButton from 'goblin-gadgets/widgets/retro-illuminated-button/widget';
import RetroActionButton from 'goblin-gadgets/widgets/retro-action-button/widget';
import * as styles from './styles';

/******************************************************************************/

export default class Button extends Widget {
  constructor() {
    super(...arguments);
    this.styles = styles;

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
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    super.componentDidMount();
  }

  componentWillUnmount() {
    super.componentWillUnmount();
    MouseTrap.unbind('space');
  }

  get focus() {
    return this.state.focus;
  }

  set focus(value) {
    this.setState({
      focus: value,
    });
  }

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

  onClick(e) {
    if (this.disabled) {
      return;
    }
    if (this.props.onClick) {
      this.props.onClick(e);
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

  renderRetro() {
    if (this.props.kind === 'task-logo') {
      return (
        <RetroIlluminatedButton
          width={this.context.theme.shapes.taskButtonWidth}
          height={this.context.theme.shapes.taskButtonHeight}
          margin="20px 0px 15px 0px"
          material="opal"
          border="silver"
          backgroundColor={this.context.theme.palette.taskLogoBackground}
          color={this.context.theme.palette.taskLabelText}
          glyph={this.props.glyph}
          glyphSize={this.context.theme.shapes.taskLogoGlyphSize}
          text={this.props.text}
          textSize={this.context.theme.shapes.taskLogoTextSize}
          textTransform="uppercase"
          textWeight="bold"
          onClick={this.onClick}
        />
      );
    } else if (this.props.kind === 'task-bar') {
      return (
        <RetroIlluminatedButton
          width={this.context.theme.shapes.taskButtonWidth}
          height={this.context.theme.shapes.taskButtonHeight}
          margin="5px 0px"
          material="opal"
          border="gold"
          queue="bottom"
          backgroundColor={this.context.theme.palette.taskButtonBackground}
          color={this.context.theme.palette.taskButtonText}
          glyph={this.props.glyph}
          glyphSize={this.context.theme.shapes.taskGlyphSize}
          text={this.props.text}
          textSize={this.context.theme.shapes.taskTextSize}
          onClick={this.onClick}
        />
      );
    } else if (
      this.props.kind === 'action' ||
      this.props.kind === 'secondary-action'
    ) {
      return <RetroActionButton {...this.props} />;
    } else {
      return null;
    }
  }

  render() {
    if (Bool.isFalse(this.props.show)) {
      return null;
    }

    if (this.context.theme.look.name === 'retro') {
      const r = this.renderRetro();
      if (r) {
        return r;
      }
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
        <TranslatableDiv
          title={tooltip}
          workitemId={this.context.desktopId || this.getNearestId()}
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
          onClick={this.onClick}
          className={boxClass}
        >
          {this.props.children}
        </TranslatableDiv>
      );
    } else if (this.props.toAnchor) {
      return (
        <TranslatableA // <AConnected
          msgid={tooltip}
          workitemId={this.context.desktopId || this.getNearestId()}
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
          onClick={this.onClick}
          className={boxClass}
          href={window.location.hash + '#' + this.props.toAnchor}
        >
          {this.renderLayout()}
          {this.renderTriangle()}
          {this.renderBadge()}
          {this.renderBusy()}
          {this.props.children}
        </TranslatableA>
      );
    } else {
      return (
        <TranslatableDiv
          title={tooltip}
          workitemId={this.context.desktopId || this.getNearestId()}
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
          onClick={this.onClick}
          className={boxClass}
        >
          {this.renderLayout()}
          {this.renderTriangle()}
          {this.renderBadge()}
          {this.renderBusy()}
          {this.props.children}
        </TranslatableDiv>
      );
    }
  }
}

/******************************************************************************/

Button.propTypes = makePropTypes(Props);
Button.defaultProps = makeDefaultProps(Props);
