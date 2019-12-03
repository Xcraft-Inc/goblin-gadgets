//T:2019-02-27

import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';

/******************************************************************************/

class Separator extends Widget {
  constructor() {
    super(...arguments);
  }

  render() {
    const boxClass = this.styles.classNames.box;

    return <div disabled={this.props.disabled} className={boxClass} />;
  }
}

/******************************************************************************/
export default Separator;
