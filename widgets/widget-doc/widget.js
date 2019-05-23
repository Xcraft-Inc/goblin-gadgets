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
      <Container className={this.styles.classNames.container} kind="views">
        <Container className={this.styles.classNames.widget} kind="view">
          <WidgetDocMenu widgetId={this.props.widgetId} />
        </Container>
        <Container className={this.styles.classNames.properties} kind="view">
          <WidgetDocProperties widgetId={this.props.widgetId} />
        </Container>
        <Container className={this.styles.classNames.preview} kind="view">
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
