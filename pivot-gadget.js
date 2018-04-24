'use strict';
const {buildGadget} = require('goblin-gadgets');
/**
 * Retrieve the list of available commands.
 *
 * @returns {Object} The list and definitions of commands.
 */
exports.xcraftCommands = function() {
  return buildGadget({
    name: 'pivot',
    events: {},
    actions: {
      setData: (state, action) => {
        return state.set('data', action.get('data'));
      },
    },
  });
};
