import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import * as styles from './styles';
import throttle from 'lodash/throttle';
import TextFieldTypedNC from 'goblin-gadgets/widgets/text-field-typed-nc/widget';
import Slider from 'goblin-gadgets/widgets/slider/widget';
import Label from 'goblin-gadgets/widgets/label/widget';
import Button from 'goblin-gadgets/widgets/button/widget';
import {ColorHelpers} from 'electrum-theme';
import T from 't';

/******************************************************************************/

// Converts an RGB color value to HSL. Conversion formula
// adapted from http://en.wikipedia.org/wiki/HSL_color_space.
// Assumes r, g, and b are contained in the set [0, 255] and
// returns h, s, and l in the set [0, 1].
function rgbToHsl(r, g, b) {
  (r /= 255), (g /= 255), (b /= 255);

  var max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  var h,
    s,
    l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }

    h /= 6;
  }

  return {h, s, l};
}

function hue2rgb(p, q, t) {
  if (t < 0) {
    t += 1;
  }
  if (t > 1) {
    t -= 1;
  }
  if (t < 1 / 6) {
    return p + (q - p) * 6 * t;
  }
  if (t < 1 / 2) {
    return q;
  }
  if (t < 2 / 3) {
    return p + (q - p) * (2 / 3 - t) * 6;
  }
  return p;
}

// Converts an HSL color value to RGB. Conversion formula
// adapted from http://en.wikipedia.org/wiki/HSL_color_space.
// Assumes h, s, and l are contained in the set [0, 1] and
// returns r, g, and b in the set [0, 255].
function hslToRgb(h, s, l) {
  var r, g, b;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;

    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return {r: r * 255, g: g * 255, b: b * 255};
}

/******************************************************************************/

// Expand "#12f" to "#1122ff".
function extendColor(color) {
  if (color && color.length === 4) {
    let extendedColor = '#';
    for (let i = 1; i < color.length; i++) {
      extendedColor += color.charAt(i) + color.charAt(i);
    }
    return extendedColor;
  }
  return color;
}

function exploseColorRGB(color) {
  color = extendColor(color);

  if (!color || color.length !== 7) {
    return {r: 0, g: 0, b: 0};
  }

  return {
    r: parseInt(color.substr(1, 2), 16),
    g: parseInt(color.substr(3, 2), 16),
    b: parseInt(color.substr(5, 2), 16),
  };
}

function exploseColorCMY(color) {
  color = extendColor(color);

  if (!color || color.length !== 7) {
    return {c: 0, m: 0, y: 0};
  }

  return {
    c: 255 - parseInt(color.substr(1, 2), 16),
    m: 255 - parseInt(color.substr(3, 2), 16),
    y: 255 - parseInt(color.substr(5, 2), 16),
  };
}

function exploseColorHSL(color) {
  color = extendColor(color);

  if (!color || color.length !== 7) {
    return {h: 0, s: 0, l: 0};
  }

  const r = parseInt(color.substr(1, 2), 16);
  const g = parseInt(color.substr(3, 2), 16);
  const b = parseInt(color.substr(5, 2), 16);

  const hsl = rgbToHsl(r, g, b);

  return {
    h: Math.floor(hsl.h * 360),
    s: Math.floor(hsl.s * 100),
    l: Math.floor(hsl.l * 100),
  };
}

function exploseColorGrey(color) {
  color = extendColor(color);

  if (!color || color.length !== 7) {
    return {h: 0, s: 0, l: 0};
  }

  const r = parseInt(color.substr(1, 2), 16);
  const g = parseInt(color.substr(3, 2), 16);
  const b = parseInt(color.substr(5, 2), 16);

  const n = 255 - (r + g + b) / 3;

  return {n};
}

function dec2hex(i) {
  return (Math.trunc(i) + 0x100).toString(16).substr(-2).toUpperCase();
}

function mergeColor(r, g, b) {
  return `#${dec2hex(r)}${dec2hex(g)}${dec2hex(b)}`;
}

function mergeRGB(currentRGB, baseColor, value) {
  switch (baseColor) {
    case 'R':
      return mergeColor(value, currentRGB.g, currentRGB.b);
    case 'G':
      return mergeColor(currentRGB.r, value, currentRGB.b);
    case 'B':
      return mergeColor(currentRGB.r, currentRGB.g, value);
  }
}

function mergeCMY(currentRGB, baseColor, value) {
  switch (baseColor) {
    case 'C':
      return mergeColor(255 - value, currentRGB.g, currentRGB.b);
    case 'M':
      return mergeColor(currentRGB.r, 255 - value, currentRGB.b);
    case 'Y':
      return mergeColor(currentRGB.r, currentRGB.g, 255 - value);
  }
}

function mergeHSL(currentRGB, baseColor, value) {
  const hsl = rgbToHsl(currentRGB.r, currentRGB.g, currentRGB.b);

  switch (baseColor) {
    case 'H':
      hsl.h = value / 360;
      break;
    case 'S':
      hsl.s = value / 100;
      break;
    case 'L':
      hsl.l = value / 100;
      break;
  }

  const rgb = hslToRgb(hsl.h, hsl.s, hsl.l);
  return mergeColor(rgb.r, rgb.g, rgb.b);
}

function mergeGrey(currentRGB, baseColor, value) {
  return mergeColor(255 - value, 255 - value, 255 - value);
}

function getSliderColor(baseColor) {
  switch (baseColor) {
    case 'R':
      return '#f00';
    case 'G':
      return '#0f0';
    case 'B':
      return '#00f';

    case 'C':
      return '#0ff';
    case 'M':
      return '#f0f';
    case 'Y':
      return '#ff0';

    case 'H':
      return '#888';
    case 'S':
      return '#fff';
    case 'L':
      return '#000';

    case 'N':
      return '#888';
  }
}

/******************************************************************************/

export default class ColorPicked extends Widget {
  constructor() {
    super(...arguments);
    this.styles = styles;

    this.state = {
      color: null,
      mode: 'rgb',
    };

    this.onColorChanged = throttle(this.onColorChanged, 100).bind(this);
  }

  //#region get/set
  get color() {
    return this.state.color;
  }
  set color(value) {
    this.setState({
      color: value,
    });
  }

  get mode() {
    return this.state.mode;
  }
  set mode(value) {
    this.setState({
      mode: value,
    });
  }
  //#endregion

  componentWillMount() {
    this.color = this.props.color;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.color !== this.props.color) {
      this.color = this.props.color;
    }
  }

  onColorChanged(baseColor, value) {
    const currentRGB = exploseColorRGB(
      ColorHelpers.getMarkColor(this.context.theme, this.color)
    );

    let newColor;
    switch (this.mode) {
      case 'rgb':
        newColor = mergeRGB(currentRGB, baseColor, value);
        break;
      case 'cmy':
        newColor = mergeCMY(currentRGB, baseColor, value);
        break;
      case 'hsl':
        newColor = mergeHSL(currentRGB, baseColor, value);
        break;
      case 'grey':
        newColor = mergeGrey(currentRGB, baseColor, value);
        break;
    }
    this.color = newColor;

    if (this.props.onChange) {
      this.props.onChange(newColor);
    }
  }

  /******************************************************************************/

  renderMode(name, tooltip, mode) {
    return (
      <Button
        border="none"
        width="60px"
        horizontalSpacing="overlap"
        text={name}
        tooltip={tooltip}
        active={this.mode === mode}
        onClick={() => (this.mode = mode)}
      />
    );
  }

  renderModes() {
    return (
      <div className={this.styles.classNames.modes}>
        {this.renderMode(T('TSL'), T('Teinte Saturation Intensité'), 'hsl')}
        {this.renderMode(T('RVB'), T('Rouge Vert Bleu'), 'rgb')}
        {this.renderMode(T('CMJ'), T('Cyan Magenta Jaune'), 'cmy')}
        {this.renderMode(T('Gris'), T('Niveaux de gris'), 'grey')}
        <Label grow="1" />
        <Label text={this.color} wrap="no" />
      </div>
    );
  }

  renderComposant(label, baseColor, value, range) {
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
          onChange={(value) => this.onColorChanged(baseColor, value)}
        />
        <Label width="10px" />
        <Slider
          direction="horizontal"
          grow="1"
          value={(value * 100) / range}
          color={getSliderColor(baseColor)}
          onChange={(value) =>
            this.onColorChanged(baseColor, (value * range) / 100)
          }
        />
        <Label width="10px" />
      </div>
    );
  }

  renderComposantsRGB() {
    const c = exploseColorRGB(
      ColorHelpers.getMarkColor(this.context.theme, this.color)
    );

    return (
      <div className={this.styles.classNames.composants}>
        {this.renderComposant(T('R'), 'R', c.r, 255)}
        {this.renderComposant(T('V'), 'G', c.g, 255)}
        {this.renderComposant(T('B'), 'B', c.b, 255)}
      </div>
    );
  }

  renderComposantsCMY() {
    const c = exploseColorCMY(
      ColorHelpers.getMarkColor(this.context.theme, this.color)
    );

    return (
      <div className={this.styles.classNames.composants}>
        {this.renderComposant(T('C'), 'C', c.c, 255)}
        {this.renderComposant(T('M'), 'M', c.m, 255)}
        {this.renderComposant(T('J'), 'Y', c.y, 255)}
      </div>
    );
  }

  renderComposantsHSL() {
    const c = exploseColorHSL(
      ColorHelpers.getMarkColor(this.context.theme, this.color)
    );

    return (
      <div className={this.styles.classNames.composants}>
        {this.renderComposant(T('T°'), 'H', c.h, 359)}
        {this.renderComposant(T('S%'), 'S', c.s, 100)}
        {this.renderComposant(T('L%'), 'L', c.l, 100)}
      </div>
    );
  }

  renderComposantsGrey() {
    const c = exploseColorGrey(
      ColorHelpers.getMarkColor(this.context.theme, this.color)
    );

    return (
      <div className={this.styles.classNames.composants}>
        {this.renderComposant(T('N'), 'N', c.n, 255)}
      </div>
    );
  }

  renderComposants() {
    switch (this.mode) {
      case 'rgb':
        return this.renderComposantsRGB();
      case 'cmy':
        return this.renderComposantsCMY();
      case 'hsl':
        return this.renderComposantsHSL();
      case 'grey':
        return this.renderComposantsGrey();
      default:
        return null;
    }
  }

  renderSample() {
    const style = {
      backgroundColor: ColorHelpers.getMarkColor(
        this.context.theme,
        this.color
      ),
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
