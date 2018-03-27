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
        const date = action.get('date');
        return state.set('visibleDate', date);
      },
      selectDate: (state, action) => {
        const date = action.get('date');
        return state.set('selectedDate', date);
      },
      selectBoardId: (state, action) => {
        const boardId = action.get('boardId');
        return state.set('selectedBoardId', boardId);
      },
    },
  });
};
