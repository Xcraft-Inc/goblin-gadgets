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
    widgetList.push({name: widget.name, widget, props, scenarios});
  }
}
