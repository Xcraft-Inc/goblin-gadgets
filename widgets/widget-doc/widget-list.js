import {makePropTypes, makeDefaultProps} from '../../types/prop-types.js';

const widgetList = [];

/******************************************************************************/

export default widgetList;

export function registerWidget(
  Widget,
  props,
  scenarios,
  useWithWidgetDoc = true
) {
  Widget.propTypes = makePropTypes(props);
  Widget.defaultProps = makeDefaultProps(props);

  if (useWithWidgetDoc) {
    const name = Widget.displayName || Widget.name;
    widgetList.push({name, Widget, props, scenarios});
  }
}
