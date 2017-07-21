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
        width="270px"
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

  renderPreviewScale () {
    return (
      <Container kind="row-pane" subkind="left">
        <Label text="Scale" width="80px" />
        <CheckButton
          text="×1"
          kind="active"
          checked={this.scale === 1 ? 'true' : 'false'}
          onClick={() => {
            this.scale = 1;
            this.forceUpdate ();
          }}
        />
        <CheckButton
          text="×1.5"
          kind="active"
          checked={this.scale === 1.5 ? 'true' : 'false'}
          onClick={() => {
            this.scale = 1.5;
            this.forceUpdate ();
          }}
        />
        <CheckButton
          text="×2"
          kind="active"
          checked={this.scale === 2 ? 'true' : 'false'}
          onClick={() => {
            this.scale = 2;
            this.forceUpdate ();
          }}
        />
        <CheckButton
          text="×3"
          kind="active"
          checked={this.scale === 3 ? 'true' : 'false'}
          onClick={() => {
            this.scale = 3;
            this.forceUpdate ();
          }}
        />
        <CheckButton
          text="×4"
          kind="active"
          checked={this.scale === 4 ? 'true' : 'false'}
          onClick={() => {
            this.scale = 4;
            this.forceUpdate ();
          }}
        />
      </Container>
    );
  }

  renderPreviewColor () {
    return (
      <Container kind="row-pane" subkind="left">
        <Label text="Color" width="80px" />
        <CheckButton
          text="pane"
          kind="active"
          checked={this.color === 'paneBackground' ? 'true' : 'false'}
          onClick={() => {
            this.color = 'paneBackground';
            this.forceUpdate ();
          }}
        />
        <CheckButton
          text="view"
          kind="active"
          checked={this.color === 'viewBackground' ? 'true' : 'false'}
          onClick={() => {
            this.color = 'viewBackground';
            this.forceUpdate ();
          }}
        />
        <CheckButton
          text="task"
          kind="active"
          checked={this.color === 'taskBackground' ? 'true' : 'false'}
          onClick={() => {
            this.color = 'taskBackground';
            this.forceUpdate ();
          }}
        />
        <CheckButton
          text="root"
          kind="active"
          checked={this.color === 'rootBackground' ? 'true' : 'false'}
          onClick={() => {
            this.color = 'rootBackground';
            this.forceUpdate ();
          }}
        />
        <CheckButton
          text="footer"
          kind="active"
          checked={this.color === 'footerBackground' ? 'true' : 'false'}
          onClick={() => {
            this.color = 'footerBackground';
            this.forceUpdate ();
          }}
        />
      </Container>
    );
  }

  renderPreviewItems () {
    return (
      <Container kind="row-pane" subkind="left">
        <Label text="Items" width="80px" />
        <CheckButton
          text="1"
          kind="active"
          checked={this.items === 1 ? 'true' : 'false'}
          onClick={() => {
            this.items = 1;
            this.forceUpdate ();
          }}
        />
        <CheckButton
          text="2"
          kind="active"
          checked={this.items === 2 ? 'true' : 'false'}
          onClick={() => {
            this.items = 2;
            this.forceUpdate ();
          }}
        />
        <CheckButton
          text="3"
          kind="active"
          checked={this.items === 3 ? 'true' : 'false'}
          onClick={() => {
            this.items = 3;
            this.forceUpdate ();
          }}
        />
        <CheckButton
          text="4"
          kind="active"
          checked={this.items === 4 ? 'true' : 'false'}
          onClick={() => {
            this.items = 4;
            this.forceUpdate ();
          }}
        />
        <CheckButton
          text="5"
          kind="active"
          checked={this.items === 5 ? 'true' : 'false'}
          onClick={() => {
            this.items = 5;
            this.forceUpdate ();
          }}
        />
        <CheckButton
          text="10"
          kind="active"
          checked={this.items === 10 ? 'true' : 'false'}
          onClick={() => {
            this.items = 10;
            this.forceUpdate ();
          }}
        />
        <CheckButton
          text="11"
          kind="active"
          checked={this.items === 11 ? 'true' : 'false'}
          onClick={() => {
            this.items = 11;
            this.forceUpdate ();
          }}
        />
      </Container>
    );
  }

  renderPreviewLayout () {
    return (
      <Container kind="row-pane" subkind="left">
        <Label text="Layout" width="80px" />
        <CheckButton
          text="row"
          kind="active"
          checked={this.layout === 'row' ? 'true' : 'false'}
          onClick={() => {
            this.layout = 'row';
            this.forceUpdate ();
          }}
        />
        <CheckButton
          text="column"
          kind="active"
          checked={this.layout === 'column' ? 'true' : 'false'}
          onClick={() => {
            this.layout = 'column';
            this.forceUpdate ();
          }}
        />
        <CheckButton
          text="wrap"
          kind="active"
          checked={this.layout === 'wrap' ? 'true' : 'false'}
          onClick={() => {
            this.layout = 'wrap';
            this.forceUpdate ();
          }}
        />
      </Container>
    );
  }

  renderPreviewFrame () {
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
              {this.renderPreviewScale ()}
              {this.renderPreviewColor ()}
              {this.renderPreviewItems ()}
              {this.renderPreviewLayout ()}
              {this.renderPreviewFrame ()}
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
