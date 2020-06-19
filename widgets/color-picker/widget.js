import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import * as styles from './styles';
import throttle from 'lodash/throttle';
import TextFieldTypedNC from 'goblin-gadgets/widgets/text-field-typed-nc/widget';
import Slider from 'goblin-gadgets/widgets/slider/widget';
import SliderXY from 'goblin-gadgets/widgets/slider-xy/widget';
import Label from 'goblin-gadgets/widgets/label/widget';
import Button from 'goblin-gadgets/widgets/button/widget';
import {ColorHelpers} from 'electrum-theme';
import colorManipulator from 'electrum-theme/lib/themes/color-manipulator';
import {color as ColorConverters} from 'xcraft-core-converters';
import T from 't';

/******************************************************************************/

export default class ColorPicked extends Widget {
  constructor() {
    super(...arguments);
    this.styles = styles;

    this.state = {
      analysis: {},
      modeHsl: 'xy',
    };

    this.initialColor = this.props.color;

    this.onColorChanged = throttle(this.onColorChanged, 50).bind(this);
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

  get modeHsl() {
    return this.state.modeHsl;
  }
  set modeHsl(value) {
    this.setState({
      modeHsl: value,
    });
  }
  //#endregion

  updateColor(color) {
    this.analysis = ColorConverters.analysisFromCanonical(color);
  }

  componentWillMount() {
    this.updateColor(this.props.color);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.color !== this.props.color) {
      this.updateColor(this.props.color);
    }
  }

  onColorChanged(key, value, send) {
    const analysis = {...this.analysis};
    analysis[key] = value;
    this.analysis = analysis;

    const canonical = ColorConverters.analysisToCanonical(analysis);
    if (this.props.onChange && send) {
      this.props.onChange(canonical);
    } else {
      this.updateColor(canonical);
    }
  }

  get mode() {
    return this.analysis ? this.analysis.mode : null;
  }

  /******************************************************************************/

  renderMode(name, tooltip, mode, modeHsl) {
    return (
      <Button
        border="none"
        width="60px"
        horizontalSpacing="overlap"
        text={name}
        tooltip={tooltip}
        active={
          this.mode === mode && (modeHsl === null || this.modeHsl === modeHsl)
        }
        onClick={() => {
          this.onColorChanged('mode', mode, true);
          if (modeHsl !== null) {
            this.modeHsl = modeHsl;
          }
        }}
      />
    );
  }

  renderModes() {
    const canonical = ColorConverters.analysisToCanonical(this.analysis);

    // prettier-ignore
    return (
      <div className={this.styles.classNames.modes}>
        {this.renderMode(T('TSL1'), T('Teinte Saturation Luminosité'), 'HSL', 'xy')}
        {this.renderMode(T('TSL2'), T('Teinte Saturation Luminosité'), 'HSL', 'x')}
        {this.renderMode(T('Gris'), T('Niveau de gris'), 'G', null)}
        {this.renderMode(T('RVB'), T('Rouge Vert Bleu'), 'RGB', null)}
        {this.renderMode(T('CMJ'), T('Cyan Magenta Jaune'), 'CMY', null)}
        <Label grow="1" />
        <Label text={canonical} wrap="no" fontSize="75%" />
      </div>
    );
  }

  renderComposant(label, sliderColor1, sliderColor2, key, range) {
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
        {this.renderComposant(T('R'), '#f00', '#f00', 'r', 255)}
        {this.renderComposant(T('V'), '#0f0', '#0f0', 'g', 255)}
        {this.renderComposant(T('B'), '#00f', '#00f', 'b', 255)}
      </div>
    );
  }

  renderComposantsCMY() {
    return (
      <div className={this.styles.classNames.composants}>
        {this.renderComposant(T('C'), '#0ff', '#0ff', 'c', 255)}
        {this.renderComposant(T('M'), '#f0f', '#f0f', 'm', 255)}
        {this.renderComposant(T('J'), '#ff0', '#ff0', 'y', 255)}
      </div>
    );
  }

  renderComposantsHSLxy() {
    const analysis = this.analysis;
    const t = ColorConverters.toRGB(`HSL(${analysis.h},100,100)`);

    return (
      <div className={this.styles.classNames.composantHsl}>
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
          value={(analysis.h * 100) / 360}
          gliderSize="large"
          cabSize="large"
          cabType="thin"
          gradient="rainbow"
          onChange={(value, send) =>
            this.onColorChanged('h', Math.round((value * 360) / 100), send)
          }
        />
        <Label width="20px" />
      </div>
    );
  }

  renderComposantsHSLx() {
    return (
      <div className={this.styles.classNames.composants}>
        {this.renderComposant(T('T°'), '#888', '#888', 'h', 360)}
        {this.renderComposant(T('S%'), '#fff', '#f00', 's', 100)}
        {this.renderComposant(T('L%'), '#000', '#f00', 'l', 100)}
      </div>
    );
  }

  renderComposantsHSL() {
    switch (this.modeHsl) {
      case 'xy':
        return this.renderComposantsHSLxy();
      case 'x':
        return this.renderComposantsHSLx();
      default:
        return null;
    }
  }

  renderComposantsGrey() {
    return (
      <div className={this.styles.classNames.composants}>
        {this.renderComposant(T('N'), '#fff', '#000', 'n', 255)}
      </div>
    );
  }

  renderComposants() {
    switch (this.mode) {
      case 'RGB':
        return this.renderComposantsRGB();
      case 'CMY':
        return this.renderComposantsCMY();
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

/******************************************************************************/
