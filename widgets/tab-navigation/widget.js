// @ts-check
import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';

class TabNavigation extends Widget {
  constructor() {
    super(...arguments);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  static get wiring() {
    return {
      currentTab: 'currentTab',
      currentWidget: 'currentWidget',
      currentServiceId: 'currentServiceId',
      currentWidgetProps: 'currentWidgetProps',
    };
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown(event) {
    if (event.ctrlKey) {
      if (event.key === '§') {
        this.switchTab();
      } else if (event.key === '°') {
        this.reverseSwitchTab();
      }
    }
  }

  switchTab() {
    this.doFor(this.props.id, 'switchTab');
  }

  reverseSwitchTab() {
    this.doFor(this.props.id, 'switchTab', {reverse: true});
  }

  render() {
    const {currentWidget, widgets} = this.props;
    if (!currentWidget) {
      return null;
    }
    if (!(currentWidget in widgets)) {
      throw new Error(`Unknown widget '${currentWidget}'`);
    }
    const Component = this.props.widgets[this.props.currentWidget];
    const serviceId =
      this.props.currentServiceId || this.props.widgetsProps?.id;
    let widgetProps = this.props.currentWidgetProps;
    if (widgetProps) {
      widgetProps = widgetProps.toObject();
    }
    return (
      <Component {...widgetProps} {...this.props.widgetsProps} id={serviceId} />
    );
  }
}

/******************************************************************************/

const TabNavigationWired = Widget.Wired(TabNavigation);

export {TabNavigationWired as TabNavigation};
