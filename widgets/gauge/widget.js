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

export default class Gauge extends Widget {
  constructor() {
    super(...arguments);
    this.styles = styles;
  }

  render() {
    return (
      <div className={this.styles.classNames.box}>
        <div className={this.styles.classNames.content} />
        <div className={this.styles.classNames.gloss} />
      </div>
    );
  }
}

/******************************************************************************/

Gauge.propTypes = makePropTypes(Props);
Gauge.defaultProps = makeDefaultProps(Props);
