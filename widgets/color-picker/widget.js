import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import * as styles from './styles';
import throttle from 'lodash/throttle';
import TextFieldTypedNC from 'goblin-gadgets/widgets/text-field-typed-nc/widget';
import TextInputNC from 'goblin-gadgets/widgets/text-input-nc/widget';
import Slider from 'goblin-gadgets/widgets/slider/widget';
import SliderXY from 'goblin-gadgets/widgets/slider-xy/widget';
import Label from 'goblin-gadgets/widgets/label/widget';
import Button from 'goblin-gadgets/widgets/button/widget';
import {ColorHelpers} from 'electrum-theme';
import colorManipulator from 'electrum-theme/lib/themes/color-manipulator';
import {color as ColorConverters} from 'xcraft-core-converters';
import T from 't';

/******************************************************************************/

export default class ColorPicker extends Widget {
  constructor() {
    super(...arguments);
    this.styles = styles;

    this.state = {
      analysis: {},
      editedColor: null,
    };

    this.initialColor = this.props.color;

    this.onColorChanged = throttle(this.onColorChanged, 50).bind(this);
    this.onTextEdited = this.onTextEdited.bind(this);
    this.onTextChanged = this.onTextChanged.bind(this);
    this.onPaste = this.onPaste.bind(this);
  }

  //#region get/set
  get analysis() {
    return this.state.analysis;
  }
  set analysis(value) {
    this.setState({
      analysis: value,
    });
  }

  get editedColor() {
    return this.state.editedColor;
  }
  set editedColor(value) {
    this.setState({
      editedColor: value,
    });
  }
  //#endregion

  updateColor(color) {
    this.analysis = ColorConverters.analysisFromCanonical(color);
    this.editedColor = color;
  }

  componentWillMount() {
    this.updateColor(this.props.color);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.color !== this.props.color) {
      this.updateColor(this.props.color);
    }
  }

  changeColor(canonical, send) {
    this.updateColor(canonical);

    if (this.props.onChange && send) {
      this.props.onChange(canonical);
    }
  }

  onColorChanged(key, value, send) {
    const analysis = {...this.analysis};
    analysis[key] = value;
    this.analysis = analysis;

    const canonical = ColorConverters.analysisToCanonical(analysis);
    this.changeColor(canonical, send);
  }

  onTextEdited(text) {
    this.editedColor = text;
  }

  onTextChanged(text) {
    const result = ColorConverters.parseEdited(text);
    if (result.error === null) {
      this.changeColor(result.value, true);
    }
  }

  onPaste() {
    navigator.clipboard
      .readText()
      .then((text) => {
        if (text && !text.startsWith('#')) {
          text = '#' + text;
        }
        const result = ColorConverters.parseEdited(text);
        if (result.error === null) {
          this.changeColor(result.value, true);
        }
      })
      .catch((err) => {
        console.error('Failed to read clipboard contents: ', err);
      });
  }

  get mode() {
    return this.analysis ? this.analysis.mode : null;
  }

  /******************************************************************************/

  renderMode(glyph, tooltip, mode) {
    return (
      <Button
        border="none"
        horizontalSpacing="overlap"
        glyph={glyph}
        tooltip={tooltip}
        active={this.mode === mode}
        onClick={() => this.onColorChanged('mode', mode, true)}
      />
    );
  }

  renderModes() {
    //? const canonical = ColorConverters.analysisToCanonical(this.analysis);

    // prettier-ignore
    return (
      <div className={this.styles.classNames.modes}>
        {this.renderMode("solid/palette",   T('Teinte Saturation Luminosité'), 'HSL' )}
        {this.renderMode("solid/sliders-h", T('Rouge Vert Bleu'),              'RGB' )}
        {this.renderMode("solid/print",     T('Cyan Magenta Jaune Noir'),      'CMYK')}
        {this.renderMode("solid/sun",       T('Niveau de gris'),               'G'   )}
        <Label width="20px" />
        <TextInputNC value={this.editedColor} grow="1" horizontalSpacing="overlap" onChange={this.onTextEdited} onBlur={this.onTextChanged} />
        <Button glyph="solid/eye-dropper" tooltip={T("Colle la couleur contenue dans le bloc-notes")} onClick={this.onPaste}/>
      </div>
    );
  }

  renderComposant(label, tooltip, sliderColor1, sliderColor2, key, range) {
    const analysis = this.analysis;
    const value = analysis ? analysis[key] : null;

    let gliderSize = 'default';
    let cabSize = 'default';
    let cabType = 'round';
    let gradient = '1to2';
    if (key === 'h') {
      gliderSize = 'large';
      cabSize = 'large';
      cabType = 'thin';
      gradient = 'rainbow';
    } else if (key === 's' || key === 'l') {
      gliderSize = 'large';
      cabSize = 'large';
      sliderColor2 = ColorConverters.toRGB(`HSL(${analysis.h},100,100)`);
    } else if (key === 'n') {
      gliderSize = 'large';
    }

    return (
      <div className={this.styles.classNames.composant}>
        <TextFieldTypedNC
          width="50px"
          tooltip={tooltip}
          type="integer"
          min={0}
          max={range}
          value={value}
          onChange={(value) => this.onColorChanged(key, value, true)}
        />
        <Label width="10px" />
        <Slider
          direction="horizontal"
          grow="1"
          value={(value * 100) / range}
          gliderSize={gliderSize}
          cabSize={cabSize}
          cabType={cabType}
          gradient={gradient}
          gradientColor1={sliderColor1}
          gradientColor2={sliderColor2}
          onChange={(value, send) =>
            this.onColorChanged(key, Math.round((value * range) / 100), send)
          }
        />
        <Label width="10px" />
      </div>
    );
  }

  renderComposantsRGB() {
    return (
      <div className={this.styles.classNames.composants}>
        {this.renderComposant(
          T('R'),
          T('Rouge (de 0 à 255)'),
          '#f00',
          '#f00',
          'r',
          255
        )}
        {this.renderComposant(
          T('V'),
          T('Vert (de 0 à 255)'),
          '#0f0',
          '#0f0',
          'g',
          255
        )}
        {this.renderComposant(
          T('B'),
          T('Bleu (de 0 à 255)'),
          '#00f',
          '#00f',
          'b',
          255
        )}
      </div>
    );
  }

  renderComposantsCMYK() {
    return (
      <div className={this.styles.classNames.composants}>
        {this.renderComposant(
          T('C'),
          T('Cyan (de 0 à 100)'),
          '#0ff',
          '#0ff',
          'c',
          100
        )}
        {this.renderComposant(
          T('M'),
          T('Magenta (de 0 à 100)'),
          '#f0f',
          '#f0f',
          'm',
          100
        )}
        {this.renderComposant(
          T('J'),
          T('Jaune (de 0 à 100)'),
          '#ff0',
          '#ff0',
          'y',
          100
        )}
        {this.renderComposant(
          T('N'),
          T('Noir (de 0 à 100)'),
          '#000',
          '#000',
          'k',
          100,
          false
        )}
      </div>
    );
  }

  renderComposantsHSL() {
    const analysis = this.analysis;
    const t = ColorConverters.toRGB(`HSL(${analysis.h},100,100)`);

    return (
      <div className={this.styles.classNames.composantHsl}>
        <div className={this.styles.classNames.composantHsl1}>
          <Label width="64px" />
          <Slider
            direction="horizontal"
            width="170px"
            value={analysis.s}
            gliderSize="large"
            cabSize="large"
            cabType="thin"
            gradient="1to2"
            gradientColor1="#fff"
            gradientColor2={t}
            onChange={(value, send) =>
              this.onColorChanged('s', Math.round(value), send)
            }
          />
        </div>
        <div className={this.styles.classNames.composantHsl2}>
          <Slider
            direction="vertical"
            height="170px"
            value={(analysis.h * 100) / 360}
            gliderSize="large"
            cabSize="large"
            cabType="thin"
            gradient="rainbow"
            onChange={(value, send) =>
              this.onColorChanged('h', Math.round((value * 360) / 100), send)
            }
          />
          <Label width="40px" />
          <SliderXY
            width="170px"
            height="170px"
            gradientColorUL="#ffffff"
            gradientColorUR={t}
            gradientColorDL="#000000"
            gradientColorDR="#000000"
            valueX={analysis.s}
            valueY={analysis.l}
            onChange={(x, y, send) => {
              this.onColorChanged('s', Math.round(x), send);
              this.onColorChanged('l', Math.round(y), send);
            }}
          />
          <Label width="20px" />
          <Slider
            direction="vertical"
            height="170px"
            value={analysis.l}
            gliderSize="large"
            cabSize="large"
            cabType="thin"
            gradient="1to2"
            gradientColor1="#000"
            gradientColor2={t}
            onChange={(value, send) =>
              this.onColorChanged('l', Math.round(value), send)
            }
          />
          <Label width="20px" />
        </div>
      </div>
    );
  }

  renderComposantsGrey() {
    return (
      <div className={this.styles.classNames.composants}>
        {this.renderComposant(
          T('N'),
          T('Niveau de gris (de 0 à 100)'),
          '#fff',
          '#000',
          'n',
          100
        )}
      </div>
    );
  }

  renderComposants() {
    switch (this.mode) {
      case 'RGB':
        return this.renderComposantsRGB();
      case 'CMYK':
        return this.renderComposantsCMYK();
      case 'HSL':
        return this.renderComposantsHSL();
      case 'G':
        return this.renderComposantsGrey();
      default:
        return null;
    }
  }

  renderSamples() {
    if (!this.analysis) {
      return null;
    }

    const colorUp = ColorConverters.toRGB(this.initialColor);

    const canonical = ColorConverters.analysisToCanonical(this.analysis);
    const colorDown = ColorConverters.toRGB(canonical);

    const styleUp = {
      backgroundColor: colorUp,
    };

    const styleDown = {
      backgroundColor: colorDown,
    };

    return (
      <div className={this.styles.classNames.samples}>
        <div className={this.styles.classNames.sampleUp} style={styleUp} />
        <div className={this.styles.classNames.sampleDown} style={styleDown} />
      </div>
    );
  }

  render() {
    return (
      <div className={this.styles.classNames.colorPicker}>
        {this.renderModes()}
        <div className={this.styles.classNames.content}>
          {this.renderComposants()}
          {this.renderSamples()}
        </div>
      </div>
    );
  }
}
