import React from 'react';
import Widget from 'laboratory/widget';

import * as Bool from 'gadgets/boolean-helpers';

/******************************************************************************/

class Gauge extends Widget {
  constructor () {
    super (...arguments);
  }

  render () {
    const boxClass = this.styles.classNames.box;
    const contentClass = Bool.isTrue (this.props.disabled)
      ? this.styles.classNames.disabled
      : this.styles.classNames.content;

    return (
      <div className={boxClass}>
        <div className={contentClass} />
      </div>
    );
  }
}

/******************************************************************************/
export default Gauge;
