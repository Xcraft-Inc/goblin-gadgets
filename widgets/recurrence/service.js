'use strict';

const path = require('path');

const goblinName = path.basename(module.parent.filename, '.js');

const Goblin = require('xcraft-core-goblin');

// Define initial logic values
const logicState = {};

// Define logic handlers according rc.json
const logicHandlers = {
  create: (state, action) => {
    let r = action.get('recurrence');
    if (!r) {
      r = {};
    }
    const initialState = {
      id: action.get('id'),
      startDate: r.startDate ? r.startDate : '2017-01-01',
      endDate: r.endDate ? r.endDate : '2017-12-31',
      days: r.days ? r.days : '1',
      months: r.months ? r.months : '1-12',
      deleteList: r.deleteList ? r.deleteList : [],
      addList: r.addList ? r.addList : [],
    };
    return state.set('', initialState);
  },
  'change-startDate': (state, action) => {
    const newValue = action.get('newValue');
    return state.set('startDate', newValue);
  },
  'change-endDate': (state, action) => {
    const newValue = action.get('newValue');
    return state.set('endDate', newValue);
  },
  'select-date': (state, action) => {
    const date = action.get('date');
    const type = action.get('type');
    switch (type) {
      case 'default': {
        // If click on recurrent event, add a date into section 'Delete' for canceled the recurrence.
        return state.push('deleteList', date);
      }
      case 'added': {
        // If click on added event, simply remove it.
        return state.unpush('addList', date);
      }
      case 'deleted': {
        // If click on deleted event, remove 'Delete' entry. That restore the recurrent event.
        return state.unpush('deleteList', date);
      }
      case 'none': {
        // If click on free date, add a event.
        return state.push('addList', date);
      }
    }
  },
  'erase-events': state => {
    return state.set('addList', []).set('deleteList', []);
  },
};

// Register quest's according rc.json
Goblin.registerQuest(goblinName, 'create', function(
  quest,
  desktopId,
  recurrence
) {
  quest.do({id: quest.goblin.id, recurrence});
  return quest.goblin.id;
});

Goblin.registerQuest(goblinName, 'change-startDate', function(quest, newValue) {
  quest.do({newValue});
});

Goblin.registerQuest(goblinName, 'change-endDate', function(quest, newValue) {
  quest.do({newValue});
});

Goblin.registerQuest(goblinName, 'select-date', function(quest, date) {
  quest.do({date});
});

Goblin.registerQuest(goblinName, 'erase-events', function(quest) {
  quest.do();
});

Goblin.registerQuest(goblinName, 'delete', function() {});

// Create a Goblin with initial state and handlers
module.exports = Goblin.configure(goblinName, logicState, logicHandlers);
