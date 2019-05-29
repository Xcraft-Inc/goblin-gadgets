import React from 'react';
import Widget from 'laboratory/widget';
import widgetList from '../widget-doc/widget-list';
import Container from 'goblin-gadgets/widgets/container/widget';
import Label from 'goblin-gadgets/widgets/label/widget';
import CheckButton from 'goblin-gadgets/widgets/check-button/widget';
import WidgetDocPreviewContainer from '../widget-doc-preview-container/widget';
import Button from 'goblin-gadgets/widgets/button/widget';

/******************************************************************************/

function filterProp(prop) {
  if (prop.indexOf) {
    const i = prop.indexOf(' — ');
    if (i !== -1) {
      return prop.substring(0, i);
    }
  }
  return prop;
}

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
      <Container kind="row-pane" subkind="left">
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

  /******************************************************************************/

  renderCode() {
    const widgetName = this.widgetInfo.name;

    const code1 = `import ${widgetName} from '${this.widgetInfo.widgetPath}'`;

    let code2 = '';
    code2 += `<${widgetName}`;
    code2 += this.props.props
      .map((value, name) => ` ${name}="${value}"`)
      .join('');
    code2 += '/>';

    return (
      <div className={this.styles.classNames.container}>
        <pre className={this.styles.classNames.code}>{code1}</pre>
        <pre className={this.styles.classNames.code}>{code2}</pre>
      </div>
    );
  }

  /******************************************************************************/

  renderSettings() {
    return (
      <div className={this.styles.classNames.settings}>
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
      </div>
    );
  }

  /******************************************************************************/

  getComponent(name) {
    switch (name) {
      case 'short-text':
        return 'Hello world';
      case 'long-text':
        return (
          <Label
            text={`
              Ticket
              Deuxième ligne
              Troisième ligne
              Quatrième ligne
              Cinquième ligne
              Sixième ligne
              Septième ligne
              Huitième ligne
              Neuvième ligne
              Dixième ligne plus longue que les autres
            `}
          />
        );
      case 'button':
        return <Button text="Hello world" />;
      case 'button-10':
        return (
          <React.Fragment>
            <Button text="000" />
            <Button text="111" />
            <Button text="222" />
            <Button text="333" />
            <Button text="444" />
            <Button text="555" />
            <Button text="666" />
            <Button text="777" />
            <Button text="888" />
            <Button text="999" />
          </React.Fragment>
        );
    }
    return name;
  }

  getFunction(name) {
    switch (name) {
      case 'alert':
        return () => alert(new Date().toLocaleDateString());

      case 'log':
        return (...args) => console.log(...args);
    }
    return () => {};
  }

  renderWidget(key) {
    const props = this.props.props.toJS();
    for (const propName in props) {
      const propDef = this.widgetInfo.props.find(
        prop => prop.name === propName
      );
      if (!propDef) {
        continue;
      }
      if (propDef.type.type === 'component') {
        props[propName] = this.getComponent(props[propName]);
      } else if (propDef.type.type === 'function') {
        props[propName] = this.getFunction(props[propName]);
      }
    }
    return <this.widgetInfo.widget key={key} {...props} />;
  }

  renderWidgets() {
    return Array.from({length: this.props.items}, (v, k) =>
      this.renderWidget(k)
    );
  }

  /******************************************************************************/

  renderPreview() {
    this.widgetInfo = widgetList.find(
      widget => widget.name === this.props.selectedWidget
    );
    if (!this.widgetInfo) {
      return null;
    }

    return (
      <Container kind="panes">
        <Container kind="pane">
          <Label text="Code" kind="title" />
          {this.renderCode()}
        </Container>

        <Container kind="pane">
          <Label text="Settings" kind="title" />
          {this.renderSettings()}
        </Container>

        <Container kind="pane" grow="1">
          <Label text={this.widgetInfo.name} kind="title" />
          <WidgetDocPreviewContainer widgetId={this.props.widgetId}>
            {this.renderWidgets()}
          </WidgetDocPreviewContainer>
        </Container>
      </Container>
    );
  }

  render() {
    return (
      <Container kind="view" grow="1">
        <Container kind="pane-header">
          <Label text="Preview" kind="pane-header" />
        </Container>
        {this.renderPreview()}
      </Container>
    );
  }
}

export default Widget.connectWidget(state => {
  const settings = state.get('settings');
  const selectedWidget = state.get('selectedWidget');
  return {
    selectedWidget,
    props: state.get('props').get(selectedWidget),
    items: settings.get('items'),
  };
})(WidgetDocPreview);

/******************************************************************************/
