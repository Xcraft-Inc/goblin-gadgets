import React from 'react';
import Widget from 'laboratory/widget';

import Label from 'gadgets/label/widget';
import Badge from 'gadgets/badge/widget';
import TicketHover from 'gadgets/ticket-hover/widget';

const Bool = require('gadgets/helpers/bool-helpers');
const Tooltip = require('gadgets/helpers/tooltip-helpers');
import {Unit} from 'electrum-theme';

/******************************************************************************/

export default class Ticket extends Widget {
  constructor() {
    super(...arguments);

    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
  }

  componentDidMount() {
    super.componentDidMount();
  }

  onMouseEnter() {
    const x = this.props.onMouseEnter;
    if (x) {
      x();
    }
  }

  onMouseLeave() {
    const x = this.props.onMouseLeave;
    if (x) {
      x();
    }
  }

  onMouseDown(e) {
    const x = this.props.mouseDown;
    if (x) {
      x(e);
    }
  }

  onMouseUp(e) {
    const x = this.props.mouseUp;
    if (x) {
      x(e);
    }
  }

  renderBackgroundText() {
    if (this.props.backgroundText) {
      const backgroundTextClass = this.styles.classNames.backgroundText;
      return (
        <div className={backgroundTextClass}>{this.props.backgroundText}</div>
      );
    } else {
      return null;
    }
  }

  renderHud() {
    const hudGlyphShadowClass = this.styles.classNames.hudGlyphShadow;
    const hudGlyphShadowNoneClass = this.styles.classNames.hudGlyphShadowNone;
    const hudGlyphBoxClass = this.styles.classNames.hudGlyphBox;
    return (
      <div
        className={
          this.props.hudGlyph ? hudGlyphShadowClass : hudGlyphShadowNoneClass
        }
      >
        <div className={hudGlyphBoxClass}>
          <Label kind="ticket-hud" glyph={this.props.hudGlyph} />
        </div>
      </div>
    );
  }

  renderIdenticalCount() {
    if (this.props.identicalCount) {
      const identicalCountClass = this.styles.classNames.identicalCount;
      return (
        <div className={identicalCountClass}>
          <Badge kind="identical-count" value={this.props.identicalCount + 1} />
        </div>
      );
    } else {
      return null;
    }
  }

  renderTicket() {
    const styles = this.styles;
    const boxClass = styles.classNames.box;
    const farShadowClass = styles.classNames.farShadow;
    const shadowClass = styles.classNames.shadow;
    const shapeClass = styles.classNames.shape;
    const hatchDefClass = styles.classNames.hatchDef;
    const hatchClass = styles.classNames.hatch;
    const flashClass = styles.classNames.flash;
    const contentClass = styles.classNames.content;

    const w = styles.props.box.width;
    const h = styles.props.box.height;
    if (!w || !h) {
      throw new Error('Undefined ticket width or height');
    }
    const htmlFarShadow = Bool.isTrue(this.props.shadow) ? (
      <div className={farShadowClass} />
    ) : null;
    const htmlShadow = Bool.isTrue(this.props.shadow) ? null : (
      <svg width={w} height={h} className={shadowClass}>
        <path d={styles.props.svg.path} />
      </svg>
    );
    const htmlShape = (
      <svg width={w} height={h} className={shapeClass}>
        <path d={styles.props.svg.path} />
      </svg>
    );
    const hs = this.context.theme.shapes.ticketHatchSize;
    const ht = Unit.multiply(hs, 2);
    const htmlHatchDef = (
      <svg width={w} height={h} className={hatchDefClass}>
        <defs>
          <pattern
            id="hatch"
            x="0px"
            y="0px"
            width={ht}
            height={ht}
            patternTransform="rotate(45)"
            patternUnits="userSpaceOnUse"
          >
            <rect
              x="0px"
              y="0px"
              width={hs}
              height={ht}
              fill="#000"
              fillOpacity={this.context.theme.palette.ticketHatchOpacity}
            />
          </pattern>
        </defs>
      </svg>
    );
    const htmlHatch = Bool.isTrue(this.props.hatch) ? (
      <svg width={w} height={h} className={hatchClass}>
        <path d={styles.props.svg.path} />
      </svg>
    ) : null;

    return (
      <div
        className={boxClass}
        title={Tooltip.prepare(this.props.tooltip)}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        onMouseDown={this.onMouseDown}
        onMouseUp={this.onMouseUp}
        onTouchStart={this.onMouseDown}
        onTouchEnd={this.onMouseUp}
      >
        {htmlFarShadow}
        {htmlShadow}
        {htmlShape}
        {htmlHatchDef}
        {htmlHatch}
        <div className={contentClass}>
          {this.renderBackgroundText()}
          {this.props.children}
          {this.renderIdenticalCount()}
          {this.renderHud()}
        </div>
        {Bool.isTrue(this.props.flash) ? <div className={flashClass} /> : null}
        <TicketHover
          kind={this.props.kind}
          shape={this.props.shape}
          hoverShape={this.props.hoverShape}
          width={this.props.width}
          height={this.props.height}
        />
      </div>
    );
  }

  renderRect() {
    const rectShadowClass = Bool.isTrue(this.props.shadow)
      ? this.styles.classNames.rectFarShadow
      : this.styles.classNames.rectShadow;
    const rectClass = this.styles.classNames.rect;
    const flashClass = this.styles.classNames.flash;
    const contentClass = this.styles.classNames.content;
    const rectContentHatchClass = this.styles.classNames.rectContentHatch;

    return (
      <div
        className={rectShadowClass}
        title={Tooltip.prepare(this.props.tooltip)}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        onMouseDown={this.onMouseDown}
        onMouseUp={this.onMouseUp}
        onTouchStart={this.onMouseDown}
        onTouchEnd={this.onMouseUp}
      >
        <div className={rectClass}>
          <div
            className={
              Bool.isTrue(this.props.hatch)
                ? rectContentHatchClass
                : contentClass
            }
          >
            {this.renderBackgroundText()}
            {this.props.children}
            {this.renderIdenticalCount()}
            {this.renderHud()}
          </div>
        </div>
        {Bool.isTrue(this.props.flash) ? <div className={flashClass} /> : null}
        <TicketHover
          kind={this.props.kind}
          shape={this.props.shape}
          hoverShape={this.props.hoverShape}
          width={this.props.width}
          height={this.props.height}
        />
      </div>
    );
  }

  renderSubpane() {
    const rectClass =
      this.props.subkind === 'dragged'
        ? this.styles.classNames.subpaneDragged
        : this.styles.classNames.subpaneRect;

    const contentClass = this.styles.classNames.subpaneContent;

    return (
      <div
        className={rectClass}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        onMouseDown={this.onMouseDown}
        onMouseUp={this.onMouseUp}
        onTouchStart={this.onMouseDown}
        onTouchEnd={this.onMouseUp}
      >
        <div className={contentClass}>{this.props.children}</div>
      </div>
    );
  }

  renderCover() {
    const coverClass = this.styles.classNames.cover;
    const coverContentClass = this.styles.classNames.coverContent;

    return (
      <div
        className={coverClass}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        onMouseDown={this.onMouseDown}
        onMouseUp={this.onMouseUp}
        onTouchStart={this.onMouseDown}
        onTouchEnd={this.onMouseUp}
      >
        <div className={coverContentClass}>{this.props.children}</div>
      </div>
    );
  }

  render() {
    if (Bool.isFalse(this.props.show)) {
      return null;
    }

    if (this.props.kind === 'ticket') {
      return this.renderTicket();
    } else if (this.props.kind === 'cover') {
      return this.renderCover();
    } else if (this.props.kind === 'subpane') {
      return this.renderSubpane();
    } else {
      // 'rect' 'thin' 'event' ... ?
      return this.renderRect();
    }
  }
}
