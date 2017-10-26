import React from 'react';
import Form from 'laboratory/form';
import Widget from 'laboratory/widget';
import {Control} from 'react-redux-form/immutable';
import * as Bool from 'gadgets/boolean-helpers';
import * as DateConverters from '../helpers/date-converters';
import * as TimeConverters from '../helpers/time-converters';
import * as PriceConverters from '../helpers/price-converters';

import Container from 'gadgets/container/widget';
import Button from 'gadgets/button/widget';
import CheckButton from 'gadgets/check-button/widget';
import Label from 'gadgets/label/widget';
import TextField from 'gadgets/text-field/widget';
import LabelTextField from 'gadgets/label-text-field/widget';
import TextFieldTyped from 'gadgets/text-field-typed/widget';
import TextFieldCombo from 'gadgets/text-field-combo/widget';
import RadioList from 'gadgets/radio-list/widget';
import Plugin from 'desktop/plugin/widget';
import Workitem from 'desktop/workitem/widget';
import importer from 'laboratory/importer/';
const uiImporter = importer ('ui');
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

  renderDynamic () {
    const Dynamic = this.mapWidget (
      Label,
      value => {
        if (typeof value === 'object') {
          return this.props.map (value.toJS ());
        }
        return this.props.map (value);
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
        <Dynamic grow="1" />
      </Container>
    );
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
        return {text: DateConverters.getDisplayed (value)};
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
        <Value width="120px" />
      </Container>
    );
  }

  renderReadonlyTime () {
    const Value = this.mapWidget (
      Label,
      value => {
        return {text: TimeConverters.getDisplayed (value)};
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
        <Value width="120px" />
      </Container>
    );
  }

  renderReadonlyPrice () {
    const Value = this.mapWidget (
      Label,
      value => {
        return {text: PriceConverters.getDisplayed (value)};
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
        <Value width="120px" justify="end" />
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

  renderReadonlyEntity () {
    return (
      <Container kind="row-pane" subkind="light-box">
        TODO: not impl. {this.fullPath}
      </Container>
    );
  }

  renderReadonlyEntities () {
    if (!this.props.plugin) {
      throw new Error ('Property plugin is required in this case!');
    }
    const WiredPlugin = Widget.Wired (Plugin) (
      `${this.props.plugin}@${this.props.id}`
    );
    const FinalPlugin = this.mapWidget (
      WiredPlugin,
      'entityIds',
      this.fullPath
    );

    return (
      <Container kind="row-pane" subkind="light-box">
        <FinalPlugin readonly="true" />
      </Container>
    );
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

  renderEditTime () {
    return (
      <Container
        kind="row-pane"
        width={this.props.width}
        height={this.props.height}
      >
        <TextFieldTyped
          type="time"
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

  renderEditPrice () {
    return (
      <Container
        kind="row-pane"
        width={this.props.width}
        height={this.props.height}
      >
        <TextFieldTyped
          type="price"
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

  renderEditEntity () {
    if (!this.ui) {
      throw new Error ('Missing ui property');
    }
    const ui = uiImporter (this.props.ui);
    const ReadLineUI = this.mapWidget (ui.read.line, 'entityId', this.fullPath);
    const Viewer = props => (
      <Workitem readonly="true" entityId={props.entityId} kind="form">
        <ReadLineUI />
      </Workitem>
    );

    const EntityViewer = this.mapWidget (Viewer, 'entityId', this.fullPath);

    return (
      <Container kind="row-pane" subkind="light-box">
        <EntityViewer />
      </Container>
    );
  }

  renderEditEntities () {
    if (!this.props.plugin) {
      throw new Error ('Property plugin is required in this case!');
    }
    const WiredPlugin = Widget.Wired (Plugin) (
      `${this.props.plugin}@${this.props.id}`
    );
    const FinalPlugin = this.mapWidget (
      WiredPlugin,
      'entityIds',
      this.fullPath
    );

    return (
      <Container kind="row-pane" subkind="light-box">
        <FinalPlugin id={this.props.id} />
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
      case 'dynamic':
        return this.renderDynamic ();
      case 'date':
        return this.renderReadonlyDate ();
      case 'time':
        return this.renderReadonlyTime ();
      case 'price':
        return this.renderReadonlyPrice ();
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
      case 'id':
        return this.renderReadonlyEntity ();
      case 'ids':
        return this.renderReadonlyEntities ();
      default:
        return this.renderReadonlyField ();
    }
  }

  renderEdit () {
    switch (this.props.kind) {
      case 'field':
        return this.renderEditField ();
      case 'dynamic':
        return this.renderDynamic ();
      case 'date':
        return this.renderEditDate ();
      case 'time':
        return this.renderEditTime ();
      case 'price':
        return this.renderEditPrice ();
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
      case 'id':
        return this.renderEditEntity ();
      case 'ids':
        return this.renderEditEntities ();
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
