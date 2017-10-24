import React from 'react';
import Form from 'laboratory/form';
import {Control} from 'react-redux-form/immutable';
import * as Bool from '../helpers/boolean-helpers.js';
import * as Converters from '../helpers/converters';

import Container from 'gadgets/container/widget';
import Button from 'gadgets/button/widget';
import CheckButton from 'gadgets/check-button/widget';
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
    this.handleFileChange = this.handleFileChange.bind (this);
  }

  getFullPathFromModel (model) {
    if (!this.context.model) {
      throw new Error (
        'Cannot resolve context model, your Field is not in a Form ?'
      );
    }
    return `${this.context.model}${model}`;
  }

  get fullPath () {
    return this.getFullPathFromModel (this.props.model);
  }

  handleFileChange (ev) {
    ev.persist ();
    const fileList = ev.target.files;
    const files = [];
    for (let i = 0; i < fileList.length; i++) {
      files.push (fileList[i].path);
    }
    if (files.length === 1) {
      this.setBackendValue (this.fullPath, files[0]);
    } else {
      throw new Error ('Not impl.');
    }
  }

  //#region Readonly
  renderReadonlyField () {
    const Value = this.mapWidget (
      Label,
      value => {
        return {text: value};
      },
      this.fullPath
    );

    return (
      <Container
        kind="row-pane"
        width={this.props.width}
        height={this.props.height}
      >
        <Label
          text={this.props.labelText}
          glyph={this.props.labelGlyph}
          width={this.props.labelWidth || defaultLabelWidth}
          kind="label-text-field"
          justify="left"
          spacing="overlap"
        />
        <Value grow="1" />
      </Container>
    );
  }

  renderReadonlyDate () {
    const Value = this.mapWidget (
      Label,
      value => {
        return {text: Converters.getDisplayedDate (value)};
      },
      this.fullPath
    );

    return (
      <Container
        kind="row-pane"
        width={this.props.width}
        height={this.props.height}
      >
        <Label
          text={this.props.labelText}
          glyph={this.props.labelGlyph}
          width={this.props.labelWidth || defaultLabelWidth}
          kind="label-text-field"
          justify="left"
          spacing="overlap"
        />
        <Value grow="1" />
      </Container>
    );
  }

  renderReadonlyDoubleField () {
    const Value1 = this.mapWidget (
      Label,
      value => {
        return {text: value};
      },
      this.getFullPathFromModel (this.props.model1)
    );

    const Value2 = this.mapWidget (
      Label,
      value => {
        return {text: value};
      },
      this.getFullPathFromModel (this.props.model2)
    );

    return (
      <Container
        kind="row-pane"
        width={this.props.width}
        height={this.props.height}
      >
        <Label
          text={this.props.labelText}
          glyph={this.props.labelGlyph}
          width={this.props.labelWidth || defaultLabelWidth}
          kind="label-text-field"
          justify="left"
          spacing="overlap"
        />
        <Value1 grow={this.props.growField1} spacing="large" />
        <Value2 grow={this.props.growField2} />
      </Container>
    );
  }

  renderReadonlyBool () {
    const Check = this.mapWidget (
      CheckButton,
      value => {
        return {checked: value};
      },
      this.fullPath
    );

    return (
      <Container
        kind="row-pane"
        subkind="left"
        width={this.props.width}
        height={this.props.height}
      >
        <Label
          glyph={this.props.labelGlyph}
          width={this.props.labelWidth || defaultLabelWidth}
          kind="label-text-field"
          justify="left"
          spacing="overlap"
        />
        <Check text={this.props.labelText} readonly="true" />
      </Container>
    );
  }

  renderReadonlyFileInput () {
    throw new Error ('Not implemented');
  }
  //#endregion

  //#region Edit
  renderEditField () {
    return (
      <Container
        kind="row-pane"
        width={this.props.width}
        height={this.props.height}
      >
        <LabelTextField
          labelText={this.props.labelText}
          labelGlyph={this.props.labelGlyph}
          labelWidth={this.props.labelWidth || defaultLabelWidth}
          hintText={this.props.hintText}
          rows={this.props.rows}
          model={this.props.model}
          grow="1"
        />
      </Container>
    );
  }

  renderEditDate () {
    return (
      <Container
        kind="row-pane"
        width={this.props.width}
        height={this.props.height}
      >
        <TextFieldTyped
          type="date"
          labelText={this.props.labelText}
          labelGlyph={this.props.labelGlyph}
          labelWidth={this.props.labelWidth || defaultLabelWidth}
          fieldWidth="120px"
          hintText={this.props.hintText}
          model={this.props.model}
        />
      </Container>
    );
  }

  renderEditDoubleField () {
    return (
      <Container
        kind="row-pane"
        width={this.props.width}
        height={this.props.height}
      >
        <Label
          text={this.props.labelText}
          glyph={this.props.labelGlyph}
          width={this.props.labelWidth || defaultLabelWidth}
          kind="label-text-field"
          justify="left"
          spacing="overlap"
        />
        <TextField
          hintText={this.props.hintText1}
          model={this.props.model1}
          grow={this.props.growField1}
          spacing="large"
        />
        <TextField
          hintText={this.props.hintText2}
          model={this.props.model2}
          grow={this.props.growField2}
        />
      </Container>
    );
  }

  renderEditCombo () {
    return (
      <Container
        kind="row-pane"
        width={this.props.width}
        height={this.props.height}
      >
        <Label
          text={this.props.labelText}
          glyph={this.props.labelGlyph}
          width={this.props.labelWidth || defaultLabelWidth}
          kind="label-text-field"
          justify="left"
          spacing="overlap"
        />
        <TextFieldCombo
          hintText={this.props.hintText}
          model={this.props.model}
          readonly="false"
          list={this.props.list}
          menuType="wrap"
          menuItemWidth={this.props.menuItemWidth}
          comboTextTransform="none"
          onSetText={text => {
            this.setBackendValue (this.fullPath, text);
          }}
          grow="1"
        />
      </Container>
    );
  }

  renderEditRadio () {
    const Radio = this.mapWidget (
      RadioList,
      value => {
        if (value && value !== '') {
          return {selectedIndex: this.props.list.indexOf (value)};
        } else {
          return {};
        }
      },
      this.fullPath
    );

    return (
      <Container
        kind="row-pane"
        subkind="left"
        width={this.props.width}
        height={this.props.height}
      >
        <Label
          text={this.props.labelText}
          glyph={this.props.labelGlyph}
          width={this.props.labelWidth || defaultLabelWidth}
          kind="label-text-field"
          justify="left"
          spacing="overlap"
        />
        <Radio
          height={this.props.height}
          direction={this.props.direction || 'row'}
          list={this.props.list}
          selectionChanged={index => {
            this.setBackendValue (this.fullPath, this.props.list[index]);
            if (this.props.onChange) {
              this.props.onChange (this.props.list[index], index);
            }
          }}
        />
      </Container>
    );
  }

  renderEditBool () {
    const Check = this.mapWidget (
      CheckButton,
      value => {
        return {checked: value};
      },
      this.fullPath
    );

    return (
      <Container
        kind="row-pane"
        subkind="left"
        width={this.props.width}
        height={this.props.height}
      >
        <Label
          glyph={this.props.labelGlyph}
          width={this.props.labelWidth || defaultLabelWidth}
          kind="label-text-field"
          justify="left"
          spacing="overlap"
        />
        <Check
          text={this.props.labelText}
          onClick={index => {
            const checked = this.getBackendValue (this.fullPath);
            this.setBackendValue (this.fullPath, !checked);
          }}
        />
      </Container>
    );
  }

  renderEditHinter () {
    const Hinter = this.mapWidget (
      LabelTextField,
      value => {
        if (value && value !== '') {
          return {selectedValue: value};
        } else {
          return {};
        }
      },
      this.fullPath
    );

    const Form = this.Form;

    return (
      <Container
        kind="row-pane"
        width={this.props.width}
        height={this.props.height}
      >
        <Form
          {...this.formConfigWithComponent (() => (
            <Hinter
              labelText={this.props.labelText}
              labelGlyph={this.props.labelGlyph}
              labelWidth={this.props.labelWidth || defaultLabelWidth}
              hintText={this.props.hintText}
              grow="1"
              hinter={this.props.hinter}
              comboType={this.props.hinter}
            />
          ))}
        />
      </Container>
    );
  }

  renderEditFileInput () {
    return (
      <Container kind="row-pane">
        <input
          type="file"
          onChange={this.handleFileChange}
          accept={this.props.accept}
        />
      </Container>
    );
  }
  //#endregion

  renderReadonly () {
    switch (this.props.kind) {
      case 'field':
        return this.renderReadonlyField ();
      case 'date':
        return this.renderReadonlyDate ();
      case 'double-field':
        return this.renderReadonlyDoubleField ();
      case 'combo':
        return this.renderReadonlyField ();
      case 'radio':
        return this.renderReadonlyField ();
      case 'bool':
        return this.renderReadonlyBool ();
      case 'hinter':
        return this.renderReadonlyField ();
      case 'file':
        return this.renderReadonlyFileInput ();
      default:
        return this.renderReadonlyField ();
    }
  }

  renderEdit () {
    switch (this.props.kind) {
      case 'field':
        return this.renderEditField ();
      case 'date':
        return this.renderEditDate ();
      case 'double-field':
        return this.renderEditDoubleField ();
      case 'combo':
        return this.renderEditCombo ();
      case 'radio':
        return this.renderEditRadio ();
      case 'bool':
        return this.renderEditBool ();
      case 'hinter':
        return this.renderEditHinter ();
      case 'file':
        return this.renderEditFileInput ();
      default:
        return this.renderEditField ();
    }
  }

  render () {
    if (
      Bool.isTrue (this.props.readonly) ||
      Bool.isTrue (this.context.readonly)
    ) {
      return this.renderReadonly ();
    } else {
      return this.renderEdit ();
    }
  }
}

/******************************************************************************/
export default Field;
