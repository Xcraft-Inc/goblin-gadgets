'use strict';

const path = require ('path');

const goblinName = path.basename (module.parent.filename, '.js');

const Goblin = require ('xcraft-core-goblin');

// Define initial logic values
const logicState = {};

// Define logic handlers according rc.json
const logicHandlers = {
  create: (state, action) => {
    const initialState = {
      id: action.get ('id'),
      startDate: '2017-01-01',
      endDate: '2017-12-31',
      days: '',
      months: '',
      deleteList: [],
      addList: [],
    };
    return state.set ('', initialState);
  },
  'change-start-date': (state, action) => {
    const newValue = action.get ('newValue');
    return state.set ('startDate', newValue);
  },
  'select-date': (state, action) => {
    const date = action.get ('date');
    const type = action.get ('type');
    switch (type) {
      case 'default': {
        // If click on recurrent event, add a date into section 'Delete' for canceled the recurrence.
        const list = state.get ('deleteList', []);
        const newList = list.push (date);
        return state.set ('deleteList', newList);
      }
      case 'added': {
        // If click on added event, simply remove it.
        const list = state.get ('addList', []);
        const newList = list.unpush (date);
        return state.set ('addList', newList);
      }
      case 'deleted': {
        // If click on deleted event, remove 'Delete' entry. That restore the recurrent event.
        const list = state.get ('deleteList', []);
        const newList = list.unpush (date);
        return state.set ('deleteList', newList);
      }
      case 'none': {
        // If click on free date, add a event.
        const list = state.get ('addList', []);
        const newList = list.push (date);
        return state.set ('addList', newList);
      }
    }
  },
  'erase-events': (state, action) => {
    return state.set ('addList', []).set ('deleteList', []);
  },
};

// Register quest's according rc.json
Goblin.registerQuest (goblinName, 'create', function (quest) {
  quest.do ({id: quest.goblin.id});
  return quest.goblin.id;
});

Goblin.registerQuest (goblinName, 'change-start-date', function (
  quest,
  newValue
) {
  quest.do ({newValue});
});

Goblin.registerQuest (goblinName, 'select-date', function (quest, date) {
  quest.do ({date});
});

Goblin.registerQuest (goblinName, 'erase-events', function (quest) {
  quest.do ();
});

Goblin.registerQuest (goblinName, 'delete', function () {});

// Create a Goblin with initial state and handlers
module.exports = Goblin.configure (goblinName, logicState, logicHandlers);
