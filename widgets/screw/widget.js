import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';

/******************************************************************************/

export default class Screw extends Widget {
  constructor() {
    super(...arguments);
  }

  render() {
    return (
      <React.Fragment>
        <div className={this.styles.classNames.screw} />
        <div className={this.styles.classNames.slot} />
      </React.Fragment>
    );
  }
}

/******************************************************************************/
