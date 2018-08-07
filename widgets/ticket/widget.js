import React from 'react';
import Widget from 'laboratory/widget';

import Label from 'gadgets/label/widget';
import Badge from 'gadgets/badge/widget';

const Bool = require('gadgets/helpers/bool-helpers');
import ReactTooltip from 'react-tooltip';
const Tooltip = require('gadgets/helpers/tooltip-helpers');
import {Unit} from 'electrum-theme';

/******************************************************************************/

class Ticket extends Widget {
  constructor() {
    super(...arguments);

    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
  }

  componentDidMount() {
    super.componentDidMount();
    ReactTooltip.rebuild();
  }

  onMouseOver() {
    const x = this.props.mouseOver;
    if (x) {
      x();
    }
  }

  onMouseOut() {
    const x = this.props.mouseOut;
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
    const boxClass = this.styles.classNames.box;
    const farShadowClass = this.styles.classNames.farShadow;
    const shadowClass = this.styles.classNames.shadow;
    const shapeClass = this.styles.classNames.shape;
    const hatchClass = this.styles.classNames.hatch;
    const flashClass = this.styles.classNames.flash;
    const hoverClass = this.styles.classNames.hover;
    const contentClass = this.styles.classNames.content;

    const w = this.styles.props.box.width;
    const h = this.styles.props.box.height;
    if (!w || !h) {
      throw new Error('Undefined ticket width or height');
    }
    const htmlFarShadow = Bool.isTrue(this.props.shadow) ? (
      <div className={farShadowClass} />
    ) : null;
    const htmlShadow = Bool.isTrue(this.props.shadow) ? null : (
      <svg width={w} height={h} className={shadowClass}>
        <path d={this.styles.props.svg.path} />
      </svg>
    );
    const htmlShape = (
      <svg width={w} height={h} className={shapeClass}>
        <path d={this.styles.props.svg.path} />
      </svg>
    );
    const hs = this.context.theme.shapes.ticketHatchSize;
    const ht = Unit.multiply(hs, 2);
    const htmlHatch = Bool.isTrue(this.props.hatch) ? (
      <svg width={w} height={h} className={hatchClass}>
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
        <path d={this.styles.props.svg.path} />
      </svg>
    ) : null;
    const htmlHover = (
      <svg width={w} height={h} className={hoverClass}>
        <path d={this.styles.props.hover.path} />
      </svg>
    );

    return (
      <div
        className={boxClass}
        data-tip={Tooltip.prepare(this.props.tooltip)}
        onMouseOver={this.onMouseOver}
        onMouseOut={this.onMouseOut}
        onMouseDown={this.onMouseDown}
        onMouseUp={this.onMouseUp}
        onTouchStart={this.onMouseDown}
        onTouchEnd={this.onMouseUp}
      >
        {htmlFarShadow}
        {htmlShadow}
        {htmlShape}
        {htmlHatch}
        <div className={contentClass}>
          {this.renderBackgroundText()}
          {this.props.children}
          {this.renderIdenticalCount()}
          {this.renderHud()}
        </div>
        {Bool.isTrue(this.props.flash) ? <div className={flashClass} /> : null}
        {htmlHover}
      </div>
    );
  }

  renderRect() {
    const rectShadowClass = Bool.isTrue(this.props.shadow)
      ? this.styles.classNames.rectFarShadow
      : this.styles.classNames.rectShadow;
    const rectClass = this.styles.classNames.rect;
    const flashClass = this.styles.classNames.flash;
    const rectHoverClass = this.styles.classNames.rectHover;
    const contentClass = this.styles.classNames.content;
    const rectContentHatchClass = this.styles.classNames.rectContentHatch;

    return (
      <div
        className={rectShadowClass}
        data-tip={Tooltip.prepare(this.props.tooltip)}
        onMouseOver={this.onMouseOver}
        onMouseOut={this.onMouseOut}
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
        <div className={rectHoverClass} />
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
        onMouseOver={this.onMouseOver}
        onMouseOut={this.onMouseOut}
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
        onMouseOver={this.onMouseOver}
        onMouseOut={this.onMouseOut}
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

/******************************************************************************/
export default Ticket;
