'use strict';
const {buildGadget} = require('goblin-gadgets');
/**
 * Retrieve the list of available commands.
 *
 * @returns {Object} The list and definitions of commands.
 */
exports.xcraftCommands = function() {
  return buildGadget({
    name: 'demo',
    actions: {
      test: (state, action) => {
        return state.set('value', action.get('value'));
      },
    },
  });
};
