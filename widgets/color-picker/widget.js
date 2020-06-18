import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import * as styles from './styles';
import throttle from 'lodash/throttle';
import TextFieldTypedNC from 'goblin-gadgets/widgets/text-field-typed-nc/widget';
import Slider from 'goblin-gadgets/widgets/slider/widget';
import Label from 'goblin-gadgets/widgets/label/widget';
import {ColorHelpers} from 'electrum-theme';
import T from 't';

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

function exploseColor(color) {
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

function dec2hex(i) {
  return (Math.trunc(i) + 0x100).toString(16).substr(-2).toUpperCase();
}

function mergeColor(r, g, b) {
  return `#${dec2hex(r)}${dec2hex(g)}${dec2hex(b)}`;
}

/******************************************************************************/

export default class ColorPicked extends Widget {
  constructor() {
    super(...arguments);
    this.styles = styles;

    this.state = {
      color: null,
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
    const c = exploseColor(
      ColorHelpers.getMarkColor(this.context.theme, this.color)
    );

    let newColor;
    switch (baseColor) {
      case '#f00':
        newColor = mergeColor(value, c.g, c.b);
        break;
      case '#0f0':
        newColor = mergeColor(c.r, value, c.b);
        break;
      case '#00f':
        newColor = mergeColor(c.r, c.g, value);
        break;
    }
    this.color = newColor;

    if (this.props.onChange) {
      this.props.onChange(newColor);
    }
  }

  /******************************************************************************/

  renderComposant(baseColor, value) {
    return (
      <div className={this.styles.classNames.composant}>
        <TextFieldTypedNC
          width="50px"
          type="integer"
          min={0}
          max={255}
          value={value}
          onChange={(value) => this.onColorChanged(baseColor, value)}
        />
        <Label width="10px" />
        <Slider
          direction="horizontal"
          grow="1"
          value={(value * 100) / 255}
          color={baseColor}
          onChange={(value) =>
            this.onColorChanged(baseColor, (value * 255) / 100)
          }
        />
        <Label width="10px" />
      </div>
    );
  }

  renderComposants() {
    const c = exploseColor(
      ColorHelpers.getMarkColor(this.context.theme, this.color)
    );

    return (
      <div className={this.styles.classNames.composants}>
        {this.renderComposant('#f00', c.r)}
        {this.renderComposant('#0f0', c.g)}
        {this.renderComposant('#00f', c.b)}
      </div>
    );
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
        {this.renderComposants()}
        {this.renderSample()}
      </div>
    );
  }
}

/******************************************************************************/
