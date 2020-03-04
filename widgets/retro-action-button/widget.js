import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import Widget from 'goblin-laboratory/widgets/widget';
import MouseTrap from 'mousetrap';
import * as ShortcutHelpers from '../helpers/shortcut-helpers.js';
import * as Bool from 'gadgets/helpers/bool-helpers';
import {TranslatableDiv} from 'nabu/helpers/element-helpers';
import {Unit} from 'electrum-theme';

import Label from 'goblin-gadgets/widgets/label/widget';
import Badge from 'goblin-gadgets/widgets/badge/widget';
import RetroScrew from 'goblin-gadgets/widgets/retro-screw/widget';
import * as styles from './styles';
import getPath from './getPath';

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
    const place = this.props.place;
    if (place === '1/1') {
      return 'single';
    } else if (place.indexOf('/') !== -1) {
      const n = place.split('/');
      if (n.length === 2) {
        if (n[0] === '1') {
          return 'left';
        } else if (n[0] === n[1]) {
          return 'right';
        } else {
          return 'middle';
        }
      }
    }
    return 'middle';
  }

  get height() {
    return this.props.kind === 'secondary-action' ? '42px' : '58px';
  }

  /******************************************************************************/

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

  renderFrame() {
    const place = this.place;
    const h = this.height;

    if (place === 'left') {
      return (
        <React.Fragment>
          <svg className={this.styles.classNames.frameLeftScrew}>
            <path d={getPath.getFramePath(h, 'left-screw')} />
          </svg>
          <svg className={this.styles.classNames.frameRight}>
            <path d={getPath.getFramePath(h, 'right')} />
          </svg>
        </React.Fragment>
      );
    } else if (place === 'right') {
      return (
        <React.Fragment>
          <svg className={this.styles.classNames.frameLeft}>
            <path d={getPath.getFramePath(h, 'left')} />
          </svg>
          <svg className={this.styles.classNames.frameRightScrew}>
            <path d={getPath.getFramePath(h, 'right-screw')} />
          </svg>
        </React.Fragment>
      );
    } else if (place === 'single') {
      return (
        <React.Fragment>
          <svg className={this.styles.classNames.frameLeftScrew}>
            <path d={getPath.getFramePath(h, 'left-screw')} />
          </svg>
          <svg className={this.styles.classNames.frameRightScrew}>
            <path d={getPath.getFramePath(h, 'right-screw')} />
          </svg>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <svg className={this.styles.classNames.frameLeft}>
            <path d={getPath.getFramePath(h, 'left')} />
          </svg>
          <svg className={this.styles.classNames.frameRight}>
            <path d={getPath.getFramePath(h, 'right')} />
          </svg>
        </React.Fragment>
      );
    }
  }

  renderScrewLeft() {
    const place = this.place;
    if (place !== 'left' && place !== 'single') {
      return null;
    }

    const h = Unit.parse(this.height).value;
    const r = 6;
    const top = h / 2 - r;
    const x = 10 - r;
    const size = r * 2 - 2;
    const angle = this.props.kind === 'secondary-action' ? '15deg' : '-70deg';

    return (
      <div className={this.styles.classNames.screwLeft}>
        <RetroScrew
          size={size + 'px'}
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
    const top = h / 2 - r;
    const x = 10 - r;
    const size = r * 2 - 2;
    const angle = this.props.kind === 'secondary-action' ? '-40deg' : '60deg';

    return (
      <div className={this.styles.classNames.screwLeft}>
        <RetroScrew
          size={size + 'px'}
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
            {this.renderBusy()}
            {this.props.children}
          </TranslatableDiv>
        </div>
      </div>
    );
  }
}

/******************************************************************************/
