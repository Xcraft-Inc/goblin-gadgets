//T:2019-02-27

import React from 'react';
import Widget from 'laboratory/widget';
import PivotTableUI from 'react-pivottable/PivotTableUI';
import './custom.css';

/******************************************************************************/
class Pivot extends Widget {
  constructor() {
    super(...arguments);
    this.state = {pivotState: {}};
  }

  static get wiring() {
    return {
      id: 'id',
      data: 'data',
    };
  }

  render() {
    if (!this.props.data) {
      return null;
    }

    const data = this.props.data.toJS();

    return (
      <PivotTableUI
        data={data}
        onChange={s => {
          this.setState({pivotState: s});
        }}
        {...this.state.pivotState}
      />
    );
  }
}

/******************************************************************************/
export default Pivot;
