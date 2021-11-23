import Shredder from 'xcraft-core-shredder';
import helpers from './helpers';

/******************************************************************************/

function getSortedRows(state) {
  const data = state.get('data');
  const isFilterable = data.get('filtering') === 'enable';
  const isSortable = data.get('sorting') === 'enable';

  const list = [];
  let rows = data.get('rows');
  if (isFilterable) {
    const header = data.get('header');
    rows = helpers.filter(rows, header, state.get('filter'));
  }
  if (isSortable) {
    const header = data.get('header');
    rows = helpers.sort(rows, header, state.get('sortingColumns'));
  }
  helpers.flatten(list, rows, 0);
  helpers.diffuseSeparators(list);

  return list;
}

function rowIds(state) {
  const rowIds = state
    .get('sortedRows')
    .map((row) => row.get('row').get('id'))
    .valueSeq()
    .toArray();
  return [...new Set(rowIds)];
}

function isAllSelected(state) {
  const selectedIds = state.get('selectedIds');
  return selectedIds && selectedIds.size === rowIds(state).length;
}

function isAllDeselected(state) {
  const selectedIds = state.get('selectedIds');
  return !selectedIds || selectedIds.size === 0;
}

function updateAfterChangingRows(state) {
  const list = getSortedRows(state);
  if (list.length === 1) {
    state = state.set('selectedIds', [list[0].row.get('id')]);
  }
  state = state.set('sortedRows', list);
  state = state.set('isAllSelected', isAllSelected(state));
  state = state.set('isAllDeselected', isAllDeselected(state));
  return state;
}

function updateAfterChangingSelection(state) {
  state = state.set('isAllSelected', isAllSelected(state));
  state = state.set('isAllDeselected', isAllDeselected(state));
  return state;
}

/******************************************************************************/

const initialState = new Shredder({
  id: null,
  data: null,
  sortingColumns: [],
  filter: null,
  sortedRows: [],
  selectedIds: [],
  isAllSelected: false,
  isAllDeselected: false,
});

/******************************************************************************/

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case 'INITIALISE': {
      let {data, selectedIds, id} = action;

      if (!Shredder.isShredder(data)) {
        data = new Shredder(data);
      }

      state = state.set('data', data);
      state = state.set('id', id);

      const defaultSortingColumns = data.get('defaultSortingColumns');
      if (defaultSortingColumns) {
        state = state.set('sortingColumns', defaultSortingColumns);
      }

      if (selectedIds) {
        state = state.set('selectedIds', selectedIds);
      }

      state = updateAfterChangingRows(state);
      return state;
    }

    case 'SORT_COLUMN': {
      state = state.set('sortingColumns', action.value);
      state = updateAfterChangingRows(state);
      return state;
    }

    case 'FILTER': {
      state = state.set('filter', action.value);
      state = updateAfterChangingRows(state);
      state = updateAfterChangingSelection(state);
      return state;
    }

    case 'SELECT': {
      const mode = action.mode;
      const id = action.rowId;
      const selectedIds = state.get('selectedIds', []);
      switch (mode) {
        case 'multi':
          if (selectedIds.includes(id)) {
            state = state.unpush('selectedIds', id);
          } else {
            state = state.push('selectedIds', id);
          }
          break;
        case 'single':
        default:
          if (selectedIds.includes(id)) {
            state = state.set('selectedIds', []); // deselect
          } else {
            state = state.set('selectedIds', [id]); // select
          }
          break;
      }
      state = updateAfterChangingSelection(state);
      return state;
    }

    case 'SELECT-ALL': {
      state = state.set('selectedIds', rowIds(state));
      state = updateAfterChangingSelection(state);
      return state;
    }

    case 'DESELECT-ALL': {
      state = state.set('selectedIds', []); // deselect
      state = updateAfterChangingSelection(state);
      return state;
    }

    case 'MOVE_SELECTION': {
      const mode = action.mode;
      if (mode === 'multi') {
        return state;
      }

      const {direction} = action;

      const sortedRows = state.get('sortedRows');
      const rowIds = sortedRows
        .map((row) => row.get('row').get('id'))
        .valueSeq()
        .toArray();

      const selectedId = state.get('selectedIds.0');
      let i = rowIds.indexOf(selectedId);
      if (i === -1) {
        i = 0;
      }
      const id = rowIds[i + direction];
      if (id) {
        state = state.set('selectedIds', [id]);
      }
      state = updateAfterChangingSelection(state);
      return state;
    }

    case 'DESELECT': {
      const id = action.rowId;
      const selectedIds = state.get('selectedIds', []);
      if (selectedIds.includes(id)) {
        state = state.unpush('selectedIds', id);
      }

      state = updateAfterChangingSelection(state);
      return state;
    }
  }
  return state;
};
