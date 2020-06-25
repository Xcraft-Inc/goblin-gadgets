import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import * as styles from './styles';
import throttle from 'lodash/throttle';
import TextFieldTypedNC from 'goblin-gadgets/widgets/text-field-typed-nc/widget';
import TextInputInfoNC from 'goblin-gadgets/widgets/text-input-info-nc/widget';
import Slider from 'goblin-gadgets/widgets/slider/widget';
import SliderXY from 'goblin-gadgets/widgets/slider-xy/widget';
import SliderCircle from 'goblin-gadgets/widgets/slider-circle/widget';
import Label from 'goblin-gadgets/widgets/label/widget';
import Button from 'goblin-gadgets/widgets/button/widget';
import {color as ColorConverters} from 'xcraft-core-converters';
import T from 't';
import {TranslatableDiv} from 'nabu/helpers/element-helpers';
import MouseTrap from 'mousetrap';

/******************************************************************************/

class ColorPicker extends Widget {
  constructor() {
    super(...arguments);
    this.styles = styles;

    // Warning: initialColor and lastColorsDisplayed are never changed for
    // this instance of ColorPicker.
    this.initialColor = this.props.color;
    this.lastColorsDisplayed = [...this.props.lastColors];
    this.alreadyPushed = false;

    this.state = {
      analysis: {},
      editedColor: null,
      info: null,
      warning: null,
      lastColors: this.props.lastColors,
    };

    this.onColorChanged = throttle(this.onColorChanged, 50).bind(this);
    this.onTextEdited = this.onTextEdited.bind(this);
    this.onTextChanged = this.onTextChanged.bind(this);
    this.onTextValidate = this.onTextValidate.bind(this);
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

  get info() {
    return this.state.info;
  }
  set info(value) {
    this.setState({
      info: value,
    });
  }

  get warning() {
    return this.state.warning;
  }
  set warning(value) {
    this.setState({
      warning: value,
    });
  }

  get lastColors() {
    return this.state.lastColors;
  }
  set lastColors(value) {
    this.setState({
      lastColors: value,
    });
  }
  //#endregion

  updateColor(color) {
    this.analysis = ColorConverters.analysisFromCanonical(color);
    this.editedColor = color;
  }

  componentWillMount() {
    this.updateColor(this.props.color);
    MouseTrap.bind('return', this.onTextValidate);
  }

  componentWillUnmount() {
    super.componentWillUnmount();
    MouseTrap.unbind('return', this.onTextValidate);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.color !== this.props.color) {
      this.updateColor(this.props.color);
    }
  }

  pushColor(color) {
    const lastColors = [...this.lastColors];
    if (this.alreadyPushed) {
      // A color has already been pushed. Update it.
      lastColors[lastColors.length - 1] = color;
    } else {
      // Add color at the end.
      lastColors.push(color);
      // Remove excess colors if there are any.
      // Keeps much more than 8 colors, because of the duplicates
      // that are ignored when displayed.
      if (lastColors.length > 100) {
        lastColors.splice(0, 1);
      }
      this.alreadyPushed = true;
    }
    this.lastColors = lastColors;

    this.doFor(this.props.clientSessionId, 'set-last-colors-picker', {
      splitterId: this.props.id,
      state: lastColors,
    });
  }

  changeColor(canonical, send) {
    this.updateColor(canonical);

    if (this.props.onChange && send) {
      this.props.onChange(canonical);
    }

    if (send) {
      this.pushColor(canonical);
    }

    this.info = null;
    this.warning = null;
  }

  onColorChanged(key, value, send) {
    const analysis = {...this.analysis};
    analysis[key] = value;
    this.analysis = analysis;

    const canonical = ColorConverters.analysisToCanonical(analysis);
    this.changeColor(canonical, send);
  }

  parseEditedValue(value) {
    const {value: parsedValue, error} = ColorConverters.parseEdited(value);
    const finalValue = ColorConverters.getDisplayed(parsedValue);
    let info = null;
    if (finalValue !== value) {
      info = finalValue;
    }
    return {
      info,
      warning: error,
      canonical: parsedValue,
    };
  }

  onTextEdited(value) {
    const p = this.parseEditedValue(value);
    this.info = p.info;
    this.warning = p.warning;
    this.editedColor = value;
  }

  onTextChanged(value) {
    const p = this.parseEditedValue(value);
    this.info = p.info;
    this.warning = p.warning;

    if (p.warning === null) {
      this.changeColor(p.canonical, true);
    }
  }

  onTextValidate() {
    this.changeColor(this.editedColor, true);
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
    return (
      <div className={this.styles.classNames.modes}>
        {this.renderMode(
          'solid/palette',
          T('Teinte Saturation Luminosité'),
          'HSL'
        )}
        {this.renderMode('solid/sliders-h', T('Rouge Vert Bleu'), 'RGB')}
        {this.renderMode('solid/print', T('Cyan Magenta Jaune Noir'), 'CMYK')}
        {this.renderMode('solid/sun', T('Niveau de gris'), 'G')}
        <Label width="20px" />
        <TextInputInfoNC
          value={this.editedColor}
          info={this.info}
          warning={this.warning}
          wrong={!!this.warning}
          grow="1"
          horizontalSpacing="overlap"
          onChange={this.onTextEdited}
          onBlur={this.onTextChanged}
        />
        <Button
          glyph="solid/eye-dropper"
          tooltip={T('Colle la couleur contenue dans le bloc-notes')}
          onClick={this.onPaste}
        />
      </div>
    );
  }

  renderComposant(label, tooltip, sliderColor1, sliderColor2, key, range) {
    const analysis = this.analysis;
    const value = analysis ? analysis[key] : null;
    const hasSlider = sliderColor1 && sliderColor2;

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
        {hasSlider ? (
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
        ) : null}
        {hasSlider ? <Label width="10px" /> : null}
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
      <div className={this.styles.classNames.composantHslNew}>
        <div className={this.styles.classNames.composantHslFields}>
          {this.renderComposant(
            T('T'),
            T('Teinte (de 0 à 360)'),
            null,
            null,
            'h',
            360
          )}
          {this.renderComposant(
            T('S'),
            T('Saturation (de 0 à 100)'),
            null,
            null,
            's',
            100
          )}
          {this.renderComposant(
            T('L'),
            T('Luminosité (de 0 à 100)'),
            null,
            null,
            'l',
            100
          )}
        </div>
        <div className={this.styles.classNames.composantHslSliders}>
          <div className={this.styles.classNames.composantHslCircle}>
            <SliderCircle
              width="214px"
              height="214px"
              gliderSize="default"
              cabSize="default"
              value={analysis.h}
              onChange={(a, send) =>
                this.onColorChanged('h', Math.round(a), send)
              }
            />
          </div>
          <div className={this.styles.classNames.composantHslSquare}>
            <SliderXY
              width="126px"
              height="126px"
              cabSize="default"
              marginSize="small"
              marginStyle="none"
              draggingScale={2}
              hue={t}
              valueX={analysis.s}
              valueY={analysis.l}
              onChange={(x, y, send) => {
                this.onColorChanged('s', Math.round(x), send);
                this.onColorChanged('l', Math.round(y), send);
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  renderComposantsHSL_OLD() {
    const analysis = this.analysis;
    const t = ColorConverters.toRGB(`HSL(${analysis.h},100,100)`);

    return (
      <div className={this.styles.classNames.composantHsl}>
        <div className={this.styles.classNames.composantHsl1}>
          <Label width="44px" />
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
            tooltip={T('Saturation')}
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
            tooltip={T('Teinte')}
            onChange={(value, send) =>
              this.onColorChanged('h', Math.round((value * 360) / 100), send)
            }
          />
          <Label width="20px" />
          <SliderXY
            width="170px"
            height="170px"
            hue={t}
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
            tooltip={T('Luminosité')}
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

    const fc = (color) =>
      ColorConverters.getLuminance(color) < 0.5 ? 'white' : 'black';

    const styleUp = {
      backgroundColor: colorUp,
      color: fc(this.initialColor),
    };

    const styleDown = {
      backgroundColor: colorDown,
      color: fc(canonical),
    };

    return (
      <div className={this.styles.classNames.samples}>
        <TranslatableDiv
          className={this.styles.classNames.sampleUp}
          style={styleUp}
          title={T('Remet la couleur initiale')}
          onClick={() => this.changeColor(this.initialColor, true)}
        >
          {this.initialColor === canonical ? null : this.initialColor}
        </TranslatableDiv>
        <TranslatableDiv
          className={this.styles.classNames.sampleDown}
          style={styleDown}
          title={T('Couleur choisie')}
        >
          {this.initialColor === canonical ? null : canonical}
        </TranslatableDiv>
      </div>
    );
  }

  renderLastColor(color, index) {
    const style = {
      backgroundColor: ColorConverters.toRGB(color),
    };

    return (
      <div
        key={index}
        className={this.styles.classNames.lastColor}
        style={style}
        title={color}
        onClick={() => this.changeColor(color, true)}
      />
    );
  }

  renderColorsSet(colorsSet) {
    const result = [];
    let index = 0;
    colorsSet.forEach((color) =>
      result.push(this.renderLastColor(color, index++))
    );
    return result;
  }

  renderLastColors() {
    if (!this.analysis) {
      return null;
    }

    // Build the table set of the 8 most recent colors, removing duplicates.
    const colorsSet = new Set();
    for (let i = this.lastColorsDisplayed.length - 1; i >= 0; i--) {
      const color = this.lastColorsDisplayed[i];
      colorsSet.add(color);
      if (colorsSet.size >= 8) {
        break;
      }
    }

    return (
      <div className={this.styles.classNames.lastColors}>
        {this.renderColorsSet(colorsSet)}
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
          {this.renderLastColors()}
        </div>
      </div>
    );
  }
}
/******************************************************************************/

export default Widget.connect((state) => {
  const userSession = Widget.getUserSession(state);
  const clientSessionId = userSession.get('id');
  const lastColors = userSession.get('lastColorsPicker') || [];

  return {clientSessionId, lastColors};
})(ColorPicker);
