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
    this.setEntityValue = this.setEntityValue.bind (this);
  }

  renderField () {
    return (
      <Container kind="row-pane">
        <LabelTextField
          labelText={this.props.labelText}
          labelGlyph={this.props.labelGlyph}
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
          glyph={this.props.labelGlyph}
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
    const fullPath = `${this.context.model}${this.props.model}`;
    return (
      <Container kind="row-pane">
        <Label
          text={this.props.labelText}
          glyph={this.props.labelGlyph}
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
            this.setBackendValue (fullPath, text);
          }}
          grow="1"
        />
      </Container>
    );
  }

  renderRadios () {
    const fullPath = `${this.context.model}${this.props.model}`;
    const Radios = this.mapWidget (
      RadioList,
      value => {
        if (value && value !== '') {
          return {selectedIndex: this.props.list.indexOf (value)};
        } else {
          return {};
        }
      },
      fullPath
    );

    return (
      <Container kind="row-pane" subkind="left">
        <Label
          text={this.props.labelText}
          glyph={this.props.labelGlyph}
          width={this.props.labelWidth || defaultLabelWidth}
          kind="label-text-field"
          justify="left"
          spacing="overlap"
        />
        <Radios
          direction="row"
          list={this.props.list}
          selectionChanged={index =>
            this.setBackendValue (fullPath, this.props.list[index])}
        />
      </Container>
    );
  }

  renderHinter () {
    const fullPath = `${this.context.model}${this.props.model}`;
    const Hinter = this.mapWidget (
      LabelTextField,
      value => {
        if (value && value !== '') {
          return {selectedValue: value};
        } else {
          return {};
        }
      },
      fullPath
    );

    const Form = this.Form;

    return (
      <Container kind="row-pane">
        <Form
          {...this.formConfigWithComponent (() => (
            <Hinter
              labelText={this.props.labelText}
              labelGlyph={this.props.labelGlyph}
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

  render () {
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
        return this.renderField ();
    }
  }
}

/******************************************************************************/
export default Field;
