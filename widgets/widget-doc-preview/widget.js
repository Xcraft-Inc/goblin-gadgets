import React from 'react';
import Widget from 'laboratory/widget';
import widgetList from '../widget-doc/widget-list';
import Container from 'goblin-gadgets/widgets/container/widget';
import Label from 'goblin-gadgets/widgets/label/widget';
import CheckButton from 'goblin-gadgets/widgets/check-button/widget';
import WidgetDocPreviewContainer from '../widget-doc-preview-container/widget';
import Button from 'goblin-gadgets/widgets/button/widget';

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

  renderCode() {
    const widgetName = this.widgetInfo.name;
    let code = '\n';
    code += `import ${widgetName} from '${this.widgetInfo.widgetPath}'`;
    code += `\n`;
    code += `<${widgetName} `;
    code += this.props.props
      .map((value, name) => `${name}="${value}" `)
      .join(' ');
    code += '/>';
    code += `\n\n`;
    return <pre className={this.styles.classNames.code}>{code}</pre>;
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

  render() {
    this.widgetInfo = widgetList.find(
      widget => widget.name === this.props.selectedWidget
    );
    if (!this.widgetInfo) {
      return null;
    }

    return (
      <React.Fragment>
        <Container className={this.styles.classNames.container} kind="pane">
          <Label text="Settings" grow="1" kind="title" />
          {this.renderSettings()}
        </Container>
        <Container className={this.styles.classNames.container} kind="pane">
          <Label text="Code" grow="1" kind="title" />
          {this.renderCode()}
        </Container>
        <Container
          className={this.styles.classNames.container}
          kind="pane"
          grow="1"
        >
          <Label text={this.widgetInfo.name} grow="1" kind="title" />
          <WidgetDocPreviewContainer widgetId={this.props.widgetId}>
            {this.renderWidgets()}
          </WidgetDocPreviewContainer>
        </Container>
      </React.Fragment>
    );
  }
}

export default Widget.connectWidget(state => {
  const settings = state.get('settings');
  return {
    selectedWidget: state.get('selectedWidget'),
    props: state.get('props'),
    items: settings.get('items'),
  };
})(WidgetDocPreview);

/******************************************************************************/
