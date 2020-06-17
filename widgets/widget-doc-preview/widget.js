import React from 'react';
import _ from 'lodash';
import Widget from 'goblin-laboratory/widgets/widget';
import widgetList from '../widget-doc/widget-list';
import Container from 'goblin-gadgets/widgets/container/widget';
import Label from 'goblin-gadgets/widgets/label/widget';
import Checkbox from 'goblin-gadgets/widgets/checkbox/widget';
import WidgetDocPreviewContainer from '../widget-doc-preview-container/widget';
import Button from 'goblin-gadgets/widgets/button/widget';
import TextFieldNC from '../text-field-nc/widget';
import TextInputNC from '../text-input-nc/widget';
import CarouselItem from '../carousel-item/widget';
import parseCode from './parse-code';
import * as styles from './styles';

/******************************************************************************/

function getComponent(name) {
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
    case 'text-field':
      return <TextInputNC value="Jean Dupond" />;
    case 'text-field-multiline':
      return (
        <TextInputNC
          value={'Lundi\nMardi\nMercredi\nJeudi\nVendredi\nSamedi\nDimanche'}
          rows="7"
        />
      );
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
    case 'carousel-panes':
      return (
        <React.Fragment>
          <CarouselItem
            width="200px"
            height="300px"
            itemMargin="10px"
            backgroundColor="yellow"
          />
          <CarouselItem
            width="200px"
            height="300px"
            itemMargin="10px"
            backgroundColor="orange"
          />
          <CarouselItem
            width="200px"
            height="300px"
            itemMargin="10px"
            backgroundColor="red"
          />
          <CarouselItem
            width="200px"
            height="300px"
            itemMargin="10px"
            backgroundColor="purple"
          />
          <CarouselItem
            width="200px"
            height="300px"
            itemMargin="10px"
            backgroundColor="blue"
          />
        </React.Fragment>
      );
    case 'two-boxes':
      return (
        <React.Fragment>
          <Container width="100%" height="100%" backgroundColor="aliceblue" />
          <Container
            width="100%"
            height="100%"
            backgroundColor="lemonchiffon"
          />
        </React.Fragment>
      );
  }
  return name;
}

function getFunction(name) {
  switch (name) {
    case 'alert':
      return () => alert(new Date().toLocaleDateString());
    case 'log':
      return (...args) => console.log(...args);
  }
  return () => {};
}

/******************************************************************************/

class WidgetDocPreviewSettingsSwitch extends Widget {
  constructor() {
    super(...arguments);
    this.styles = styles;

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    const value = !this.props.value;
    this.dispatch({type: 'SET', path: this.props.path, value});
  }

  render() {
    return (
      <Checkbox
        text={this.props.text}
        checked={this.props.value}
        kind="switch"
        onChange={this.onClick}
      />
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

  renderItem(value, includes) {
    return (
      <Checkbox
        key={value}
        text={value}
        checked={value === this.props.value || (value === 'other' && !includes)}
        kind="active"
        onChange={() => this.onClick(value)}
      />
    );
  }

  render() {
    const includes = this.props.list.includes(this.props.value);
    return (
      <Container kind="row-pane" subkind="left">
        <Label
          text={this.props.text}
          width={this.props.labelWidth || '120px'}
          justify={this.props.labelJustify}
        />
        {this.props.list.map((value) => this.renderItem(value, includes))}
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
    this.onChange = this.onChange.bind(this);
  }

  onChange(value) {
    const props = parseCode(value);

    this.dispatch({
      type: 'SET',
      path: 'props.' + this.widgetInfo.name,
      value: props,
    });
  }

  renderCode() {
    const widgetName = this.widgetInfo.name;

    const code1 = `import ${widgetName} from '${this.widgetInfo.widgetPath}'`;

    let code2 = '';
    code2 += `<${widgetName}`;
    code2 += this.props.props
      .map((value, propName) => {
        const propDef = this.widgetInfo.props.find(
          (prop) => prop.name === propName
        );
        if (propDef.type.samplesData) {
          value = JSON.stringify(propDef.type.samplesData[value]);
        } else if (typeof value === 'string') {
          value = `"${value}"`;
        } else {
          value = `{${JSON.stringify(value)}}`;
        }
        value = value ? value.replace(/\n/gi, '\\n') : '';
        return ` ${propName}=${value}`;
      })
      .join('');
    code2 += '/>';

    return (
      <div className={this.styles.classNames.container}>
        <pre className={this.styles.classNames.code}>{code1}</pre>
        <TextFieldNC rows={'3'} onChange={this.onChange} value={code2} />
      </div>
    );
  }

  renderSettings() {
    return (
      <div className={this.styles.classNames.settings}>
        <SettingsList
          text="Theme context"
          widgetId={this.props.widgetId}
          path="settings.themeContext"
          list={['theme', 'polypheme', 'horizon', 'shop', 'senecio']}
        />
        <SettingsList
          text="Theme"
          widgetId={this.props.widgetId}
          path="settings.theme"
          list={['none', 'default', 'shop', 'default-compact']}
        />
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
          text="Container"
          widgetId={this.props.widgetId}
          path="settings.container"
          list={['div', 'resizable']}
        />
        <SettingsList
          text="Width"
          widgetId={this.props.widgetId}
          path="settings.containerWidth"
          list={['unset', 50, 100, 200, 500, 'other']}
        />
        <SettingsList
          text="Height"
          widgetId={this.props.widgetId}
          path="settings.containerHeight"
          list={['unset', 50, 100, 200, 500, 'other']}
        />
        <SettingsList
          text="FlexGrow"
          widgetId={this.props.widgetId}
          path="settings.flexGrow"
          list={['unset', '1']}
        />
        <SettingsList
          text="FlexDirection"
          widgetId={this.props.widgetId}
          path="settings.flexDirection"
          list={['row', 'column']}
        />
        <SettingsList
          text="FlexWrap"
          widgetId={this.props.widgetId}
          path="settings.flexWrap"
          list={['no-wrap', 'wrap']}
        />
        <SettingsList
          text="Overflow"
          widgetId={this.props.widgetId}
          path="settings.overflow"
          list={['unset', 'hidden', 'auto']}
        />
        <Container kind="row">
          <SettingsSwitch
            text="Frame"
            widgetId={this.props.widgetId}
            path="settings.frame"
          />
          <Label width="20px" />
          <SettingsSwitch
            text="Container frame"
            widgetId={this.props.widgetId}
            path="settings.layoutFrame"
          />
        </Container>
      </div>
    );
  }

  renderWidget(key) {
    const props = this.props.props.toJS();
    for (const propName in props) {
      const propDef = this.widgetInfo.props.find(
        (prop) => prop.name === propName
      );
      if (!propDef) {
        continue;
      }
      if (propDef.type.type === 'component') {
        props[propName] = getComponent(props[propName]);
      } else if (propDef.type.type === 'function') {
        props[propName] = getFunction(props[propName]);
      } else if (propDef.type.type === 'oneOfType') {
        // If oneOfType, replace {type: 'percentage', value: '10%'} by '10%'.
        props[propName] = props[propName].value;
      }
      if (propDef.type.samplesData) {
        props[propName] = propDef.type.samplesData[props[propName]];
      }
    }
    key = this.props.theme ? this.props.theme + key : key;

    return (
      <this.widgetInfo.widget
        key={key}
        widgetDocPreview={true}
        {...props}
        widgetId={`${this.props.widgetId}@preview-widget`}
      />
    );
  }

  renderWidgets() {
    return Array.from({length: this.props.items}, (v, k) =>
      this.renderWidget(k)
    );
  }

  renderPreview() {
    this.widgetInfo = widgetList.find(
      (widget) => widget.name === this.props.selectedWidget
    );
    if (!this.widgetInfo) {
      return null;
    }

    return (
      <div className={this.styles.classNames.panes}>
        <div className={this.styles.classNames.paneCode}>
          <Label text="Code" kind="title" />
          {this.renderCode()}
        </div>

        <div className={this.styles.classNames.paneSettings}>
          <Label text="Settings" kind="title" />
          {this.renderSettings()}
        </div>

        <div className={this.styles.classNames.paneSamples}>
          <Label text={_.kebabCase(this.widgetInfo.name)} kind="title" />
          <WidgetDocPreviewContainer widgetId={this.props.widgetId}>
            {this.renderWidgets()}
          </WidgetDocPreviewContainer>
        </div>
      </div>
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

/******************************************************************************/

export default Widget.connectWidget((state) => {
  const settings = state.get('settings');
  const selectedWidget = state.get('selectedWidget');
  return {
    selectedWidget,
    theme: settings.get('theme'),
    props: state.get('props').get(selectedWidget),
    items: settings.get('items'),
  };
})(WidgetDocPreview);

/******************************************************************************/
