import React from 'react';
import Form from 'laboratory/form';
import Widget from 'laboratory/widget';
const Bool = require('gadgets/helpers/bool-helpers');
import {
  date as DateConverters,
  time as TimeConverters,
} from 'xcraft-core-converters';

/******************************************************************************/
//migrated
import ReadonlyLabel from './readonly/label.js';
/******************************************************************************/

import Container from 'gadgets/container/widget';
import Button from 'gadgets/button/widget';
import CheckButton from 'gadgets/check-button/widget';
import Label from 'gadgets/label/widget';
import TextField from 'gadgets/text-field/widget';
import LabelTextField from 'gadgets/label-text-field/widget';
import TextFieldTyped from 'gadgets/text-field-typed/widget';
import TextFieldCombo from 'gadgets/text-field-combo/widget';
import FieldCombo from 'gadgets/field-combo/widget';
import TextFieldTimeInterval from 'gadgets/text-field-time-interval/widget';
import RadioList from 'gadgets/radio-list/widget';
import CheckList from 'gadgets/check-list/widget';
import CalendarRecurrence from 'gadgets/calendar-recurrence/widget';
import Calendar from 'gadgets/calendar/widget';
import CalendarBoards from 'gadgets/calendar-boards/widget';
import Table from 'gadgets/table/widget';

import Plugin from 'desktop/plugin/widget';

import importer from 'laboratory/importer';
const widgetImporter = importer('widget');

/******************************************************************************/

const defaultLabelWidth = '120px';
const pluginBlackListedProps = [
  'kind',
  'containerKind',
  'plugin',
  'mode',
  'grow',
  'width',
  'height',
  'verticalSpacing',
  'verticalJustify',
  'dragServiceId',
  'embeddedLevel',
];
function getPluginProps(propsToFilter) {
  return Object.entries(propsToFilter).reduce((props, [key, value]) => {
    if (!pluginBlackListedProps.includes(key)) {
      props[key] = value;
    }
    return props;
  }, {});
}

/******************************************************************************/

class Field extends Form {
  constructor() {
    super(...arguments);
    this.handleFileChange = this.handleFileChange.bind(this);
  }

  get readonly() {
    return (
      Bool.isTrue(this.props.readonly) || Bool.isTrue(this.context.readonly)
    );
  }

  getFullPathFromModel(model) {
    if (!this.context.model) {
      throw new Error(
        'Cannot resolve context model, your Field is not in a Form ?'
      );
    }
    return `${this.context.model}${model}`;
  }

  get fullPath() {
    return this.getFullPathFromModel(this.props.model);
  }

  showIfFilled(props, Component, path) {
    return this.mapWidget(
      Component,
      value => {
        if (
          props.showStrategy !== 'alwaysVisible' &&
          (!value || value === '')
        ) {
          return {show: 'false'};
        } else {
          return {show: 'true'};
        }
      },
      path
    );
  }

  handleFileChange(ev) {
    ev.persist();
    const fileList = ev.target.files;
    const files = [];
    for (let i = 0; i < fileList.length; i++) {
      files.push(fileList[i].path);
    }
    if (files.length === 1) {
      this.setBackendValue(this.fullPath, files[0]);
      if (this.props.onChange) {
        this.props.onChange(files[0]);
      }
    } else {
      throw new Error('Not implemented');
    }
  }

  renderDynamic() {
    const Dynamic = this.mapWidget(
      Label,
      value => {
        if (!value) {
          return;
        }
        return this.props.map(value);
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
        {labelWidth === '0px' ? null : (
          <Label
            text={this.props.labelText}
            glyph={this.props.labelGlyph}
            width={labelWidth}
            kind="label-field"
            justify="left"
            spacing="overlap"
          />
        )}
        <Dynamic grow="1" tooltip={this.props.tooltip} />
      </Container>
    );
  }

  renderTableDynamic() {
    let Dynamic = this.mapWidget(
      Table,
      value => {
        if (!value) {
          return;
        }
        return this.props.map(value);
      },
      this.fullPath
    );

    if (this.props.selected) {
      Dynamic = this.mapWidget(
        Dynamic,
        value => {
          return {
            selected: value,
          };
        },
        this.getFullPathFromModel(this.props.selected)
      );
    }

    return (
      <Dynamic
        grow="1"
        tooltip={this.props.tooltip}
        onSelectionChanged={this.props.onSelectionChanged}
        selectionMode={this.props.selectionMode}
        hasButtons={this.props.hasButtons}
        frame={this.props.frame}
        height={this.props.height}
      />
    );
  }

  renderButtonDynamic() {
    const Dynamic = this.mapWidget(
      Button,
      value => {
        if (!value) {
          return;
        }
        return this.props.map(value);
      },
      this.fullPath
    );

    return (
      <Dynamic
        {...this.props}
        kind={this.props.buttonKind}
        tooltip={this.props.tooltip}
      />
    );
  }

  //#region Readonly
  renderReadonlyField() {
    const Field = this.showIfFilled(
      this.props,
      props => (
        <Container
          show={props.show}
          kind="row-field"
          grow={this.props.grow}
          width={this.props.width}
          height={this.props.height}
          verticalSpacing={this.props.verticalSpacing}
          verticalJustify={this.props.verticalJustify}
        >
          <LabelTextField
            readonly="true"
            type={this.props.type}
            spacing={this.props.spacing}
            shape={this.props.shape}
            labelText={this.props.labelText}
            labelGlyph={this.props.labelGlyph}
            labelWidth={this.props.labelWidth || defaultLabelWidth}
            fieldWidth={this.props.fieldWidth}
            getGlyph={this.props.getGlyph}
            hintText={this.props.hintText}
            tooltip={this.props.tooltip || this.props.hintText}
            rows={this.props.rows}
            model={this.props.model}
            required={this.props.required}
            grow="1"
          />
        </Container>
      ),
      this.fullPath
    );
    return <Field />;
  }

  renderReadonlyGadget() {
    const target = this.context.id
      ? `backend.${this.context.id}.gadgets.${this.props.name}`
      : `${this.context.model}.gadgets.${this.props.name}`;

    const GadgetLoader = props => {
      if (props.available) {
        const gadgetInfo = this.getBackendValue(target, true);
        const type = gadgetInfo.get('type');
        const Gadget = widgetImporter(type);
        const WiredGadget = Widget.Wired(Gadget)(gadgetInfo.get('id'));
        return <WiredGadget readonly="true" {...this.props} />;
      } else {
        return null;
      }
    };
    const DisplayGadget = this.mapWidget(GadgetLoader, 'available', target);

    return <DisplayGadget />;
  }

  renderReadonlyDate() {
    const Field = this.showIfFilled(
      this.props,
      props => (
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
            shape={this.props.shape}
            labelText={this.props.labelText}
            labelGlyph={this.props.labelGlyph}
            labelWidth={this.props.labelWidth || defaultLabelWidth}
            fieldWidth={this.props.fieldWidth || '120px'}
            getGlyph={this.props.getGlyph}
            hintText={this.props.hintText}
            tooltip={this.props.tooltip || this.props.hintText}
            model={this.props.model}
            required={this.props.required}
          />
        </Container>
      ),
      this.fullPath
    );
    return <Field />;
  }

  renderReadonlyTime() {
    const Field = this.showIfFilled(
      this.props,
      props => (
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
            shape={this.props.shape}
            labelText={this.props.labelText}
            labelGlyph={this.props.labelGlyph}
            labelWidth={this.props.labelWidth || defaultLabelWidth}
            fieldWidth={this.props.fieldWidth || '120px'}
            getGlyph={this.props.getGlyph}
            hintText={this.props.hintText}
            tooltip={this.props.tooltip || this.props.hintText}
            model={this.props.model}
            required={this.props.required}
          />
        </Container>
      ),
      this.fullPath
    );
    return <Field />;
  }

  renderReadonlyDateTime() {
    const Field = this.showIfFilled(
      this.props,
      props => (
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
            type="datetime"
            spacing={this.props.spacing}
            shape={this.props.shape}
            labelText={this.props.labelText}
            labelGlyph={this.props.labelGlyph}
            labelWidth={this.props.labelWidth || defaultLabelWidth}
            fieldWidth={this.props.fieldWidth || '160px'}
            getGlyph={this.props.getGlyph}
            hintText={this.props.hintText}
            tooltip={this.props.tooltip || this.props.hintText}
            model={this.props.model}
            required={this.props.required}
          />
        </Container>
      ),
      this.fullPath
    );
    return <Field />;
  }

  renderReadonlyTimeInterval() {
    const Field = this.showIfFilled(
      this.props,
      props => (
        <Container
          kind="row-field"
          grow="0"
          width={this.props.width}
          height={this.props.height}
          verticalSpacing={this.props.verticalSpacing}
          verticalJustify={this.props.verticalJustify}
        >
          <TextFieldTimeInterval
            readonly="true"
            type="time"
            spacing={this.props.spacing}
            labelText={this.props.labelText}
            labelGlyph={this.props.labelGlyph}
            labelWidth={this.props.labelWidth || defaultLabelWidth}
            startHintText={this.props.startHintText}
            endHintText={this.props.endHintText}
            startTooltip={this.props.startTooltip || this.props.startHintText}
            endTooltip={this.props.endTooltip || this.props.endHintText}
            startModel={this.props.startModel}
            endModel={this.props.endModel}
            required={this.props.required}
          />
        </Container>
      ),
      this.fullPath
    );
    return <Field />;
  }

  renderReadonlyPrice() {
    const Field = this.showIfFilled(
      this.props,
      props => (
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
            shape={this.props.shape}
            labelText={this.props.labelText}
            labelGlyph={this.props.labelGlyph}
            labelWidth={this.props.labelWidth || defaultLabelWidth}
            fieldWidth={this.props.fieldWidth || '120px'}
            getGlyph={this.props.getGlyph}
            hintText={this.props.hintText}
            tooltip={this.props.tooltip || this.props.hintText}
            model={this.props.model}
            required={this.props.required}
          />
        </Container>
      ),
      this.fullPath
    );
    return <Field />;
  }

  renderReadonlyWeight() {
    const Field = this.showIfFilled(
      this.props,
      props => (
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
            shape={this.props.shape}
            labelText={this.props.labelText}
            labelGlyph={this.props.labelGlyph}
            labelWidth={this.props.labelWidth || defaultLabelWidth}
            fieldWidth={this.props.fieldWidth || '120px'}
            getGlyph={this.props.getGlyph}
            hintText={this.props.hintText}
            tooltip={this.props.tooltip || this.props.hintText}
            model={this.props.model}
            required={this.props.required}
          />
        </Container>
      ),
      this.fullPath
    );
    return <Field />;
  }

  renderReadonlyLength() {
    const Field = this.showIfFilled(
      this.props,
      props => (
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
            type="length"
            unit={this.props.unit}
            spacing={this.props.spacing}
            shape={this.props.shape}
            labelText={this.props.labelText}
            labelGlyph={this.props.labelGlyph}
            labelWidth={this.props.labelWidth || defaultLabelWidth}
            fieldWidth={this.props.fieldWidth || '120px'}
            getGlyph={this.props.getGlyph}
            hintText={this.props.hintText}
            tooltip={this.props.tooltip || this.props.hintText}
            model={this.props.model}
            required={this.props.required}
          />
        </Container>
      ),
      this.fullPath
    );
    return <Field />;
  }

  renderReadonlyVolume() {
    const Field = this.showIfFilled(
      this.props,
      props => (
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
            shape={this.props.shape}
            labelText={this.props.labelText}
            labelGlyph={this.props.labelGlyph}
            labelWidth={this.props.labelWidth || defaultLabelWidth}
            fieldWidth={this.props.fieldWidth || '200px'}
            getGlyph={this.props.getGlyph}
            hintText={this.props.hintText}
            tooltip={this.props.tooltip || this.props.hintText}
            model={this.props.model}
            required={this.props.required}
          />
        </Container>
      ),
      this.fullPath
    );
    return <Field />;
  }

  renderReadonlyNumber() {
    const Field = this.showIfFilled(
      this.props,
      props => (
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
            shape={this.props.shape}
            labelText={this.props.labelText}
            labelGlyph={this.props.labelGlyph}
            labelWidth={this.props.labelWidth || defaultLabelWidth}
            fieldWidth={this.props.fieldWidth || '120px'}
            getGlyph={this.props.getGlyph}
            hintText={this.props.hintText}
            tooltip={this.props.tooltip || this.props.hintText}
            model={this.props.model}
            required={this.props.required}
          />
        </Container>
      ),
      this.fullPath
    );
    return <Field />;
  }

  renderReadonlyPercent() {
    const Field = this.showIfFilled(
      this.props,
      props => (
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
            shape={this.props.shape}
            labelText={this.props.labelText}
            labelGlyph={this.props.labelGlyph}
            labelWidth={this.props.labelWidth || defaultLabelWidth}
            fieldWidth={this.props.fieldWidth || '120px'}
            getGlyph={this.props.getGlyph}
            hintText={this.props.hintText}
            tooltip={this.props.tooltip || this.props.hintText}
            model={this.props.model}
            required={this.props.required}
          />
        </Container>
      ),
      this.fullPath
    );
    return <Field />;
  }

  renderReadonlyDelay() {
    const Field = this.showIfFilled(
      this.props,
      props => (
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
            shape={this.props.shape}
            labelText={this.props.labelText}
            labelGlyph={this.props.labelGlyph}
            labelWidth={this.props.labelWidth || defaultLabelWidth}
            fieldWidth="200px"
            getGlyph={this.props.getGlyph}
            hintText={this.props.hintText}
            tooltip={this.props.tooltip || this.props.hintText}
            model={this.props.model}
            required={this.props.required}
          />
        </Container>
      ),
      this.fullPath
    );
    return <Field />;
  }

  renderReadonlyBool() {
    const WiredCheckButton = this.mapWidget(
      CheckButton,
      value => {
        return {checked: value};
      },
      this.fullPath
    );

    const labelWidth = this.props.labelWidth || defaultLabelWidth;

    return (
      <Container
        kind={this.props.containerKind || 'row-field'}
        subkind="left"
        grow={this.props.grow}
        width={this.props.width}
        height={this.props.height}
        verticalSpacing={this.props.verticalSpacing}
        verticalJustify={this.props.verticalJustify}
      >
        {labelWidth === '0px' ? null : (
          <Label
            glyph={this.props.labelGlyph}
            width={labelWidth}
            kind="label-field"
            justify="left"
            spacing="overlap"
          />
        )}
        <WiredCheckButton
          kind={this.props.subkind}
          glyph={this.props.glyph}
          text={this.props.labelText}
          tooltip={this.props.tooltip || this.props.hintText}
          readonly="true"
        />
      </Container>
    );
  }

  renderReadonlyFileInput() {
    throw new Error('Not implemented');
  }

  renderReadonlyHinter() {
    const targetPath = this.props.targetModel
      ? this.getFullPathFromModel(this.props.targetModel)
      : this.fullPath;

    const summary = this.props.summary || 'info';
    let HinterLabel = null;

    if (this.props.targetModel) {
      HinterLabel = this.mapWidget(Label, 'text', targetPath);
    } else {
      HinterLabel = this.mapWidget(
        Label,
        value => {
          let text = '';
          let glyph = null;
          let glyphColor = null;
          if (value && value !== '') {
            if (!this.props.onValue) {
              text = this.getModelValue(
                `${value}.meta.summaries.${summary}`,
                true
              );
              glyph = this.getModelValue(`${value}.meta.summaries.glyph`, true);
              glyphColor = this.getModelValue(
                `${value}.meta.summaries.glyphColor`,
                true
              );
            }
            return {text, glyph, glyphColor};
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
          wrap={this.props.wrap}
          grow="2"
        />
      </Container>
    );

    const HinterLine = props =>
      props.existingValue || this.props.showStrategy === 'alwaysVisible' ? (
        <HinterLineValue {...props} />
      ) : null;

    const HinterField = this.mapWidget(
      HinterLine,
      'existingValue',
      this.fullPath
    );

    return <HinterField />;
  }

  renderReadonlyEntity() {
    const summary = this.props.summary || 'info';
    const Viewer = props => {
      if (!props.entityId) {
        return <Label grow="1" empty="true" spacing={this.props.spacing} />;
      }
      const Info = this.mapWidget(
        Label,
        entity => {
          let glyph = 'solid/spinner';
          let glyphColor = null;
          let text = 'Chargement...';
          if (entity) {
            glyph = entity.get('meta.summaries.glyph');
            glyphColor = entity.get('meta.summaries.glyphColor');
            text = entity.get(`meta.summaries.${summary}`);
          }
          return {
            kind: 'markdown',
            shape: 'left-smooth',
            glyph,
            glyphColor,
            text,
            grow: '1',
            justify: this.props.justify,
            wrap: this.props.wrap,
          };
        },
        `backend.${props.entityId}`
      );
      return <Info />;
    };

    const Action = props => {
      return !!props.entityId && !Bool.isTrue(this.props.disableAdd) ? (
        <Button
          kind="combo"
          shape="right-smooth"
          leftSpacing="overlap"
          spacing={this.props.spacing}
          glyph="solid/pencil"
          tooltip="Editer"
          onClick={() => {
            {
              const entity = this.getModelValue(props.entityId, true);
              const service = this.context.id.split('@')[0];
              this.doAs(service, 'open-entity-workitem', {
                entity: entity,
                desktopId: this.context.desktopId,
              });
            }
          }}
        />
      ) : null;
    };

    const EntityViewer = this.mapWidget(Viewer, 'entityId', this.fullPath);
    const EntityAction = this.mapWidget(Action, 'entityId', this.fullPath);

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
        {labelWidth === '0px' ? null : (
          <Label
            kind="label-field"
            text={this.props.labelText}
            glyph={this.props.labelGlyph}
            width={labelWidth}
            justify="left"
          />
        )}
        <EntityViewer />
        <EntityAction />
      </Container>
    );
  }

  renderReadonlyEntities() {
    const pluginProps = getPluginProps(this.props);
    if (this.props.plugin) {
      let WiredPlugin = null;

      if (this.props.pluginType) {
        const CustomPlugin = widgetImporter(`plugin-${this.props.pluginType}`);
        WiredPlugin = Widget.Wired(CustomPlugin)(
          `${this.props.plugin}-plugin@readonly@${this.context.id}`
        );
      } else {
        WiredPlugin = Widget.Wired(Plugin)(
          `${this.props.plugin}-plugin@readonly@${this.context.id}`
        );
      }

      const FinalPlugin = this.mapWidget(
        WiredPlugin,
        'entityIds',
        this.fullPath
      );

      const FinalContainer = this.mapWidget(
        Container,
        value => {
          const length = value ? value.length : 0;
          const embedded = Bool.isTrue(this.props.embedded);
          const show = Bool.toString(length > 0 || !embedded);
          return {show};
        },
        this.fullPath
      );

      return (
        <FinalContainer
          kind={this.props.containerKind || 'row-field'}
          subkind={this.props.containerSubkind || 'light-box'}
          grow={this.props.grow}
          width={this.props.width}
          height={this.props.height}
          verticalSpacing={this.props.verticalSpacing}
          verticalJustify={this.props.verticalJustify}
        >
          <FinalPlugin
            {...pluginProps}
            readonly="true"
            embeddedLevel={
              this.props.embeddedLevel ? this.props.embeddedLevel + 1 : 1
            }
            dragServiceId={
              this.props.dragServiceId || this.context.dragServiceId
            }
          />
        </FinalContainer>
      );
    } else if (this.props.item) {
      const Items = props => {
        if (!props.entityIds) {
          return <Label grow="1" empty="true" spacing={this.props.spacing} />;
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
            {props.entityIds.map((entityId, index) => {
              const Item = this.mapWidget(
                this.props.item,
                state => (state ? state : null),
                `backend.${entityId}`
              );
              return <Item key={index} />;
            })}
          </Container>
        );
      };
      const FinalItems = this.mapWidget(Items, 'entityIds', this.fullPath);
      return <FinalItems />;
    } else {
      throw new Error('Property plugin is required in this case!');
    }
  }

  renderTitle() {
    const Value = this.mapWidget(
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
        {labelWidth === '0px' ? null : (
          <Label
            text={this.props.labelText}
            glyph={this.props.labelGlyph}
            width={labelWidth}
            kind="label-field"
            justify="left"
            spacing="overlap"
          />
        )}
        <Value kind="title" grow="1" justify={this.props.justify} />
      </Container>
    );
  }

  renderSubtitle() {
    const Value = this.mapWidget(
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
        {labelWidth === '0px' ? null : (
          <Label
            text={this.props.labelText}
            glyph={this.props.labelGlyph}
            width={labelWidth}
            kind="label-field"
            justify="left"
            spacing="overlap"
          />
        )}
        <Value grow="1" justify={this.props.justify} />
      </Container>
    );
  }
  //#endregion

  //#region Edit
  renderEditField() {
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
          selectAllOnFocus="true"
          type={this.props.type}
          spacing={this.props.spacing}
          shape={this.props.shape}
          labelText={this.props.labelText}
          labelGlyph={this.props.labelGlyph}
          labelWidth={this.props.labelWidth || defaultLabelWidth}
          fieldWidth={this.props.fieldWidth}
          getGlyph={this.props.getGlyph}
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

  renderEditGadget() {
    const target = this.context.id
      ? `backend.${this.context.id}.gadgets.${this.props.name}`
      : `${this.context.model}.gadgets.${this.props.name}`;

    const GadgetLoader = props => {
      if (props.available) {
        const gadgetInfo = this.getBackendValue(target, true);
        const type = gadgetInfo.get('type');
        const Gadget = widgetImporter(type);
        const WiredGadget = Widget.Wired(Gadget)(gadgetInfo.get('id'));
        return <WiredGadget {...this.props} />;
      } else {
        return null;
      }
    };
    const DisplayGadget = this.mapWidget(GadgetLoader, 'available', target);

    return <DisplayGadget />;
  }

  renderEditData() {
    const Component = widgetImporter(this.props.component);

    const Dynamic = this.mapWidget(
      Component,
      value => {
        return {data: value};
      },
      this.fullPath
    );

    return <Dynamic {...this.props} />;
  }

  renderEditDate() {
    let periodPath = null;
    let minArg = null;
    let maxArg = null;
    let mode = null;
    if (this.props.periodModel) {
      const s = this.props.periodModel.split('|');
      if (s.length > 2) {
        minArg = s[1]; // by example '1d'
        maxArg = s[2]; // by example '1y'
      }
      if (s.length > 3) {
        mode = s[3]; // by example 'hard'
      }
      periodPath = this.getFullPathFromModel(s[0]); // by example '.startDate'
    }

    if (periodPath) {
      const WiredTextFieldTyped = this.mapWidget(
        TextFieldTyped,
        date => {
          const minDate = DateConverters.getCalcDate(date, minArg);
          const maxDate = DateConverters.getCalcDate(date, maxArg);
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
            selectAllOnFocus="true"
            spacing={this.props.spacing}
            shape={this.props.shape}
            labelText={this.props.labelText}
            labelGlyph={this.props.labelGlyph}
            labelWidth={this.props.labelWidth || defaultLabelWidth}
            fieldWidth={this.props.fieldWidth || '120px'}
            getGlyph={this.props.getGlyph}
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
            selectAllOnFocus="true"
            spacing={this.props.spacing}
            shape={this.props.shape}
            labelText={this.props.labelText}
            labelGlyph={this.props.labelGlyph}
            labelWidth={this.props.labelWidth || defaultLabelWidth}
            fieldWidth={this.props.fieldWidth || '120px'}
            getGlyph={this.props.getGlyph}
            hintText={this.props.hintText}
            tooltip={this.props.tooltip || this.props.hintText}
            required={this.props.required}
            model={this.props.model}
          />
        </Container>
      );
    }
  }

  renderEditTime() {
    let periodPath = null;
    let minArg = null;
    let maxArg = null;
    let mode = null;
    if (this.props.periodModel) {
      const s = this.props.periodModel.split('|');
      if (s.length > 2) {
        minArg = s[1]; // by example '5h'
        maxArg = s[2]; // by example '30m'
      }
      if (s.length > 3) {
        mode = s[3]; // by example 'hard'
      }
      periodPath = this.getFullPathFromModel(s[0]); // by example '.startPlannedTime'
    }

    if (periodPath) {
      const WiredTextFieldTyped = this.mapWidget(
        TextFieldTyped,
        time => {
          const minTime = TimeConverters.getCalcTime(time, minArg);
          const maxTime = TimeConverters.getCalcTime(time, maxArg);
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
            selectAllOnFocus="true"
            spacing={this.props.spacing}
            shape={this.props.shape}
            labelText={this.props.labelText}
            labelGlyph={this.props.labelGlyph}
            labelWidth={this.props.labelWidth || defaultLabelWidth}
            fieldWidth={this.props.fieldWidth || '120px'}
            getGlyph={this.props.getGlyph}
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
            selectAllOnFocus="true"
            spacing={this.props.spacing}
            shape={this.props.shape}
            labelText={this.props.labelText}
            labelGlyph={this.props.labelGlyph}
            labelWidth={this.props.labelWidth || defaultLabelWidth}
            fieldWidth={this.props.fieldWidth || '120px'}
            getGlyph={this.props.getGlyph}
            hintText={this.props.hintText}
            tooltip={this.props.tooltip || this.props.hintText}
            required={this.props.required}
            model={this.props.model}
          />
        </Container>
      );
    }
  }

  renderEditDateTime() {
    let periodPath = null;
    let minArg = null;
    let maxArg = null;
    let mode = null;
    if (this.props.periodModel) {
      const s = this.props.periodModel.split('|');
      if (s.length > 2) {
        minArg = s[1]; // by example '1d'
        maxArg = s[2]; // by example '1y'
      }
      if (s.length > 3) {
        mode = s[3]; // by example 'hard'
      }
      periodPath = this.getFullPathFromModel(s[0]); // by example '.startDate'
    }

    if (periodPath) {
      const WiredTextFieldTyped = this.mapWidget(
        TextFieldTyped,
        date => {
          const minDate = DateConverters.getCalcDate(date, minArg);
          const maxDate = DateConverters.getCalcDate(date, maxArg);
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
            type="datetime"
            selectAllOnFocus="true"
            spacing={this.props.spacing}
            shape={this.props.shape}
            labelText={this.props.labelText}
            labelGlyph={this.props.labelGlyph}
            labelWidth={this.props.labelWidth || defaultLabelWidth}
            fieldWidth={this.props.fieldWidth || '160px'}
            getGlyph={this.props.getGlyph}
            hintText={this.props.hintText}
            tooltip={this.props.tooltip || this.props.hintText}
            required={this.props.required}
            defaultDate={this.props.defaultDate}
            defaultTime={this.props.defaultTime}
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
            type="datetime"
            selectAllOnFocus="true"
            spacing={this.props.spacing}
            shape={this.props.shape}
            labelText={this.props.labelText}
            labelGlyph={this.props.labelGlyph}
            labelWidth={this.props.labelWidth || defaultLabelWidth}
            fieldWidth={this.props.fieldWidth || '160px'}
            getGlyph={this.props.getGlyph}
            hintText={this.props.hintText}
            tooltip={this.props.tooltip || this.props.hintText}
            required={this.props.required}
            defaultDate={this.props.defaultDate}
            defaultTime={this.props.defaultTime}
            model={this.props.model}
          />
        </Container>
      );
    }
  }

  renderEditTimeInterval() {
    const EntityInterval = this.mapWidget(
      TextFieldTimeInterval,
      value => {
        return {entityId: value};
      },
      this.getFullPathFromModel('.id')
    );
    const StartInterval = this.mapWidget(
      EntityInterval,
      value => {
        return {startValue: value};
      },
      this.getFullPathFromModel(this.props.startModel)
    );
    const TimeInterval = this.mapWidget(
      StartInterval,
      value => {
        return {endValue: value};
      },
      this.getFullPathFromModel(this.props.endModel)
    );
    return (
      <Container
        kind="row-field"
        grow="0"
        width={this.props.width}
        height={this.props.height}
        verticalSpacing={this.props.verticalSpacing}
        verticalJustify={this.props.verticalJustify}
      >
        <TimeInterval
          type="time"
          selectAllOnFocus="true"
          spacing={this.props.spacing}
          labelText={this.props.labelText}
          labelGlyph={this.props.labelGlyph}
          labelWidth={this.props.labelWidth || defaultLabelWidth}
          startHintText={this.props.startHintText}
          endHintText={this.props.endHintText}
          startTooltip={this.props.startTooltip || this.props.startHintText}
          endTooltip={this.props.endTooltip || this.props.endHintText}
          startModel={this.props.startModel}
          endModel={this.props.endModel}
          required={this.props.required}
          hasNowButton={this.props.hasNowButton}
        />
      </Container>
    );
  }

  renderEditPrice() {
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
          selectAllOnFocus="true"
          spacing={this.props.spacing}
          shape={this.props.shape}
          labelText={this.props.labelText}
          labelGlyph={this.props.labelGlyph}
          labelWidth={this.props.labelWidth || defaultLabelWidth}
          fieldWidth={this.props.fieldWidth || '120px'}
          getGlyph={this.props.getGlyph}
          hintText={this.props.hintText}
          tooltip={this.props.tooltip || this.props.hintText}
          required={this.props.required}
          model={this.props.model}
        />
      </Container>
    );
  }

  renderEditWeight() {
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
          selectAllOnFocus="true"
          unit={this.props.unit}
          decimals={this.props.decimals}
          spacing={this.props.spacing}
          shape={this.props.shape}
          labelText={this.props.labelText}
          labelGlyph={this.props.labelGlyph}
          labelWidth={this.props.labelWidth || defaultLabelWidth}
          fieldWidth={this.props.fieldWidth || '120px'}
          getGlyph={this.props.getGlyph}
          hintText={this.props.hintText}
          tooltip={this.props.tooltip || this.props.hintText}
          required={this.props.required}
          model={this.props.model}
        />
      </Container>
    );
  }

  renderEditLength() {
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
          type="length"
          selectAllOnFocus="true"
          unit={this.props.unit}
          decimals={this.props.decimals}
          spacing={this.props.spacing}
          shape={this.props.shape}
          labelText={this.props.labelText}
          labelGlyph={this.props.labelGlyph}
          labelWidth={this.props.labelWidth || defaultLabelWidth}
          fieldWidth={this.props.fieldWidth || '120px'}
          getGlyph={this.props.getGlyph}
          hintText={this.props.hintText}
          tooltip={this.props.tooltip || this.props.hintText}
          required={this.props.required}
          model={this.props.model}
        />
      </Container>
    );
  }

  renderEditVolume() {
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
          selectAllOnFocus="true"
          unit={this.props.unit}
          decimals={this.props.decimals}
          spacing={this.props.spacing}
          shape={this.props.shape}
          labelText={this.props.labelText}
          labelGlyph={this.props.labelGlyph}
          labelWidth={this.props.labelWidth || defaultLabelWidth}
          fieldWidth={this.props.fieldWidth || '200px'}
          getGlyph={this.props.getGlyph}
          hintText={this.props.hintText}
          tooltip={this.props.tooltip || this.props.hintText}
          required={this.props.required}
          model={this.props.model}
        />
      </Container>
    );
  }

  renderEditNumber() {
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
          selectAllOnFocus="true"
          unit={this.props.unit}
          decimals={this.props.decimals}
          spacing={this.props.spacing}
          shape={this.props.shape}
          labelText={this.props.labelText}
          labelGlyph={this.props.labelGlyph}
          labelWidth={this.props.labelWidth || defaultLabelWidth}
          fieldWidth={this.props.fieldWidth || '120px'}
          getGlyph={this.props.getGlyph}
          hintText={this.props.hintText}
          tooltip={this.props.tooltip || this.props.hintText}
          required={this.props.required}
          model={this.props.model}
        />
      </Container>
    );
  }

  renderEditPercent() {
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
          selectAllOnFocus="true"
          unit={this.props.unit}
          decimals={this.props.decimals}
          spacing={this.props.spacing}
          shape={this.props.shape}
          labelText={this.props.labelText}
          labelGlyph={this.props.labelGlyph}
          labelWidth={this.props.labelWidth || defaultLabelWidth}
          fieldWidth={this.props.fieldWidth || '120px'}
          getGlyph={this.props.getGlyph}
          hintText={this.props.hintText}
          tooltip={this.props.tooltip || this.props.hintText}
          required={this.props.required}
          model={this.props.model}
        />
      </Container>
    );
  }

  renderEditDelay() {
    const help =
      '1a = 1 année<br/>2mo = 2 mois<br/>3j = 3 jours<br/>4h = 4 heures<br/>5m = 5 minutes';
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
          selectAllOnFocus="true"
          unit={this.props.unit}
          spacing={this.props.spacing}
          shape={this.props.shape}
          labelText={this.props.labelText}
          labelGlyph={this.props.labelGlyph}
          labelWidth={this.props.labelWidth || defaultLabelWidth}
          fieldWidth="200px"
          getGlyph={this.props.getGlyph}
          hintText={this.props.hintText}
          tooltip={this.props.tooltip || this.props.hintText || help}
          required={this.props.required}
          model={this.props.model}
        />
      </Container>
    );
  }

  renderEditCombo() {
    const labelWidth = this.props.labelWidth || defaultLabelWidth;

    let EditCombo = props => (
      <TextFieldCombo
        selectAllOnFocus="true"
        spacing={this.props.spacing}
        shape={this.props.shape}
        getGlyph={this.props.getGlyph}
        hintText={this.props.hintText}
        tooltip={this.props.tooltip || this.props.hintText}
        width={this.props.fieldWidth}
        model={this.props.model}
        readonly={this.props.comboReadonly}
        required={this.props.required}
        list={props.list}
        menuType="wrap"
        menuItemWidth={this.props.menuItemWidth}
        comboTextTransform="none"
        onSetText={text => {
          this.setBackendValue(this.fullPath, text);
          if (this.props.onChange) {
            this.props.onChange(text);
          }
        }}
        grow="1"
      />
    );

    if (
      this.props.comboReadonly === 'true' &&
      this.props.list &&
      this.props.list.length > 0 &&
      this.props.list[0].value !== undefined &&
      this.props.list[0].text !== undefined
    ) {
      const FieldComboWired = this.mapWidget(
        FieldCombo,
        value => {
          if (!value) {
            return;
          }
          for (const item of this.props.list) {
            if (value === item.value) {
              return {defaultValue: item.text};
            }
          }
          return {defaultValue: ''};
        },
        this.fullPath
      );

      EditCombo = props => (
        <FieldComboWired
          spacing={this.props.spacing}
          shape={this.props.shape}
          tooltip={this.props.tooltip || this.props.hintText}
          width={this.props.fieldWidth}
          model={this.props.model}
          list={props.list}
          menuType="wrap"
          menuItemWidth={this.props.menuItemWidth}
          comboTextTransform="none"
          onChange={text => {
            this.setBackendValue(this.fullPath, text);
            if (this.props.onChange) {
              this.props.onChange(text);
            }
          }}
          grow="1"
        />
      );
    } else if (
      this.props.list &&
      this.props.list.length > 0 &&
      this.props.list[0].glyph !== undefined &&
      this.props.list[0].text !== undefined
    ) {
      const TextFieldComboWired = this.mapWidget(
        TextFieldCombo,
        value => {
          if (!value && value !== '') {
            return;
          } else {
            return {defaultValue: value};
          }
        },
        this.fullPath
      );

      EditCombo = props => (
        <TextFieldComboWired
          selectAllOnFocus="true"
          spacing={this.props.spacing}
          shape={this.props.shape}
          getGlyph={this.props.getGlyph}
          hintText={this.props.hintText}
          tooltip={this.props.tooltip || this.props.hintText}
          width={this.props.fieldWidth}
          model={this.props.model}
          readonly={this.props.comboReadonly}
          required={this.props.required}
          list={props.list}
          menuType="wrap"
          menuItemWidth={this.props.menuItemWidth}
          comboTextTransform="none"
          onSetText={text => {
            this.setBackendValue(this.fullPath, text);
            if (this.props.onChange) {
              this.props.onChange(text);
            }
          }}
          grow="1"
        />
      );
    } else if (this.props.listModel) {
      EditCombo = this.mapWidget(
        EditCombo,
        list => {
          return {
            list: list ? list : [],
          };
        },
        this.getFullPathFromModel(this.props.listModel)
      );
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
        {labelWidth === '0px' ? null : (
          <Label
            text={this.props.labelText}
            glyph={this.props.labelGlyph}
            width={labelWidth}
            kind="label-field"
            justify="left"
            spacing="overlap"
          />
        )}
        <EditCombo list={this.props.list} />
      </Container>
    );
  }

  renderEditRadio() {
    const WiredRadioList = this.mapWidget(
      RadioList,
      value => {
        if (value && value !== '') {
          return {selectedIndex: this.props.list.indexOf(value)};
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
        {labelWidth === '0px' ? null : (
          <Label
            text={this.props.labelText}
            glyph={this.props.labelGlyph}
            tooltip={this.props.tooltip}
            width={labelWidth}
            kind="label-field"
            justify="left"
            spacing="overlap"
          />
        )}
        <WiredRadioList
          buttonWidth={this.props.buttonWidth}
          height={this.props.height}
          direction={this.props.direction || 'row'}
          list={this.props.list}
          selectionChanged={index => {
            this.setBackendValue(this.fullPath, this.props.list[index]);
            if (this.props.onChange) {
              this.props.onChange(this.props.list[index], index);
            }
          }}
        />
      </Container>
    );
  }

  renderCheckList() {
    const WiredCheckList = this.mapWidget(
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
        {labelWidth === '0px' ? null : (
          <Label
            text={this.props.labelText}
            glyph={this.props.labelGlyph}
            width={labelWidth}
            kind="label-field"
            justify="left"
            spacing="overlap"
          />
        )}
        <WiredCheckList
          width={this.props.width}
          height={this.props.height}
          heightStrategy="compact"
          direction={this.props.direction || 'column'}
          showHeader={this.props.showHeader}
          list={this.props.list}
          readonly={Bool.toString(this.readonly)}
          selectionChanged={value => {
            this.setBackendValue(this.fullPath, value);
          }}
        />
      </Container>
    );
  }

  renderEditBool() {
    const WiredCheckButton = this.mapWidget(
      CheckButton,
      value => {
        return {checked: value};
      },
      this.fullPath
    );

    const labelWidth = this.props.labelWidth || defaultLabelWidth;

    return (
      <Container
        kind={this.props.containerKind || 'row-field'}
        subkind="left"
        grow={this.props.grow}
        width={this.props.width}
        height={this.props.height}
        verticalSpacing={this.props.verticalSpacing}
        verticalJustify={this.props.verticalJustify}
      >
        {labelWidth === '0px' ? null : (
          <Label
            glyph={this.props.labelGlyph}
            width={labelWidth}
            kind="label-field"
            justify="left"
            spacing="overlap"
          />
        )}
        <WiredCheckButton
          kind={this.props.subkind}
          glyph={this.props.glyph}
          text={this.props.labelText}
          tooltip={this.props.tooltip || this.props.hintText}
          onClick={() => {
            const checked = Bool.isTrue(this.getBackendValue(this.fullPath));
            this.setBackendValue(this.fullPath, Bool.toString(!checked));
            if (this.props.onClick) {
              this.props.onClick();
            }
          }}
        />
      </Container>
    );
  }

  renderCalendar() {
    const Dynamic = this.mapWidget(
      Calendar,
      calendar => {
        // FIXME: calendar is undefined!
        return {
          visibleDate: calendar.get('visibleDate', null),
          startDate: calendar.get('startDate', null),
          endDate: calendar.get('endDate', null),
          dates: calendar.get('dates', []).toArray(),
          badges: calendar.get('badges', []).toArray(),
        };
      },
      this.fullPath
    );

    return (
      <Dynamic
        grow="1"
        tooltip={this.props.tooltip}
        dateClicked={this.props.dateClicked}
        visibleDateChanged={this.props.visibleDateChanged}
        monthCount={this.props.monthCount}
        frame={this.props.frame}
      />
    );
  }

  renderCalendarBoards() {
    const Dynamic = this.mapWidget(
      CalendarBoards,
      calendarBoards => {
        return {
          boards: calendarBoards.get('boards', []).toArray(),
          selectedDate: calendarBoards.get('selectedDate'),
          selectedId: calendarBoards.get('selectedId'),
        };
      },
      this.fullPath
    );

    return (
      <Dynamic
        grow="1"
        tooltip={this.props.tooltip}
        onBoardChanged={this.props.onBoardChanged}
      />
    );
  }

  renderCalendarRecurrence() {
    const WiredCalendarRecurrence = this.mapWidget(
      CalendarRecurrence,
      r => {
        return {
          startDate: r.get('startDate'),
          endDate: r.get('endDate'),
          days: r.get('days'),
          addDates: r.get('addDates'),
          cronDates: r.get('cronDates'),
        };
      },
      this.fullPath
    );

    return (
      <WiredCalendarRecurrence
        readonly={Bool.toString(this.readonly)}
        dateClicked={date => {
          const service = this.context.id.split('@')[0];
          this.doAs(service, 'date-clicked', {
            date,
          });
        }}
        flushAdd={() => {
          const service = this.context.id.split('@')[0];
          this.doAs(service, 'flush-add');
        }}
      />
    );
  }

  renderEditEntity() {
    const summary = this.props.summary || 'info';
    const Viewer = props => {
      if (!props.entityId) {
        return <Label grow="1" empty="true" spacing={this.props.spacing} />;
      }
      const Info = this.mapWidget(
        Label,
        entity => {
          let glyph = 'solid/spinner';
          let glyphColor = null;
          let text = 'chargement...';
          if (entity) {
            glyph = entity.get('meta.summaries.glyph');
            glyphColor = entity.get('meta.summaries.glyphColor');
            text = entity.get(`meta.summaries.${summary}`);
          }
          return {
            glyph,
            glyphColor,
            text,
          };
        },
        `backend.${props.entityId}`
      );
      return <Info />;
    };

    const EntityViewer = this.mapWidget(Viewer, 'entityId', this.fullPath);

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

  renderEditEntities() {
    const pluginProps = getPluginProps(this.props);
    if (this.props.plugin) {
      let WiredPlugin = null;
      if (this.props.pluginType) {
        const CustomPlugin = widgetImporter(`plugin-${this.props.pluginType}`);
        WiredPlugin = Widget.Wired(CustomPlugin)(
          `${this.props.plugin}-plugin@${
            this.props.mode ? `${this.props.mode}@` : ''
          }${this.context.id}`
        );
      } else {
        WiredPlugin = Widget.Wired(Plugin)(
          `${this.props.plugin}-plugin@${
            this.props.mode ? `${this.props.mode}@` : ''
          }${this.context.id}`
        );
      }

      const FinalPlugin = this.mapWidget(
        WiredPlugin,
        'entityIds',
        this.fullPath
      );

      return (
        <Container
          kind={this.props.containerKind || 'row-field'}
          subkind={this.props.containerSubkind || 'light-box'}
          grow={this.props.grow}
          width={this.props.width}
          height={this.props.height}
          verticalSpacing={this.props.verticalSpacing}
          verticalJustify="top"
        >
          <FinalPlugin
            extendOnAdd="true"
            {...pluginProps}
            dragServiceId={
              this.props.dragServiceId || this.context.dragServiceId
            }
            embeddedLevel={
              this.props.embeddedLevel ? this.props.embeddedLevel + 1 : 1
            }
          />
        </Container>
      );
    } else if (this.props.item) {
      const Items = props => {
        if (!props.entityIds) {
          return <Label grow="1" empty="true" spacing={this.props.spacing} />;
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
            {props.entityIds.map((entityId, index) => {
              const Item = this.mapWidget(
                this.props.item,
                state => (state ? state : null),
                `backend.${entityId}`
              );
              return <Item key={index} />;
            })}
          </Container>
        );
      };
      const FinalItems = this.mapWidget(Items, 'entityIds', this.fullPath);
      return <FinalItems />;
    } else {
      throw new Error('Property plugin or item is required in this case!');
    }
  }

  renderComboIds() {
    const Option = props => {
      if (!props.id) {
        return null;
      }
      return <option value={props.id}>{props.text}</option>;
    };
    let targetPath = null;
    if (this.props.targetModel) {
      targetPath = this.getFullPathFromModel(this.props.targetModel);
    }
    const modelTextKey = this.props.modelTextKey || 'meta.summaries.info';
    const ComboIds = props => {
      const disabled = this.readonly ? {disabled: true} : null;
      let currentValue = '';
      if (props.currentValue != null) {
        // currentValue is not null nor undefined
        currentValue = props.currentValue;
      } else if (this.props.defaultValue != null) {
        // defaultValue is not null nor undefined
        currentValue = this.props.defaultValue;
      }
      return (
        <select
          value={currentValue}
          style={{
            margin: '0px',
            padding: '0px 10px',
            height: '35px',
            ...props.style,
          }}
          onChange={event => {
            if (this.props.onChange) {
              this.props.onChange(event.target.value);
            }
            if (this.props.targetModel) {
              this.setBackendValue(targetPath, event.target.value);
            }
          }}
          {...disabled}
        >
          {props.entityIds.map((entityId, index) => {
            const WiredOption = this.mapWidget(
              Option,
              state => {
                const id = state.get('id');
                if (id) {
                  return {id, text: state.get(modelTextKey)};
                }
                return null;
              },
              `backend.${entityId}`
            );
            const Item = () =>
              this.buildLoader(entityId, () => <WiredOption />);
            return <Item key={index} />;
          })}
        </select>
      );
    };

    let FinalCombo = this.mapWidget(ComboIds, 'entityIds', this.fullPath);
    if (targetPath) {
      FinalCombo = this.mapWidget(FinalCombo, 'currentValue', targetPath);
    }

    if (this.props.labelText) {
      return (
        <Container
          kind="row-field"
          grow={this.props.grow}
          width={this.props.width}
          height={this.props.height}
          verticalSpacing={this.props.verticalSpacing}
          verticalJustify={this.props.verticalJustify}
        >
          <Label
            kind="label-text-field"
            glyph={this.props.labelGlyph}
            text={this.props.labelText}
            width={this.props.labelWidth || defaultLabelWidth}
            disabled={this.props.disabled}
            wrap="no"
            justify="left"
          />
          <FinalCombo style={{flexGrow: 1}} />
        </Container>
      );
    }

    return <FinalCombo />;
  }

  renderEditHinter() {
    const targetPath = this.props.targetModel
      ? this.getFullPathFromModel(this.props.targetModel)
      : this.fullPath;

    const summary = this.props.summary || 'info';

    const Hinter = this.mapWidget(
      TextField,
      value => {
        if (value && value !== '') {
          let selectedId = null;
          if (!this.props.onValue) {
            selectedId = value;
            value = this.getModelValue(
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
      HinterLabel = this.mapWidget(Label, 'text', targetPath);
    } else {
      HinterLabel = this.mapWidget(
        Label,
        value => {
          let text = '';
          let glyph = null;
          let glyphColor = null;
          if (value && value !== '') {
            if (!this.props.onValue) {
              text = this.getModelValue(
                `${value}.meta.summaries.${summary}`,
                true
              );
              glyph = this.getModelValue(`${value}.meta.summaries.glyph`, true);
              glyphColor = this.getModelValue(
                `${value}.meta.summaries.glyphColor`,
                true
              );
            }
            return {text, glyph, glyphColor};
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
          wrap={this.props.wrap}
          grow="2"
        />
        <Button
          kind="combo"
          shape={this.props.onValue ? 'right-smooth' : null}
          leftSpacing="overlap"
          glyph="solid/eraser"
          tooltip="Entrer une nouvelle référence"
          onClick={() => this.setBackendValue(this.fullPath, null)}
        />
        {this.props.onValue ? null : (
          <Button
            kind="combo"
            shape="right-smooth"
            spacing={this.props.spacing}
            leftSpacing="overlap"
            glyph="solid/eye"
            tooltip="Voir les détails"
            onClick={() =>
              this.navToDetail(
                this.context.id,
                props.existingValue,
                this.props.hinter
              )
            }
          />
        )}
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
          {...this.formConfigWithComponent(() => (
            <Hinter
              selectAllOnFocus="true"
              id={this.context.id}
              shape={
                !this.props.onValue && this.props.enableAdd
                  ? 'left-smooth'
                  : 'smooth'
              }
              getGlyph={this.props.getGlyph}
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
        {!this.props.onValue && this.props.enableAdd ? (
          <Button
            kind="combo"
            shape="right-smooth"
            leftSpacing="overlap"
            glyph="solid/plus"
            tooltip="Créer"
            onClick={() => {
              const service = this.context.id.split('@')[0];
              const currentValue = this.getBackendValue(
                `widgets.${this.context.id}.${this.props.hinter}`
              );
              if (currentValue && currentValue.length >= 1) {
                this.doAs(service, `add-new-${this.props.hinter}`, {
                  value: currentValue,
                });
              }
            }}
          />
        ) : null}
      </Container>
    );

    const HinterLine = props =>
      props.existingValue ? (
        <HinterLineValue {...props} />
      ) : (
        <HinterLineCreate {...props} />
      );

    const HinterField = this.mapWidget(
      HinterLine,
      'existingValue',
      this.fullPath
    );

    return <HinterField />;
  }

  renderCompleteHinter() {
    const Form = this.Form;

    const CompleteHinter = props => {
      if (props.content === '') {
        return (
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
              {...this.formConfigWithComponent(() => (
                <TextField
                  id={this.context.id}
                  shape={
                    !this.props.onValue && this.props.enableAdd
                      ? 'left-smooth'
                      : 'smooth'
                  }
                  getGlyph={this.props.getGlyph}
                  hintText={this.props.hintText}
                  tooltip={this.props.tooltip || this.props.hintText}
                  hinter={this.props.hinter}
                  comboType={this.props.hinter}
                  spacing={this.props.spacing}
                  width={this.props.fieldWidth}
                  grow="1"
                  requiredHinter="true"
                  autocomplete={this.fullPath}
                />
              ))}
            />
          </Container>
        );
      } else {
        return this.renderEditField();
      }
    };

    const HinterField = this.mapWidget(
      CompleteHinter,
      'content',
      this.fullPath
    );
    return <HinterField />;
  }

  renderEditFileInput() {
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

  renderEditDirectoryInput() {
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

  renderReadonly() {
    switch (this.props.kind) {
      case 'field':
        return this.renderReadonlyField();
      case 'gadget':
        return this.renderReadonlyGadget();
      case 'data':
        return this.renderEditData();
      case 'dynamic':
        return this.renderDynamic();
      case 'table-dynamic':
        return this.renderTableDynamic();
      case 'button-dynamic':
        return this.renderButtonDynamic();
      case 'date':
        return this.renderReadonlyDate();
      case 'time':
        return this.renderReadonlyTime();
      case 'datetime':
        return this.renderReadonlyDateTime();
      case 'time-interval':
        return this.renderReadonlyTimeInterval();
      case 'price':
        return this.renderReadonlyPrice();
      case 'weight':
        return this.renderReadonlyWeight();
      case 'length':
        return this.renderReadonlyLength();
      case 'volume':
        return this.renderReadonlyVolume();
      case 'number':
        return this.renderReadonlyNumber();
      case 'percent':
        return this.renderReadonlyPercent();
      case 'delay':
        return this.renderReadonlyDelay();
      case 'combo':
        return this.renderReadonlyField();
      case 'radio':
        return this.renderReadonlyField();
      case 'check-list':
        return this.renderCheckList();
      case 'bool':
        return this.renderReadonlyBool();
      case 'calendar':
        return this.renderCalendar();
      case 'calendar-boards':
        return this.renderCalendarBoards();
      case 'calendar-recurrence':
        return this.renderCalendarRecurrence();
      case 'hinter':
        return this.renderReadonlyHinter();
      case 'complete-hinter':
        return this.renderReadonlyField();
      case 'file':
        return this.renderReadonlyFileInput();
      case 'id':
        return this.renderReadonlyEntity();
      case 'ids':
        return this.renderReadonlyEntities();
      case 'combo-ids':
        return this.renderComboIds();
      case 'title':
        return this.renderTitle();
      case 'subtitle':
        return this.renderSubtitle();
      case 'label':
        return (
          <ReadonlyLabel
            defaultLabelWidth={defaultLabelWidth}
            fullpath={this.fullPath}
            {...this.props}
          />
        );
      default:
        return this.renderReadonlyField();
    }
  }

  renderEdit() {
    switch (this.props.kind) {
      case 'field':
        return this.renderEditField();
      case 'gadget':
        return this.renderEditGadget();
      case 'data':
        return this.renderEditData();
      case 'dynamic':
        return this.renderDynamic();
      case 'table-dynamic':
        return this.renderTableDynamic();
      case 'button-dynamic':
        return this.renderButtonDynamic();
      case 'date':
        return this.renderEditDate();
      case 'time':
        return this.renderEditTime();
      case 'datetime':
        return this.renderEditDateTime();
      case 'time-interval':
        return this.renderEditTimeInterval();
      case 'price':
        return this.renderEditPrice();
      case 'weight':
        return this.renderEditWeight();
      case 'length':
        return this.renderEditLength();
      case 'volume':
        return this.renderEditVolume();
      case 'number':
        return this.renderEditNumber();
      case 'percent':
        return this.renderEditPercent();
      case 'delay':
        return this.renderEditDelay();
      case 'combo':
        return this.renderEditCombo();
      case 'radio':
        return this.renderEditRadio();
      case 'check-list':
        return this.renderCheckList();
      case 'bool':
        return this.renderEditBool();
      case 'calendar':
        return this.renderCalendar();
      case 'calendar-boards':
        return this.renderCalendarBoards();
      case 'calendar-recurrence':
        return this.renderCalendarRecurrence();
      case 'hinter':
        return this.renderEditHinter();
      case 'complete-hinter':
        return this.renderCompleteHinter();
      case 'file':
        return this.renderEditFileInput();
      case 'directory':
        return this.renderEditDirectoryInput();
      case 'id':
        return this.renderEditEntity();
      case 'ids':
        return this.renderEditEntities();
      case 'combo-ids':
        return this.renderComboIds();
      case 'title':
        return this.renderTitle();
      case 'subtitle':
        return this.renderSubtitle();
      case 'label':
        return (
          <ReadonlyLabel
            defaultLabelWidth={defaultLabelWidth}
            fullpath={this.fullPath}
            {...this.props}
          />
        );
      default:
        return this.renderEditField();
    }
  }

  render() {
    if (this.readonly) {
      return this.renderReadonly();
    } else {
      return this.renderEdit();
    }
  }
}

/******************************************************************************/
export default Field;
