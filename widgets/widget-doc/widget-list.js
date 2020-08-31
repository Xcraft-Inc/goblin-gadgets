import {
  makePropTypes,
  makeDefaultProps,
} from 'xcraft-core-utils/lib/prop-types';

const widgetList = [];

/******************************************************************************/

export default widgetList;

export function registerWidget(widget, props, scenarios) {
  widget.propTypes = makePropTypes(props);
  widget.defaultProps = makeDefaultProps(props);

  widgetList.push({name: widget.name, widget, props, scenarios});
}
