import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import widgetList from '../widget-doc/widget-list';
import Container from 'goblin-gadgets/widgets/container/widget';
import Label from 'goblin-gadgets/widgets/label/widget';
import TextInputNC from 'goblin-gadgets/widgets/text-input-nc/widget';
import Button from 'goblin-gadgets/widgets/button/widget';
import WidgetDocProperty from '../widget-doc-property/widget';
import * as styles from './styles';

/******************************************************************************/

function includes(sample, filter) {
  if (typeof sample === 'string') {
    return sample.includes(filter);
  } else if (typeof sample === 'object' && sample.text) {
    return sample.text.includes(filter);
  } else {
    return false;
  }
}

/******************************************************************************/

class WidgetDocProperties extends Widget {
  constructor() {
    super(...arguments);
    this.styles = styles;

    this.state = {
      filter: '',
      grouped: true,
    };

    this.onChangeFilter = this.onChangeFilter.bind(this);
    this.onSwapGrouped = this.onSwapGrouped.bind(this);
    this.setScenario = this.setScenario.bind(this);
  }

  //#region get/set
  get filter() {
    return this.state.filter;
  }

  set filter(value) {
    this.setState({
      filter: value,
    });
  }

  get grouped() {
    return this.state.grouped;
  }

  set grouped(value) {
    this.setState({
      grouped: value,
    });
  }
  //#endregion

  onChangeFilter(value) {
    this.filter = value;
  }

  onSwapGrouped() {
    this.grouped = !this.grouped;
  }

  shouldWeShow(prop) {
    if (this.filter) {
      const f = this.filter.toLowerCase();
      if (prop.name.toLowerCase().includes(f)) {
        return true;
      } else if (
        prop.description &&
        prop.description.toLowerCase().includes(f)
      ) {
        return true;
      } else if (
        prop.type.defaultValue &&
        prop.type.defaultValue.toLowerCase().includes(f)
      ) {
        return true;
      } else if (prop.type.type === f) {
        return true;
      } else if (
        prop.type.type === 'enum' &&
        prop.type.values.find((e) => e.includes(f))
      ) {
        return true;
      }
      const samples = prop.type.samples;
      return samples && samples.find((sample) => includes(sample, f));
    } else {
      return true;
    }
  }

  get properties() {
    const widgetInfo = widgetList.find(
      (widget) => widget.name === this.props.selectedWidget
    );
    return widgetInfo ? widgetInfo.props : null;
  }

  get scenarios() {
    const widgetInfo = widgetList.find(
      (widget) => widget.name === this.props.selectedWidget
    );
    return widgetInfo ? widgetInfo.scenarios : null;
  }

  setScenario(scenario) {
    for (const prop of this.properties) {
      const path = `props.${this.props.selectedWidget}.${prop.name}`;
      this.dispatch({type: 'DEL_PROP', path: path});
    }

    for (const [propName, propValue] of Object.entries(scenario.props)) {
      const path = `props.${this.props.selectedWidget}.${propName}`;
      this.dispatch({type: 'SET_PROP', path: path, value: propValue});
    }
  }

  /******************************************************************************/

  renderFilter() {
    if (this.filter) {
      return (
        <div className={this.styles.classNames.filter}>
          <Label width="100px" text="Filter" />
          <TextInputNC
            grow="1"
            shape="left-rounded"
            horizontalSpacing="overlap"
            value={this.filter}
            onChange={this.onChangeFilter}
          />
          <Button
            shape="right-rounded"
            glyph="solid/eraser"
            onClick={() => (this.filter = '')}
          />
          <Label width="20px" />
          <Button
            shape="rounded"
            glyph="light/cube"
            active={this.grouped}
            onClick={this.onSwapGrouped}
          />
        </div>
      );
    } else {
      return (
        <div className={this.styles.classNames.filter}>
          <Label width="100px" text="Filter" />
          <TextInputNC
            grow="1"
            shape="rounded"
            horizontalSpacing="overlap"
            value={this.filter}
            onChange={this.onChangeFilter}
          />
          <Label width="20px" />
          <Button
            shape="rounded"
            glyph="light/cube"
            active={this.grouped}
            onClick={this.onSwapGrouped}
          />
        </div>
      );
    }
  }

  /******************************************************************************/

  renderScenario(scenario, index) {
    return (
      <Button
        key={index}
        text={scenario.name}
        horizontalSpacing="overlap"
        onClick={() => this.setScenario(scenario)}
      />
    );
  }

  renderScenarios() {
    const scenarios = this.scenarios;
    if (scenarios) {
      return (
        <div className={this.styles.classNames.scenarios}>
          <Label width="100px" text="Scenarios" />
          <div className={this.styles.classNames.scenarioButtons}>
            {scenarios.map((scenario, index) =>
              this.renderScenario(scenario, index)
            )}
          </div>
        </div>
      );
    } else {
      return null;
    }
  }

  /******************************************************************************/

  renderProp(prop, index) {
    return (
      <WidgetDocProperty
        key={index}
        widgetId={this.props.widgetId}
        prop={prop}
        path={`props.${this.props.selectedWidget}`}
      />
    );
  }

  renderProperties(properties) {
    properties.sort(function (a, b) {
      const ka = a.name;
      const kb = b.name;
      if (ka < kb) {
        return -1;
      } else if (ka > kb) {
        return 1;
      } else {
        return 0;
      }
    });

    return properties.map((prop, index) => this.renderProp(prop, index));
  }

  renderGroup(groupName, properties) {
    properties = properties.filter((p) => this.shouldWeShow(p));
    if (properties.length > 0) {
      return (
        <Container kind="pane" key={groupName}>
          {groupName === '_' ? null : (
            <Container kind="row">
              <Label text={groupName} grow="1" kind="title" />
            </Container>
          )}
          {this.renderProperties(properties)}
        </Container>
      );
    }
  }

  renderGroups() {
    const properties = this.properties;
    if (!properties) {
      return null;
    }

    const groups = new Map();
    for (const prop of properties) {
      const groupName = this.grouped ? prop.group || '_' : '_';
      if (!groups.has(groupName)) {
        groups.set(groupName, []);
      }
      const list = groups.get(groupName);
      list.push(prop);
    }
    const sortedGroups = new Map([...groups.entries()].sort());

    const result = [...sortedGroups]
      .map(([key, value]) => this.renderGroup(key, value))
      .filter((r) => !!r);

    if (result.length > 0) {
      return result;
    } else {
      return (
        <div className={this.styles.classNames.empty}>
          <Label text="No property matches the filter" />
        </div>
      );
    }
  }

  /******************************************************************************/

  render() {
    return (
      <Container kind="view" width="670px" horizontalSpacing="large">
        <Container kind="pane-header">
          <Label text="Properties" kind="pane-header" />
        </Container>
        {this.renderFilter()}
        {this.renderScenarios()}
        <Container kind="panes">{this.renderGroups()}</Container>
      </Container>
    );
  }
}

export default Widget.connectWidget((state) => {
  return {
    selectedWidget: state.get('selectedWidget'),
  };
})(WidgetDocProperties);

/******************************************************************************/
