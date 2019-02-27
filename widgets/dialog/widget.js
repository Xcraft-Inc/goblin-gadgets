//T:2019-02-27
import React from 'react';
import Widget from 'laboratory/widget';

/******************************************************************************/

class Dialog extends Widget {
  constructor() {
    super(...arguments);
  }

  render() {
    const boxClass = this.styles.classNames.box;

    return (
      <div disabled={this.props.disabled} className={boxClass}>
        {this.props.children}
      </div>
    );
  }
}

/******************************************************************************/
export default Dialog;
