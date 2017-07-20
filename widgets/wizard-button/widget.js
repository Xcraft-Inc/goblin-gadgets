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
    const Form = this.Form;
    return (
      <Form {...this.formConfig}>
        <Container kind="view" width="500px" spacing="large">
          <Container kind="pane-header">
            <Label text="Propriétés" kind="pane-header" />
          </Container>
          <Container kind="panes">
            <Container kind="pane">
              {this.renderParams ()}
            </Container>
          </Container>
        </Container>
      </Form>
    );
  }

  renderWidget () {
    const props = {};
    const params = this.shred (this.props.params);
    const param = params.linq.select (param => {
      const field = param.get ('field');
      const value = getValue (param);
      props[field] = value;
    });

    return <Button {...props} />;
  }

  renderResultSolo (backgroundColor) {
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
      height: h,
    };

    return (
      <Container kind="pane" backgroundColor={backgroundColor}>
        <div style={soloStyle}>
          {this.renderWidget ()}
        </div>
        <Container kind="row-pane" subkind="footer">
          <Button
            kind="subaction"
            text={
              this.showAll
                ? 'Afficher moins de résultats'
                : 'Afficher plus de résultats'
            }
            width="0px"
            grow="1"
            onClick={() => {
              this.showAll = !this.showAll;
              this.forceUpdate ();
            }}
          />
        </Container>
      </Container>
    );
  }

  renderResultPane (backgroundColor) {
    if (this.showAll) {
      return (
        <Container kind="pane" backgroundColor={backgroundColor}>
          <Container kind="row-pane" subkind="left">
            {this.renderWidget ()}
            {this.renderWidget ()}
            {this.renderWidget ()}
          </Container>
          <Container kind="row-pane">
            {this.renderWidget ()}
            {this.renderWidget ()}
            {this.renderWidget ()}
          </Container>
        </Container>
      );
    } else {
      return null;
    }
  }

  renderResultChoices () {
    return (
      <Container kind="pane">
        <Container kind="row-pane" subkind="left">
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
      </Container>
    );
  }

  renderResult () {
    const classPanes = this.styles.classNames.panes;
    return (
      <Container kind="column">
        <Container kind="view">
          <Container kind="pane-header">
            <Label text="Résultats" kind="pane-header" />
          </Container>
          <div className={classPanes}>
            <Container kind="pane">
              <Container kind="row-pane">
                <Label text={this.getCode ()} grow="1" />
              </Container>
            </Container>
            {this.renderResultChoices ()}
            {this.renderResultSolo ()}
            {this.renderResultPane ()}
            {this.renderResultPane (this.context.theme.palette.viewBackground)}
            {this.renderResultPane (this.context.theme.palette.taskBackground)}
            {this.renderResultPane (this.context.theme.palette.rootBackground)}
            {this.renderResultPane (
              this.context.theme.palette.footerBackground
            )}
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
          {::this.renderResult ()}
          <Container kind="row" />
        </Splitter>
      </Container>
    );
  }
}

export default WizardButton;
