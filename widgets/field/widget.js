import React from 'react';
import Form from 'laboratory/form';
import Widget from 'laboratory/widget';
import * as Bool from 'gadgets/boolean-helpers';
import {
  date as DateConverters,
  time as TimeConverters,
  price as PriceConverters,
  weight as WeightConverters,
  volume as VolumeConverters,
  number as NumberConverters,
  percent as PercentConverters,
  delay as DelayConverters,
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
import CheckList from 'gadgets/check-list/widget';
import CalendarRecurrence from 'gadgets/calendar-recurrence/widget';
import Table from 'gadgets/table/widget';

import Plugin from 'desktop/plugin/widget';

import importer from 'laboratory/importer';
const widgetImporter = importer ('widget');

/******************************************************************************/

const defaultLabelWidth = '120px';

class Field extends Form {
  constructor () {
    super (...arguments);
    this.handleFileChange = this.handleFileChange.bind (this);
  }

  get readonly () {
    return (
      Bool.isTrue (this.props.readonly) || Bool.isTrue (this.context.readonly)
    );
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
        if (!value) {
          return;
        }
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
        <Dynamic grow="1" tooltip={this.props.tooltip} />
      </Container>
    );
  }

  renderTableDynamic () {
    const Dynamic = this.mapWidget (
      Table,
      value => {
        if (!value) {
          return;
        }
        if (typeof value === 'object') {
          return this.props.map (value.toJS ());
        }
        return this.props.map (value);
      },
      this.fullPath
    );

    return <Dynamic grow="1" tooltip={this.props.tooltip} />;
  }

  renderButtonDynamic () {
    const Dynamic = this.mapWidget (
      Button,
      value => {
        if (!value) {
          return;
        }
        if (typeof value === 'object') {
          return this.props.map (value.toJS ());
        }
        return this.props.map (value);
      },
      this.fullPath
    );

    return <Dynamic grow="1" tooltip={this.props.tooltip} />;
  }

  //#region Readonly
  renderReadonlyField () {
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
          readonly="true"
          spacing={this.props.spacing}
          labelText={this.props.labelText}
          labelGlyph={this.props.labelGlyph}
          labelWidth={this.props.labelWidth || defaultLabelWidth}
          fieldWidth={this.props.fieldWidth}
          hintText={this.props.hintText}
          tooltip={this.props.tooltip || this.props.hintText}
          rows={this.props.rows}
          model={this.props.model}
          required={this.props.required}
          grow="1"
        />
      </Container>
    );
  }

  renderReadonlyDate () {
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
          readonly="true"
          type="date"
          spacing={this.props.spacing}
          labelText={this.props.labelText}
          labelGlyph={this.props.labelGlyph}
          labelWidth={this.props.labelWidth || defaultLabelWidth}
          fieldWidth={this.props.fieldWidth || '120px'}
          hintText={this.props.hintText}
          tooltip={this.props.tooltip || this.props.hintText}
          model={this.props.model}
          required={this.props.required}
        />
      </Container>
    );
  }

  renderReadonlyTime () {
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
          readonly="true"
          type="time"
          spacing={this.props.spacing}
          labelText={this.props.labelText}
          labelGlyph={this.props.labelGlyph}
          labelWidth={this.props.labelWidth || defaultLabelWidth}
          fieldWidth={this.props.fieldWidth || '120px'}
          hintText={this.props.hintText}
          tooltip={this.props.tooltip || this.props.hintText}
          model={this.props.model}
          required={this.props.required}
        />
      </Container>
    );
  }

  renderReadonlyPrice () {
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
          readonly="true"
          type="price"
          spacing={this.props.spacing}
          labelText={this.props.labelText}
          labelGlyph={this.props.labelGlyph}
          labelWidth={this.props.labelWidth || defaultLabelWidth}
          fieldWidth={this.props.fieldWidth || '120px'}
          hintText={this.props.hintText}
          tooltip={this.props.tooltip || this.props.hintText}
          model={this.props.model}
          required={this.props.required}
        />
      </Container>
    );
  }

  renderReadonlyWeight () {
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
          readonly="true"
          type="weight"
          unit={this.props.unit}
          spacing={this.props.spacing}
          labelText={this.props.labelText}
          labelGlyph={this.props.labelGlyph}
          labelWidth={this.props.labelWidth || defaultLabelWidth}
          fieldWidth={this.props.fieldWidth || '120px'}
          hintText={this.props.hintText}
          tooltip={this.props.tooltip || this.props.hintText}
          model={this.props.model}
          required={this.props.required}
        />
      </Container>
    );
  }

  renderReadonlyVolume () {
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
          readonly="true"
          type="volume"
          unit={this.props.unit}
          spacing={this.props.spacing}
          labelText={this.props.labelText}
          labelGlyph={this.props.labelGlyph}
          labelWidth={this.props.labelWidth || defaultLabelWidth}
          fieldWidth={this.props.fieldWidth || '200px'}
          hintText={this.props.hintText}
          tooltip={this.props.tooltip || this.props.hintText}
          model={this.props.model}
          required={this.props.required}
        />
      </Container>
    );
  }

  renderReadonlyNumber () {
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
          readonly="true"
          type="number"
          unit={this.props.unit}
          spacing={this.props.spacing}
          labelText={this.props.labelText}
          labelGlyph={this.props.labelGlyph}
          labelWidth={this.props.labelWidth || defaultLabelWidth}
          fieldWidth={this.props.fieldWidth || '120px'}
          hintText={this.props.hintText}
          tooltip={this.props.tooltip || this.props.hintText}
          model={this.props.model}
          required={this.props.required}
        />
      </Container>
    );
  }

  renderReadonlyPercent () {
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
          readonly="true"
          type="percent"
          unit={this.props.unit}
          spacing={this.props.spacing}
          labelText={this.props.labelText}
          labelGlyph={this.props.labelGlyph}
          labelWidth={this.props.labelWidth || defaultLabelWidth}
          fieldWidth={this.props.fieldWidth || '120px'}
          hintText={this.props.hintText}
          tooltip={this.props.tooltip || this.props.hintText}
          model={this.props.model}
          required={this.props.required}
        />
      </Container>
    );
  }

  renderReadonlyDelay () {
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
          readonly="true"
          type="delay"
          unit={this.props.unit}
          spacing={this.props.spacing}
          labelText={this.props.labelText}
          labelGlyph={this.props.labelGlyph}
          labelWidth={this.props.labelWidth || defaultLabelWidth}
          fieldWidth="200px"
          hintText={this.props.hintText}
          tooltip={this.props.tooltip || this.props.hintText}
          model={this.props.model}
          required={this.props.required}
        />
      </Container>
    );
  }

  renderReadonlyLabel () {
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
        verticalSpacing={this.props.verticalSpacing || 'compact'}
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
  renderReadonlyBool () {
    const WiredCheckButton = this.mapWidget (
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
              disabled="true"
            />}
        <WiredCheckButton
          kind={this.props.subkind}
          text={this.props.labelText}
          readonly="true"
        />
      </Container>
    );
  }

  renderReadonlyFileInput () {
    throw new Error ('Not implemented');
  }

  renderReadonlyEntity () {
    const summary = this.props.summary || 'info';
    const Viewer = props => {
      if (!props.entityId) {
        return null;
      }
      const Info = this.mapWidget (
        Label,
        entity => {
          let glyph = 'solid/spinner';
          let text = 'Chargement...';
          if (entity) {
            glyph = entity.get ('meta.summaries.glyph');
            text = entity.get (`meta.summaries.${summary}`);
          }
          return {
            kind: 'markdown',
            shape: 'left-smooth',
            glyph,
            text,
            grow: '1',
            justify: this.props.justify,
          };
        },
        `backend.${props.entityId}`
      );
      return <Info />;
    };

    const Action = props => {
      return !!props.entityId
        ? <Button
            kind="combo"
            shape="right-smooth"
            leftSpacing="overlap"
            spacing={this.props.spacing}
            glyph="solid/pencil"
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
        : null;
    };

    const EntityViewer = this.mapWidget (Viewer, 'entityId', this.fullPath);
    const EntityAction = this.mapWidget (Action, 'entityId', this.fullPath);

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
              kind="label-field"
              text={this.props.labelText}
              glyph={this.props.labelGlyph}
              width={labelWidth}
              justify="left"
              disabled="true"
            />}
        <EntityViewer />
        <EntityAction />
      </Container>
    );
  }

  renderReadonlyEntities () {
    if (this.props.plugin) {
      let WiredPlugin = null;

      if (this.props.pluginType) {
        const CustomPlugin = widgetImporter (`plugin-${this.props.pluginType}`);
        WiredPlugin = Widget.Wired (CustomPlugin) (
          `${this.props.plugin}-plugin@${this.context.id}`
        );
      } else {
        WiredPlugin = Widget.Wired (Plugin) (
          `${this.props.plugin}-plugin@${this.context.id}`
        );
      }

      const FinalPlugin = this.mapWidget (
        WiredPlugin,
        'entityIds',
        this.fullPath
      );

      return (
        <Container
          kind={this.props.containerKind || 'row-field'}
          subkind="light-box"
          grow={this.props.grow}
          width={this.props.width}
          height={this.props.height}
          verticalSpacing={this.props.verticalSpacing}
          verticalJustify={this.props.verticalJustify}
        >
          <FinalPlugin
            readonly="true"
            ownerType={this.props.ownerType}
            extended={this.props.extended}
            hilited={this.props.hilited}
            noDrag={this.props.noDrag}
            embedded={this.props.embedded}
            embeddedLevel={
              this.props.embeddedLevel ? this.props.embeddedLevel + 1 : 1
            }
            pluginTitle={this.props.pluginTitle}
            dragServiceId={
              this.props.dragServiceId || this.context.dragServiceId
            }
            origin={this.props.origin}
            horizontalSeparator={this.props.horizontalSeparator}
          />
        </Container>
      );
    } else if (this.props.item) {
      const Items = props => {
        if (!props.entityIds) {
          return null;
        }
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
                state => (state ? state.toJS () : null),
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
          tooltip={this.props.tooltip || this.props.hintText}
          rows={this.props.rows}
          required={this.props.required}
          model={this.props.model}
          grow="1"
        />
      </Container>
    );
  }

  renderEditDate () {
    let periodPath = null;
    let minArg = null;
    let maxArg = null;
    let mode = null;
    if (this.props.periodModel) {
      const s = this.props.periodModel.split ('|');
      if (s.length > 2) {
        minArg = s[1]; // by example '1d'
        maxArg = s[2]; // by example '1y'
      }
      if (s.length > 3) {
        mode = s[3]; // by example 'hard'
      }
      periodPath = this.getFullPathFromModel (s[0]); // by example '.startDate'
    }

    if (periodPath) {
      const WiredTextFieldTyped = this.mapWidget (
        TextFieldTyped,
        date => {
          const minDate = DateConverters.getCalcDate (date, minArg);
          const maxDate = DateConverters.getCalcDate (date, maxArg);
          return {model: this.props.model, minDate, maxDate, mode}; // (*)
        },
        periodPath
      );
      // (*) It's important to pass model! Without, strange bugs appears,
      //     with interactions between all date fields.

      return (
        <Container
          kind="row-field"
          grow="0"
          width={this.props.width}
          height={this.props.height}
          verticalSpacing={this.props.verticalSpacing}
          verticalJustify={this.props.verticalJustify}
        >
          <WiredTextFieldTyped
            type="date"
            spacing={this.props.spacing}
            labelText={this.props.labelText}
            labelGlyph={this.props.labelGlyph}
            labelWidth={this.props.labelWidth || defaultLabelWidth}
            fieldWidth={this.props.fieldWidth || '120px'}
            hintText={this.props.hintText}
            tooltip={this.props.tooltip || this.props.hintText}
            required={this.props.required}
          />
        </Container>
      );
    } else {
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
            spacing={this.props.spacing}
            labelText={this.props.labelText}
            labelGlyph={this.props.labelGlyph}
            labelWidth={this.props.labelWidth || defaultLabelWidth}
            fieldWidth={this.props.fieldWidth || '120px'}
            hintText={this.props.hintText}
            tooltip={this.props.tooltip || this.props.hintText}
            required={this.props.required}
            model={this.props.model}
          />
        </Container>
      );
    }
  }

  renderEditTime () {
    let periodPath = null;
    let minArg = null;
    let maxArg = null;
    let mode = null;
    if (this.props.periodModel) {
      const s = this.props.periodModel.split ('|');
      if (s.length > 2) {
        minArg = s[1]; // by example '5h'
        maxArg = s[2]; // by example '30m'
      }
      if (s.length > 3) {
        mode = s[3]; // by example 'hard'
      }
      periodPath = this.getFullPathFromModel (s[0]); // by example '.startPlannedTime'
    }

    if (periodPath) {
      const WiredTextFieldTyped = this.mapWidget (
        TextFieldTyped,
        time => {
          const minTime = TimeConverters.getCalcTime (time, minArg);
          const maxTime = TimeConverters.getCalcTime (time, maxArg);
          return {model: this.props.model, minTime, maxTime, mode}; // (*)
        },
        periodPath
      );
      // (*) It's important to pass model! Without, strange bugs appears,
      //     with interactions between all time fields.

      return (
        <Container
          kind="row-field"
          grow="0"
          width={this.props.width}
          height={this.props.height}
          verticalSpacing={this.props.verticalSpacing}
          verticalJustify={this.props.verticalJustify}
        >
          <WiredTextFieldTyped
            type="time"
            spacing={this.props.spacing}
            labelText={this.props.labelText}
            labelGlyph={this.props.labelGlyph}
            labelWidth={this.props.labelWidth || defaultLabelWidth}
            fieldWidth={this.props.fieldWidth || '120px'}
            hintText={this.props.hintText}
            tooltip={this.props.tooltip || this.props.hintText}
            required={this.props.required}
          />
        </Container>
      );
    } else {
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
            spacing={this.props.spacing}
            labelText={this.props.labelText}
            labelGlyph={this.props.labelGlyph}
            labelWidth={this.props.labelWidth || defaultLabelWidth}
            fieldWidth={this.props.fieldWidth || '120px'}
            hintText={this.props.hintText}
            tooltip={this.props.tooltip || this.props.hintText}
            required={this.props.required}
            model={this.props.model}
          />
        </Container>
      );
    }
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
          spacing={this.props.spacing}
          labelText={this.props.labelText}
          labelGlyph={this.props.labelGlyph}
          labelWidth={this.props.labelWidth || defaultLabelWidth}
          fieldWidth={this.props.fieldWidth || '120px'}
          hintText={this.props.hintText}
          tooltip={this.props.tooltip || this.props.hintText}
          required={this.props.required}
          model={this.props.model}
        />
      </Container>
    );
  }

  renderEditWeight () {
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
          type="weight"
          unit={this.props.unit}
          spacing={this.props.spacing}
          labelText={this.props.labelText}
          labelGlyph={this.props.labelGlyph}
          labelWidth={this.props.labelWidth || defaultLabelWidth}
          fieldWidth={this.props.fieldWidth || '120px'}
          hintText={this.props.hintText}
          tooltip={this.props.tooltip || this.props.hintText}
          required={this.props.required}
          model={this.props.model}
        />
      </Container>
    );
  }

  renderEditVolume () {
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
          type="volume"
          unit={this.props.unit}
          spacing={this.props.spacing}
          labelText={this.props.labelText}
          labelGlyph={this.props.labelGlyph}
          labelWidth={this.props.labelWidth || defaultLabelWidth}
          fieldWidth={this.props.fieldWidth || '200px'}
          hintText={this.props.hintText}
          tooltip={this.props.tooltip || this.props.hintText}
          required={this.props.required}
          model={this.props.model}
        />
      </Container>
    );
  }

  renderEditNumber () {
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
          type="number"
          unit={this.props.unit}
          spacing={this.props.spacing}
          labelText={this.props.labelText}
          labelGlyph={this.props.labelGlyph}
          labelWidth={this.props.labelWidth || defaultLabelWidth}
          fieldWidth={this.props.fieldWidth || '120px'}
          hintText={this.props.hintText}
          tooltip={this.props.tooltip || this.props.hintText}
          required={this.props.required}
          model={this.props.model}
        />
      </Container>
    );
  }

  renderEditPercent () {
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
          type="percent"
          unit={this.props.unit}
          spacing={this.props.spacing}
          labelText={this.props.labelText}
          labelGlyph={this.props.labelGlyph}
          labelWidth={this.props.labelWidth || defaultLabelWidth}
          fieldWidth={this.props.fieldWidth || '120px'}
          hintText={this.props.hintText}
          tooltip={this.props.tooltip || this.props.hintText}
          required={this.props.required}
          model={this.props.model}
        />
      </Container>
    );
  }

  renderEditDelay () {
    const help =
      '1a = 1 année\r2mo = 2 mois\r3j = 3 jours\r4h = 4 heures\r5m = 5 minutes';
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
          type="delay"
          unit={this.props.unit}
          spacing={this.props.spacing}
          labelText={this.props.labelText}
          labelGlyph={this.props.labelGlyph}
          labelWidth={this.props.labelWidth || defaultLabelWidth}
          fieldWidth="200px"
          hintText={this.props.hintText}
          tooltip={this.props.tooltip || this.props.hintText || help}
          required={this.props.required}
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
          spacing={this.props.spacing}
          hintText={this.props.hintText}
          tooltip={this.props.tooltip || this.props.hintText}
          width={this.props.fieldWidth}
          model={this.props.model}
          readonly={this.props.comboReadonly}
          required={this.props.required}
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
    const WiredRadioList = this.mapWidget (
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
              tooltip={this.props.tooltip}
              width={labelWidth}
              kind="label-field"
              justify="left"
              spacing="overlap"
            />}
        <WiredRadioList
          buttonWidth={this.props.buttonWidth}
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

  renderCheckList () {
    const WiredCheckList = this.mapWidget (
      CheckList,
      value => {
        if (value && value !== '') {
          return {value};
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
        <WiredCheckList
          width={this.props.width}
          height={this.props.height}
          heightStrategy="compact"
          direction={this.props.direction || 'column'}
          showHeader={this.props.showHeader}
          list={this.props.list}
          readonly={Bool.toString (this.readonly)}
          selectionChanged={value => {
            this.setBackendValue (this.fullPath, value);
          }}
        />
      </Container>
    );
  }

  renderEditBool () {
    const WiredCheckButton = this.mapWidget (
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
        <WiredCheckButton
          kind={this.props.subkind}
          text={this.props.labelText}
          tooltip={this.props.tooltip || this.props.hintText}
          onClick={() => {
            const checked = this.getBackendValue (this.fullPath);
            this.setBackendValue (this.fullPath, !checked);
            if (this.props.onClick) {
              this.props.onClick ();
            }
          }}
        />
      </Container>
    );
  }

  renderCalendarRecurrence () {
    const WiredCalendarRecurrence = this.mapWidget (
      CalendarRecurrence,
      r => {
        return {
          startDate: r.get ('startDate'),
          endDate: r.get ('endDate'),
          days: r.get ('days'),
          addDates: r.get ('addDates'),
          cronDates: r.get ('cronDates'),
        };
      },
      this.fullPath
    );

    return (
      <WiredCalendarRecurrence
        readonly={Bool.toString (this.readonly)}
        dateClicked={date => {
          const service = this.context.id.split ('@')[0];
          this.doAs (service, 'date-clicked', {
            date,
          });
        }}
        flushAdd={() => {
          const service = this.context.id.split ('@')[0];
          this.doAs (service, 'flush-add');
        }}
      />
    );
  }

  renderEditEntity () {
    const summary = this.props.summary || 'info';
    const Viewer = props => {
      if (!props.entityId) {
        return null;
      }
      const Info = this.mapWidget (
        Label,
        entity => {
          let glyph = 'solid/spinner';
          let text = 'chargement...';
          if (entity) {
            glyph = entity.get ('meta.summaries.glyph');
            text = entity.get (`meta.summaries.${summary}`);
          }
          return {
            glyph,
            text,
          };
        },
        `backend.${props.entityId}`
      );
      return <Info />;
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
    if (this.props.plugin) {
      let WiredPlugin = null;
      if (this.props.pluginType) {
        const CustomPlugin = widgetImporter (`plugin-${this.props.pluginType}`);
        WiredPlugin = Widget.Wired (CustomPlugin) (
          `${this.props.plugin}-plugin@${this.context.id}`
        );
      } else {
        WiredPlugin = Widget.Wired (Plugin) (
          `${this.props.plugin}-plugin@${this.context.id}`
        );
      }

      const FinalPlugin = this.mapWidget (
        WiredPlugin,
        'entityIds',
        this.fullPath
      );

      return (
        <Container
          kind={this.props.containerKind || 'row-field'}
          subkind="light-box"
          grow={this.props.grow}
          width={this.props.width}
          height={this.props.height}
          verticalSpacing={this.props.verticalSpacing}
          verticalJustify="top"
        >
          <FinalPlugin
            id={this.context.id}
            pluginType={this.props.pluginType}
            dragServiceId={
              this.props.dragServiceId || this.context.dragServiceId
            }
            ownerType={this.props.ownerType}
            extended={this.props.extended}
            hilited={this.props.hilited}
            noDrag={this.props.noDrag}
            embedded={this.props.embedded}
            embeddedLevel={
              this.props.embeddedLevel ? this.props.embeddedLevel + 1 : 1
            }
            pluginTitle={this.props.pluginTitle}
            origin={this.props.origin}
            dragType={this.props.dragType}
            disableAdd={this.props.disableAdd}
            disableDelete={this.props.disableDelete}
            horizontalSeparator={this.props.horizontalSeparator}
          />
        </Container>
      );
    } else if (this.props.item) {
      const Items = props => {
        if (!props.entityIds) {
          return null;
        }
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
                state => (state ? state.toJS () : null),
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

    const summary = this.props.summary || 'info';

    const Hinter = this.mapWidget (
      TextField,
      value => {
        if (value && value !== '') {
          let selectedId = null;
          if (!this.props.onValue) {
            selectedId = value;
            value = this.getModelValue (
              `${value}.meta.summaries.${summary}`,
              true
            );
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
          let text = '';
          let glyph = null;
          if (value && value !== '') {
            if (!this.props.onValue) {
              text = this.getModelValue (
                `${value}.meta.summaries.${summary}`,
                true
              );
              glyph = this.getModelValue (
                `${value}.meta.summaries.glyph`,
                true
              );
            }
            return {text, glyph};
          } else {
            return {};
          }
        },
        this.fullPath
      );
    }

    const HinterLineValue = props => (
      <Container
        kind="row-field"
        grow={this.props.grow}
        width={this.props.width}
        height={this.props.height}
        verticalSpacing={this.props.verticalSpacing}
        verticalJustify="top"
        spacing={this.props.spacing}
      >
        <Label
          kind="label-text-field"
          wrap="no"
          text={this.props.labelText}
          glyph={this.props.labelGlyph}
          width={this.props.labelWidth || defaultLabelWidth}
        />
        <HinterLabel
          kind="markdown"
          shape="left-smooth"
          width={this.props.labelWidth || defaultLabelWidth}
          hintText={this.props.hintText}
          tooltip={this.props.tooltip || this.props.hintText}
          grow="2"
        />
        <Button
          kind="combo"
          shape={this.props.onValue ? 'right-smooth' : null}
          leftSpacing="overlap"
          glyph="solid/eraser"
          width="32px"
          tooltip="Entrer une nouvelle référence"
          onClick={() => this.setBackendValue (this.fullPath, null)}
        />
        {this.props.onValue
          ? null
          : <Button
              kind="combo"
              shape="right-smooth"
              spacing={this.props.spacing}
              leftSpacing="overlap"
              glyph="solid/eye"
              tooltip="Voir les détails"
              onClick={() =>
                this.navToDetail (
                  this.context.id,
                  props.existingValue,
                  this.props.hinter
                )}
            />}
      </Container>
    );

    const HinterLineCreate = props => (
      <Container
        kind="row-field"
        grow={this.props.grow}
        width={this.props.width}
        height={this.props.height}
        verticalSpacing={this.props.verticalSpacing}
        verticalJustify="top"
        spacing={this.props.spacing}
      >
        <Label
          kind="label-text-field"
          wrap="no"
          text={this.props.labelText}
          glyph={this.props.labelGlyph}
          width={this.props.labelWidth || defaultLabelWidth}
        />
        <Form
          {...this.formConfigWithComponent (() => (
            <Hinter
              id={this.context.id}
              shape={
                !this.props.onValue && this.props.enableAdd
                  ? 'left-smooth'
                  : 'smooth'
              }
              hintText={this.props.hintText}
              tooltip={this.props.tooltip || this.props.hintText}
              hinter={this.props.hinter}
              comboType={this.props.hinter}
              spacing={this.props.spacing}
              width={this.props.fieldWidth}
              grow="1"
              requiredHinter={this.props.requiredHinter || 'true'}
            />
          ))}
        />
        {!this.props.onValue && this.props.enableAdd
          ? <Button
              kind="combo"
              shape="right-smooth"
              leftSpacing="overlap"
              glyph="solid/plus"
              tooltip="Créer"
              onClick={() => {
                const service = this.context.id.split ('@')[0];
                const currentValue = this.getBackendValue (
                  `backend.${this.context.id}.${this.props.hinter}`
                );
                if (currentValue && currentValue.length > 2) {
                  this.doAs (service, `add-new-${this.props.hinter}`, {
                    value: currentValue,
                  });
                }
              }}
            />
          : null}
      </Container>
    );

    const HinterLine = props =>
      props.existingValue
        ? <HinterLineValue {...props} />
        : <HinterLineCreate {...props} />;

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

  renderEditDirectoryInput () {
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
          ref={n => {
            if (n) {
              n.directory = true;
              n.webkitdirectory = true;
            }
          }}
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
      case 'table-dynamic':
        return this.renderTableDynamic ();
      case 'button-dynamic':
        return this.renderButtonDynamic ();
      case 'date':
        return this.renderReadonlyDate ();
      case 'time':
        return this.renderReadonlyTime ();
      case 'price':
        return this.renderReadonlyPrice ();
      case 'weight':
        return this.renderReadonlyWeight ();
      case 'volume':
        return this.renderReadonlyVolume ();
      case 'number':
        return this.renderReadonlyNumber ();
      case 'percent':
        return this.renderReadonlyPercent ();
      case 'delay':
        return this.renderReadonlyDelay ();
      case 'combo':
        return this.renderReadonlyField ();
      case 'radio':
        return this.renderReadonlyField ();
      case 'check-list':
        return this.renderCheckList ();
      case 'bool':
        return this.renderReadonlyBool ();
      case 'calendar-recurrence':
        return this.renderCalendarRecurrence ();
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
      case 'label':
        return this.renderReadonlyLabel ();
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
      case 'table-dynamic':
        return this.renderTableDynamic ();
      case 'button-dynamic':
        return this.renderButtonDynamic ();
      case 'date':
        return this.renderEditDate ();
      case 'time':
        return this.renderEditTime ();
      case 'price':
        return this.renderEditPrice ();
      case 'weight':
        return this.renderEditWeight ();
      case 'volume':
        return this.renderEditVolume ();
      case 'number':
        return this.renderEditNumber ();
      case 'percent':
        return this.renderEditPercent ();
      case 'delay':
        return this.renderEditDelay ();
      case 'combo':
        return this.renderEditCombo ();
      case 'radio':
        return this.renderEditRadio ();
      case 'check-list':
        return this.renderCheckList ();
      case 'bool':
        return this.renderEditBool ();
      case 'calendar-recurrence':
        return this.renderCalendarRecurrence ();
      case 'hinter':
        return this.renderEditHinter ();
      case 'file':
        return this.renderEditFileInput ();
      case 'directory':
        return this.renderEditDirectoryInput ();
      case 'id':
        return this.renderEditEntity ();
      case 'ids':
        return this.renderEditEntities ();
      case 'title':
        return this.renderTitle ();
      case 'subtitle':
        return this.renderSubtitle ();
      case 'label':
        return this.renderReadonlyLabel ();
      default:
        return this.renderEditField ();
    }
  }

  render () {
    if (this.readonly) {
      return this.renderReadonly ();
    } else {
      return this.renderEdit ();
    }
  }
}

/******************************************************************************/
export default Field;
