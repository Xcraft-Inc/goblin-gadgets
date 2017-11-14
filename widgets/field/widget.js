import React from 'react';
import PropTypes from 'prop-types';
import Form from 'laboratory/form';
import Widget from 'laboratory/widget';
import {Control} from 'react-redux-form/immutable';
import * as Bool from 'gadgets/boolean-helpers';
import {
  date as DateConverters,
  time as TimeConverters,
  price as PriceConverters,
} from 'xcraft-core-converters';

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
      throw new Error ('Not implemented');
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

    const labelWidth = this.props.labelWidth || defaultLabelWidth;

    return (
      <Container
        kind="row-field"
        grow={this.props.grow}
        width={this.props.width}
        height={this.props.height}
        verticalSpacing={this.props.verticalSpacing}
        verticalJustify={this.props.verticalJustify}
      >
        {labelWidth === '0px'
          ? null
          : <Label
              text={this.props.labelText}
              glyph={this.props.labelGlyph}
              width={labelWidth}
              kind="label-field"
              justify="left"
              spacing="overlap"
              disabled="true"
            />}
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

    const labelWidth = this.props.labelWidth || defaultLabelWidth;

    return (
      <Container
        kind={
          this.props.state === 'compact' ? 'row-field' : 'row-field-readonly'
        }
        grow={this.props.grow}
        width={this.props.width}
        height={this.props.height}
        verticalSpacing={this.props.verticalSpacing}
        verticalJustify={this.props.verticalJustify}
      >
        {labelWidth === '0px'
          ? null
          : <Label
              text={this.props.labelText}
              glyph={this.props.labelGlyph}
              width={labelWidth}
              kind="label-field"
              justify="left"
              spacing="overlap"
              disabled="true"
            />}
        <Value grow="1" justify={this.props.justify} />
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

    const labelWidth = this.props.labelWidth || defaultLabelWidth;

    return (
      <Container
        kind={
          this.props.state === 'compact' ? 'row-field' : 'row-field-readonly'
        }
        subkind="left"
        grow="0"
        width={this.props.width}
        height={this.props.height}
        verticalSpacing={this.props.verticalSpacing}
        verticalJustify={this.props.verticalJustify}
      >
        {labelWidth === '0px'
          ? null
          : <Label
              text={this.props.labelText}
              glyph={this.props.labelGlyph}
              width={labelWidth}
              kind="label-field"
              justify="left"
              spacing="overlap"
              disabled="true"
            />}
        <Value width="120px" justify={this.props.justify} />
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

    const labelWidth = this.props.labelWidth || defaultLabelWidth;

    return (
      <Container
        kind={
          this.props.state === 'compact' ? 'row-field' : 'row-field-readonly'
        }
        subkind="left"
        grow="0"
        width={this.props.width}
        height={this.props.height}
        verticalSpacing={this.props.verticalSpacing}
        verticalJustify={this.props.verticalJustify}
      >
        {labelWidth === '0px'
          ? null
          : <Label
              text={this.props.labelText}
              glyph={this.props.labelGlyph}
              width={labelWidth}
              kind="label-field"
              justify="left"
              spacing="overlap"
              disabled="true"
            />}
        <Value width="120px" justify={this.props.justify} />
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

    const labelWidth = this.props.labelWidth || defaultLabelWidth;

    return (
      <Container
        kind={
          this.props.state === 'compact' ? 'row-field' : 'row-field-readonly'
        }
        subkind="left"
        grow="0"
        width={this.props.width}
        height={this.props.height}
        verticalSpacing={this.props.verticalSpacing}
        verticalJustify={this.props.verticalJustify}
      >
        {labelWidth === '0px'
          ? null
          : <Label
              text={this.props.labelText}
              glyph={this.props.labelGlyph}
              width={labelWidth}
              kind="label-field"
              justify="left"
              spacing="overlap"
              disabled="true"
            />}
        <Value width="120px" justify="right" />
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

    const labelWidth = this.props.labelWidth || defaultLabelWidth;

    return (
      <Container
        kind={
          this.props.state === 'compact' ? 'row-field' : 'row-field-readonly'
        }
        subkind="left"
        grow={this.props.grow}
        width={this.props.width}
        height={this.props.height}
        verticalSpacing={this.props.verticalSpacing}
        verticalJustify={this.props.verticalJustify}
      >
        {labelWidth === '0px'
          ? null
          : <Label
              glyph={this.props.labelGlyph}
              width={labelWidth}
              kind="label-field"
              justify="left"
              spacing="overlap"
              disabled="true"
            />}
        <Check text={this.props.labelText} readonly="true" />
      </Container>
    );
  }

  renderReadonlyFileInput () {
    throw new Error ('Not implemented');
  }

  renderReadonlyEntity () {
    const Viewer = props => {
      const info = this.getModelValue (`${props.entityId}.meta.info`, true);
      return <Label text={info} grow="1" justify={this.props.justify} />;
    };

    const Action = props => {
      return (
        <Button
          kind="check-button"
          glyph="pencil"
          tooltip="Editer"
          onClick={() => {
            {
              const entity = this.getModelValue (props.entityId, true);
              const service = this.context.id.split ('@')[0];
              this.doAs (service, 'open-entity-workitem', {
                entity: entity.toJS (),
              });
            }
          }}
        />
      );
    };

    const EntityViewer = this.mapWidget (Viewer, 'entityId', this.fullPath);
    const EntityAction = this.mapWidget (Action, 'entityId', this.fullPath);

    const labelWidth = this.props.labelWidth || defaultLabelWidth;

    return (
      <Container
        kind={
          this.props.state === 'compact' ? 'row-field' : 'row-field-readonly'
        }
        grow={this.props.grow}
        width={this.props.width}
        height={this.props.height}
        verticalSpacing={this.props.verticalSpacing}
        verticalJustify={this.props.verticalJustify}
      >
        {labelWidth === '0px'
          ? null
          : <Label
              text={this.props.labelText}
              glyph={this.props.labelGlyph}
              width={labelWidth}
              kind="label-field"
              justify="left"
              spacing="overlap"
              disabled="true"
            />}
        <EntityViewer />
        <EntityAction />
      </Container>
    );
  }

  renderReadonlyEntities () {
    if (!this.props.entityIds) {
      //? return null;
    }

    if (this.props.plugin) {
      const WiredPlugin = Widget.Wired (Plugin) (
        `${this.props.plugin}-plugin@${this.context.id}`
      );
      const FinalPlugin = this.mapWidget (
        WiredPlugin,
        'entityIds',
        this.fullPath
      );

      return (
        <Container
          kind={
            this.props.state === 'compact' ? 'row-field' : 'row-field-readonly'
          }
          subkind="light-box"
          grow={this.props.grow}
          width={this.props.width}
          height={this.props.height}
          verticalSpacing={this.props.verticalSpacing}
          verticalJustify={this.props.verticalJustify}
        >
          <FinalPlugin
            readonly="true"
            embedded={this.props.embedded}
            pluginTitle={this.props.pluginTitle}
          />
        </Container>
      );
    } else if (this.props.item) {
      const Items = props => {
        return (
          <Container
            kind="row-field"
            grow={this.props.grow}
            width={this.props.width}
            height={this.props.height}
            verticalSpacing={this.props.verticalSpacing}
            verticalJustify={this.props.verticalJustify}
          >
            {props.entityIds.map ((entityId, index) => {
              const Item = this.mapWidget (
                this.props.item,
                state => state.toJS (),
                `backend.${entityId}`
              );
              return <Item key={index} />;
            })}
          </Container>
        );
      };
      const FinalItems = this.mapWidget (Items, 'entityIds', this.fullPath);
      return <FinalItems />;
    } else {
      throw new Error ('Property plugin is required in this case!');
    }
  }

  renderTitle () {
    const Value = this.mapWidget (
      Label,
      value => {
        return {text: value};
      },
      this.fullPath
    );

    const labelWidth = this.props.labelWidth || defaultLabelWidth;

    return (
      <Container
        kind="row-field"
        grow={this.props.grow}
        width={this.props.width}
        height={this.props.height}
        verticalSpacing={this.props.verticalSpacing}
        verticalJustify={this.props.verticalJustify}
      >
        {labelWidth === '0px'
          ? null
          : <Label
              text={this.props.labelText}
              glyph={this.props.labelGlyph}
              width={labelWidth}
              kind="label-field"
              justify="left"
              spacing="overlap"
              disabled="true"
            />}
        <Value kind="title" grow="1" justify={this.props.justify} />
      </Container>
    );
  }

  renderSubtitle () {
    const Value = this.mapWidget (
      Label,
      value => {
        return {text: value};
      },
      this.fullPath
    );

    const labelWidth = this.props.labelWidth || defaultLabelWidth;

    return (
      <Container
        kind="row-field"
        grow={this.props.grow}
        width={this.props.width}
        height={this.props.height}
        verticalSpacing={this.props.verticalSpacing}
        verticalJustify={this.props.verticalJustify}
      >
        {labelWidth === '0px'
          ? null
          : <Label
              text={this.props.labelText}
              glyph={this.props.labelGlyph}
              width={labelWidth}
              kind="label-field"
              justify="left"
              spacing="overlap"
              disabled="true"
            />}
        <Value grow="1" justify={this.props.justify} />
      </Container>
    );
  }
  //#endregion

  //#region Edit
  renderEditField () {
    return (
      <Container
        kind="row-field"
        grow={this.props.grow}
        width={this.props.width}
        height={this.props.height}
        verticalSpacing={this.props.verticalSpacing}
        verticalJustify={this.props.verticalJustify}
      >
        <LabelTextField
          spacing={this.props.spacing}
          labelText={this.props.labelText}
          labelGlyph={this.props.labelGlyph}
          labelWidth={this.props.labelWidth || defaultLabelWidth}
          fieldWidth={this.props.fieldWidth}
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
        kind="row-field"
        grow="0"
        width={this.props.width}
        height={this.props.height}
        verticalSpacing={this.props.verticalSpacing}
        verticalJustify={this.props.verticalJustify}
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
        kind="row-field"
        grow="0"
        width={this.props.width}
        height={this.props.height}
        verticalSpacing={this.props.verticalSpacing}
        verticalJustify={this.props.verticalJustify}
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
        kind="row-field"
        grow="0"
        width={this.props.width}
        height={this.props.height}
        verticalSpacing={this.props.verticalSpacing}
        verticalJustify={this.props.verticalJustify}
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

  renderEditCombo () {
    const labelWidth = this.props.labelWidth || defaultLabelWidth;

    return (
      <Container
        kind="row-field"
        grow={this.props.grow}
        width={this.props.width}
        height={this.props.height}
        verticalSpacing={this.props.verticalSpacing}
        verticalJustify={this.props.verticalJustify}
      >
        {labelWidth === '0px'
          ? null
          : <Label
              text={this.props.labelText}
              glyph={this.props.labelGlyph}
              width={labelWidth}
              kind="label-field"
              justify="left"
              spacing="overlap"
            />}
        <TextFieldCombo
          hintText={this.props.hintText}
          width={this.props.fieldWidth}
          model={this.props.model}
          readonly={this.props.comboReadonly}
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

    const labelWidth = this.props.labelWidth || defaultLabelWidth;

    return (
      <Container
        kind="row-field"
        subkind="left"
        grow={this.props.grow}
        width={this.props.width}
        height={this.props.height}
        verticalSpacing={this.props.verticalSpacing}
        verticalJustify={this.props.verticalJustify}
      >
        {labelWidth === '0px'
          ? null
          : <Label
              text={this.props.labelText}
              glyph={this.props.labelGlyph}
              width={labelWidth}
              kind="label-field"
              justify="left"
              spacing="overlap"
            />}
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

    const labelWidth = this.props.labelWidth || defaultLabelWidth;

    return (
      <Container
        kind="row-field"
        subkind="left"
        grow={this.props.grow}
        width={this.props.width}
        height={this.props.height}
        verticalSpacing={this.props.verticalSpacing}
        verticalJustify={this.props.verticalJustify}
      >
        {labelWidth === '0px'
          ? null
          : <Label
              glyph={this.props.labelGlyph}
              width={labelWidth}
              kind="label-field"
              justify="left"
              spacing="overlap"
            />}
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
    const Viewer = props => {
      const info = this.getModelValue (`${props.entityId}.meta.info`, true);
      return <Label text={info} />;
    };

    const EntityViewer = this.mapWidget (Viewer, 'entityId', this.fullPath);

    return (
      <Container
        kind="row-field"
        subkind="light-box"
        grow={this.props.grow}
        width={this.props.width}
        height={this.props.height}
        verticalSpacing={this.props.verticalSpacing}
        verticalJustify={this.props.verticalJustify}
      >
        <EntityViewer />
      </Container>
    );
  }

  renderEditEntities () {
    if (!this.props.entityIds) {
      //? return null;
    }

    if (this.props.plugin) {
      const WiredPlugin = Widget.Wired (Plugin) (
        `${this.props.plugin}-plugin@${this.context.id}`
      );
      const FinalPlugin = this.mapWidget (
        WiredPlugin,
        'entityIds',
        this.fullPath
      );

      return (
        <Container
          kind="row-field"
          subkind="light-box"
          grow={this.props.grow}
          width={this.props.width}
          height={this.props.height}
          verticalSpacing={this.props.verticalSpacing}
          verticalJustify="top"
        >
          <FinalPlugin
            id={this.context.id}
            embedded={this.props.embedded}
            pluginTitle={this.props.pluginTitle}
            dragType={this.props.dragType}
            disableAdd={this.props.disableAdd}
            disableDelete={this.props.disableDelete}
            horizontalSeparator={this.props.horizontalSeparator}
          />
        </Container>
      );
    } else if (this.props.item) {
      const Items = props => {
        return (
          <Container
            kind="row-field"
            grow={this.props.grow}
            width={this.props.width}
            height={this.props.height}
            verticalSpacing={this.props.verticalSpacing}
            verticalJustify={this.props.verticalJustify}
          >
            {props.entityIds.map ((entityId, index) => {
              const Item = this.mapWidget (
                this.props.item,
                state => state.toJS (),
                `backend.${entityId}`
              );
              return <Item key={index} />;
            })}
          </Container>
        );
      };
      const FinalItems = this.mapWidget (Items, 'entityIds', this.fullPath);
      return <FinalItems />;
    } else {
      throw new Error ('Property plugin or item is required in this case!');
    }
  }

  renderEditHinter () {
    const targetPath = this.props.targetModel
      ? this.getFullPathFromModel (this.props.targetModel)
      : this.fullPath;

    const Hinter = this.mapWidget (
      TextField,
      value => {
        if (value && value !== '') {
          let selectedId = null;
          if (!this.props.onValue) {
            selectedId = value;
            value = this.getModelValue (`${value}.meta.info`, true);
          }
          return {selectedValue: value, selectedId};
        } else {
          return {};
        }
      },
      this.fullPath
    );

    const Form = this.Form;

    let HinterLabel = null;

    if (this.props.targetModel) {
      HinterLabel = this.mapWidget (Label, 'text', targetPath);
    } else {
      HinterLabel = this.mapWidget (
        Label,
        value => {
          if (value && value !== '') {
            if (!this.props.onValue) {
              value = this.getModelValue (`${value}.meta.info`, true);
            }
            return {text: value};
          } else {
            return {};
          }
        },
        this.fullPath
      );
    }

    const HinterLine = props => (
      <Container
        kind="row-field"
        grow={this.props.grow}
        width={this.props.width}
        height={this.props.height}
        verticalSpacing={this.props.verticalSpacing}
        verticalJustify="top"
      >
        <Label
          kind="label-text-field"
          wrap="no"
          text={this.props.labelText}
          glyph={this.props.labelGlyph}
          width={this.props.labelWidth || defaultLabelWidth}
        />
        {props.existingValue
          ? <HinterLabel
              kind="markdown"
              spacing="overlap"
              width={this.props.labelWidth || defaultLabelWidth}
              hintText={this.props.hintText}
              grow="2"
              onClick={() => this.setBackendValue (this.fullPath, null)}
            />
          : null}
        {props.existingValue
          ? <Button
              kind="combo"
              glyph="eraser"
              width="32px"
              tooltip="Entrer une nouvelle référence"
              spacing="overlap"
              onClick={() => this.setBackendValue (this.fullPath, null)}
            />
          : <Form
              {...this.formConfigWithComponent (() => (
                <Hinter
                  id={this.context.id}
                  hintText={this.props.hintText}
                  hinter={this.props.hinter}
                  comboType={this.props.hinter}
                  grow="1"
                />
              ))}
            />}
        {this.props.onValue
          ? null
          : props.existingValue
              ? <Button
                  kind="combo"
                  glyph="eye"
                  tooltip="Voir les détails"
                  onClick={() =>
                    this.navToDetail (this.context.id, props.existingValue)}
                />
              : null}
      </Container>
    );

    const HinterField = this.mapWidget (
      HinterLine,
      'existingValue',
      this.fullPath
    );

    return <HinterField />;
  }

  renderEditFileInput () {
    return (
      <Container
        kind="row-field"
        grow={this.props.grow}
        width={this.props.width}
        height={this.props.height}
        verticalSpacing={this.props.verticalSpacing}
        verticalJustify={this.props.verticalJustify}
      >
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
      case 'combo':
        return this.renderReadonlyField ();
      case 'radio':
        return this.renderReadonlyField ();
      case 'bool':
        return this.renderReadonlyBool ();
      case 'hinter':
        return this.renderReadonlyEntity ();
      case 'file':
        return this.renderReadonlyFileInput ();
      case 'id':
        return this.renderReadonlyEntity ();
      case 'ids':
        return this.renderReadonlyEntities ();
      case 'title':
        return this.renderTitle ();
      case 'subtitle':
        return this.renderSubtitle ();
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
      case 'title':
        return this.renderTitle ();
      case 'subtitle':
        return this.renderSubtitle ();
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
