import React from 'react';
import Widget from 'laboratory/widget';
import widgetList from '../widget-doc/widget-list';
import Container from 'goblin-gadgets/widgets/container/widget';
import Label from 'goblin-gadgets/widgets/label/widget';
import TextFieldBasis from 'goblin-gadgets/widgets/text-field-basis/widget';
import Button from 'goblin-gadgets/widgets/button/widget';
import WidgetDocProperty from '../widget-doc-property/widget';

/******************************************************************************/

/******************************************************************************/

class WidgetDocProperties extends Widget {
  constructor() {
    super(...arguments);

    this.state = {
      filter: '',
    };

    this.onChangeFilter = this.onChangeFilter.bind(this);
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
  //#endregion

  onChangeFilter(value) {
    this.filter = value;
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
        prop.type.values.find(e => e.includes(f))
      ) {
        return true;
      }
      return false;
    } else {
      return true;
    }
  }

  /******************************************************************************/

  renderFilter() {
    if (this.filter) {
      return (
        <div className={this.styles.classNames.filter}>
          <Label text="Filtre" />
          <TextFieldBasis
            grow="1"
            shape="left-rounded"
            spacing="overlap"
            value={this.filter}
            onChange={this.onChangeFilter}
          />
          <Button
            shape="right-rounded"
            glyph="solid/eraser"
            onClick={() => (this.filter = '')}
          />
        </div>
      );
    } else {
      return (
        <div className={this.styles.classNames.filter}>
          <Label text="Filtre" />
          <TextFieldBasis
            grow="1"
            shape="rounded"
            spacing="overlap"
            value={this.filter}
            onChange={this.onChangeFilter}
          />
        </div>
      );
    }
  }

  /******************************************************************************/

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
    properties = properties.filter(p => this.shouldWeShow(p));
    if (properties.length > 0) {
      return (
        <Container kind="pane" key={groupName}>
          <Container kind="row">
            <Label text={groupName} grow="1" kind="title" />
          </Container>
          {this.renderProperties(properties)}
        </Container>
      );
    }
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

  /******************************************************************************/

  render() {
    return (
      <Container kind="view" width="670px" spacing="large">
        <Container kind="pane-header">
          <Label text="Properties" kind="pane-header" />
        </Container>
        {this.renderFilter()}
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
