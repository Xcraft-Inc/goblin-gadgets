export default (state, action = {}) => {
  switch (action.type) {
    case 'change-status': {
      const status = action.get('status');
      if (!status.length) {
        return state;
      }
      return state.set('status', status);
    }
    default:
      return state;
  }
};
