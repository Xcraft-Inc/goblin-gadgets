import React from 'react';
import Widget from 'laboratory/widget';
import {Unit} from 'electrum-theme';

/******************************************************************************/

class Ticket extends Widget {
  constructor (props) {
    super (props);
  }

  onMouseOver () {
    const x = this.read ('mouse-over');
    if (x) {
      x ();
    }
  }

  onMouseOut () {
    const x = this.read ('mouse-out');
    if (x) {
      x ();
    }
  }

  onMouseDown (e) {
    const x = this.read ('mouse-down');
    if (x) {
      x (e);
    }
  }

  onMouseUp (e) {
    const x = this.read ('mouse-up');
    if (x) {
      x (e);
    }
  }

  renderBackgroundText () {
    const text = this.read ('background-text');
    if (text) {
      const backgroundTextStyle = this.styles.backgroundText;
      return (
        <div style={backgroundTextStyle}>
          {text}
        </div>
      );
    } else {
      return null;
    }
  }

  renderHud () {
    const hudGlyph = this.read ('hud-glyph');
    const hudGlyphShadowStyle = this.styles.hudGlyphShadow;
    const hudGlyphShadowNoneStyle = this.styles.hudGlyphShadowNone;
    const hudGlyphBoxStyle = this.styles.hudGlyphBox;
    const hudGlyphContentStyle = this.styles.hudGlyphContent;
    return (
      <div style={hudGlyph ? hudGlyphShadowStyle : hudGlyphShadowNoneStyle}>
        <div style={hudGlyphBoxStyle}>
          <i style={hudGlyphContentStyle} className={`fa fa-${hudGlyph}`} />
        </div>
      </div>
    );
  }

  renderTicket () {
    const hatch = this.read ('hatch');
    const hoverShape = this.read ('hover-shape');

    const boxStyle = this.styles.box;
    const shadowStyle = this.styles.shadow;
    const shapeStyle = this.styles.shape;
    const hatchStyle = this.styles.hatch;
    const svgStyle = this.styles.svg;
    const hoverStyle = this.styles.hover;
    const contentStyle = this.styles.content;

    const w = boxStyle.width;
    const h = boxStyle.height;
    if (!w || !h) {
      throw new Error ('Undefined ticket width or height');
    }
    const htmlShadow = (
      <svg width={w} height={h} style={shadowStyle}>
        <path d={svgStyle.path} />
      </svg>
    );
    const htmlShape = (
      <svg width={w} height={h} style={shapeStyle}>
        <path d={svgStyle.path} />
      </svg>
    );
    const hs = this.context.theme.shapes.ticketHatchSize;
    const ht = Unit.multiply (hs, 2);
    const htmlHatch = hatch === 'true'
      ? <svg width={w} height={h} style={hatchStyle}>
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
                fillOpacity={this.props.theme.palette.ticketHatchOpacity}
              />
            </pattern>
          </defs>
          <path d={svgStyle.path} />
        </svg>
      : null;
    const htmlHover = hoverShape
      ? <svg width={w} height={h} style={hoverStyle}>
          <path d={hoverStyle.path} />
        </svg>
      : null;

    return (
      <div
        style={boxStyle}
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
        <div style={contentStyle}>
          {this.props.children}
        </div>
        {this.renderHud ()}
      </div>
    );
  }

  renderRect () {
    const hatch = this.read ('hatch');
    const hoverShape = this.read ('hover-shape');

    const rectShadowStyle = this.styles.rectShadow;
    const rectStyle = this.styles.rect;
    const rectEmptyStyle = this.styles.rectEmpty;
    const rectHoverStyle = this.styles.rectHover;
    const contentStyle = this.styles.content;
    const rectContentHatchStyle = this.styles.rectContentHatch;

    return (
      <div
        style={rectShadowStyle}
        onMouseOver={::this.onMouseOver}
        onMouseOut={::this.onMouseOut}
        onMouseDown={::this.onMouseDown}
        onMouseUp={::this.onMouseUp}
        onTouchStart={::this.onMouseDown}
        onTouchEnd={::this.onMouseUp}
      >
        <div style={rectStyle}>
          <div style={hatch === 'true' ? rectContentHatchStyle : contentStyle}>
            {this.renderBackgroundText ()}
            {this.props.children}
          </div>
          <div style={hoverShape ? rectHoverStyle : rectEmptyStyle} />
        </div>
        {this.renderHud ()}
      </div>
    );
  }

  renderSubpane () {
    const subkind = this.read ('subkind');

    const rectStyle = subkind === 'dragged'
      ? this.styles.subpaneDragged
      : this.styles.subpaneRect;

    const contentStyle = this.styles.subpaneContent;

    return (
      <div
        style={rectStyle}
        onMouseOver={::this.onMouseOver}
        onMouseOut={::this.onMouseOut}
        onMouseDown={::this.onMouseDown}
        onMouseUp={::this.onMouseUp}
        onTouchStart={::this.onMouseDown}
        onTouchEnd={::this.onMouseUp}
      >
        <div style={contentStyle}>
          {this.props.children}
        </div>
      </div>
    );
  }

  renderCover () {
    const coverStyle = this.styles.cover;
    const coverContentStyle = this.styles.coverContent;

    return (
      <div
        style={coverStyle}
        onMouseOver={::this.onMouseOver}
        onMouseOut={::this.onMouseOut}
        onMouseDown={::this.onMouseDown}
        onMouseUp={::this.onMouseUp}
        onTouchStart={::this.onMouseDown}
        onTouchEnd={::this.onMouseUp}
      >
        <div style={coverContentStyle}>
          {this.props.children}
        </div>
      </div>
    );
  }

  render () {
    const kind = this.read ('kind');
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
