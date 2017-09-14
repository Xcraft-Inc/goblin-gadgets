import React from 'react';
import Widget from 'laboratory/widget';
import {Unit} from 'electrum-theme';
import * as Bool from '../helpers/boolean-helpers.js';

import Label from 'gadgets/label/widget';

/******************************************************************************/

class ChronoBar extends Widget {
  constructor () {
    super (...arguments);
  }

  renderThin (dotStyleName, lineStyleName) {
    const result = [];
    const dotStyle = this.styles.classNames[dotStyleName];
    const lineStyle = this.styles.classNames[lineStyleName];
    result.push (<div className={dotStyle} key="dot" />);
    result.push (<div className={lineStyle} key="line" />);
    return result;
  }

  renderDot () {
    if (this.props.tricolor === 'false') {
      if (this.props.startFrom === this.props.endTo) {
        return this.renderThin ('dot', 'line');
      }
    }
    return null;
  }

  renderFromDot () {
    if (this.props.tricolor === 'true') {
      if (this.props.startFrom === this.props.endFrom) {
        return this.renderThin ('fromDot', 'fromLine');
      }
    }
    return null;
  }

  renderToDot () {
    if (this.props.tricolor === 'true') {
      if (this.props.startTo === this.props.endTo) {
        return this.renderThin ('toDot', 'toLine');
      }
    }
    return null;
  }

  // If hover. draw a 'tooltip' on the right side of bar.
  renderLeftTooltip (hover) {
    if (!this.props.isDragged && hover) {
      const style = this.styles.classNames.leftTooltip;
      return (
        <div className={style} key="leftTooltip">
          <Label text={this.props.leftTooltip} wrap="no" />
        </div>
      );
    } else {
      return null;
    }
  }

  // If hover. draw a 'tooltip' on the right side of bar.
  renderRightTooltip (hover) {
    if (!this.props.isDragged && hover) {
      const style = this.styles.classNames.rightTooltip;
      return (
        <div className={style} key="rightTooltip">
          <Label text={this.props.rightTooltip} wrap="no" />
        </div>
      );
    } else {
      return null;
    }
  }

  renderStart (styleName, hover) {
    const style = this.styles.classNames[styleName];
    return (
      <div className={style} key="start">
        {this.renderLeftTooltip (hover === 'true')}
      </div>
    );
  }

  renderMain () {
    const style = this.props.tricolor === 'true'
      ? this.styles.classNames.middleDistinct
      : this.styles.classNames.mainDistinct;
    return <div className={style} key="main" />;
  }

  renderEnd (styleName, hover) {
    const style = this.styles.classNames[styleName];
    return (
      <div className={style} key="end">
        {this.renderRightTooltip (hover === 'true')}
      </div>
    );
  }

  renderDistinct () {
    return (
      <div key="bar">
        {this.renderMain ()}
        {this.renderStart ('startDistinct', this.props.hover)}
        {this.renderEnd ('endDistinct', this.props.hover)}
        {this.renderDot ()}
        {this.renderFromDot ()}
        {this.renderToDot ()}
      </div>
    );
  }

  renderOverlap () {
    const topStyle = this.styles.classNames.topOverlap;
    const bottomStyle = this.styles.classNames.bottomOverlap;

    return (
      <div key="bar">
        {this.renderStart ('startOverlap', this.props.hover)}
        <div className={topStyle} key="top" />
        <div className={bottomStyle} key="bottom" />
        {this.renderEnd ('endOverlap', this.props.hover)}
        {this.renderDot ()}
        {this.renderFromDot ()}
        {this.renderToDot ()}
      </div>
    );
  }

  render () {
    const a = Unit.parse (this.props.endFrom).value;
    const b = Unit.parse (this.props.startTo).value;

    if (a <= b) {
      return this.renderDistinct ();
    } else {
      return this.renderOverlap ();
    }
  }
}

/******************************************************************************/
export default ChronoBar;
