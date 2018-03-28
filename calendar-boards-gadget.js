'use strict';
const {buildGadget} = require('goblin-gadgets');
/**
 * Retrieve the list of available commands.
 *
 * @returns {Object} The list and definitions of commands.
 */
exports.xcraftCommands = function() {
  return buildGadget({
    name: 'calendar-boards',
    events: {
      setData: state => {
        return {
          visibleDate: state.get('visibleDate'),
          selectedDate: state.get('selectedDate'),
          selectedBoardId: state.get('selectedBoardId'),
        };
      },
      showDate: state => {
        return {
          visibleDate: state.get('visibleDate'),
        };
      },
      selectDate: state => {
        return {
          selectedDate: state.get('selectedDate'),
        };
      },
      selectBoardId: state => {
        return {
          selectedBoardId: state.get('selectedBoardId'),
        };
      },
    },
    actions: {
      configure: (state, action) => {
        return state.set('visibleDate', action.get('visibleDate'));
      },
      setData: (state, action) => {
        const boards = action.get('boards');
        const visibleDate = action.get('visibleDate');
        const selectedDate = action.get('selectedDate');
        const selectedBoardId = action.get('selectedBoardId');
        return state
          .set('boards', boards)
          .set('visibleDate', visibleDate)
          .set('selectedDate', selectedDate)
          .set('selectedBoardId', selectedBoardId);
      },
      showDate: (state, action) => {
        const visibleDate = action.get('visibleDate');
        return state.set('visibleDate', visibleDate);
      },
      selectDate: (state, action) => {
        const selectedDate = action.get('selectedDate');
        return state.set('selectedDate', selectedDate);
      },
      selectBoardId: (state, action) => {
        const selectedBoardId = action.get('selectedBoardId');
        return state.set('selectedBoardId', selectedBoardId);
      },
    },
  });
};
