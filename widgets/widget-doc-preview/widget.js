import React from 'react';
import Widget from 'laboratory/widget';
import widgetList from '../widget-doc/widget-list';
import Container from 'goblin-gadgets/widgets/container/widget';
import Label from 'goblin-gadgets/widgets/label/widget';
import CheckButton from 'goblin-gadgets/widgets/check-button/widget';

/******************************************************************************/

class WidgetDocPreviewSettingsSwitch extends Widget {
  constructor() {
    super(...arguments);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    const value = !this.props.value;
    this.dispatch({type: 'SET', path: this.props.path, value});
  }

  render() {
    return (
      <Container kind="row">
        <Label text={this.props.text} width="80px" />
        <CheckButton
          checked={this.props.value}
          kind="switch"
          onClick={this.onClick}
        />
      </Container>
    );
  }
}

const SettingsSwitch = Widget.connectWidget((state, props) => {
  return {
    value: state.get(props.path),
  };
})(WidgetDocPreviewSettingsSwitch);

/******************************************************************************/

class WidgetDocPreviewSettingsList extends Widget {
  constructor() {
    super(...arguments);
    this.onClick = this.onClick.bind(this);
  }

  onClick(value) {
    this.dispatch({type: 'SET', path: this.props.path, value});
  }

  renderItem(value) {
    return (
      <CheckButton
        key={value}
        text={value}
        checked={this.props.value === value}
        kind="active"
        onClick={() => this.onClick(value)}
      />
    );
  }

  render() {
    return (
      <Container kind="row">
        <Label text={this.props.text} width="80px" />
        {this.props.list.map(value => this.renderItem(value))}
      </Container>
    );
  }
}

const SettingsList = Widget.connectWidget((state, props) => {
  return {
    value: state.get(props.path),
  };
})(WidgetDocPreviewSettingsList);

/******************************************************************************/

class WidgetDocPreview extends Widget {
  constructor() {
    super(...arguments);
  }

  renderCode(widgetName) {
    var code = `<${widgetName} `;
    code += this.props.props
      .map((value, name) => `${name}="${value}" `)
      .join(' ');
    code += '/>';
    return <Label text={code} />;
  }

  renderSettings() {
    return (
      <React.Fragment>
        <SettingsList
          text="Scale"
          widgetId={this.props.widgetId}
          path="settings.scale"
          list={[1, 1.5, 2, 3, 4]}
        />
        <SettingsList
          text="Color"
          widgetId={this.props.widgetId}
          path="settings.color"
          list={['pane', 'view', 'task', 'root', 'footer']}
        />
        <SettingsList
          text="Items"
          widgetId={this.props.widgetId}
          path="settings.items"
          list={[1, 2, 3, 4, 5, 10, 20]}
        />
        <SettingsList
          text="Layout"
          widgetId={this.props.widgetId}
          path="settings.layout"
          list={['row', 'column', 'wrap']}
        />
        <SettingsSwitch
          text="Frame"
          widgetId={this.props.widgetId}
          path="settings.frame"
        />
      </React.Fragment>
    );
  }

  render() {
    const widgetInfo = widgetList.find(
      widget => widget.name === this.props.selectedWidget
    );
    if (!widgetInfo) {
      return null;
    }

    return (
      <React.Fragment>
        <Container kind="pane">
          <Label text="Settings" grow="1" kind="title" />
          {this.renderSettings()}
        </Container>
        <Container kind="pane">
          <Label text="Code" grow="1" kind="title" />
          <Container kind="row-pane">
            {this.renderCode(widgetInfo.name)}
          </Container>
        </Container>
        <Container kind="pane">
          <Label text={widgetInfo.name} grow="1" kind="title" />
          <widgetInfo.widget {...this.props.props.toJS()} />
        </Container>
      </React.Fragment>
    );
  }
}

export default Widget.connectWidget(state => {
  return {
    selectedWidget: state.get('selectedWidget'),
    props: state.get('props'),
  };
})(WidgetDocPreview);

/******************************************************************************/
