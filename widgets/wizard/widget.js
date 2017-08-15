import React from 'react';
import Widget from 'laboratory/widget';
import Form from 'laboratory/form';
import {Unit} from 'electrum-theme';

import Button from 'gadgets/button/widget';
import Container from 'gadgets/container/widget';
import Label from 'gadgets/label/widget';
import TextField from 'gadgets/text-field/widget';
import TextFieldCombo from 'gadgets/text-field-combo/widget';
import LabelTextField from 'gadgets/label-text-field/widget';
import Separator from 'gadgets/separator/widget';
import Splitter from 'gadgets/splitter/widget';
import CheckButton from 'gadgets/check-button/widget';
import Gauge from 'gadgets/gauge/widget';
import Ticket from 'gadgets/ticket/widget';

function getOnlyDigits (value) {
  let result = '';
  for (let i = 0; i < value.length; i++) {
    const c = value[i];
    if (c === '-' || (c >= '0' && c <= '9')) {
      result += c;
    }
  }
  return result;
}

function getOnlyColor (value) {
  const i = value.indexOf (' —');
  if (i > 0) {
    return value.substring (0, i);
  }
  return value;
}

function getValue (param, finalValue) {
  const value = param.get ('value');
  const unit = param.get ('unit');
  if (value && unit) {
    if (unit === 'color') {
      if (finalValue) {
        return getOnlyColor (value);
      } else {
        return value;
      }
    } else {
      return getOnlyDigits (value) + unit;
    }
  }
  return value;
}

class Wizard extends Form {
  constructor () {
    super (...arguments);
  }

  static get wiring () {
    return {
      id: 'id',
      globalSettings: 'globalSettings',
      params: 'params',
      previews: 'previews',
    };
  }

  get widget () {
    return this.props.globalSettings.get ('widget').get ('value');
  }

  set widget (value) {
    this.do ('change-global-settings-widget', {newValue: value});
  }

  get params () {
    return this.shred (this.props.params.get (this.widget)).linq.where (
      param => param.size > 0
    );
  }

  get previews () {
    return this.shred (this.props.previews).linq.where (
      preview => preview.size > 0
    );
  }

  getPreviewValue (id) {
    const x = this.previews
      .where (preview => preview.get ('id') === id)
      .first ();
    return x.get ('value');
  }

  setPreviewValue (id, value) {
    this.do (`change-preview-${id}`, {newValue: value});
  }

  getCode () {
    var result = `<${this.widget} `;
    this.params
      .orderBy (param => param.get ('group'))
      .orderBy (param => param.get ('field'))
      .select (param => {
        const field = param.get ('field');
        const value = getValue (param, true);
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

  renderMenuItem (widget, index) {
    return (
      <Button
        key={index}
        text={widget}
        kind="menu-item"
        glyph={this.widget === widget ? 'chevron-right' : 'none'}
        glyphPosition="right"
        justify="between"
        textTransform="none"
        onClick={() => (this.widget = widget)}
      />
    );
  }

  renderMenuItems () {
    const widgets = this.shred (this.props.params);
    let index = 0;
    return widgets.linq
      .orderBy (widget => widget.get ('id'))
      .select (widget => {
        return this.renderMenuItem (widget.get ('id'), index++);
      })
      .toList ();
  }

  renderMenu () {
    return (
      <Container
        kind="view"
        spacing="large"
        backgroundColor={this.context.theme.palette.footerBackground}
      >
        <Container kind="pane-header">
          <Label text="Widget" kind="pane-header" />
        </Container>
        <Container kind="panes">
          {this.renderMenuItems ()}
        </Container>
      </Container>
    );
  }

  /******************************************************************************/
  // Second column PROPERTIES
  /******************************************************************************/

  renderParam (param, index) {
    const type = param.get ('type');
    const field = param.get ('field');
    const list = param.get ('list');
    const value = getValue (param, false);
    const model = `.${this.widget}.${field}`;
    if (type === 'combo' || (type === 'text' && list)) {
      return (
        <Container kind="row-pane" key={index}>
          <Label text={field} width="180px" />
          <TextFieldCombo
            model={model}
            defaultValue={value}
            menuType="select"
            readonly={type === 'combo' ? 'true' : 'false'}
            grow="1"
            list={list}
            comboTextTransform="none"
            onSetText={text => this.setModel (model, text)}
          />
        </Container>
      );
    } else if (type === 'bool') {
      return (
        <Container kind="row-pane" subkind="left" key={index}>
          <Label text={field} width="180px" />
          <Button
            glyph={value === 'true' ? 'check' : null}
            width="32px"
            onClick={() => {
              if (value === 'true') {
                this.setModel (model, 'false');
              } else {
                this.setModel (model, 'true');
              }
            }}
          />
        </Container>
      );
    } else {
      return (
        <Container kind="row-pane" key={index}>
          <Label text={field} width="180px" />
          <TextField model={model} defaultValue={value} grow="1" />
        </Container>
      );
    }
  }

  renderParams (group) {
    let index = 0;
    return this.params
      .where (param => param.get ('group') === group)
      .orderBy (param => param.get ('field'))
      .select (param => {
        return this.renderParam (param, index++);
      })
      .toList ();
  }

  renderGroup (group, index) {
    return (
      <Container kind="pane" key={index}>
        <Container kind="row-pane">
          <Label text={group} grow="1" kind="title" />
        </Container>
        {this.renderParams (group)}
      </Container>
    );
  }

  renderGroups () {
    const groups = [];
    this.params.orderBy (param => param.get ('group')).select (param => {
      const group = param.get ('group');
      if (groups.indexOf (group) === -1) {
        groups.push (group);
      }
    });
    const result = [];
    let index = 0;
    for (const group of groups) {
      result.push (this.renderGroup (group, index++));
    }
    return result;
  }

  renderParamsColumn () {
    const Form = this.Form;
    return (
      <Container kind="view" width="500px" spacing="large">
        <Container kind="pane-header">
          <Label text="Properties" kind="pane-header" />
        </Container>
        <Container kind="panes">
          <Form {...this.formConfig}>
            {this.renderGroups ()}
          </Form>
        </Container>
      </Container>
    );
  }

  /******************************************************************************/
  // Last column PREVIEW
  /******************************************************************************/

  renderWidgetBaseTicket () {
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
    for (let i = 0; i < this.getPreviewValue ('ticketLines'); i++) {
      result.push (<Label key={i} text={lines[i]} wrap="no" />);
    }
    return result;
  }

  renderWidgetBaseContainer () {
    const result = [];
    const type = this.getPreviewValue ('containerType');
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
      for (let i = 0; i < this.getPreviewValue ('containerItems'); i++) {
        result.push (<Button key={i} text={lines[i]} wrap="no" />);
      }
    } else if (type === 'glyph') {
      const lines = [
        'bicycle',
        'ship',
        'subway',
        'bus',
        'truck',
        'taxi',
        'motorcycle',
        'car',
        'train',
        'plane',
        'fighter-jet',
        'rocket',
      ];
      for (let i = 0; i < this.getPreviewValue ('containerItems'); i++) {
        result.push (<Button key={i} glyph={lines[i]} wrap="no" />);
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
      for (let i = 0; i < this.getPreviewValue ('containerItems'); i++) {
        result.push (<Label key={i} text={lines[i]} wrap="no" />);
      }
    }
    return result;
  }

  renderWidgetBase (index, props) {
    switch (this.widget) {
      case 'Button':
        return <Button key={index} {...props} />;
      case 'Label':
        return <Label key={index} {...props} />;
      case 'TextField':
        return <TextField key={index} model=".x" {...props} />;
      case 'LabelTextField':
        return <LabelTextField key={index} model=".x" {...props} />;
      case 'TextFieldCombo':
        const list = this.getPreviewValue ('textFieldComboMenu') === 'colors'
          ? [
              'Rouge',
              'Vert',
              'Bleu',
              'Jaune',
              'Orange',
              'Cyan',
              'Magenta',
              'Blanc',
              'Noir',
              'Brun',
              'Violet',
              'Lilas',
              'Rose',
              'Gris',
              'Antracite',
              'Olive',
              'Beige',
              'Turquoise',
              'Maron',
              'Fuchsia',
              'Ivoire',
              'Argent',
              'Doré',
            ]
          : [
              'Lundi',
              'Mardi',
              'Mercredi',
              'Jeudi',
              'Vendredi',
              'Samedi',
              'Dimanche',
            ];
        return <TextFieldCombo key={index} model=".x" list={list} {...props} />;
      case 'CheckButton':
        return <CheckButton key={index} {...props} />;
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
              {this.renderWidgetBaseTicket ()}
            </Container>
          </Ticket>
        );
      case 'Container':
        return (
          <Container key={index} {...props}>
            {this.renderWidgetBaseContainer ()}
          </Container>
        );
      default:
        return null;
    }
  }

  renderWidget (index) {
    const props = {};
    const param = this.params.select (param => {
      const field = param.get ('field');
      const value = getValue (param, true);
      props[field] = value;
    });

    if (this.getPreviewValue ('showFrame')) {
      const frameStyle = {
        border: '1px solid #f00',
        display: 'flex',
        width: props.width,
        flexGrow: props.grow,
      };
      return (
        <div style={frameStyle} key={index}>
          {this.renderWidgetBase (index, props)}
        </div>
      );
    } else {
      return this.renderWidgetBase (index, props);
    }
  }

  renderWidgets () {
    const result = [];
    for (let i = 0; i < this.getPreviewValue ('items'); i++) {
      result.push (this.renderWidget (i));
    }
    return result;
  }

  renderPreviewSolo () {
    const paneStyle = {
      display: 'flex',
      flexDirection: 'column',
      flexGrow: '1',
      flexBasis: '0',
      marginBottom: this.context.theme.shapes.containerMargin,
      padding: this.context.theme.shapes.containerMargin,
      //? backgroundColor: this.context.theme.palette[this.color],
      backgroundColor: this.context.theme.palette[
        this.getPreviewValue ('color') + 'Background'
      ],
      transition: this.context.theme.transitions.easeOut (),
    };

    let direction, wrap;
    switch (this.getPreviewValue ('layout')) {
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

    const scale = this.getPreviewValue ('scale');

    const soloStyle = {
      display: 'flex',
      flexDirection: direction,
      flexWrap: wrap,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      transform: scale === 1 ? null : `scale(${scale})`,
      transformOrigin: scale === 1 ? null : 'top left',
      width: `${100 / scale}%`,
      transition: this.context.theme.transitions.easeOut (),
    };

    return (
      <div style={paneStyle}>
        <div style={soloStyle}>
          {this.renderWidgets ()}
        </div>
      </div>
    );
  }

  /******************************************************************************/
  // Panel with switches in column PREVIEW
  /******************************************************************************/

  renderSwitch (value, getter, setter, index) {
    return (
      <CheckButton
        key={index}
        text={value}
        kind="active"
        checked={getter () === value ? 'true' : 'false'}
        onClick={() => {
          setter (value);
        }}
      />
    );
  }

  renderPreviewList (preview, index) {
    const result = [];
    let i = 0;
    for (const item of preview.get ('list')) {
      result.push (
        this.renderSwitch (
          item,
          () => preview.get ('value'),
          value => this.setPreviewValue (preview.get ('id'), value),
          index * 100 + i++
        )
      );
    }
    return result;
  }

  renderPreviewBool (preview, index) {
    return (
      <CheckButton
        key={index * 100}
        kind="switch"
        checked={preview.get ('value') ? 'true' : 'false'}
        onClick={() => {
          this.setPreviewValue (preview.get ('id'), !preview.get ('value'));
        }}
      />
    );
  }

  renderPreview (preview, index) {
    const type = preview.get ('type');
    if (type === 'bool') {
      return [this.renderPreviewBool (preview, index), <Label width="20px" />];
    } else {
      return [this.renderPreviewList (preview, index), <Label width="20px" />];
    }
  }

  renderPreviewLine (group) {
    let index = 0;
    return this.previews
      .where (preview => preview.get ('group') === group)
      .orderBy (preview => preview.get ('order'))
      .select (preview => {
        return this.renderPreview (preview, index++);
      })
      .toList ();
  }

  renderPreviewGroup (group, index) {
    return (
      <Container key={index} kind="row-pane" subkind="left">
        <Label text={group} width="80px" />
        {this.renderPreviewLine (group)}
      </Container>
    );
  }

  renderPreviews () {
    const groups = [];
    this.previews
      .where (preview => {
        const f = preview.get ('for');
        return !f || f === this.widget;
      })
      .orderBy (preview => preview.get ('order'))
      .select (preview => {
        const group = preview.get ('group');
        if (groups.indexOf (group) === -1) {
          groups.push (group);
        }
      });
    const result = [];
    let index = 0;
    for (const group of groups) {
      result.push (this.renderPreviewGroup (group, index++));
    }
    return result;
  }

  /******************************************************************************/
  // Main
  /******************************************************************************/

  renderPreviewPanel () {
    const classPanes = this.styles.classNames.panes;
    return (
      <Container kind="views">
        <Container kind="view">
          <Container kind="pane-header">
            <Label text="Preview" kind="pane-header" />
          </Container>
          <div className={classPanes}>
            <Container kind="pane">
              <Container kind="row-pane">
                <Label text={this.getCode ()} grow="1" />
              </Container>
            </Container>
            <Container kind="pane">
              {this.renderPreviews ()}
            </Container>
            {this.renderPreviewSolo ()}
          </div>
        </Container>
      </Container>
    );
  }

  render () {
    const {id} = this.props;
    if (!id) {
      return null;
    }

    return (
      <Container kind="views">
        {::this.renderMenu ()}
        {::this.renderParamsColumn ()}
        <Splitter kind="vertical" firstSize="600px">
          {::this.renderPreviewPanel ()}
          <Container kind="row" />
        </Splitter>
      </Container>
    );
  }
}

export default Wizard;
