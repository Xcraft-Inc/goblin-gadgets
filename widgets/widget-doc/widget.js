import React from 'react';
import Widget from 'laboratory/widget';
import Container from 'goblin-gadgets/widgets/container/widget';
import WidgetDocMenu from '../widget-doc-menu/widget';
import WidgetDocProperties from '../widget-doc-properties/widget';
import WidgetDocPreview from '../widget-doc-preview/widget';

/******************************************************************************/

class WidgetDoc extends Widget {
  constructor() {
    super(...arguments);
  }

  render() {
    if (!this.props.ready) {
      return null;
    }
    return (
      <Container kind="views">
        <Container kind="view">
          <WidgetDocMenu widgetId={this.props.widgetId} />
        </Container>
        <Container kind="view">
          <WidgetDocProperties widgetId={this.props.widgetId} />
        </Container>
        <Container kind="view" grow="1">
          <WidgetDocPreview widgetId={this.props.widgetId} />
        </Container>
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
