import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import withC from 'goblin-laboratory/widgets/connect-helpers/with-c';
import TableNC from '../table-nc/widget';

/******************************************************************************/

const Table = withC(TableNC);
Table.displayName = 'Table';

const TableWired = Widget.connectWidget((state, props) => {
  if (!state) {
    return {};
  }
  return {
    filter: state.get('filter'),
    sortingColumns: state.get('sortingColumns'),
    selectedIds: props.selectedIds,
  };
})(Table);

/******************************************************************************/

export default class TableExported extends Widget {
  static get wiring() {
    return {
      id: 'id',
      data: 'data',
      selectedIds: 'selectedIds',
    };
  }

  render() {
    if (this.props.widgetId || this.props.id) {
      return <TableWired {...this.props} />;
    } else {
      return <Table {...this.props} />;
    }
  }
}
