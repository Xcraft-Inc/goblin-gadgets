import Shredder from 'xcraft-core-shredder';

const initialState = new Shredder({
  selectedWidget: null,
  props: {},
  settings: {
    scale: 1,
    color: 'pane',
    items: 1,
    layout: 'row',
    frame: false,
  },
});

export default (state = initialState, action = {}) => {
  if (action.type === 'SET') {
    return state.set(action.path, action.value);
  }
  if (action.type === 'DEL') {
    return state.del(action.path);
  }
  if (action.type === 'SET_SELECTED_WIDGET') {
    const selectedWidget = action.name;
    const propsPath = `props.${selectedWidget}`;
    const widgetProps = state.get(propsPath);
    if (!widgetProps) {
      state = state.set(propsPath, {});
    }
    return state.set('selectedWidget', selectedWidget);
  }
  return state;
};
