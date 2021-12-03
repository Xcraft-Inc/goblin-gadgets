'use strict';
const {buildGadget} = require('goblin-gadgets');
/**
 * Retrieve the list of available commands.
 *
 * @returns {Object} The list and definitions of commands.
 */

exports.xcraftCommands = function () {
  return buildGadget({
    name: 'table',
    events: {
      syncSelect: (state) => {
        const rowIds = state.get('selectedIds', []).valueSeq().toArray();
        return {
          selectedIds: rowIds,
          //? rows: state.get('data.rows').filter((r) => rowIds.includes(r.get('id'))),
        };
      },
      select: (state) => {
        const rowIds = state.get('selectedIds', []).valueSeq().toArray();
        return {
          selectedIds: rowIds,
          //? rows: state.get('data.rows').filter((r) => rowIds.includes(r.get('id'))),
        };
      },
      doubleClick: (state, action) => {
        return {
          rowId: action.get('rowId'),
        };
      },
    },
    actions: {
      setData: (state, action) => {
        return state.set('data', action.get('data'));
      },
      syncSelect: (state, action) => {
        const selectedIds = action.get('selectedIds');
        return state.set('selectedIds', selectedIds);

        //? const selectedIds = state.get('selectedIds', []);
        //? if (
        //?   action.get('selected') &&
        //?   !selectedIds.includes(action.get('rowId'))
        //? ) {
        //?   return state.push('selectedIds', action.get('rowId'));
        //? }
        //? if (
        //?   !action.get('selected') &&
        //?   selectedIds.includes(action.get('rowId'))
        //? ) {
        //?   return state.unpush('selectedIds', action.get('rowId'));
        //? }
        //? return state;
      },
      select: (state, action) => {
        const mode = action.get('mode');
        const id = action.get('rowId');
        const selectedIds = state.get('selectedIds', []);
        switch (mode) {
          case 'multi':
            if (selectedIds.includes(id)) {
              return state.unpush('selectedIds', id);
            } else {
              return state.push('selectedIds', id);
            }
          case 'single':
          default:
            if (selectedIds.includes(id)) {
              return state.set('selectedIds', []); // deselect
            } else {
              return state.set('selectedIds', [id]); // select
            }
        }
      },
      deselect: (state, action) => {
        const id = action.rowId;
        const selectedIds = state.get('selectedIds', []);
        if (selectedIds.includes(id)) {
          state = state.unpush('selectedIds', id);
        }

        return state;
      },
      deselectAll: (state) => {
        return state.set('selectedIds', []);
      },
      selectAll: (state) => {
        const rowIds = state
          .get('sortedRows')
          .map((row) => row.get('row').get('id'))
          .valueSeq()
          .toArray();
        return state.set('selectedIds', rowIds);
      },
      doubleClick: (state) => {
        // NOP, see doubleClick in events ---^
        return state;
      },
    },
  });
};
