import React from 'react';
import props from './props';
import scenarios from './scenarios';
import {registerWidget} from 'goblin-gadgets/widgets/widget-doc/widget-list';
import Widget from 'goblin-laboratory/widgets/widget';
import Label from 'goblin-gadgets/widgets/label/widget';
import Gauge from 'goblin-gadgets/widgets/gauge/widget';
import RetroGear from 'goblin-gadgets/widgets/retro-gear/widget';
import * as styles from './styles';
import {Unit} from 'goblin-theme';
const px = Unit.toPx;
const n = Unit.toValue;

/******************************************************************************/

export default class Rocket extends Widget {
  constructor() {
    super(...arguments);
    this.styles = styles;
  }

  get size() {
    return n(this.props.size || '200px');
  }

  renderOverflow() {
    if (
      !this.props.totalCount ||
      this.props.startedCount < this.props.totalCount
    ) {
      return null;
    }

    return (
      <div className={`gear-hover ${this.styles.classNames.gear}`}>
        <RetroGear
          force={true}
          color="#ccc"
          left="0px"
          top="0px"
          radius={px(this.size * 0.45)}
          toothCount={20}
          toothThickness={this.size / 10}
          rotationDuration="20s"
          rotationDirection="cw"
          shadow="true"
        />
      </div>
    );
  }

  renderGauge() {
    if (!this.props.startedCount || !this.props.totalCount) {
      return null;
    }

    const value = (this.props.startedCount / this.props.totalCount) * 100;
    const ratio = `${this.props.startedCount}/${this.props.totalCount}`;
    const fontSize = `${this.size * 0.75}%`;

    return (
      <React.Fragment>
        <div className={this.styles.classNames.gauge}>
          <Gauge
            kind="mission"
            gradient="fix"
            color={this.props.gaugeColor}
            direction="horizontal"
            height={px(this.size * 0.06)}
            grow="1"
            displayZero={true}
            value={value}
          />
        </div>
        <div className={this.styles.classNames.ratio}>
          <Label
            text={ratio}
            textColor={this.props.textColor}
            grow="1"
            fontSize={fontSize}
            justify="center"
          />
        </div>
      </React.Fragment>
    );
  }

  renderIcon() {
    if (!this.props.icon) {
      return null;
    }

    return (
      <div className={this.styles.classNames.icon}>
        <div className={this.styles.classNames.iconShadow} />
        <img
          className={this.styles.classNames.icon}
          src={this.props.icon}
          alt=""
        />
      </div>
    );
  }

  renderGlyph() {
    if (!this.props.glyph) {
      return null;
    }

    const glyphSize = `${this.size * 2.5}%`;

    return (
      <div className={this.styles.classNames.glyph}>
        <Label
          grow="1"
          glyph={this.props.glyph}
          glyphColor={this.props.textColor}
          glyphSize={glyphSize}
          justify="center"
          glyphPosition="center"
        />
      </div>
    );
  }

  renderTitle() {
    const fontSize = `${this.size * 0.75}%`;
    return (
      <Label
        text={this.props.title}
        textColor={this.props.textColor}
        fontSize={fontSize}
        justify="center"
        wrap="no"
      />
    );
  }

  renderSubtitle() {
    const fontSize = `${this.size * 0.5}%`;
    return (
      <div className={this.styles.classNames.subtitle}>
        <Label
          text={this.props.subtitle}
          textColor={this.props.textColor}
          fontSize={fontSize}
          justify="center"
          wrap="no"
        />
      </div>
    );
  }

  render() {
    return (
      <div
        className={this.styles.classNames.rocket}
        onClick={this.props.onClick}
      >
        {this.renderIcon()}
        {this.renderGlyph()}
        {this.renderTitle()}
        {this.renderSubtitle()}
        {this.renderGauge()}
        {this.renderOverflow()}
      </div>
    );
  }
}

/******************************************************************************/

registerWidget(Rocket, props, scenarios);
