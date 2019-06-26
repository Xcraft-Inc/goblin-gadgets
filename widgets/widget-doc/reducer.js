import Shredder from 'xcraft-core-shredder';

const initialState = new Shredder({
  selectedWidget: null,
  requiredProps: {},
  props: {},
  settings: {
    scale: 1,
    color: 'pane',
    items: 1,
    layout: 'div',
    frame: false,
    layoutFrame: false,
  },
});

export default (state = initialState, action = {}) => {
  if (action.type === 'INIT') {
    state = state.set('requiredProps', action.requiredProps);
    state = state.set('props', action.defaultProps);
    return state;
  }
  if (action.type === 'SET') {
    return state.set(action.path, action.value);
  }
  if (action.type === 'DEL') {
    return state.del(action.path);
  }
  if (action.type === 'SET_PROP') {
    if (!action.path.startsWith('props.')) {
      throw new Error(`WidgetDoc.SET_PROP: invalid path '${action.path}'`);
    }
    return state.set(action.path, action.value);
  }
  if (action.type === 'DEL_PROP') {
    if (!action.path.startsWith('props.')) {
      throw new Error(`WidgetDoc.DEL_PROP: invalid path '${action.path}'`);
    }
    const requiredPath = action.path.replace(/props./, 'requiredProps.'); // replace "props.Button.kind" by "requiredProps.Button.kind"
    const requiredValue = state.get(requiredPath);
    if (requiredValue) {
      return state.set(action.path, requiredValue);
    } else {
      return state.del(action.path);
    }
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
