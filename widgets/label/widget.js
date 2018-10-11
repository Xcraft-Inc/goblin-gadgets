import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import Widget from 'laboratory/widget';
import T from 'nabu/t/widget';
import {ColorHelpers} from 'electrum-theme';
const Bool = require('gadgets/helpers/bool-helpers');
const Tooltip = require('gadgets/helpers/tooltip-helpers');
import ReactMarkdown from 'react-markdown';

/******************************************************************************/

class Label extends Widget {
  constructor() {
    super(...arguments);
  }

  static get wiring() {
    return {
      id: 'id',
      kind: 'kind',
      text: 'text',
      glyph: 'glyph',
    };
  }

  componentDidMount() {
    super.componentDidMount();
  }

  setText(text) {
    this.do('text', {text});
  }

  setKind(kind) {
    this.do('kind', {kind});
  }

  // Splits 'abc<em>def</em>ghi' into three parts.
  // Splits 'abc`def`ghi' into three parts.
  getFragments(line) {
    const result = [];
    var i = 0;
    var j = 0;
    var em = false; // outside <em></em>
    while (i < line.length) {
      if (line[i] === '<') {
        // start of tag ?
        const last = line.substring(i);
        if (last.startsWith('<em>')) {
          if (j < i) {
            result.push({em: em, text: line.substring(j, i)});
          }
          em = true; // inside <em></em>
          i += 4; // skip <em>
          j = i;
        } else if (last.startsWith('</em>')) {
          if (j < i) {
            result.push({em: em, text: line.substring(j, i)});
          }
          em = false; // outside <em></em>
          i += 5; // skip </em>
          j = i;
        } else {
          i++;
        }
      } else if (line[i] === '`') {
        result.push({em: em, text: line.substring(j, i)});
        i++; // skip back-tick
        j = i;
        em = !em;
      } else {
        i++;
      }
    }
    if (j < i) {
      result.push({em: em, text: line.substring(j, i)});
    }
    return result;
  }

  // Render a fragment with normal or hilited style.
  renderFragment(index, fragment) {
    const className = fragment.em
      ? this.styles.classNames.hilitedFragment
      : this.styles.classNames.normalFragment;
    return <T msgid={fragment.text} key={index} className={className} />;
  }

  // Render all fragments of a line.
  renderFragments(line) {
    const result = [];
    const fragments = this.getFragments(line);
    if (fragments.length === 0) {
      result.push(this.renderFragment(0, {em: false, text: ' '})); // U+2001 cadratin
    } else {
      let index = 0;
      for (var fragment of fragments) {
        result.push(this.renderFragment(index++, fragment));
      }
    }
    return result;
  }

  renderLine(index, line) {
    const className = this.styles.classNames.text;
    return (
      <div key={index} className={className}>
        {this.renderFragments(line)}
      </div>
    );
  }

  getLines(lines) {
    const array = [];
    let index = 0;
    for (var line of lines) {
      if (this.props.maxLines && index >= this.props.maxLines) {
        break;
      }
      if (Bool.isTrue(this.props.skipEmptyLines) && line === '') {
        continue;
      }
      array.push(this.renderLine(index++, line));
    }
    return array;
  }

  renderLines(index, lines) {
    const className = this.styles.classNames.lines;
    return (
      <div key={index} className={className}>
        {this.getLines(lines)}
      </div>
    );
  }

  // Render a very simple text, that is to say a single line and without highlighting.
  renderSimpleText(index, text) {
    const className = this.styles.classNames.text;
    return <T msgid={text} key={index} className={className} />;
  }

  renderText(index, text) {
    if (text !== null) {
      if (typeof text === 'string') {
        if (text.startsWith('```') && text.endsWith('```')) {
          const input = text.substring(3, text.length - 3);
          return <ReactMarkdown key={index} source={input} />;
        } else {
          const hasEol1 = text.includes('\n');
          const hasEol2 = text.includes('\\n');
          const hasBr = text.includes('<br/>');
          const hasEm = text.includes('<em>');
          const hasBt = text.includes('`'); // has back tick?
          if (hasEol1 || hasEol2 || hasBr || hasEm || hasBt) {
            // complex text ?
            const lines = text.split(hasBr ? '<br/>' : hasEol1 ? '\n' : '\\n');
            if (Bool.isTrue(this.props.singleLine)) {
              const line = lines.join(', ');
              return this.renderSimpleText(index, line);
            } else {
              return this.renderLines(index, lines);
            }
          } else {
            return this.renderSimpleText(index, text);
          }
        }
      } else {
        return this.renderSimpleText(index, text);
      }
    } else {
      return null;
    }
  }

  renderGlyph(index, glyph) {
    const glyphClass = this.styles.classNames.glyph;
    let glyphStyle = null;

    if (typeof glyph === 'object' && glyph.glyph) {
      // Accept map in property glyph. By example:
      // <Label glyph={{glyph: 'toto': color: 'red'}} />
      if (glyph.color) {
        const color = ColorHelpers.getMarkColor(
          this.context.theme,
          glyph.color
        );
        glyphStyle = {color};
      }
      glyph = glyph.glyph;
    }

    if (glyph === 'solid/none') {
      return <div key={index} className={glyphClass} />;
    }

    const parts = glyph.split('/');
    let prefix = '';
    if (parts.length === 2) {
      // prefix:
      // 'solid'   -> 's' -> fas (standard)
      // 'regular' -> 'r' -> far (outline)
      // 'light'   -> 'l' -> fal
      // 'brands'  -> 'b' -> fab
      if (
        parts[0] !== 'solid' &&
        parts[0] !== 'regular' &&
        parts[0] !== 'light' &&
        parts[0] !== 'brands'
      ) {
        console.error(`Glyph '${parts[1]}' has unknown prefix '${parts[0]}'`);
      }
      prefix = parts[0][0]; // first letter
      glyph = parts[1];
    } else {
      console.warn(`Glyph '${glyph}' without prefix`);
    }

    return (
      <div key={index} className={glyphClass} style={glyphStyle}>
        <FontAwesomeIcon
          icon={[`fa${prefix}`, glyph]}
          rotate={this.props.glyphRotate}
          flip={this.props.glyphFlip}
          spin={this.props.glyphSpin}
        />
      </div>
    );
  }

  renderGlyphAndText() {
    const glyph = this.props.getGlyph
      ? this.props.getGlyph(this.props)
      : this.props.glyph;
    const text = this.props.getText
      ? this.props.getText(this.props)
      : this.props.text;

    if (glyph) {
      if (text) {
        // Glyph followed by text.
        if (this.props.glyphPosition === 'right') {
          return [this.renderText(0, text), this.renderGlyph(1, glyph)];
        } else {
          return [this.renderGlyph(0, glyph), this.renderText(1, text)];
        }
      } else {
        // Glyph alone.
        return [this.renderGlyph(0, glyph)];
      }
    } else {
      // Text alone.
      return [this.renderText(0, text)];
    }
  }

  render() {
    if (Bool.isFalse(this.props.show)) {
      return null;
    }

    const boxClass = this.styles.classNames.box;

    if (Bool.isTrue(this.props.insideButton)) {
      return (
        <div
          className={boxClass}
          key={this.props.index}
          disabled={this.props.disabled}
          title={Tooltip.prepare(this.props.tooltip)}
        >
          {this.renderGlyphAndText()}
        </div>
      );
    } else {
      return (
        <div
          className={boxClass}
          key={this.props.index}
          onClick={this.props.onClick}
          disabled={this.props.disabled}
          title={Tooltip.prepare(this.props.tooltip)}
        >
          {this.renderGlyphAndText()}
          {this.props.children}
        </div>
      );
    }
  }
}

/******************************************************************************/
export default Label;
