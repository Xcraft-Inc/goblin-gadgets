//T:2019-02-27
import React from 'react';
import Form from 'goblin-laboratory/widgets/form';
import {ColorManipulator} from 'electrum-theme';

import Button from 'goblin-gadgets/widgets/button/widget';
import Container from 'goblin-gadgets/widgets/container/widget';
import Label from 'goblin-gadgets/widgets/label/widget';
import TextField from 'goblin-gadgets/widgets/text-field/widget';
import TextFieldCombo from 'goblin-gadgets/widgets/text-field-combo/widget';
import LabelTextField from 'goblin-gadgets/widgets/label-text-field/widget';
import TextFieldTyped from 'goblin-gadgets/widgets/text-field-typed/widget';
import Checkbox from 'goblin-gadgets/widgets/checkbox/widget';
import Gauge from 'goblin-gadgets/widgets/gauge/widget';
import Ticket from 'goblin-gadgets/widgets/ticket/widget';
import Field from 'goblin-gadgets/widgets/field/widget';
import * as styles from './styles';

function getOnlyDigits(value) {
  let result = '';
  for (let i = 0; i < value.length; i++) {
    const c = value[i];
    if (c === '-' || (c >= '0' && c <= '9')) {
      result += c;
    }
  }
  return result;
}

function getOnlyColor(value) {
  const i = value.indexOf(' —');
  if (i > 0) {
    return value.substring(0, i);
  }
  return value;
}

function getPropertyValue(property, mode) {
  const value = property.get('value');
  const unit = property.get('unit');
  if (value && unit) {
    if (unit === 'color') {
      if (mode === 'finalValue') {
        return getOnlyColor(value);
      } else {
        return value;
      }
    } else {
      return getOnlyDigits(value) + unit;
    }
  }
  return value;
}

function compareStrings(s1, s2) {
  if (s1 < s2) {
    return -1;
  }
  if (s1 > s2) {
    return 1;
  }
  return 0;
}

class Wizard extends Form {
  constructor() {
    super(...arguments);
    this.styles = styles;
  }

  static get wiring() {
    return {
      id: 'id',
    };
  }

  getGlobalSettingValue(id) {
    return this.getModelValue(`.globalSettings.${id}.value`);
  }

  setGlobalSettingValue(id, value) {
    this.setModelValue(`.globalSettings.${id}.value`, value);
  }

  get widget() {
    return this.getGlobalSettingValue('widget');
  }

  set widget(value) {
    this.setGlobalSettingValue('widget', value);
  }

  get widgets() {
    return this.getModelValue('.properties');
  }

  get properties() {
    return this.getModelValue('.properties').get(this.widget);
  }

  get previewSettings() {
    return this.getModelValue('.previewSettings').filter(
      preview => preview.size > 0
    );
  }

  getPreviewSettingValue(id) {
    return this.getModelValue(`.previewSettings.${id}.value`);
  }

  setPreviewSettingValue(id, value) {
    this.setModelValue(`.previewSettings.${id}.value`, value);
  }

  getCode() {
    var result = `<${this.widget} `;
    this.properties
      .filter(property => property.size > 0)
      .sort((p1, p2) => compareStrings(p1.get('group'), p2.get('group')))
      .sort((p1, p2) => compareStrings(p1.get('field'), p2.get('field')))
      .forEach(property => {
        const field = property.get('field');
        const value = getPropertyValue(property, 'finalValue');
        if (value !== '') {
          result += `${field}="${value}" `;
        }
      });
    result += '/>';
    return result;
  }

  /******************************************************************************/
  // First column WIDGET
  /******************************************************************************/

  renderMenuItem(widgetName, index) {
    const WButton = this.WithModel(Button, _ => {
      return {
        glyph:
          this.widget === widgetName ? 'solid/chevron-right' : 'solid/none',
      };
    })('.globalSettings.widget.value');

    return (
      <WButton
        key={index}
        text={widgetName}
        kind="menu-item"
        glyphPosition="right"
        justify="between"
        textTransform="none"
        onClick={() => (this.widget = widgetName)}
      />
    );
  }

  renderMenuItems() {
    let index = 0;
    return this.widgets
      .sort(widget => widget.get('id'))
      .sort((w1, w2) => compareStrings(w1.get('id'), w2.get('id')))
      .map(widget => {
        return this.renderMenuItem(widget.get('id'), index++);
      })
      .toArray();
  }

  renderMenu() {
    return (
      <Container
        kind="view"
        horizontalSpacing="large"
        backgroundColor={this.context.theme.palette.footerBackground}
      >
        <Container kind="pane-header">
          <Label text="Widget" kind="pane-header" />
        </Container>
        <Container kind="panes">{this.renderMenuItems()}</Container>
      </Container>
    );
  }

  /******************************************************************************/
  // Second column PROPERTIES
  /******************************************************************************/

  renderProperty(property, index) {
    const type = property.get('type');
    const field = property.get('field');
    const list = property.get('list');

    const model = `.properties.${this.widget}.${field}.value`;
    if (type === 'combo' || (type === 'text' && list)) {
      return (
        <Container kind="row-pane" key={index}>
          <Label text={field} width="180px" />
          <TextFieldCombo
            model={model}
            menuType="wrap"
            readonly={type === 'combo'}
            grow="1"
            list={list}
            defaultValue={property.get('value')}
            comboTextTransform="none"
            onSetText={text => {
              this.setModelValue(model, text);
            }}
          />
        </Container>
      );
    } else if (type === 'bool') {
      const Checkbox = this.WithModel(Button, val => {
        if (val) {
          return {glyph: 'solid/check'};
        } else {
          return {glyph: null};
        }
      })(model);

      return (
        <Container kind="row-pane" subkind="left" key={index}>
          <Label text={field} width="180px" />
          <Checkbox
            width="32px"
            focusable={true}
            onChange={() => {
              this.setModelValue(model, !this.getModelValue(model));
            }}
          />
        </Container>
      );
    } else {
      return (
        <Container kind="row-pane" key={index}>
          <Label text={field} width="180px" />
          <TextField model={model} grow="1" />
        </Container>
      );
    }
  }

  renderPropertyList(group) {
    let index = 0;
    return this.properties
      .filter(property => property.size > 0)
      .filter(property => property.get('group') === group)
      .sort((p1, p2) => compareStrings(p1.get('field'), p2.get('field')))
      .map(property => {
        return this.renderProperty(property, index++);
      })
      .toArray();
  }

  renderPropertyGroup(group, index) {
    return (
      <Container kind="pane" key={index}>
        <Container kind="row-pane">
          <Label text={group} grow="1" kind="title" />
        </Container>
        {this.renderPropertyList(group)}
      </Container>
    );
  }

  renderPropertyGroups() {
    const groups = [];
    this.properties
      .filter(property => property.size > 0)
      .sort((p1, p2) => compareStrings(p1.get('group'), p2.get('group')))
      .map(property => {
        const group = property.get('group');
        if (groups.indexOf(group) === -1) {
          groups.push(group);
        }
      });
    const result = [];
    let index = 0;
    for (const group of groups) {
      result.push(this.renderPropertyGroup(group, index++));
    }
    return result;
  }

  renderProperties() {
    const PropertyGroups = this.WithModel(_ => {
      return <Container kind="panes">{this.renderPropertyGroups()}</Container>;
    })('.properties');

    return (
      <Container kind="view" width="500px" horizontalSpacing="large">
        <Container kind="pane-header">
          <Label text="Properties" kind="pane-header" />
        </Container>
        <PropertyGroups />
      </Container>
    );
  }

  /******************************************************************************/
  // Last column PREVIEW
  /******************************************************************************/

  renderWidgetBaseTicket() {
    const result = [];
    const lines = [
      'Ticket',
      'Deuxième ligne',
      'Troisième ligne',
      'Quatrième ligne',
      'Cinquième ligne',
      'Sixième ligne',
      'Septième ligne',
      'Huitième ligne',
      'Neuvième ligne',
      'Dixième ligne plus longue que les autres',
    ];
    for (let i = 0; i < this.getPreviewSettingValue('ticketLines'); i++) {
      result.push(<Label key={i} text={lines[i]} wrap="no" />);
    }
    return result;
  }

  renderWidgetBaseContainer() {
    const result = [];
    const type = this.getPreviewSettingValue('containerType');
    if (type === 'button') {
      const lines = [
        'Janvier',
        'Février',
        'Mars',
        'Avril',
        'Main',
        'Juin',
        'Juillet',
        'Août',
        'Septembre',
        'Octobre',
        'Novembre',
        'Décembre',
      ];
      for (let i = 0; i < this.getPreviewSettingValue('containerItems'); i++) {
        result.push(<Button key={i} text={lines[i]} wrap="no" />);
      }
    } else if (type === 'glyph') {
      const lines = [
        'solid/bicycle',
        'solid/ship',
        'solid/subway',
        'solid/bus',
        'solid/truck',
        'solid/taxi',
        'solid/motorcycle',
        'solid/car',
        'solid/train',
        'solid/plane',
        'solid/fighter-jet',
        'solid/rocket',
      ];
      for (let i = 0; i < this.getPreviewSettingValue('containerItems'); i++) {
        result.push(<Button key={i} glyph={lines[i]} wrap="no" />);
      }
    } else {
      const lines = [
        'Container',
        'Deuxième ligne',
        'Troisième ligne',
        'Quatrième ligne',
        'Cinquième ligne',
        'Sixième ligne',
        'Septième ligne',
        'Huitième ligne',
        'Neuvième ligne',
        'Dixième ligne plus longue que les autres',
        'Onzième ligne',
        'Douzième ligne',
      ];
      for (let i = 0; i < this.getPreviewSettingValue('containerItems'); i++) {
        result.push(<Label key={i} text={lines[i]} wrap="no" />);
      }
    }
    return result;
  }

  renderWidgetBaseTextFieldCombo(index, props) {
    let list = [];
    switch (this.getPreviewSettingValue('textFieldComboMenu')) {
      case 'long':
        list = [
          'TextFieldCombo',
          'Adrien',
          'Albert',
          'Alfred',
          'André',
          'Anne',
          'Arnaud',
          'Béatrice',
          'Bernard',
          'Bertrand',
          'Bruno',
          'Christian',
          'Christine',
          'Christiane',
          'Christophe',
          'Claire',
          'Daniel',
          'David',
          'Denis',
          'Didier',
          'Eléonore',
          'Eric',
          'Esther',
          'Fabien',
          'François',
          'Francine',
          'Géraldine',
          'Georges',
          'Grégoire',
          'Hypolite',
          'Jean',
          'Jean-Daniel',
          'Jean-Louis',
          'Jean-Bernard',
          'Jean-Frédérique-Louis-Bernard-André',
          'Jérémie',
          'Jimmy',
          'Johnny',
          'Judas',
          'Julien',
          'Karl',
          'Karinne',
          'Louis',
          'Lucette',
          'Marianne',
          'Maurice',
          'Marcel',
          'Marie',
          'Nicolas',
          'Nicole',
          'Nolvène',
          'Odile',
          'Orson',
          'Paul',
          'Pauline',
          'Pierre',
          'Pierrette',
          'Raymond',
          'René',
          'Régine',
          'Sandra',
          'Sophie',
          'Stéphane',
          'Théodore',
          'Thérèse',
          'Timotée',
          'Tristan',
          'Ursula',
          'Victor',
          'Walter',
          'Xavier',
          'Zoé',
        ];
        break;
      case 'glyphs':
        list = [
          {glyph: 'solid/check', text: 'TextFieldCombo'},
          {glyph: 'solid/bicycle', text: 'Vélo'},
          {glyph: 'solid/ship', text: 'Bateau'},
          {glyph: 'solid/truck', text: 'Camion'},
          {glyph: 'solid/bus', text: 'Bus'},
          {glyph: 'solid/car', text: 'Voiture'},
          {glyph: 'solid/train', text: 'Train'},
          {glyph: 'solid/plane', text: 'Avion'},
          {glyph: 'solid/rocket', text: 'Fusée'},
        ];
        break;
      case 'special1':
        list = [
          'TextFieldCombo',
          'Rouge',
          'Vert',
          'Bleu',
          "Ceci est un long texte pour tester la mise en page, tellement long qu'il semble ne jamais finir !",
          'Première ligne<br/>Deuxième ligne<br/>Troisième ligne<br/>Quatrième ligne<br/>Cinquième ligne',
          'Jaune',
        ];
        break;
      case 'special2':
        list = [
          'TextFieldCombo',
          'Janvier',
          'Février',
          'Mars',
          'Avril',
          'Mai',
          'Juin',
          'Juillet',
          'Août',
          'Septembre',
          'Octobre',
          'Novembre',
          'Décembre',
          "Ceci est un long texte pour tester la mise en page, tellement long qu'il semble ne jamais finir !",
        ];
        break;
      default:
        list = [
          'TextFieldCombo',
          'Lundi',
          'Mardi',
          'Mercredi',
          'Jeudi',
          'Vendredi',
          'Samedi',
          'Dimanche',
        ];
        break;
    }
    return <TextFieldCombo key={index} model=".x" list={list} {...props} />;
  }

  renderWidgetBaseField(index, props) {
    let list = [];
    switch (this.getPreviewSettingValue('fieldMenu')) {
      case 'long':
        list = [
          'Adrien',
          'Albert',
          'Alfred',
          'André',
          'Anne',
          'Arnaud',
          'Béatrice',
          'Bernard',
          'Bertrand',
          'Bruno',
          'Christian',
          'Christine',
          'Christiane',
          'Christophe',
          'Claire',
          'Daniel',
          'David',
          'Denis',
          'Didier',
          'Eléonore',
          'Eric',
          'Esther',
          'Fabien',
          'François',
          'Francine',
          'Géraldine',
          'Georges',
          'Grégoire',
          'Hypolite',
        ];
        break;
      case 'middle':
        list = [
          'Lundi',
          'Mardi',
          'Mercredi',
          'Jeudi',
          'Vendredi',
          'Samedi',
          'Dimanche',
        ];
        break;
      default:
        list = ['Monsieur', 'Madame'];
        break;
    }
    return (
      <Field
        key={index}
        model=".x"
        model1=".y"
        model2=".z"
        list={list}
        {...props}
      />
    );
  }

  wireWidgetBase(component, props) {
    return this.WithModel(component, properties => {
      properties.map(property => {
        if (typeof property !== 'string') {
          const field = property.get('field');
          const value = getPropertyValue(property, 'finalValue');
          props[field] = value;
        }
      });
      return {...props};
    })(`.properties.${this.widget}`);
  }

  renderWidgetBase(index, props) {
    switch (this.widget) {
      case 'Button':
        return <Button key={index} {...props} />;
      case 'Label':
        return <Label key={index} {...props} />;
      case 'TextField':
        return (
          <TextField
            key={index}
            model={`.properties.${this.widget}.defaultValue.value`}
            {...props}
          />
        );
      case 'LabelTextField':
        return <LabelTextField key={index} model=".x" {...props} />;
      case 'TextFieldCombo':
        return this.renderWidgetBaseTextFieldCombo(index, props);
      case 'TextFieldTyped':
        return <TextFieldTyped key={index} model=".x" {...props} />;
      case 'Field':
        return this.renderWidgetBaseField(index, props);
      case 'Checkbox':
        return <Checkbox key={index} {...props} />;
      case 'Gauge':
        return (
          <Container
            key={index}
            kind="column"
            border="right"
            width="10px"
            height="50px"
          >
            <Gauge key={index} {...props} />
          </Container>
        );
      case 'Ticket':
        return (
          <Ticket key={index} {...props}>
            <Container kind="box" grow="1">
              {this.renderWidgetBaseTicket()}
            </Container>
          </Ticket>
        );
      case 'Container':
        return (
          <Container key={index} {...props}>
            {this.renderWidgetBaseContainer()}
          </Container>
        );
      default:
        return null;
    }
  }

  renderWidget(index) {
    const props = {};
    this.properties
      .filter(property => property.size > 0)
      .forEach(property => {
        const field = property.get('field');
        const value = getPropertyValue(property, 'finalValue');
        props[field] = value;
      });

    if (this.getPreviewSettingValue('showFrame')) {
      const frameStyle = {
        border: '1px solid #f00',
        display: 'flex',
        width: props.width,
        flexGrow: props.grow,
      };
      return (
        <div style={frameStyle} key={index}>
          {this.renderWidgetBase(index, props)}
        </div>
      );
    } else {
      return this.renderWidgetBase(index, props);
    }
  }

  renderWidgets() {
    const result = [];
    for (let i = 0; i < this.getPreviewSettingValue('items'); i++) {
      result.push(this.renderWidget(i));
    }
    return result;
  }

  renderPreviewSolo() {
    const backgroundColor = this.context.theme.palette[
      this.getPreviewSettingValue('color') + 'Background'
    ];
    // Specifies 'color' for widgets that do not define color (color='transparent' or null).
    const paneStyle = {
      display: 'flex',
      flexDirection: 'column',
      flexGrow: '1',
      flexBasis: '0',
      marginBottom: this.context.theme.shapes.containerMargin,
      padding: this.context.theme.shapes.containerMargin,
      backgroundColor: backgroundColor,
      color: ColorManipulator.emphasize(backgroundColor, 1),
      transition: this.context.theme.transitions.easeOut(),
    };

    let direction, wrap;
    switch (this.getPreviewSettingValue('layout')) {
      case 'row':
        direction = 'row';
        wrap = 'nowrap';
        break;
      case 'column':
        direction = 'column';
        wrap = 'nowrap';
        break;
      case 'wrap':
        direction = 'row';
        wrap = 'wrap';
        break;
    }

    const scale = this.getPreviewSettingValue('scale');
    const soloStyle = {
      display: 'flex',
      flexDirection: direction,
      flexWrap: wrap,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      transform: scale === 1 ? null : `scale(${scale})`,
      transformOrigin: scale === 1 ? null : 'top left',
      width: `${100 / scale}%`,
      transition: this.context.theme.transitions.easeOut(),
    };

    const WidgetCustomContainer = this.WithModel(
      () => (
        <div style={paneStyle}>
          <div style={soloStyle}>{this.renderWidgets()}</div>
        </div>
      ),
      _ => _
    )('.previewSettings');

    const WidgetCustomContainer2 = this.WithModel(
      WidgetCustomContainer,
      _ => _
    )('.properties');

    const WidgetCustomContainer3 = this.WithModel(
      WidgetCustomContainer2,
      _ => _
    )('.globalSettings.widget.value');

    return <WidgetCustomContainer3 />;
  }

  /******************************************************************************/
  // Panel of settings in column PREVIEW
  /******************************************************************************/

  renderPreviewSettingSwitch(value, getter, setter, index) {
    const SettingSwitch = this.WithModel(Checkbox, _ => {
      return {checked: getter() === value};
    })('.previewSettings');
    return (
      <SettingSwitch
        key={index}
        text={value}
        kind="active"
        onChange={() => {
          setter(value);
        }}
      />
    );
  }

  renderPreviewSettingList(preview, index) {
    const result = [];
    let i = 0;
    for (const item of preview.get('list')) {
      result.push(
        this.renderPreviewSettingSwitch(
          item,
          () => preview.get('value'),
          value => this.setPreviewSettingValue(preview.get('id'), value),
          index * 100 + i++
        )
      );
    }
    return result;
  }

  renderPreviewSettingBool(preview, index) {
    return (
      <Checkbox
        key={index * 100}
        kind="switch"
        checked={preview.get('value')}
        onChange={() => {
          this.setPreviewSettingValue(preview.get('id'), !preview.get('value'));
        }}
      />
    );
  }

  renderPreviewSetting(preview, index) {
    const type = preview.get('type');
    if (type === 'bool') {
      return [
        this.renderPreviewSettingBool(preview, index),
        <Label width="20px" />,
      ];
    } else {
      return [
        this.renderPreviewSettingList(preview, index),
        <Label width="20px" />,
      ];
    }
  }

  renderPreviewSettingsLine(group) {
    let index = 0;
    return this.previewSettings
      .filter(preview => preview.get('group') === group)
      .sort((p1, p2) => compareStrings(p1.get('order'), p2.get('order')))
      .map(preview => {
        return this.renderPreviewSetting(preview, index++);
      })
      .toArray();
  }

  renderPreviewSettingsGroup(group, index) {
    return (
      <Container key={index} kind="row-pane" subkind="left">
        <Label text={group} width="80px" />
        {this.renderPreviewSettingsLine(group)}
      </Container>
    );
  }

  renderPreviewSettings() {
    const groups = [];
    this.previewSettings
      .filter(preview => {
        const f = preview.get('for');
        return !f || f === this.widget;
      })
      .sort((p1, p2) => compareStrings(p1.get('order'), p2.get('order')))
      .forEach(preview => {
        const group = preview.get('group');
        if (groups.indexOf(group) === -1) {
          groups.push(group);
        }
      });
    const result = [];
    let index = 0;
    for (const group of groups) {
      result.push(this.renderPreviewSettingsGroup(group, index++));
    }
    return result;
  }

  renderPreview() {
    const classPanes = this.styles.classNames.panes;
    const Code = this.WithModel(Label, _ => {
      return {
        text: this.getCode(),
      };
    })('.properties');

    const PreviewSettings = this.WithModel(
      () => <Container kind="pane">{this.renderPreviewSettings()}</Container>,
      _ => _
    )('.globalSettings.widget.value');

    return (
      <Container kind="view" grow="1">
        <Container kind="pane-header">
          <Label text="Preview" kind="pane-header" />
        </Container>
        <div className={classPanes}>
          <Container kind="pane">
            <Container kind="row-pane">
              <Code grow="1" />
            </Container>
          </Container>
          <PreviewSettings />
          {this.renderPreviewSolo()}
        </div>
      </Container>
    );
  }

  /******************************************************************************/
  // Main
  /******************************************************************************/

  render() {
    const {id} = this.props;
    if (!id) {
      return null;
    }

    const Form = this.Form;

    const Preview = this.WithModel(
      () => <Container kind="views">{this.renderPreview()}</Container>,
      _ => _
    )('.previewSettings');

    return (
      <Form {...this.formConfig}>
        <Container kind="views">
          {this.renderMenu()}
          {this.renderProperties()}
          <Container kind="view" width="600px">
            <Preview />
            <Container kind="row" />
          </Container>
        </Container>
      </Form>
    );
  }
}

export default Wizard;
