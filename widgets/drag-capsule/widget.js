import React from 'react';
import Widget from 'laboratory/widget';

import Label from 'gadgets/label/widget';

/******************************************************************************/

class DragCapsule extends Widget {
  constructor (props) {
    super (props);
  }

  render () {
    const component = this.props.component;
    const isDragged = this.props.isDragged;
    const hasHeLeft = this.props.hasHeLeft;

    switch (component) {
      case 'Label':
        return (
          <Label {...this.props} isDragged={isDragged} hasHeLeft={hasHeLeft} />
        );
      default:
        throw new Error (`Unsupported component ${component}`);
    }
  }
}

/******************************************************************************/
export default DragCapsule;
