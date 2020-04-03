import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';

/******************************************************************************/

export default class RetroScrew extends Widget {
  constructor() {
    super(...arguments);
  }

  render() {
    if (!this.context.theme.look.accessories.includes('screws')) {
      return null;
    }

    return (
      <React.Fragment>
        <div className={this.styles.classNames.screw} />
        <div className={this.styles.classNames.slot} />
      </React.Fragment>
    );
  }
}

/******************************************************************************/
