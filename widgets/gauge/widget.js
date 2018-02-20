import React from 'react';
import Widget from 'laboratory/widget';

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
export default Gauge;
