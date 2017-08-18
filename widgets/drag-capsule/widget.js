import React from 'react';
import Widget from 'laboratory/widget';

import Label from 'gadgets/label/widget';

/******************************************************************************/

class DragCapsule extends Widget {
  constructor () {
    super (...arguments);
  }

  render () {
    switch (this.props.component) {
      case 'Label':
        return (
          <Label
            {...this.props}
            isDragged={this.props.isDragged}
            hasHeLeft={this.props.hasHeLeft}
          />
        );
      default:
        throw new Error (`Unsupported component ${this.props.component}`);
    }
  }
}

/******************************************************************************/
export default DragCapsule;
