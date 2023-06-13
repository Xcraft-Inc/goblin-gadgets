// @ts-check
const {Elf} = require('xcraft-core-goblin');
const {
  string,
  object,
  Sculpt,
  any,
  array,
  option,
} = require('xcraft-core-stones');

class NavigationViewShape {
  service = any;
  serviceArgs = option(array);
  widget = string;
  widgetProps = option(object);
}

class NavigationView extends Sculpt(NavigationViewShape) {}

/**
 * @typedef {{[name: string]: NavigationView}} NavigationViews
 */

class TabNavigationShape {
  id = string;
  currentTab = string;
  currentServiceId = string;
  currentWidget = string;
  currentWidgetProps = string;
}

class TabNavigationState extends Elf.Sculpt(TabNavigationShape) {}

class TabNavigationLogic extends Elf.Spirit {
  state = new TabNavigationState();

  create(id) {
    let {state} = this;
    state.id = id;
  }

  change(path, newValue) {
    const {state} = this;
    state[path] = newValue;
  }

  setTab(tab, serviceId, widget, widgetProps) {
    const {state} = this;
    state.currentTab = tab;
    state.currentServiceId = serviceId;
    state.currentWidget = widget;
    state.currentWidgetProps = widgetProps;
  }
}

class TabNavigation extends Elf {
  state = new TabNavigationState();

  /** @type {NavigationViews} */
  views;

  loadedServices = new Set();

  /**
   * @param {string} id
   * @param {string} desktopId
   * @param {NavigationViews} views
   * @returns {Promise<this>}
   */
  async create(id, desktopId, views) {
    this.desktopId = desktopId;
    this.views = views;
    this.do({id});
    const firstTab = Object.keys(views)[0];
    await this.setTab(firstTab);
    return this;
  }

  async change(path, newValue) {
    this.do({path, newValue});
  }

  async _loadService(tab) {
    if (this.loadedServices.has(tab)) {
      return;
    }
    this.loadedServices.add(tab);

    const view = this.views[tab];
    const ServiceClass = view.service;
    if (!ServiceClass) {
      return;
    }
    const serviceId = `${Elf.goblinName(ServiceClass)}@${Elf.uuid()}`;
    const serviceArgs = view.serviceArgs || [];
    await new ServiceClass(this).create(
      serviceId,
      this.desktopId,
      ...serviceArgs
    );
  }

  async setTab(tab) {
    if (!(tab in this.views)) {
      throw new Error('Unknown tab');
    }
    const serviceId = await this._loadService(tab);
    const view = this.views[tab];
    const widget = view.widget;
    const widgetProps = view.widgetProps;
    this.do({tab, serviceId, widget, widgetProps});
  }

  delete() {}
}

module.exports = {TabNavigation, TabNavigationLogic};
