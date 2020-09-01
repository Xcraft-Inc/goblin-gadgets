import {
  makePropTypes,
  makeDefaultProps,
} from 'xcraft-core-utils/lib/prop-types';

const widgetList = [];

/******************************************************************************/

export default widgetList;

export function registerWidget(
  widget,
  props,
  scenarios,
  useWithWidgetDoc = true
) {
  widget.propTypes = makePropTypes(props);
  widget.defaultProps = makeDefaultProps(props);

  if (useWithWidgetDoc) {
    const name = widget.displayName || widget.name;
    widgetList.push({name, widget, props, scenarios});
  }
}
