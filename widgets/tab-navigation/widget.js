// @ts-check
import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';

class TabNavigation extends Widget {
  constructor() {
    super(...arguments);
  }

  static get wiring() {
    return {
      currentTab: 'currentTab',
      currentWidget: 'currentWidget',
      currentServiceId: 'currentServiceId',
      currentWidgetProps: 'currentWidgetProps',
    };
  }

  render() {
    const {currentWidget, widgets} = this.props;
    if (!(currentWidget in widgets)) {
      throw new Error(`Unknown widget '${currentWidget}'`);
    }
    const Component = this.props.widgets[this.props.currentWidget];
    const serviceId = this.props.currentServiceId;
    let widgetProps = this.props.currentWidgetProps;
    if (widgetProps) {
      widgetProps = widgetProps.toObject();
    }
    return (
      <Component
        serviceId={serviceId}
        {...widgetProps}
        {...this.props.widgetsProps}
      />
    );
  }
}

/******************************************************************************/

const TabNavigationWired = Widget.Wired(TabNavigation);

export {TabNavigationWired as TabNavigation};
