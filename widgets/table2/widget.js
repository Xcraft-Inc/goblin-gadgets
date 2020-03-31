import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import withC from 'goblin-laboratory/widgets/connect-helpers/with-c';
import TableNC from '../table-nc/widget';

/******************************************************************************/

const Table2 = withC(TableNC);
Table2.displayName = 'Table2';

const Table2Wired = Widget.connectWidget((state, props) => {
  if (!state) {
    return {};
  }
  return {
    filter: state.get('filter'),
    sortingColumns: state.get('sortingColumns'),
    selectedIds: props.selectedIds,
  };
})(Table2);

/******************************************************************************/

export default class Table2Exported extends Widget {
  static get wiring() {
    return {
      id: 'id',
      data: 'data',
      selectedIds: 'selectedIds',
    };
  }

  render() {
    if (this.props.widgetId || this.props.id) {
      return <Table2Wired {...this.props} gadgetName="table2-gadget" />;
    } else {
      return <Table2 {...this.props} gadgetName="table2-gadget" />;
    }
  }
}
