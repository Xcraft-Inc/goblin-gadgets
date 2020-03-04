import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import {ColorHelpers} from 'electrum-theme';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import T from 'nabu/t/widget';
import * as styles from './styles';

/******************************************************************************/

export default class RetroIlluminatedButton extends Widget {
  constructor() {
    super(...arguments);
    this.styles = styles;
  }

  renderGlyph(glyph) {
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
      return <div className={glyphClass} />;
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
      <div className={glyphClass} style={glyphStyle}>
        <FontAwesomeIcon
          icon={[`fa${prefix}`, glyph]}
          rotate={this.props.glyphRotate}
          flip={this.props.glyphFlip}
          spin={this.props.glyphSpin}
        />
      </div>
    );
  }

  renderText(text) {
    return (
      <T
        msgid={text}
        className={this.styles.classNames.text}
        textcolor={this.props.textColor}
      />
    );
  }

  renderQueue() {
    if (this.props.queue !== 'bottom') {
      return null;
    }

    return <div className={this.styles.classNames.queue} />;
  }

  render() {
    let glyphColor = this.props.color;
    if (glyphColor) {
      glyphColor = ColorHelpers.getMarkColor(this.context.theme, glyphColor);
    }

    return (
      <div className={this.styles.classNames.illuminatedButton}>
        {this.renderQueue(this.props.text)}
        <div
          className={this.styles.classNames.button}
          onClick={this.props.onClick}
        >
          {this.renderGlyph(this.props.glyph)}
          {this.renderText(this.props.text)}
          <div className={`lens-hover ${this.styles.classNames.buttonLens}`} />
        </div>
      </div>
    );
  }
}

/******************************************************************************/
