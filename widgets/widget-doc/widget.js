import React from 'react';
import Widget from 'laboratory/widget';
import Container from 'goblin-gadgets/widgets/container/widget';
import WidgetDocMenu from '../widget-doc-menu/widget';
import WidgetDocProperties from '../widget-doc-properties/widget';
import WidgetDocPreview from '../widget-doc-preview/widget';
import widgetList from '../widget-doc/widget-list';

/******************************************************************************/

class WidgetDoc extends Widget {
  constructor() {
    super(...arguments);

    const props = {};
    for (const widget of widgetList) {
      const widgetProps = {};
      for (const propDef of widget.props) {
        if (propDef.required) {
          widgetProps[propDef.name] = propDef.type.defaultValue;
        }
      }
      if (widget.scenarios) {
        const scenario = widget.scenarios[0];
        if (scenario) {
          for (const [propName, propValue] of Object.entries(scenario.props)) {
            widgetProps[propName] = propValue;
          }
        }
      }
      props[widget.name] = widgetProps;
    }
    this.dispatch({type: 'INIT', props});
  }

  render() {
    if (!this.props.ready) {
      return null;
    }
    return (
      <Container kind="views">
        <WidgetDocMenu widgetId={this.props.widgetId} />
        <WidgetDocProperties widgetId={this.props.widgetId} />
        <WidgetDocPreview widgetId={this.props.widgetId} />
      </Container>
    );
  }
}

export default Widget.connectWidget(state => {
  return {
    ready: state !== undefined,
  };
})(WidgetDoc);

/******************************************************************************/
