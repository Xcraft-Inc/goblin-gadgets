import React from 'react';
import Widget from 'laboratory/widget';

/******************************************************************************/

class Label extends Widget {
  constructor (props) {
    super (props);
  }

  static get wiring () {
    return {
      id: 'id',
      kind: 'kind',
      text: 'text',
      glyph: 'glyph',
    };
  }

  setText (text) {
    this.do ('text', {text});
  }

  setKind (kind) {
    this.do ('kind', {kind});
  }

  // Splits 'abc<em>def</em>ghi' into three parts.
  getFragments (line) {
    const result = [];
    var i = 0;
    var j = 0;
    var em = false; // outside <em></em>
    while (i < line.length) {
      if (line[i] === '<') {
        // start of tag ?
        const last = line.substring (i);
        if (last.startsWith ('<em>')) {
          if (j < i) {
            result.push ({em: em, text: line.substring (j, i)});
          }
          em = true; // inside <em></em>
          i += 4; // skip <em>
          j = i;
        } else if (last.startsWith ('</em>')) {
          if (j < i) {
            result.push ({em: em, text: line.substring (j, i)});
          }
          em = false; // outside <em></em>
          i += 5; // skip </em>
          j = i;
        } else {
          i++;
        }
      } else {
        i++;
      }
    }
    if (j < i) {
      result.push ({em: em, text: line.substring (j, i)});
    }
    return result;
  }

  // Render a fragment with normal or hilited style.
  renderFragment (index, fragment) {
    const style = fragment.em
      ? this.styles.hilitedFragment
      : this.styles.normalFragment;
    return (
      <span key={index} style={style}>
        {fragment.text}
      </span>
    );
  }

  // Render all fragments of a line.
  renderFragments (line) {
    const result = [];
    const fragments = this.getFragments (line);
    let index = 0;
    for (var fragment of fragments) {
      result.push (this.renderFragment (index++, fragment));
    }
    return result;
  }

  renderLine (index, line) {
    const style = this.styles.text;
    return (
      <div key={index} style={style}>
        {this.renderFragments (line)}
      </div>
    );
  }

  getLines (lines) {
    const array = [];
    let index = 0;
    for (var line of lines) {
      array.push (this.renderLine (index++, line));
    }
    return array;
  }

  renderLines (index, lines) {
    const style = this.styles.lines;
    return (
      <div key={index} style={style}>
        {this.getLines (lines)}
      </div>
    );
  }

  // Render a very simple text, that is to say a single line and without highlighting.
  renderSimpleText (index, text) {
    const style = this.styles.text;
    return (
      <div key={index} style={style}>
        {text}
      </div>
    );
  }

  renderText (index, text) {
    if (text) {
      if (typeof text === 'string') {
        const hasEol1 = text.indexOf ('\n') !== -1;
        const hasEol2 = text.indexOf ('\\n') !== -1;
        const hasBr = text.indexOf ('<br/>') !== -1;
        const hasEm = text.indexOf ('<em>') !== -1;
        if (hasEol1 || hasEol2 || hasBr || hasEm) {
          // complex text ?
          const lines = text.split (hasBr ? '<br/>' : hasEol1 ? '\n' : '\\n');
          const singleLine = this.props['single-line'];
          if (singleLine === 'true') {
            const line = lines.join (', ');
            return this.renderSimpleText (index, line);
          } else {
            return this.renderLines (index, lines);
          }
        } else {
          return this.renderSimpleText (index, text);
        }
      } else {
        return this.renderSimpleText (index, text);
      }
    } else {
      return null;
    }
  }

  renderGlyph (index, glyph) {
    const rotate = this.props.rotate;
    const flip = this.props.flip;
    const spin = this.props.spin;

    const style = this.styles.glyph;

    return (
      <i
        key={index}
        style={style}
        className={`fa
          fa-${glyph}
          fa-rotate-${rotate}
          fa-flip-${flip}
          ${spin ? 'fa-spin' : ''}`}
      />
    );
  }

  getGlyphAndText () {
    const text = this.props.text;
    const glyph = this.props.glyph;

    if (glyph) {
      if (text) {
        // Glyph followed by text.
        return [this.renderGlyph (0, glyph), this.renderText (1, text)];
      } else {
        // Glyph alone.
        return [this.renderGlyph (0, glyph)];
      }
    } else {
      // Text alone.
      return [this.renderText (0, text)];
    }
  }

  render () {
    const {state} = this.props;
    const disabled = this.props.disabled;
    const index = this.props.index;
    const tooltip = this.props.tooltip;
    const marquee = this.props.marquee;

    const style = this.styles.box;

    if (marquee === 'true') {
      return (
        <marquee
          key={index}
          onClick={this.props.onClick}
          disabled={disabled}
          style={style}
          title={tooltip}
        >
          {this.getGlyphAndText ()}
          {this.props.children}
        </marquee>
      );
    } else {
      return (
        <div
          key={index}
          onClick={this.props.onClick}
          disabled={disabled}
          style={style}
          title={tooltip}
        >
          {this.getGlyphAndText ()}
          {this.props.children}
        </div>
      );
    }
  }
}

/******************************************************************************/
export default Label;
