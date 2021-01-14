import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import MouseTrap from 'mousetrap';
import * as ShortcutHelpers from '../helpers/shortcut-helpers.js';
import {TranslatableDiv} from 'goblin-nabu/widgets/helpers/element-helpers';
import {Unit} from 'goblin-theme';

import Label from 'goblin-gadgets/widgets/label/widget';
import RetroScrew from 'goblin-gadgets/widgets/retro-screw/widget';
import RetroIlluminatedButton from 'goblin-gadgets/widgets/retro-illuminated-button/widget';
import * as styles from './styles';

/******************************************************************************/

export default class RetroBadgeButton extends Widget {
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
    return this.props.disabled || this.props.readonly || this.props.busy;
  }

  onFocus() {
    if (this.props.focusable && !this.disabled) {
      this.focus = true;
      MouseTrap.bind('space', this.onKeySpace, 'keydown');
    }
  }

  onBlur() {
    if (this.props.focusable && !this.disabled) {
      this.focus = false;
      MouseTrap.unbind('space');
    }
  }

  onKeySpace(e) {
    e.preventDefault();

    if (this.disabled && !this.props.focusable) {
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

  /******************************************************************************/

  renderScrews() {
    const x = Unit.multiply(this.props.height, 0.5);
    const r = '8px';

    return (
      <>
        <RetroScrew radius={r} top={x} left={x} angle="25deg" />
        <RetroScrew radius={r} top={x} right={x} angle="-40deg" />
      </>
    );
  }

  renderBadge() {
    const s = Unit.sub(this.props.height, '5px');
    return (
      <RetroIlluminatedButton
        glyph="solid/bell"
        glyphSize="130%"
        width={s}
        height={s}
        material="led"
        backgroundColor={this.props.badgeValue ? 'red' : '#888'}
        color="white"
        status={this.props.badgeValue ? 'flash' : null}
        onClick={this.onClick}
      />
    );
  }

  renderShortcut(boxStyle) {
    if (this.props.shortcut) {
      return (
        <Label
          key="shortcut"
          shortcut={true}
          kind={this.props.kind}
          subkind={this.props.subkind}
          disabled={this.disabled}
          readonly={this.readonly}
          active={this.props.active}
          textColor={this.props.textColor}
          buttonBackgroundColor={boxStyle.backgroundColor}
          text={ShortcutHelpers.getShortcut(this.props.shortcut)}
          wrap="no"
          insideButton={true}
        />
      );
    } else {
      return null;
    }
  }

  renderLabel(boxStyle) {
    const {tooltip, kind, width, glyph, ...otherProps} = this.props;
    return (
      <Label
        key="label"
        {...otherProps}
        glyphColor="white"
        textColor="white"
        disabled={this.disabled}
        grow="1"
        buttonBackgroundColor={boxStyle.backgroundColor}
        insideButton={this.props.insideButton || true}
      />
    );
  }

  renderLayout() {
    const result = [];
    const boxStyle = Object.assign({}, this.styles.props.box);
    result.push(this.renderLabel(boxStyle));
    result.push(this.renderShortcut(boxStyle));
    return result;
  }

  render() {
    if (this.props.show === false) {
      return null;
    }

    return (
      <div className={this.styles.classNames.retroBadgeButton}>
        <div className={this.styles.classNames.button}>
          <TranslatableDiv
            title={this.props.tooltip}
            workitemId={this.context.desktopId || this.getNearestId()}
            key={this.props.index}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            onMouseDown={this.onMouseDown}
            onMouseUp={this.onMouseUp}
            onTouchStart={this.onMouseDown}
            onTouchEnd={this.onMouseUp}
            onMouseOver={this.onMouseOver}
            onMouseOut={this.onMouseOut}
            onClick={this.onClick}
            className={this.styles.classNames.box}
          >
            {this.renderLayout()}
            {this.renderScrews()}
          </TranslatableDiv>
        </div>
        {this.renderBadge()}
      </div>
    );
  }
}

/******************************************************************************/
