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

function getOnlyDigits (value) {
  let result = '';
  for (let i = 0; i < value.length; i++) {
    const c = value[i];
    if (c >= '0' && c <= '9') {
      result += c;
    }
  }
  return result;
}

function getValue (param) {
  const value = param.get ('value');
  const unit = param.get ('unit');
  if (value && unit) {
    return getOnlyDigits (value) + unit;
  }
  return value;
}

class Wizard extends Form {
  constructor () {
    super (...arguments);
    this.wizard = 'Button';
    this.scale = 2;
    this.color = 'paneBackground';
    this.items = 1;
    this.layout = 'row';
    this.showFrame = false;
  }

  static get wiring () {
    return {
      id: 'id',
      params: 'params',
    };
  }

  get params () {
    return this.shred (this.props.params.get (this.wizard)).linq.where (
      param => param.size > 0
    );
  }

  getCode () {
    var result = `<${this.wizard} `;
    this.params.orderBy (param => param.get ('order')).select (param => {
      const field = param.get ('field');
      const value = getValue (param);
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

  renderMenuItem (wizard, index) {
    return (
      <Button
        key={index}
        text={wizard}
        kind="menu-item"
        glyph={this.wizard === wizard ? 'chevron-right' : 'none'}
        glyphPosition="right"
        justify="between"
        textTransform="none"
        onClick={() => {
          this.wizard = wizard;
          this.forceUpdate ();
        }}
      />
    );
  }

  renderMenuItems () {
    const wizards = this.shred (this.props.params);
    let index = 0;
    return wizards.linq
      .orderBy (wizard => wizard.get ('order'))
      .select (wizard => {
        return this.renderMenuItem (wizard.get ('id'), index++);
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
    const value = getValue (param);
    const model = `.${this.wizard}.${field}`;
    if (type === 'combo' || (type === 'text' && list)) {
      return (
        <Container kind="row-pane" key={index}>
          <Label text={field} width="150px" />
          <TextFieldCombo
            model={model}
            defaultValue={value}
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
          <Label text={field} width="150px" />
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
          <Label text={field} width="150px" />
          <TextField model={model} defaultValue={value} />
        </Container>
      );
    }
  }

  renderParams () {
    let index = 0;
    return this.params
      .orderBy (param => param.get ('order'))
      .select (param => {
        return this.renderParam (param, index++);
      })
      .toList ();
  }

  renderParamsColumn () {
    const Form = this.Form;
    return (
      <Container kind="view" width="500px" spacing="large">
        <Container kind="pane-header">
          <Label text="Properties" kind="pane-header" />
        </Container>
        <Container kind="panes">
          <Container kind="pane">
            <Form {...this.formConfig}>
              {this.renderParams ()}
            </Form>
          </Container>
        </Container>
      </Container>
    );
  }

  /******************************************************************************/
  // Last column PREVIEW
  /******************************************************************************/

  renderWidgetBase (index, props) {
    switch (this.wizard) {
      case 'Button':
        return <Button key={index} {...props} />;
      case 'Label':
        return <Label key={index} {...props} />;
      case 'LabelTextField':
        return <LabelTextField key={index} model=".x" {...props} />;
      case 'TextFieldCombo':
        const list = [
          'Lundi',
          'Mardi',
          'Mercredi',
          'Jeudi',
          'Vendredi',
          'Samedi',
          'Dimanche',
        ];
        return <TextFieldCombo key={index} model=".x" list={list} {...props} />;
      default:
        return null;
    }
  }

  renderWidget (index) {
    const props = {};
    const param = this.params.select (param => {
      const field = param.get ('field');
      const value = getValue (param);
      props[field] = value;
    });

    if (this.showFrame) {
      const frameClass = this.styles.classNames.frame;
      return (
        <div className={frameClass}>
          {this.renderWidgetBase (index, props)}
        </div>
      );
    } else {
      return this.renderWidgetBase (index, props);
    }
  }

  renderWidgets () {
    const result = [];
    for (let i = 0; i < this.items; i++) {
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
      backgroundColor: this.context.theme.palette[this.color],
      transition: this.context.theme.transitions.easeOut (),
    };

    let direction, wrap;
    switch (this.layout) {
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

    const soloStyle = {
      display: 'flex',
      flexDirection: direction,
      flexWrap: wrap,
      transform: `scale(${this.scale})`,
      transformOrigin: 'top left',
      width: `${100 / this.scale}%`,
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
  // Panel with switches in column WIDGET
  /******************************************************************************/

  renderSwitch (text, value, getter, setter) {
    return (
      <CheckButton
        text={text}
        kind="active"
        checked={getter () === value ? 'true' : 'false'}
        onClick={() => {
          setter (value);
          this.forceUpdate ();
        }}
      />
    );
  }

  renderScaleSwitches () {
    return (
      <Container kind="row-pane" subkind="left">
        <Label text="Scale" width="80px" />
        {this.renderSwitch (
          '×1',
          1,
          () => this.scale,
          value => (this.scale = value)
        )}
        {this.renderSwitch (
          '×1.5',
          1.5,
          () => this.scale,
          value => (this.scale = value)
        )}
        {this.renderSwitch (
          '×2',
          2,
          () => this.scale,
          value => (this.scale = value)
        )}
        {this.renderSwitch (
          '×3',
          3,
          () => this.scale,
          value => (this.scale = value)
        )}
        {this.renderSwitch (
          '×4',
          4,
          () => this.scale,
          value => (this.scale = value)
        )}
      </Container>
    );
  }

  renderColorSwitches () {
    return (
      <Container kind="row-pane" subkind="left">
        <Label text="Color" width="80px" />
        {this.renderSwitch (
          'pane',
          'paneBackground',
          () => this.color,
          value => (this.color = value)
        )}
        {this.renderSwitch (
          'view',
          'viewBackground',
          () => this.color,
          value => (this.color = value)
        )}
        {this.renderSwitch (
          'task',
          'taskBackground',
          () => this.color,
          value => (this.color = value)
        )}
        {this.renderSwitch (
          'root',
          'rootBackground',
          () => this.color,
          value => (this.color = value)
        )}
        {this.renderSwitch (
          'footer',
          'footerBackground',
          () => this.color,
          value => (this.color = value)
        )}
      </Container>
    );
  }

  renderItemsSwitches () {
    return (
      <Container kind="row-pane" subkind="left">
        <Label text="Items" width="80px" />
        {this.renderSwitch (
          '1',
          1,
          () => this.items,
          value => (this.items = value)
        )}
        {this.renderSwitch (
          '2',
          2,
          () => this.items,
          value => (this.items = value)
        )}
        {this.renderSwitch (
          '3',
          3,
          () => this.items,
          value => (this.items = value)
        )}
        {this.renderSwitch (
          '4',
          4,
          () => this.items,
          value => (this.items = value)
        )}
        {this.renderSwitch (
          '5',
          5,
          () => this.items,
          value => (this.items = value)
        )}
        {this.renderSwitch (
          '10',
          10,
          () => this.items,
          value => (this.items = value)
        )}
        {this.renderSwitch (
          '11',
          11,
          () => this.items,
          value => (this.items = value)
        )}
      </Container>
    );
  }

  renderLayoutSwitches () {
    return (
      <Container kind="row-pane" subkind="left">
        <Label text="Layout" width="80px" />
        {this.renderSwitch (
          'row',
          'row',
          () => this.layout,
          value => (this.layout = value)
        )}
        {this.renderSwitch (
          'column',
          'column',
          () => this.layout,
          value => (this.layout = value)
        )}
        {this.renderSwitch (
          'wrap',
          'wrap',
          () => this.layout,
          value => (this.layout = value)
        )}
      </Container>
    );
  }

  renderFrameSwitch () {
    return (
      <Container kind="row-pane" subkind="left">
        <Label text="Frame" width="80px" />
        <CheckButton
          kind="switch"
          checked={this.showFrame ? 'true' : 'false'}
          onClick={() => {
            this.showFrame = !this.showFrame;
            this.forceUpdate ();
          }}
        />
      </Container>
    );
  }

  /******************************************************************************/
  // Main
  /******************************************************************************/

  renderPreview () {
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
              {this.renderScaleSwitches ()}
              {this.renderColorSwitches ()}
              {this.renderItemsSwitches ()}
              {this.renderLayoutSwitches ()}
              {this.renderFrameSwitch ()}
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
          {::this.renderPreview ()}
          <Container kind="row" />
        </Splitter>
      </Container>
    );
  }
}

export default Wizard;
