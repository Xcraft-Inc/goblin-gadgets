import Shredder from 'xcraft-core-shredder';

const initialState = new Shredder({
  selectedWidget: null,
  requiredProps: {},
  props: {},
  selectedTypeProps: {},
  settings: {
    scale: 1,
    color: 'pane',
    items: 1,
    container: 'div',
    containerWidth: 'unset',
    containerHeight: 'unset',
    flexGrow: 'unset',
    flexDirection: 'row',
    flexWrap: 'no-wrap',
    overflow: 'unset',
    frame: false,
    layoutFrame: false,
  },
});

export default (state = initialState, action = {}) => {
  if (action.type === 'INIT') {
    state = state.set('requiredProps', action.requiredProps);
    state = state.set('props', action.defaultProps);
    state = state.set('selectedTypeProps', action.selectedTypeProps);
    return state;
  }

  if (action.type === 'SET') {
    return state.set(action.path, action.value);
  }

  if (action.type === 'DEL') {
    return state.del(action.path);
  }

  if (action.type === 'SET_PROP') {
    if (action.typeName) {
      state = state.set(`selectedTypeProps.${action.path}`, action.typeName);
    }
    return state.set(`props.${action.path}`, action.value);
  }

  if (action.type === 'SET_PROP_TYPE') {
    return state.set(`selectedTypeProps.${action.path}`, action.typeName);
  }

  if (action.type === 'DEL_PROP') {
    const requiredValue = state.get(`requiredProps.${action.path}`);
    if (requiredValue) {
      return state.set(`props.${action.path}`, requiredValue);
    } else {
      return state.del(`props.${action.path}`);
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
