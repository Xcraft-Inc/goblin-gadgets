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

  /******************************************************************************/

  renderMode(name, tooltip, mode) {
    return (
      <Button
        border="none"
        width="65px"
        horizontalSpacing="overlap"
        text={name}
        tooltip={tooltip}
        active={this.analysis.mode === mode}
        onClick={() => this.onColorChanged('mode', mode)}
      />
    );
  }

  renderModes() {
    const canonical = ColorConverters.analysisToCanonical(this.analysis);

    return (
      <div className={this.styles.classNames.modes}>
        {this.renderMode(T('Teinte'), T('Teinte Saturation Luminosité'), 'HSL')}
        {this.renderMode(T('Gris'), T('Niveaux de gris'), 'G')}
        {this.renderMode(T('RVB'), T('Rouge Vert Bleu'), 'RGB')}
        {this.renderMode(T('CMJ'), T('Cyan Magenta Jaune'), 'CMY')}
        <Label grow="1" />
        <Label text={canonical} wrap="no" fontSize="75%" />
      </div>
    );
  }

  renderComposant(label, sliderColor, key, range) {
    const analysis = this.analysis;
    const value = analysis ? analysis[key] : null;

    return (
      <div className={this.styles.classNames.composant}>
        <Label width="35px" justify="end" wrap="no" text={label} />
        <Label width="5px" />
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
          color={sliderColor}
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
        {this.renderComposant(T('R'), '#f00', 'r', 255)}
        {this.renderComposant(T('V'), '#0f0', 'g', 255)}
        {this.renderComposant(T('B'), '#00f', 'b', 255)}
      </div>
    );
  }

  renderComposantsCMY() {
    return (
      <div className={this.styles.classNames.composants}>
        {this.renderComposant(T('C'), '#0ff', 'c', 255)}
        {this.renderComposant(T('M'), '#f0f', 'm', 255)}
        {this.renderComposant(T('J'), '#ff0', 'y', 255)}
      </div>
    );
  }

  renderComposantsHSL() {
    return (
      <div className={this.styles.classNames.composants}>
        {this.renderComposant(T('T°'), '#888', 'h', 360)}
        {this.renderComposant(T('S%'), '#fff', 's', 100)}
        {this.renderComposant(T('L%'), '#000', 'l', 100)}
      </div>
    );
  }

  renderComposantsGrey() {
    return (
      <div className={this.styles.classNames.composants}>
        {this.renderComposant(T('N'), '#888', 'n', 255)}
      </div>
    );
  }

  renderComposants() {
    switch (this.analysis.mode) {
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
