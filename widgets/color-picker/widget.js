import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import * as styles from './styles';
import throttle from 'lodash/throttle';
import TextFieldTypedNC from 'goblin-gadgets/widgets/text-field-typed-nc/widget';
import Slider from 'goblin-gadgets/widgets/slider/widget';
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
    };

    this.onColorChanged = throttle(this.onColorChanged, 100).bind(this);
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

  onColorChanged(key, value) {
    const analysis = {...this.analysis};
    analysis[key] = value;
    this.analysis = analysis;

    const canonical = ColorConverters.analysisToCanonical(analysis);
    if (this.props.onChange) {
      this.props.onChange(canonical);
    } else {
      this.updateColor(canonical);
    }
  }

  get mode() {
    return this.analysis ? this.analysis.mode : null;
  }

  /******************************************************************************/

  renderMode(name, tooltip, mode) {
    return (
      <Button
        border="none"
        width="65px"
        horizontalSpacing="overlap"
        text={name}
        tooltip={tooltip}
        active={this.mode === mode}
        onClick={() => this.onColorChanged('mode', mode)}
      />
    );
  }

  renderModes() {
    const canonical = ColorConverters.analysisToCanonical(this.analysis);

    return (
      <div className={this.styles.classNames.modes}>
        {this.renderMode(T('Teinte'), T('Teinte Saturation Luminosité'), 'HSL')}
        {this.renderMode(T('Gris'), T('Niveau de gris'), 'G')}
        {this.renderMode(T('RVB'), T('Rouge Vert Bleu'), 'RGB')}
        {this.renderMode(T('CMJ'), T('Cyan Magenta Jaune'), 'CMY')}
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
          onChange={(value) => this.onColorChanged(key, value)}
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
          onChange={(value) =>
            this.onColorChanged(key, Math.round((value * range) / 100))
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

  renderComposantsHSL() {
    return (
      <div className={this.styles.classNames.composants}>
        {this.renderComposant(T('T°'), '#888', '#888', 'h', 360)}
        {this.renderComposant(T('S%'), '#fff', '#f00', 's', 100)}
        {this.renderComposant(T('L%'), '#000', '#f00', 'l', 100)}
      </div>
    );
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

  renderSample() {
    if (!this.analysis) {
      return null;
    }

    const canonical = ColorConverters.analysisToCanonical(this.analysis);
    const color = ColorConverters.toRGB(canonical);

    const style = {
      backgroundColor: color,
    };

    return <div className={this.styles.classNames.sample} style={style}></div>;
  }

  render() {
    return (
      <div className={this.styles.classNames.colorPicker}>
        {this.renderModes()}
        <div className={this.styles.classNames.content}>
          {this.renderComposants()}
          {this.renderSample()}
        </div>
      </div>
    );
  }
}

/******************************************************************************/
