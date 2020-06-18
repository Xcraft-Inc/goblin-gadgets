//T:2019-02-27:Nothing to translate !
import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import Props from './props';
import {
  makePropTypes,
  makeDefaultProps,
} from 'xcraft-core-utils/lib/prop-types';
import * as styles from './styles';

/******************************************************************************/

export default class Slider extends Widget {
  constructor() {
    super(...arguments);
    this.styles = styles;
  }

  render() {
    return (
      <div className={this.styles.classNames.slider}>
        <div className={this.styles.classNames.inside}>
          <div className={this.styles.classNames.glider} />
          <div className={this.styles.classNames.bar} />
          <div className={this.styles.classNames.cab} />
        </div>
      </div>
    );
  }
}

/******************************************************************************/

Slider.propTypes = makePropTypes(Props);
Slider.defaultProps = makeDefaultProps(Props);
