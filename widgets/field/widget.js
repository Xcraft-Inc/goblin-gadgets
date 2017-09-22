import React from 'react';
import Form from 'laboratory/form';

import Container from 'gadgets/container/widget';
import Button from 'gadgets/button/widget';
import Label from 'gadgets/label/widget';
import TextField from 'gadgets/text-field/widget';
import LabelTextField from 'gadgets/label-text-field/widget';
import TextFieldTyped from 'gadgets/text-field-typed/widget';
import TextFieldCombo from 'gadgets/text-field-combo/widget';
import RadioList from 'gadgets/radio-list/widget';

/******************************************************************************/

const defaultLabelWidth = '120px';

class Field extends Form {
  constructor () {
    super (...arguments);
  }

  static get wiring () {
    return {
      id: 'id',
    };
  }

  renderField () {
    return (
      <Container kind="row-pane">
        <LabelTextField
          labelText={this.props.labelText}
          labelWidth={this.props.labelWidth || defaultLabelWidth}
          model={this.props.model}
          grow="1"
        />
      </Container>
    );
  }

  renderDoubleField () {
    return (
      <Container kind="row-pane">
        <Label
          text={this.props.labelText}
          width={this.props.labelWidth || defaultLabelWidth}
          kind="label-text-field"
          justify="left"
          spacing="overlap"
        />
        <TextField
          model={this.props.model1}
          grow={this.props.grow1}
          spacing="large"
        />
        <TextField model={this.props.model2} grow={this.props.grow2} />
      </Container>
    );
  }

  renderCombo () {
    return (
      <Container kind="row-pane">
        <Label
          text={this.props.labelText}
          width={this.props.labelWidth || defaultLabelWidth}
          kind="label-text-field"
          justify="left"
          spacing="overlap"
        />
        <TextFieldCombo
          model={this.props.model}
          readonly="false"
          list={this.props.list}
          menuType="wrap"
          comboTextTransform="none"
          onSetText={text => {
            this.setEntityValue (this.props.model, text);
          }}
          grow="1"
        />
      </Container>
    );
  }

  renderRadios () {
    const Radios = this.getWidgetToEntityMapper (RadioList, value => {
      if (value && value !== '') {
        return {selectedIndex: this.props.list.indexOf (value)};
      } else {
        return {};
      }
    }) (this.props.model);

    return (
      <Container kind="row-pane" subkind="left">
        <Label
          text={this.props.labelText}
          width={this.props.labelWidth || defaultLabelWidth}
          kind="label-text-field"
          justify="left"
          spacing="overlap"
        />
        <Radios
          direction="row"
          list={this.props.list}
          selectionChanged={index =>
            this.setEntityValue (this.props.model, this.props.list[index])}
        />
      </Container>
    );
  }

  renderHinter () {
    const Zone = this.getWidgetToEntityMapper (LabelTextField, value => {
      if (value && value !== '') {
        return {selectedValue: value};
      } else {
        return {};
      }
    }) (this.props.model);

    const Form = this.Form;

    return (
      <Container kind="row-pane">
        <Form
          {...this.formConfigWithComponent (() => (
            <Zone
              labelText={this.props.labelText}
              labelWidth={this.props.labelWidth || defaultLabelWidth}
              grow="1"
              hinter={this.props.hinter}
              comboType={this.props.hinter}
            />
          ))}
        />
      </Container>
    );
  }

  renderWidget () {
    switch (this.props.kind) {
      case 'field':
        return this.renderField ();
      case 'double-field':
        return this.renderDoubleField ();
      case 'combo':
        return this.renderCombo ();
      case 'radios':
        return this.renderRadios ();
      case 'hinter':
        return this.renderHinter ();
      default:
        return null;
    }
  }

  render () {
    const Form = this.Form;
    return (
      <Form {...this.entityConfig}>
        {this.renderWidget ()}
      </Form>
    );
  }
}

/******************************************************************************/
export default Field;
