import React from 'react';
import Widget from 'laboratory/widget';

import * as Bool from 'gadgets/boolean-helpers';
import {Unit} from 'electrum-theme';

/******************************************************************************/

class Ticket extends Widget {
  constructor () {
    super (...arguments);

    this.onMouseOver = this.onMouseOver.bind (this);
    this.onMouseOut = this.onMouseOut.bind (this);
    this.onMouseDown = this.onMouseDown.bind (this);
    this.onMouseUp = this.onMouseUp.bind (this);
  }

  onMouseOver () {
    const x = this.props.mouseOver;
    if (x) {
      x ();
    }
  }

  onMouseOut () {
    const x = this.props.mouseOut;
    if (x) {
      x ();
    }
  }

  onMouseDown (e) {
    const x = this.props.mouseDown;
    if (x) {
      x (e);
    }
  }

  onMouseUp (e) {
    const x = this.props.mouseUp;
    if (x) {
      x (e);
    }
  }

  renderBackgroundText () {
    if (this.props.backgroundText) {
      const backgroundTextClass = this.styles.classNames.backgroundText;
      return (
        <div className={backgroundTextClass}>
          {this.props.backgroundText}
        </div>
      );
    } else {
      return null;
    }
  }

  renderHud () {
    const hudGlyphShadowClass = this.styles.classNames.hudGlyphShadow;
    const hudGlyphShadowNoneClass = this.styles.classNames.hudGlyphShadowNone;
    const hudGlyphBoxClass = this.styles.classNames.hudGlyphBox;
    const hudGlyphContentClass = this.styles.classNames.hudGlyphContent;
    return (
      <div
        className={
          this.props.hudGlyph ? hudGlyphShadowClass : hudGlyphShadowNoneClass
        }
      >
        <div className={hudGlyphBoxClass}>
          <i
            className={`${hudGlyphContentClass} fa fa-${this.props.hudGlyph}`}
          />
        </div>
      </div>
    );
  }

  renderTicket () {
    const boxClass = this.styles.classNames.box;
    const shadowClass = this.styles.classNames.shadow;
    const shapeClass = this.styles.classNames.shape;
    const hatchClass = this.styles.classNames.hatch;
    const hoverClass = this.styles.classNames.hover;
    const contentClass = this.styles.classNames.content;

    const w = this.styles.props.box.width;
    const h = this.styles.props.box.height;
    if (!w || !h) {
      throw new Error ('Undefined ticket width or height');
    }
    const htmlShadow = (
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
    const ht = Unit.multiply (hs, 2);
    const htmlHatch = Bool.isTrue (this.props.hatch)
      ? <svg width={w} height={h} className={hatchClass}>
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
      : null;
    const htmlHover = (
      <svg width={w} height={h} className={hoverClass}>
        <path d={this.styles.props.hover.path} />
      </svg>
    );

    return (
      <div
        className={boxClass}
        title={this.props.tooltip}
        onMouseOver={this.onMouseOver}
        onMouseOut={this.onMouseOut}
        onMouseDown={this.onMouseDown}
        onMouseUp={this.onMouseUp}
        onTouchStart={this.onMouseDown}
        onTouchEnd={this.onMouseUp}
      >
        {htmlShadow}
        {htmlShape}
        {htmlHatch}
        <div className={contentClass}>
          {this.renderBackgroundText ()}
          {this.props.children}
          {this.renderHud ()}
        </div>
        {htmlHover}
      </div>
    );
  }

  renderRect () {
    const rectShadowClass = this.styles.classNames.rectShadow;
    const rectClass = this.styles.classNames.rect;
    const rectHoverClass = this.styles.classNames.rectHover;
    const contentClass = this.styles.classNames.content;
    const rectContentHatchClass = this.styles.classNames.rectContentHatch;

    return (
      <div
        className={rectShadowClass}
        title={this.props.tooltip}
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
              Bool.isTrue (this.props.hatch)
                ? rectContentHatchClass
                : contentClass
            }
          >
            {this.renderBackgroundText ()}
            {this.props.children}
            {this.renderHud ()}
          </div>
        </div>
        <div className={rectHoverClass} />
      </div>
    );
  }

  renderSubpane () {
    const rectClass = this.props.subkind === 'dragged'
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
        <div className={contentClass}>
          {this.props.children}
        </div>
      </div>
    );
  }

  renderCover () {
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
        <div className={coverContentClass}>
          {this.props.children}
        </div>
      </div>
    );
  }

  render () {
    if (Bool.isFalse (this.props.show)) {
      return null;
    }

    if (this.props.kind === 'ticket') {
      return this.renderTicket ();
    } else if (this.props.kind === 'cover') {
      return this.renderCover ();
    } else if (this.props.kind === 'subpane') {
      return this.renderSubpane ();
    } else {
      // 'rect' 'thin' 'event' ... ?
      return this.renderRect ();
    }
  }
}

/******************************************************************************/
export default Ticket;
