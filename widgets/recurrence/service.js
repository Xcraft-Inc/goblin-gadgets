'use strict';

const path = require ('path');

const goblinName = path.basename (module.parent.filename, '.js');

const Goblin = require ('xcraft-core-goblin');

// Define initial logic values
const logicState = {};

// Define logic handlers according rc.json
const logicHandlers = {
  create: (state, action) => {
    let r = action.get ('recurrence');
    if (!r) {
      r = {};
    }
    const initialState = {
      id: action.get ('id'),
      startDate: r.startDate ? r.startDate : '2017-01-01',
      endDate: r.endDate ? r.endDate : '2017-12-31',
      days: r.days ? r.days : '1',
      months: r.months ? r.months : '1-12',
      deleteList: r.deleteList ? r.deleteList : [],
      addList: r.addList ? r.addList : [],
    };
    return state.set ('', initialState);
  },
  'change-start-date': (state, action) => {
    const newValue = action.get ('newValue');
    return state.set ('startDate', newValue);
  },
  'change-end-date': (state, action) => {
    const newValue = action.get ('newValue');
    return state.set ('endDate', newValue);
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
  'erase-events': state => {
    return state.set ('addList', []).set ('deleteList', []);
  },
};

// Register quest's according rc.json
Goblin.registerQuest (goblinName, 'create', function (
  quest,
  desktopId,
  recurrence
) {
  quest.do ({id: quest.goblin.id, recurrence});
  const desk = quest.useAs ('desktop', desktopId);
  const state = quest.goblin.getState ();
  const value = {
    startDate: state.get ('startDate'),
    endDate: state.get ('endDate'),
    days: state.get ('days'),
    months: state.get ('months'),
  };
  desk.createFormFor ({workitemId: quest.goblin.id, value});
  return quest.goblin.id;
});

Goblin.registerQuest (goblinName, 'change-start-date', function (
  quest,
  newValue
) {
  quest.do ({newValue});
});

Goblin.registerQuest (goblinName, 'change-end-date', function (
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
