import React from 'react';
import Widget from 'laboratory/widget';

/******************************************************************************/

class Demo extends Widget {
  constructor() {
    super(...arguments);
  }

  static get wiring() {
    return {
      id: 'id',
      value: 'value',
    };
  }

  render() {
    return <div>{this.props.value}</div>;
  }
}

/******************************************************************************/
export default Demo;
