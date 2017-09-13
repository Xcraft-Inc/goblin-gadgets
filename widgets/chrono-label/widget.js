import React from 'react';
import Widget from 'laboratory/widget';
import * as GlyphHelpers from '../helpers/glyph-helpers.js';
import * as Bool from '../helpers/boolean-helpers.js';

import Label from 'gadgets/label/widget';

/******************************************************************************/

class ChronoLabel extends Widget {
  constructor () {
    super (...arguments);

    this.state = {
      hover: false,
    };

    this.onMouseOver = this.onMouseOver.bind (this);
    this.onMouseOut = this.onMouseOut.bind (this);
  }

  get hover () {
    return this.state.hover;
  }

  set hover (value) {
    this.setState ({
      hover: value,
    });
  }

  onMouseOver () {
    this.hover = true;
    const x = this.props.mouseOver;
    if (x) {
      x (this.props.event);
    }
  }

  onMouseOut () {
    this.hover = false;
    const x = this.props.mouseOut;
    if (x) {
      x (this.props.event);
    }
  }

  /******************************************************************************/

  renderTooltip (text, isDragged) {
    if (!isDragged && this.hover && text) {
      const style = this.styles.classNames.tooltip;
      return (
        <div className={style} key="tooltip">
          <Label index="2" text={text} grow="1" wrap="no" />
        </div>
      );
    } else {
      return null;
    }
  }

  renderGlyph (glyph, index) {
    const g = GlyphHelpers.getGlyph (glyph.get ('glyph'));
    return (
      <Label
        index={index}
        glyph={g.glyph}
        glyphColor={g.color}
        spacing="compact"
      />
    );
  }

  renderGlyphs (note) {
    if (note) {
      const glyphs = this.shred (note.glyphs);
      let index = 0;
      return glyphs.linq
        .orderBy (glyph => glyph.get ('order'))
        .select (glyph => {
          return this.renderGlyph (glyph, index++);
        })
        .toList ();
    } else {
      return null;
    }
  }

  renderFull (isDragged) {
    const text = this.props.note ? this.props.note.content : null;

    const lineClass = this.styles.classNames.line;
    const glyphsClass = this.styles.classNames.glyphs;
    const frontClass = this.styles.classNames.front;

    return (
      <div className={lineClass} key={this.props.index}>
        <div className={glyphsClass} key="glyphs">
          {this.renderGlyphs (this.props.note)}
        </div>
        <Label index="1" text={text} grow="1" wrap="no" />
        {this.renderTooltip (text, isDragged)}
        <div
          key="front"
          className={frontClass}
          onMouseOver={this.onMouseOver}
          onMouseOut={this.onMouseOut}
        />
      </div>
    );
  }

  renderEmpty () {
    const lineClass = this.styles.classNames.empty;
    return <div className={lineClass} key={this.props.index} />;
  }

  render () {
    if (this.props.hasHeLeft && !this.props.isDragged) {
      return this.renderEmpty ();
    } else {
      return this.renderFull (this.props.isDragged);
    }
  }
}

/******************************************************************************/
export default ChronoLabel;
