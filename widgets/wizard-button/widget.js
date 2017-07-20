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

class WizardButton extends Form {
  constructor (props, context) {
    super (props, context);
    this.scale = 3;
    this.color = 'paneBackground';
    this.items = 1;
  }

  static get wiring () {
    return {
      id: 'id',
      params: 'params',
    };
  }

  getCode () {
    var result = '<Button ';
    const params = this.shred (this.props.params);
    params.linq.orderBy (param => param.get ('order')).select (param => {
      const field = param.get ('field');
      const value = getValue (param);
      if (value !== '') {
        result += `${field}="${value}" `;
      }
    });
    result += '/>';
    return result;
  }

  renderParam (param, index) {
    const type = param.get ('type');
    const field = param.get ('field');
    const list = param.get ('list');
    const value = getValue (param);
    const model = `.${field}`;
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
    const params = this.shred (this.props.params);
    return params.linq
      .orderBy (param => param.get ('order'))
      .select (param => {
        return this.renderParam (param, index++);
      })
      .toList ();
  }

  renderParamsColumn () {
    const Form = this.getForm (this.props.id);
    return (
      <Container kind="view" width="500px" spacing="large">
        <Container kind="pane-header">
          <Label text="Properties" kind="pane-header" />
        </Container>
        <Container kind="panes">
          <Container kind="pane">
            <Form>
              {this.renderParams ()}
            </Form>
          </Container>
        </Container>
      </Container>
    );
  }

  renderWidget (index) {
    const props = {};
    const params = this.shred (this.props.params);
    const param = params.linq.select (param => {
      const field = param.get ('field');
      const value = getValue (param);
      props[field] = value;
    });

    return <Button key={index} {...props} />;
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
      marginBottom: this.context.theme.shapes.containerMargin,
      padding: this.context.theme.shapes.containerMargin,
      backgroundColor: this.context.theme.palette[this.color],
    };

    let h = this.props.params.get ('height').get ('value');
    if (!h) {
      h = '100px';
    }
    h = Unit.multiply (h, this.scale);
    h = Unit.add (h, '20px');
    const soloStyle = {
      display: 'flex',
      flexDirection: 'row',
      transform: `scale(${this.scale})`,
      transformOrigin: 'top left',
      width: `${100 / this.scale}%`,
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
          kind="radio"
          spacing="large"
          checked={this.scale === 1 ? 'true' : 'false'}
          onClick={() => {
            this.scale = 1;
            this.forceUpdate ();
          }}
        />
        <CheckButton
          text="×2"
          kind="radio"
          spacing="large"
          checked={this.scale === 2 ? 'true' : 'false'}
          onClick={() => {
            this.scale = 2;
            this.forceUpdate ();
          }}
        />
        <CheckButton
          text="×3"
          kind="radio"
          spacing="large"
          checked={this.scale === 3 ? 'true' : 'false'}
          onClick={() => {
            this.scale = 3;
            this.forceUpdate ();
          }}
        />
        <CheckButton
          text="×4"
          kind="radio"
          spacing="large"
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
          kind="radio"
          spacing="large"
          checked={this.color === 'paneBackground' ? 'true' : 'false'}
          onClick={() => {
            this.color = 'paneBackground';
            this.forceUpdate ();
          }}
        />
        <CheckButton
          text="view"
          kind="radio"
          spacing="large"
          checked={this.color === 'viewBackground' ? 'true' : 'false'}
          onClick={() => {
            this.color = 'viewBackground';
            this.forceUpdate ();
          }}
        />
        <CheckButton
          text="task"
          kind="radio"
          spacing="large"
          checked={this.color === 'taskBackground' ? 'true' : 'false'}
          onClick={() => {
            this.color = 'taskBackground';
            this.forceUpdate ();
          }}
        />
        <CheckButton
          text="root"
          kind="radio"
          spacing="large"
          checked={this.color === 'rootBackground' ? 'true' : 'false'}
          onClick={() => {
            this.color = 'rootBackground';
            this.forceUpdate ();
          }}
        />
        <CheckButton
          text="footer"
          kind="radio"
          spacing="large"
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
          kind="radio"
          spacing="large"
          checked={this.items === 1 ? 'true' : 'false'}
          onClick={() => {
            this.items = 1;
            this.forceUpdate ();
          }}
        />
        <CheckButton
          text="2"
          kind="radio"
          spacing="large"
          checked={this.items === 2 ? 'true' : 'false'}
          onClick={() => {
            this.items = 2;
            this.forceUpdate ();
          }}
        />
        <CheckButton
          text="3"
          kind="radio"
          spacing="large"
          checked={this.items === 3 ? 'true' : 'false'}
          onClick={() => {
            this.items = 3;
            this.forceUpdate ();
          }}
        />
        <CheckButton
          text="4"
          kind="radio"
          spacing="large"
          checked={this.items === 4 ? 'true' : 'false'}
          onClick={() => {
            this.items = 4;
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
        {::this.renderParamsColumn ()}
        <Splitter kind="vertical" firstSize="600px">
          {::this.renderPreview ()}
          <Container kind="row" />
        </Splitter>
      </Container>
    );
  }
}

export default WizardButton;
