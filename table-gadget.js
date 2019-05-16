'use strict';
const {buildGadget} = require('goblin-gadgets');
/**
 * Retrieve the list of available commands.
 *
 * @returns {Object} The list and definitions of commands.
 */
exports.xcraftCommands = function() {
  return buildGadget({
    name: 'table',
    events: {
      select: state => {
        const ids = state.get('selectedIds', []).toArray();
        return {
          selectedIds: ids,
          rows: state.get('data.rows').filter(r => ids.includes(r.get('id'))),
        };
      },
      selectAll: state => {
        return {
          selectedIds: state.get('selectedIds', []).toArray(),
        };
      },
      deselectAll: () => {
        return {
          selectedIds: [],
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
      selectAll: state => {
        let rows = state
          .get('data.rows')
          .map(row => row.get('id'))
          .toArray();
        rows = [...new Set(rows)];
        return state.set('selectedIds', rows);
      },
      deselectAll: state => {
        return state.set('selectedIds', []);
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
      doubleClick: state => {
        //NOP
        // see doubleClick in events ---^
        return state;
      },
    },
  });
};
