import React from 'react';
import Widget from 'laboratory/widget';
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
        <div className={style}>
          <Label text={text} grow="1" wrap="no" />
        </div>
      );
    } else {
      return null;
    }
  }

  renderGlyph (glyph, index) {
    return (
      <Label
        key={index}
        glyph={glyph.get ('glyph')}
        glyphColor={glyph.get ('color')}
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
      <div className={lineClass}>
        <div className={glyphsClass}>
          {this.renderGlyphs (this.props.note)}
        </div>
        <Label text={text} grow="1" wrap="no" />
        {this.renderTooltip (text, isDragged)}
        <div
          className={frontClass}
          onMouseOver={this.onMouseOver}
          onMouseOut={this.onMouseOut}
        />
      </div>
    );
  }

  renderEmpty () {
    const lineClass = this.styles.classNames.empty;
    return <div className={lineClass} />;
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
