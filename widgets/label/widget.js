import React from 'react';
import Widget from 'laboratory/widget';
import * as Bool from 'gadgets/boolean-helpers';
import ReactMarkdown from 'react-markdown';

/******************************************************************************/

class Label extends Widget {
  constructor () {
    super (...arguments);
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
    const className = fragment.em
      ? this.styles.classNames.hilitedFragment
      : this.styles.classNames.normalFragment;
    return (
      <span key={index} className={className}>
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
    const className = this.styles.classNames.text;
    return (
      <div key={index} className={className}>
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
    const className = this.styles.classNames.lines;
    return (
      <div key={index} className={className}>
        {this.getLines (lines)}
      </div>
    );
  }

  // Render a very simple text, that is to say a single line and without highlighting.
  renderSimpleText (index, text) {
    const className = this.styles.classNames.text;
    return (
      <div key={index} className={className}>
        {text}
      </div>
    );
  }

  renderText (index, text) {
    if (text !== null) {
      if (typeof text === 'string') {
        if (text.startsWith ('```') && text.endsWith ('```')) {
          const input = text.substring (3, text.length - 3);
          return <ReactMarkdown key={index} source={input} />;
        } else {
          const hasEol1 = text.indexOf ('\n') !== -1;
          const hasEol2 = text.indexOf ('\\n') !== -1;
          const hasBr = text.indexOf ('<br/>') !== -1;
          const hasEm = text.indexOf ('<em>') !== -1;
          if (hasEol1 || hasEol2 || hasBr || hasEm) {
            // complex text ?
            const lines = text.split (hasBr ? '<br/>' : hasEol1 ? '\n' : '\\n');
            if (Bool.isTrue (this.props.singleLine)) {
              const line = lines.join (', ');
              return this.renderSimpleText (index, line);
            } else {
              return this.renderLines (index, lines);
            }
          } else {
            return this.renderSimpleText (index, text);
          }
        }
      } else {
        return this.renderSimpleText (index, text);
      }
    } else {
      return null;
    }
  }

  renderGlyph (index, glyph) {
    const parts = glyph.split ('/');
    let prefix = '';
    if (parts.length === 2) {
      // prefix:
      // 'brands'  -> 'b'
      // 'solid'   -> 's'
      // 'regular' -> 'r'
      // 'light'   -> 'l'
      prefix = parts[0][0];
      glyph = parts[1];
    } else {
      console.warn (`Glyph without prefix '${glyph}'`);
    }

    const glyphClass = this.styles.classNames.glyph;

    return (
      <i
        key={index}
        className={`${glyphClass} fa${prefix}
          fa-${glyph}
          fa-rotate-${this.props.glyphRotate}
          fa-flip-${this.props.glyphFlip}
          ${this.props.glyphSpin ? 'fa-spin' : ''}`}
      />
    );
  }

  renderGlyphAndText () {
    if (this.props.glyph) {
      if (this.props.text) {
        // Glyph followed by text.
        if (this.props.glyphPosition === 'right') {
          return [
            this.renderText (0, this.props.text),
            this.renderGlyph (1, this.props.glyph),
          ];
        } else {
          return [
            this.renderGlyph (0, this.props.glyph),
            this.renderText (1, this.props.text),
          ];
        }
      } else {
        // Glyph alone.
        return [this.renderGlyph (0, this.props.glyph)];
      }
    } else {
      // Text alone.
      return [this.renderText (0, this.props.text)];
    }
  }

  render () {
    if (Bool.isFalse (this.props.show)) {
      return null;
    }

    const boxClass = this.styles.classNames.box;

    if (Bool.isTrue (this.props.insideButton)) {
      return (
        <div
          className={boxClass}
          key={this.props.index}
          disabled={this.props.disabled}
          title={this.props.tooltip}
        >
          {this.renderGlyphAndText ()}
        </div>
      );
    } else {
      return (
        <div
          className={boxClass}
          key={this.props.index}
          onClick={this.props.onClick}
          disabled={this.props.disabled}
          title={this.props.tooltip}
        >
          {this.renderGlyphAndText ()}
          {this.props.children}
        </div>
      );
    }
  }
}

/******************************************************************************/
export default Label;
