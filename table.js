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
    actions: {
      select: (state, action) => {
        const mode = action.get('mode');
        const id = action.get('id');
        if (mode === 'single') {
          return state.set('selectedIds', [id]);
        } else if (mode === 'multi') {
          const selectdIds = action.get('selectdIds');
          const i = selectdIds.indexOf(id);
          if (i === -1) {
            selectdIds.push(id);
          } else {
            selectdIds.splice(i, 1);
          }
          return state.set('selectedIds', selectdIds);
        } else {
          throw new Error(`Unknow mode ${mode}`);
        }
      },
    },
  });
};
