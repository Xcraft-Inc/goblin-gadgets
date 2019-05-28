import React from 'react';
import Widget from 'laboratory/widget';
import widgetList from '../widget-doc/widget-list';
import Container from 'goblin-gadgets/widgets/container/widget';
import Label from 'goblin-gadgets/widgets/label/widget';
import WidgetDocProperty from '../widget-doc-property/widget';

/******************************************************************************/

/******************************************************************************/

class WidgetDocProperties extends Widget {
  constructor() {
    super(...arguments);
  }

  renderProp(prop) {
    return (
      <WidgetDocProperty
        key={prop.name}
        widgetId={this.props.widgetId}
        prop={prop}
        path={`props.${this.props.selectedWidget}`}
      />
    );
  }

  renderProperties(properties) {
    return properties.map(prop => this.renderProp(prop));
  }

  renderGroup(groupName, properties) {
    return (
      <Container kind="pane" key={groupName}>
        <Container kind="row">
          <Label text={groupName} grow="1" kind="title" />
        </Container>
        {this.renderProperties(properties)}
      </Container>
    );
  }

  renderGroups() {
    const widgetInfo = widgetList.find(
      widget => widget.name === this.props.selectedWidget
    );
    if (!widgetInfo) {
      return null;
    }

    const groups = new Map();
    for (const prop of widgetInfo.props) {
      if (!groups.has(prop.group)) {
        groups.set(prop.group, []);
      }
      const list = groups.get(prop.group);
      list.push(prop);
    }

    return [...groups].map(([key, value]) => this.renderGroup(key, value));
  }

  render() {
    return (
      <Container kind="view" width="670px" spacing="large">
        <Container kind="pane-header">
          <Label text="Properties" kind="pane-header" />
        </Container>
        <Container kind="panes">{this.renderGroups()}</Container>
      </Container>
    );
  }
}

export default Widget.connectWidget(state => {
  return {
    selectedWidget: state.get('selectedWidget'),
  };
})(WidgetDocProperties);

/******************************************************************************/
