import React from 'react';
import Widget from 'laboratory/widget';
import {Unit} from 'electrum-theme';

/******************************************************************************/

class Ticket extends Widget {
  constructor (props) {
    super (props);
  }

  onMouseOver () {
    const x = this.props['mouse-over'];
    if (x) {
      x ();
    }
  }

  onMouseOut () {
    const x = this.props['mouse-out'];
    if (x) {
      x ();
    }
  }

  onMouseDown (e) {
    const x = this.props['mouse-down'];
    if (x) {
      x (e);
    }
  }

  onMouseUp (e) {
    const x = this.props['mouse-up'];
    if (x) {
      x (e);
    }
  }

  renderBackgroundText () {
    const text = this.props['background-text'];
    if (text) {
      const backgroundTextClass = this.styles.classNames.backgroundText;
      return (
        <div className={backgroundTextClass}>
          {text}
        </div>
      );
    } else {
      return null;
    }
  }

  renderHud () {
    const hudGlyph = this.props['hud-glyph'];
    const hudGlyphShadowClass = this.styles.classNames.hudGlyphShadow;
    const hudGlyphShadowNoneClass = this.styles.classNames.hudGlyphShadowNone;
    const hudGlyphBoxClass = this.styles.classNames.hudGlyphBox;
    const hudGlyphContentClass = this.styles.classNames.hudGlyphContent;
    return (
      <div className={hudGlyph ? hudGlyphShadowClass : hudGlyphShadowNoneClass}>
        <div className={hudGlyphBoxClass}>
          <i className={`${hudGlyphContentClass} fa fa-${hudGlyph}`} />
        </div>
      </div>
    );
  }

  renderTicket () {
    const hatch = this.props.hatch;
    const hoverShape = this.props.hover === 'true'
      ? this.props['hover-shape']
      : null;

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
    const htmlHatch = hatch === 'true'
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
    const htmlHover = hoverShape
      ? <svg width={w} height={h} className={hoverClass}>
          <path d={this.styles.props.hover.path} />
        </svg>
      : null;

    return (
      <div
        className={boxClass}
        onMouseOver={::this.onMouseOver}
        onMouseOut={::this.onMouseOut}
        onMouseDown={::this.onMouseDown}
        onMouseUp={::this.onMouseUp}
        onTouchStart={::this.onMouseDown}
        onTouchEnd={::this.onMouseUp}
      >
        {htmlShadow}
        {htmlShape}
        {htmlHatch}
        {this.renderBackgroundText ()}
        {htmlHover}
        <div className={contentClass}>
          {this.props.children}
        </div>
        {this.renderHud ()}
      </div>
    );
  }

  renderRect () {
    const hatch = this.props.hatch;
    const hoverShape = this.props.hover === 'true'
      ? this.props['hover-shape']
      : null;

    const rectShadowClass = this.styles.classNames.rectShadow;
    const rectClass = this.styles.classNames.rect;
    const rectEmptyClass = this.styles.classNames.rectEmpty;
    const rectHoverClass = this.styles.classNames.rectHover;
    const contentClass = this.styles.classNames.content;
    const rectContentHatchClass = this.styles.classNames.rectContentHatch;

    return (
      <div
        className={rectShadowClass}
        onMouseOver={::this.onMouseOver}
        onMouseOut={::this.onMouseOut}
        onMouseDown={::this.onMouseDown}
        onMouseUp={::this.onMouseUp}
        onTouchStart={::this.onMouseDown}
        onTouchEnd={::this.onMouseUp}
      >
        <div className={rectClass}>
          <div
            className={hatch === 'true' ? rectContentHatchClass : contentClass}
          >
            {this.renderBackgroundText ()}
            {this.props.children}
          </div>
          <div className={hoverShape ? rectHoverClass : rectEmptyClass} />
        </div>
        {this.renderHud ()}
      </div>
    );
  }

  renderSubpane () {
    const subkind = this.props.subkind;

    const rectClass = subkind === 'dragged'
      ? this.styles.classNames.subpaneDragged
      : this.styles.classNames.subpaneRect;

    const contentClass = this.styles.classNames.subpaneContent;

    return (
      <div
        className={rectClass}
        onMouseOver={::this.onMouseOver}
        onMouseOut={::this.onMouseOut}
        onMouseDown={::this.onMouseDown}
        onMouseUp={::this.onMouseUp}
        onTouchStart={::this.onMouseDown}
        onTouchEnd={::this.onMouseUp}
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
        onMouseOver={::this.onMouseOver}
        onMouseOut={::this.onMouseOut}
        onMouseDown={::this.onMouseDown}
        onMouseUp={::this.onMouseUp}
        onTouchStart={::this.onMouseDown}
        onTouchEnd={::this.onMouseUp}
      >
        <div className={coverContentClass}>
          {this.props.children}
        </div>
      </div>
    );
  }

  render () {
    const kind = this.props.kind;
    if (kind === 'ticket') {
      return this.renderTicket ();
    } else if (kind === 'cover') {
      return this.renderCover ();
    } else if (kind === 'subpane') {
      return this.renderSubpane ();
    } else {
      // 'rect' 'thin' 'event' ... ?
      return this.renderRect ();
    }
  }
}

/******************************************************************************/
export default Ticket;
