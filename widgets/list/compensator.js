const logicHandlers = require('./logicHandlers.js');

export default (state, action = {}) => {
  switch (action.type) {
    case 'change-status':
      return state;
    default:
      if (logicHandlers[action.type]) {
        return logicHandlers[action.type](state, action);
      }
      return state;
  }
};
