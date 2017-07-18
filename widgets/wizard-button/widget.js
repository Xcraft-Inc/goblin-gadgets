import React from 'react';
import Widget from 'laboratory/widget';
import Form from 'laboratory/form';

import Button from 'gadgets/button/widget';
import Container from 'gadgets/container/widget';
import Label from 'gadgets/label/widget';
import TextField from 'gadgets/text-field/widget';
import TextFieldCombo from 'gadgets/text-field-combo/widget';
import LabelTextField from 'gadgets/label-text-field/widget';
import Separator from 'gadgets/separator/widget';
import Splitter from 'gadgets/splitter/widget';

class WizardButton extends Form {
  constructor (props, context) {
    super (props, context);
  }

  static get wiring () {
    return {
      id: 'id',
      params: 'params',
    };
  }

  getParam (field) {
    const params = this.shred (this.props.params);
    const param = params.linq
      .where (param => field === param.get ('field'))
      .first ();
    return param.get ('value');
  }

  getCode () {
    var result = '<Button ';
    const params = this.shred (this.props.params);
    params.linq.orderBy (param => param.get ('order')).select (param => {
      const field = param.get ('field');
      const value = param.get ('value');
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
    const value = param.get ('value');
    const model = `.${field}`;
    if (type === 'combo' || (type === 'text' && list)) {
      return (
        <Container kind="row-pane" key={index}>
          <Label text={field} width="120px" />
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
          <Label text={field} width="120px" />
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
          <Label text={field} width="120px" />
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
      <Form>
        <Container kind="view" width="500px" spacing="large">
          <Container kind="pane-header">
            <Label text="Paramètres" kind="pane-header" />
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
      const value = param.get ('value');
      props[field] = value;
    });

    return <Button {...props} />;
  }

  renderResultSolo (backgroundColor) {
    return (
      <Container kind="pane" backgroundColor={backgroundColor}>
        <Container kind="row-pane">
          {this.renderWidget ()}
        </Container>
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
          <Container kind="row-pane">
            {this.renderWidget ()}
            {this.renderWidget ()}
            {this.renderWidget ()}
          </Container>
          <Container kind="row-pane" subkind="left">
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

  renderResult () {
    return (
      <Container kind="column">
        <Container kind="view">
          <Container kind="pane-header">
            <Label text="Résultats" kind="pane-header" />
          </Container>
          <Container kind="panes">
            <Container kind="pane">
              <Container kind="row-pane">
                <Label text={this.getCode ()} grow="1" />
              </Container>
            </Container>
            {this.renderResultSolo ()}
            {this.renderResultPane ()}
            {this.renderResultPane (this.context.theme.palette.viewBackground)}
            {this.renderResultPane (this.context.theme.palette.taskBackground)}
            {this.renderResultPane (this.context.theme.palette.rootBackground)}
            {this.renderResultPane (
              this.context.theme.palette.footerBackground
            )}
          </Container>
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
