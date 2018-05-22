'use strict';
const {buildGadget} = require('goblin-gadgets');
/**
 * Retrieve the list of available commands.
 *
 * @returns {Object} The list and definitions of commands.
 */
exports.xcraftCommands = function() {
  return buildGadget({
    name: 'tree',
    events: {
      select: state => {
        return {
          selectedIds: state.get('selectedIds', []).toArray(),
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
    },
    actions: {
      setData: (state, action) => {
        return state.set('data', action.get('data'));
      },
      selectAll: state => {
        const rows = state
          .get('data.rows')
          .linq.select(row => row.get('id'))
          .distinct(id => id)
          .toList();
        return state.set('selectedIds', rows);
      },
      deselectAll: state => {
        return state.set('selectedIds', []);
      },
      select: (state, action) => {
        const mode = action.get('mode');
        const id = action.get('rowId');
        const selectedIds = state.get('selectedIds', []);
        if (mode === 'single') {
          if (selectedIds.includes(id)) {
            return state.set('selectedIds', []); // deselect
          } else {
            return state.set('selectedIds', [id]); // select
          }
        } else if (mode === 'multi') {
          if (selectedIds.includes(id)) {
            return state.unpush('selectedIds', id);
          } else {
            return state.push('selectedIds', id);
          }
        } else {
          throw new Error(`Unknow mode ${mode}`);
        }
      },
      doubleClick: (state, action) => {
        const id = action.get('rowId');
        // TODO...
      },
    },
  });
};
