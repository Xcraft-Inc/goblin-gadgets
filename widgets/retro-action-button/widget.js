import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import MouseTrap from 'mousetrap';
import * as ShortcutHelpers from '../helpers/shortcut-helpers.js';
import * as Bool from 'goblin-gadgets/widgets/helpers/bool-helpers';
import {TranslatableDiv} from 'nabu/helpers/element-helpers';
import {Unit} from 'electrum-theme';

import Label from 'goblin-gadgets/widgets/label/widget';
import Badge from 'goblin-gadgets/widgets/badge/widget';
import RetroScrew from 'goblin-gadgets/widgets/retro-screw/widget';
import RetroGear from 'goblin-gadgets/widgets/retro-gear/widget';
import * as styles from './styles';
import helpers from './helpers';
import svg from '../helpers/svg-helpers';
import {ColorManipulator} from 'electrum-theme';

/******************************************************************************/

export default class RetroActionButton extends Widget {
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

  /******************************************************************************/

  get place() {
    return helpers.getPlace(this.props.place);
  }

  get height() {
    return this.props.kind === 'secondary-action' ? '42px' : '58px';
  }

  /******************************************************************************/

  renderBusy() {
    if (!Bool.isTrue(this.props.busy)) {
      return null;
    }

    return (
      <div className={this.styles.classNames.busyBox}>
        <RetroGear
          color={ColorManipulator.darken(this.context.theme.palette.light, 0.2)}
          left="0px"
          top="0px"
          radius="100px"
          toothCount={20}
          toothThickness={20}
          rotationDuration="3s"
          rotationDirection="cw"
        />
      </div>
    );
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
    const {tooltip, kind, width, ...otherProps} = this.props;
    return (
      <Label
        key="label"
        {...otherProps}
        glyphColor="white"
        textColor="white"
        disabled={this.disabled}
        grow="1"
        buttonBackgroundColor={boxStyle.backgroundColor}
        insideButton={this.props.insideButton || 'true'}
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

  renderShadow() {
    return <div className={this.styles.classNames.shadow} />;
  }

  renderFrames(h, styleLeft, styleRight) {
    const frameBorderColor = ColorManipulator.darken(
      this.context.theme.palette.actionButtonBackground,
      0.7
    );
    const frameBackgroundColor = this.context.theme.palette.chrome; // gold

    const elementLeft = helpers.getFrameElements(
      h,
      styleLeft,
      frameBorderColor,
      frameBackgroundColor
    );
    const elementRight = helpers.getFrameElements(
      h,
      styleRight,
      frameBorderColor,
      frameBackgroundColor
    );

    return (
      <React.Fragment>
        {svg.renderElements(this.styles.classNames[styleLeft], elementLeft)}
        {svg.renderElements(this.styles.classNames[styleRight], elementRight)}
      </React.Fragment>
    );
  }

  renderFrame() {
    const h = this.height;

    switch (this.place) {
      case 'left':
        return this.renderFrames(h, 'frameLeftScrew', 'frameRight');
      case 'right':
        return this.renderFrames(h, 'frameLeft', 'frameRightScrew');
      case 'single':
        return this.renderFrames(h, 'frameLeftScrew', 'frameRightScrew');
      default:
        return this.renderFrames(h, 'frameLeft', 'frameRight');
    }
  }

  renderScrewLeft() {
    const place = this.place;
    if (place !== 'left' && place !== 'single') {
      return null;
    }

    const h = Unit.parse(this.height).value;
    const r = 6;
    const top = h / 2;
    const x = 10;
    const angle = this.props.kind === 'secondary-action' ? '15deg' : '-70deg';

    return (
      <div className={this.styles.classNames.screwLeft}>
        <RetroScrew
          radius={r + 'px'}
          top={top + 'px'}
          left={x + 'px'}
          angle={angle}
        />
      </div>
    );
  }

  renderScrewRight() {
    const place = this.place;
    if (place !== 'right' && place !== 'single') {
      return null;
    }

    const h = Unit.parse(this.height).value;
    const r = 6;
    const top = h / 2;
    const x = 10;
    const angle = this.props.kind === 'secondary-action' ? '-40deg' : '60deg';

    return (
      <div className={this.styles.classNames.screwLeft}>
        <RetroScrew
          radius={r + 'px'}
          top={top + 'px'}
          right={x + 'px'}
          angle={angle}
        />
      </div>
    );
  }

  render() {
    if (Bool.isFalse(this.props.show)) {
      return null;
    }

    return (
      <div className={this.styles.classNames.retroActionButton}>
        {this.renderShadow()}
        {this.renderFrame()}
        {this.renderScrewLeft()}
        {this.renderScrewRight()}
        <div className={this.styles.classNames.frameButton}>
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
            {this.renderBadge()}
            {this.props.children}
          </TranslatableDiv>
        </div>
        {this.renderBusy()}
      </div>
    );
  }
}

/******************************************************************************/
