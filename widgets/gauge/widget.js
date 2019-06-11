//T:2019-02-27:Nothing to translate !
import React from 'react';
import Widget from 'laboratory/widget';
import Props from './props';
import {
  makePropTypes,
  makeDefaultProps,
} from 'xcraft-core-utils/lib/prop-types';

/******************************************************************************/

class Gauge extends Widget {
  constructor() {
    super(...arguments);
  }

  render() {
    const boxClass = this.styles.classNames.box;
    const contentClass = this.styles.classNames.content;
    const glossClass = this.styles.classNames.gloss;

    return (
      <div className={boxClass}>
        <div className={contentClass} />
        <div className={glossClass} />
      </div>
    );
  }
}

/******************************************************************************/

Gauge.propTypes = makePropTypes(Props);
Gauge.defaultProps = makeDefaultProps(Props);

/******************************************************************************/
export default Gauge;
