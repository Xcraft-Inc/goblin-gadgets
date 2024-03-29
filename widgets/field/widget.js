//T:2019-02-27

import React from 'react';
import PropTypes from 'prop-types';
import Form from 'goblin-laboratory/widgets/form';
import Widget from 'goblin-laboratory/widgets/widget';
import T from 't';
import C from 'goblin-laboratory/widgets/connect-helpers/c';

/******************************************************************************/
//migrated
import ReadonlyLabel from './readonly/label.js';
/******************************************************************************/

import Container from 'goblin-gadgets/widgets/container/widget';
import Button from 'goblin-gadgets/widgets/button/widget';
import Checkbox from 'goblin-gadgets/widgets/checkbox/widget';
import Label from 'goblin-gadgets/widgets/label/widget';
import TextField from 'goblin-gadgets/widgets/text-field/widget';
import TranslatableTextField from 'goblin-gadgets/widgets/translatable-text-field/widget';
import LabelRow from 'goblin-gadgets/widgets/label-row/widget';
import TextFieldTyped from 'goblin-gadgets/widgets/text-field-typed/widget';
import TextFieldCombo from 'goblin-gadgets/widgets/text-field-combo/widget';
import TextFieldTimeInterval from 'goblin-gadgets/widgets/text-field-time-interval/widget';
import TextFieldDateInterval from 'goblin-gadgets/widgets/text-field-date-interval/widget';
import RadioList from 'goblin-gadgets/widgets/radio-list/widget';
import CheckList from 'goblin-gadgets/widgets/check-list/widget';
import CalendarRecurrence from 'goblin-gadgets/widgets/calendar-recurrence/widget';
import Calendar from 'goblin-gadgets/widgets/calendar/widget';
import CalendarBoards from 'goblin-gadgets/widgets/calendar-boards/widget';
import FileInput from 'goblin-gadgets/widgets/file-input/widget';
import DirectoryInput from 'goblin-gadgets/widgets/directory-input/widget';
import StateBrowser from 'goblin-gadgets/widgets/state-browser/widget';

import SchemaHelpers from 'goblin-toolbox/lib/schema-helpers';

import importer from 'goblin_importer';
import HinterField from 'goblin-gadgets/widgets/hinter-field/widget';
import stateMapperToProps from 'goblin-laboratory/widgets/state-mapper-to-props/widget.js';
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

    this.radioListSelectionChanged = this.radioListSelectionChanged.bind(this);
    this.isShowed = this.isShowed.bind(this);
  }

  static get contextTypes() {
    return {
      ...Widget.contextTypes,
      id: PropTypes.string,
      entityId: PropTypes.string,
      dragServiceId: PropTypes.string,
    };
  }

  get readonly() {
    return this.props.readonly || this.context.readonly;
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

  isShowed(value) {
    return Boolean(this.props.showStrategy === 'alwaysVisible' || value);
  }

  getEntitySchema() {
    const entityId = this.context.entityId; // by example "portfolio@e564950b-cd9f-4d35-abd0-b85bf93017f1"
    if (entityId) {
      const entityType = entityId.split('@', 2)[0]; // by example "portfolio"
      return this.getSchema(entityType);
    }
    console.warn('getEntitySchema returned null ! (entityId undefined)');
    return null;
  }

  getKind() {
    if (this.props.kind) {
      return this.props.kind;
    } else {
      return SchemaHelpers.getKind(this.getEntitySchema(), this.props.model);
    }
  }

  getShift() {
    if (this.props.shift) {
      return this.props.shift;
    } else {
      return SchemaHelpers.getShift(this.getEntitySchema(), this.props.model);
    }
  }

  getComboList() {
    if (this.props.listModel) {
      return C(this.props.listModel);
    } else if (this.props.list) {
      return this.props.list;
    } else {
      return SchemaHelpers.getComboList(
        this.getEntitySchema(),
        this.props.model
      );
    }
  }

  getRestrictsToList() {
    if (this.props.listModel || this.props.list) {
      return this.props.restrictsToList;
    } else {
      const list = SchemaHelpers.getComboList(
        this.getEntitySchema(),
        this.props.model
      );
      return !!list;
    }
  }

  getLabelText() {
    if (this.props.labelText) {
      return this.props.labelText;
    } else {
      return SchemaHelpers.getLabelText(
        this.getEntitySchema(),
        this.props.model
      );
    }
  }

  getTooltip() {
    let tooltip = this.props.tooltip || this.props.hintText;
    if (!tooltip) {
      tooltip = SchemaHelpers.getTooltip(
        this.getEntitySchema(),
        this.props.model
      );
    }
    return tooltip;
  }

  /******************************************************************************/

  //#region Readonly
  renderReadonlyField() {
    const {
      show = C(this.props.model, this.isShowed),
      labelWrap,
      labelGlyph,
      labelWidth = defaultLabelWidth,
      horizontalSpacing,
      verticalSpacing,
      verticalJustify,
      width,
      grow,
      fieldWidth,
      kind,
      ...otherProps
    } = this.props;

    return (
      <LabelRow
        show={show}
        labelText={this.getLabelText()}
        labelWrap={labelWrap}
        labelGlyph={labelGlyph}
        labelWidth={labelWidth}
        horizontalSpacing={horizontalSpacing}
        verticalSpacing={verticalSpacing}
        verticalJustify={verticalJustify}
        width={width}
        grow={grow || (fieldWidth ? null : '1')}
      >
        <TextField
          type={this.getKind()}
          selectAllOnFocus={true}
          width={fieldWidth}
          grow={fieldWidth ? null : '1'}
          {...otherProps}
          readonly={true}
          tooltip={this.getTooltip()}
        />
      </LabelRow>
    );
  }

  renderReadonlyTranslatable() {
    const {
      show = C(this.props.model, this.isShowed),
      labelWrap,
      labelGlyph,
      labelWidth = defaultLabelWidth,
      horizontalSpacing,
      verticalSpacing,
      verticalJustify,
      width,
      grow,
      fieldWidth,
      kind,
      ...otherProps
    } = this.props;

    return (
      <LabelRow
        show={show}
        labelText={this.getLabelText()}
        labelWrap={labelWrap}
        labelGlyph={labelGlyph}
        labelWidth={labelWidth}
        horizontalSpacing={horizontalSpacing}
        verticalSpacing={verticalSpacing}
        verticalJustify={verticalJustify}
        width={width}
        grow={grow || (fieldWidth ? null : '1')}
      >
        <TranslatableTextField
          type={this.getKind()}
          selectAllOnFocus={true}
          width={fieldWidth}
          grow={fieldWidth ? null : '1'}
          {...otherProps}
          readonly={true}
          tooltip={this.getTooltip()}
        />
      </LabelRow>
    );
  }

  renderReadonlyGadget() {
    const target = this.context.id
      ? `backend.${this.context.id}.gadgets.${this.props.name}`
      : `${this.context.model}.gadgets.${this.props.name}`;

    const parentId = this.context.id || this.context.model;
    const gadgetInfo = this.getState(target, true);
    let WiredGadget;
    if (gadgetInfo) {
      const type = gadgetInfo.get('type');
      const Gadget = widgetImporter(type);
      WiredGadget = Widget.Wired(Gadget);
    }
    return gadgetInfo ? (
      <WiredGadget
        id={gadgetInfo.get('id')}
        readonly={true}
        {...this.props}
        widgetId={gadgetInfo.get('id')}
        parentId={parentId}
      />
    ) : null;
  }

  renderReadonlyTyped() {
    const {
      show = C(this.props.model, this.isShowed),
      labelWrap,
      labelGlyph,
      labelWidth = defaultLabelWidth,
      horizontalSpacing,
      verticalSpacing,
      verticalJustify,
      width,
      fieldWidth,
      kind,
      ...otherProps
    } = this.props;

    return (
      <LabelRow
        show={show}
        labelText={this.getLabelText()}
        labelWrap={labelWrap}
        labelGlyph={labelGlyph}
        labelWidth={labelWidth}
        horizontalSpacing={horizontalSpacing}
        verticalSpacing={verticalSpacing}
        verticalJustify={verticalJustify}
        width={width}
      >
        <TextFieldTyped
          type={this.getKind()}
          shift={this.getShift()}
          selectAllOnFocus={true}
          width={fieldWidth}
          {...otherProps}
          readonly={true}
          tooltip={this.getTooltip()}
        />
      </LabelRow>
    );
  }

  renderReadonlyTimeInterval() {
    const {
      show,
      labelWrap,
      labelGlyph,
      labelWidth = defaultLabelWidth,
      horizontalSpacing,
      verticalSpacing,
      verticalJustify,
      width,
      kind,
      ...otherProps
    } = this.props;

    return (
      <LabelRow
        show={show}
        width={width}
        labelText={this.getLabelText()}
        labelWrap={labelWrap}
        labelGlyph={labelGlyph}
        labelWidth={labelWidth}
        horizontalSpacing={horizontalSpacing}
        verticalSpacing={verticalSpacing}
        verticalJustify={verticalJustify}
      >
        <TextFieldTimeInterval
          selectAllOnFocus={true}
          {...otherProps}
          readonly={true}
          entityFullPath={this.context.model}
          tooltip={this.getTooltip()}
        />
      </LabelRow>
    );
  }

  renderReadonlyDateInterval() {
    const {
      show,
      labelWrap,
      labelGlyph,
      labelWidth = defaultLabelWidth,
      horizontalSpacing,
      verticalSpacing,
      verticalJustify,
      width,
      kind,
      ...otherProps
    } = this.props;

    return (
      <LabelRow
        show={show}
        width={width}
        labelText={this.getLabelText()}
        labelWrap={labelWrap}
        labelGlyph={labelGlyph}
        labelWidth={labelWidth}
        horizontalSpacing={horizontalSpacing}
        verticalSpacing={verticalSpacing}
        verticalJustify={verticalJustify}
      >
        <TextFieldDateInterval
          selectAllOnFocus={true}
          {...otherProps}
          readonly={true}
          entityFullPath={this.context.model}
          tooltip={this.getTooltip()}
        />
      </LabelRow>
    );
  }

  renderReadonlyCombo() {
    return (
      <LabelRow
        show={this.props.show}
        grow={this.props.grow}
        width={this.props.width}
        height={this.props.height}
        labelText={this.getLabelText()}
        labelWrap={this.props.labelWrap}
        labelGlyph={this.props.labelGlyph}
        labelWidth={this.props.labelWidth || defaultLabelWidth}
        horizontalSpacing={this.props.horizontalSpacing}
        verticalSpacing={this.props.verticalSpacing}
        verticalJustify={this.props.verticalJustify}
      >
        <TextFieldCombo
          selectAllOnFocus={true}
          shape={this.props.shape}
          getGlyph={this.props.getGlyph}
          hintText={this.props.hintText}
          tooltip={this.getTooltip()}
          width={this.props.fieldWidth}
          hideButtonCombo={this.props.hideButtonCombo}
          selectedId={
            this.props.selectedId ? this.props.selectedId : C(this.props.model)
          }
          readonly={true}
          restrictsToList={this.getRestrictsToList()}
          required={this.props.required}
          list={this.getComboList()}
          menuType="wrap"
          menuItemWidth={this.props.menuItemWidth}
          comboTextTransform="none"
          grow="1"
        />
      </LabelRow>
    );
  }

  renderReadonlyBool() {
    const {
      kind,
      show,
      grow,
      height,
      labelGlyph,
      labelWidth = defaultLabelWidth,
      horizontalSpacing,
      verticalSpacing,
      verticalJustify,
      width,
      subkind,
      ...otherProps
    } = this.props;

    return (
      <LabelRow
        show={show}
        grow={grow}
        width={width}
        height={height}
        labelGlyph={labelGlyph}
        labelWidth={labelWidth || defaultLabelWidth}
        horizontalSpacing={horizontalSpacing}
        verticalSpacing={verticalSpacing}
        verticalJustify={verticalJustify}
      >
        <Checkbox
          kind={subkind}
          text={this.getLabelText()}
          {...otherProps}
          tooltip={this.getTooltip()}
          readonly={true}
        />
      </LabelRow>
    );
  }

  renderReadonlyHinter() {
    const {
      show = C(this.props.model, this.isShowed),
      labelWrap,
      labelGlyph,
      labelWidth = defaultLabelWidth,
      horizontalSpacing,
      verticalSpacing,
      verticalJustify,
      width,
      fieldWidth,
      kind,
      ...otherProps
    } = this.props;

    return (
      <LabelRow
        show={show}
        labelText={this.getLabelText()}
        labelWrap={labelWrap}
        labelGlyph={labelGlyph}
        labelWidth={labelWidth}
        horizontalSpacing={horizontalSpacing}
        verticalSpacing={verticalSpacing}
        verticalJustify={verticalJustify}
        width={width}
        grow={this.props.fieldWidth ? null : '1'}
      >
        <HinterField width={fieldWidth} {...otherProps} readonly={true} />
      </LabelRow>
    );
  }

  renderReadonlyEntity() {
    const summary = this.props.summary || 'info';

    const mapper = (state) => {
      const entityId = state.get(this.fullPath);
      if (!entityId) {
        return {
          grow: '1',
          empty: true,
          horizontalSpacing: this.props.horizontalSpacing,
        };
      }
      const entity = state.get(`backend.${entityId}`);
      let glyph = 'solid/spinner';
      let glyphColor = null;
      let text = T('Chargement...');
      if (entity) {
        glyph = entity.get('meta.summaries.glyph');
        glyphColor = entity.get('meta.summaries.glyphColor');
        text = entity.get(`meta.summaries.${summary}`);
      }
      return {
        kind: 'combo-text-markdown',
        userSelect: 'text',
        glyph,
        glyphColor,
        text,
        grow: '1',
        justify: this.props.justify,
        wrap: this.props.wrap,
      };
    };

    const EntityViewer = stateMapperToProps(Label, mapper, '');

    const Action = (props) => {
      const openEntityWorkitem = () => {
        const service = this.context.id.split('@')[0];
        this.doAs(service, 'open-entity-workitem', {
          entityId: props.entityId,
          desktopId: this.context.desktopId,
        });
      };

      return !!props.entityId && !this.props.disableAdd ? (
        <Button
          kind="combo"
          shape="right-smooth"
          leftSpacing="overlap"
          horizontalSpacing={this.props.horizontalSpacing}
          glyph="solid/pencil"
          tooltip={T('Editer')}
          onClick={openEntityWorkitem}
        />
      ) : null;
    };

    const EntityAction = stateMapperToProps(Action, 'entityId', this.fullPath);

    return (
      <LabelRow
        show={this.props.show}
        grow={this.props.grow}
        width={this.props.width}
        height={this.props.height}
        labelText={this.getLabelText()}
        labelWrap={this.props.labelWrap}
        labelGlyph={this.props.labelGlyph}
        labelWidth={this.props.labelWidth || defaultLabelWidth}
        horizontalSpacing={this.props.horizontalSpacing}
        verticalSpacing={this.props.verticalSpacing}
        verticalJustify={this.props.verticalJustify}
      >
        <EntityViewer />
        <EntityAction />
      </LabelRow>
    );
  }

  renderReadonlyEntities() {
    const pluginProps = getPluginProps(this.props);
    if (this.props.plugin) {
      let WiredPlugin = null;
      let FinalPlugin = null;
      if (this.props.pluginType) {
        const CustomPlugin = widgetImporter(`plugin-${this.props.pluginType}`);
        let CustomPluginWired = Widget.Wired(CustomPlugin);
        WiredPlugin = (props) => (
          <CustomPluginWired
            id={`${this.props.plugin}-plugin@${this.context.id}`}
            {...props}
          />
        );
        FinalPlugin = stateMapperToProps(
          WiredPlugin,
          'entityIds',
          this.fullPath
        );
      } else {
        FinalPlugin = widgetImporter('plugin');
      }

      const FinalContainer = stateMapperToProps(
        Container,
        (value) => {
          const length = value ? value.length : 0;
          const embedded = this.props.embedded;
          const show = length > 0 || !embedded;
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
            id={`${this.props.plugin}-plugin@${this.context.id}`}
            readonly={true}
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
      const Items = (props) => {
        if (!props.entityIds) {
          return (
            <Label
              grow="1"
              empty={true}
              horizontalSpacing={this.props.horizontalSpacing}
            />
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
            {props.entityIds.map((entityId, index) => {
              const Item = stateMapperToProps(
                this.props.item,
                (state) => (state ? state : null),
                `backend.${entityId}`
              );
              return <Item key={index} />;
            })}
          </Container>
        );
      };
      const FinalItems = stateMapperToProps(Items, 'entityIds', this.fullPath);
      return <FinalItems />;
    } else {
      throw new Error('Property plugin is required in this case!');
    }
  }
  //#endregion

  //#region Edit
  renderEditField() {
    const {
      show,
      labelWrap,
      labelGlyph,
      labelWidth = defaultLabelWidth,
      horizontalSpacing,
      verticalSpacing,
      verticalJustify,
      width,
      grow,
      fieldWidth,
      kind,
      ...otherProps
    } = this.props;

    return (
      <LabelRow
        show={show}
        labelText={this.getLabelText()}
        labelWrap={labelWrap}
        labelGlyph={labelGlyph}
        labelWidth={labelWidth}
        horizontalSpacing={horizontalSpacing}
        verticalSpacing={verticalSpacing}
        verticalJustify={verticalJustify}
        width={width}
        grow={grow || (fieldWidth ? null : '1')}
      >
        <TextField
          type={this.getKind()}
          width={fieldWidth}
          grow={fieldWidth ? null : '1'}
          {...otherProps}
          tooltip={this.getTooltip()}
        />
      </LabelRow>
    );
  }

  renderEditTranslatable() {
    const {
      show,
      labelWrap,
      labelGlyph,
      labelWidth = defaultLabelWidth,
      horizontalSpacing,
      verticalSpacing,
      verticalJustify,
      width,
      grow,
      fieldWidth,
      kind,
      type,
      ...otherProps
    } = this.props;

    return (
      <LabelRow
        show={show}
        labelText={this.getLabelText()}
        labelWrap={labelWrap}
        labelGlyph={labelGlyph}
        labelWidth={labelWidth}
        horizontalSpacing={horizontalSpacing}
        verticalSpacing={verticalSpacing}
        verticalJustify={verticalJustify}
        width={width}
        grow={grow || (fieldWidth ? null : '1')}
      >
        <TranslatableTextField
          type={this.getKind()}
          width={fieldWidth}
          grow={fieldWidth ? null : '1'}
          {...otherProps}
          tooltip={this.getTooltip()}
        />
      </LabelRow>
    );
  }

  renderEditGadget() {
    const target = this.context.id
      ? `backend.${this.context.id}.gadgets.${this.props.name}`
      : `${this.context.model}.gadgets.${this.props.name}`;

    const parentId = this.context.id || this.context.model;
    const gadgetInfo = this.getState(target, true);
    let WiredGadget;
    if (gadgetInfo) {
      const type = gadgetInfo.get('type');
      const Gadget = widgetImporter(type);
      WiredGadget = Widget.Wired(Gadget);
    }
    return gadgetInfo ? (
      <WiredGadget
        id={gadgetInfo.get('id')}
        {...this.props}
        parentId={parentId}
        widgetId={gadgetInfo.get('id')}
      />
    ) : null;
  }

  renderEditTyped() {
    const {
      show,
      labelWrap,
      labelGlyph,
      labelWidth = defaultLabelWidth,
      horizontalSpacing,
      verticalSpacing,
      verticalJustify,
      width,
      fieldWidth,
      kind,
      ...otherProps
    } = this.props;

    return (
      <LabelRow
        show={show}
        labelText={this.getLabelText()}
        labelWrap={labelWrap}
        labelGlyph={labelGlyph}
        labelWidth={labelWidth}
        horizontalSpacing={horizontalSpacing}
        verticalSpacing={verticalSpacing}
        verticalJustify={verticalJustify}
        width={width}
      >
        <TextFieldTyped
          type={this.getKind()}
          shift={this.getShift()}
          selectAllOnFocus={true}
          width={fieldWidth}
          {...otherProps}
          tooltip={this.getTooltip()}
        />
      </LabelRow>
    );
  }

  renderEditTimeInterval() {
    //- const EntityInterval = this.mapWidget(
    //-   TextFieldTimeInterval,
    //-   value => {
    //-     return {entityId: value};
    //-   },
    //-   this.getFullPathFromModel('.id')
    //- );
    //- const StartInterval = this.mapWidget(
    //-   EntityInterval,
    //-   value => {
    //-     return {startValue: value};
    //-   },
    //-   this.getFullPathFromModel(this.props.startModel)
    //- );
    //- const TimeInterval = this.mapWidget(
    //-   StartInterval,
    //-   value => {
    //-     return {endValue: value};
    //-   },
    //-   this.getFullPathFromModel(this.props.endModel)
    //- );
    const {
      show,
      labelWrap,
      labelGlyph,
      labelWidth = defaultLabelWidth,
      horizontalSpacing,
      verticalSpacing,
      verticalJustify,
      width,
      kind,
      ...otherProps
    } = this.props;

    return (
      <LabelRow
        show={show}
        width={width}
        labelText={this.getLabelText()}
        labelWrap={labelWrap}
        labelGlyph={labelGlyph}
        labelWidth={labelWidth}
        horizontalSpacing={horizontalSpacing}
        verticalSpacing={verticalSpacing}
        verticalJustify={verticalJustify}
      >
        <TextFieldTimeInterval
          selectAllOnFocus={true}
          {...otherProps}
          entityFullPath={this.context.model}
          tooltip={this.getTooltip()}
        />
      </LabelRow>
    );
  }

  renderEditDateInterval() {
    const {
      show,
      labelWrap,
      labelGlyph,
      labelWidth = defaultLabelWidth,
      horizontalSpacing,
      verticalSpacing,
      verticalJustify,
      width,
      kind,
      ...otherProps
    } = this.props;

    return (
      <LabelRow
        show={show}
        width={width}
        labelText={this.getLabelText()}
        labelWrap={labelWrap}
        labelGlyph={labelGlyph}
        labelWidth={labelWidth}
        horizontalSpacing={horizontalSpacing}
        verticalSpacing={verticalSpacing}
        verticalJustify={verticalJustify}
      >
        <TextFieldDateInterval
          selectAllOnFocus={true}
          {...otherProps}
          entityFullPath={this.context.model}
          tooltip={this.getTooltip()}
        />
      </LabelRow>
    );
  }

  renderEditCombo() {
    return (
      <LabelRow
        show={this.props.show}
        grow={this.props.grow}
        width={this.props.width}
        height={this.props.height}
        labelText={this.getLabelText()}
        labelWrap={this.props.labelWrap}
        labelGlyph={this.props.labelGlyph}
        labelWidth={this.props.labelWidth || defaultLabelWidth}
        horizontalSpacing={this.props.horizontalSpacing}
        verticalSpacing={this.props.verticalSpacing}
        verticalJustify={this.props.verticalJustify}
      >
        <TextFieldCombo
          shape={this.props.shape}
          getGlyph={this.props.getGlyph}
          hintText={this.props.hintText}
          tooltip={this.getTooltip()}
          width={this.props.fieldWidth}
          selectedId={C(this.props.model)}
          readonly={false}
          restrictsToList={this.getRestrictsToList()}
          required={this.props.required}
          list={this.getComboList()}
          menuType="wrap"
          menuItemWidth={this.props.menuItemWidth}
          comboTextTransform="none"
          grow="1"
        />
      </LabelRow>
    );
  }

  radioListSelectionChanged(index) {
    const value =
      typeof this.props.list[index] === 'string'
        ? this.props.list[index]
        : this.props.list[index].value;

    this.setBackendValue(this.fullPath, value);
    if (this.props.onChange) {
      this.props.onChange(value, index);
    }
  }

  renderEditRadio() {
    const WiredRadioList = stateMapperToProps(
      RadioList,
      (value) => {
        if (value && value !== '') {
          return {
            selectedIndex: this.props.list.findIndex((item) => {
              if (typeof item === 'string') {
                return item === value;
              } else {
                return item.value === value;
              }
            }),
          };
        } else {
          return {};
        }
      },
      this.fullPath
    );

    return (
      <LabelRow
        show={this.props.show}
        grow={this.props.grow}
        width={this.props.width}
        height={this.props.height}
        labelGlyph={this.props.labelGlyph}
        labelWidth={this.props.labelWidth || defaultLabelWidth}
        horizontalSpacing={this.props.horizontalSpacing}
        verticalSpacing={this.props.verticalSpacing}
        verticalJustify={this.props.verticalJustify}
      >
        <WiredRadioList
          buttonWidth={this.props.buttonWidth}
          height={this.props.height}
          direction={this.props.direction || 'row'}
          disabled={this.props.disabled}
          list={this.props.list}
          selectionChanged={this.radioListSelectionChanged}
        />
      </LabelRow>
    );
  }

  renderCheckList() {
    const WiredCheckList = stateMapperToProps(
      CheckList,
      (value) => {
        if (value && value !== '') {
          return {value};
        } else {
          return {};
        }
      },
      this.fullPath
    );

    return (
      <LabelRow
        show={this.props.show}
        grow={this.props.grow}
        width={this.props.width}
        height={this.props.height}
        labelText={this.getLabelText()}
        labelWrap={this.props.labelWrap}
        labelGlyph={this.props.labelGlyph}
        labelWidth={this.props.labelWidth || defaultLabelWidth}
        horizontalSpacing={this.props.horizontalSpacing}
        verticalSpacing={this.props.verticalSpacing}
        verticalJustify={this.props.verticalJustify}
      >
        <WiredCheckList
          width={this.props.width}
          height={this.props.height}
          heightStrategy={this.props.heightStrategy || 'compact'}
          look={this.props.look || 'modern'}
          direction={this.props.direction || 'column'}
          showHeader={this.props.showHeader}
          list={this.props.list}
          readonly={this.readonly}
          selectionChanged={(value) => {
            this.setBackendValue(this.fullPath, value);
          }}
        />
      </LabelRow>
    );
  }

  renderEditBool() {
    const {
      kind,
      show,
      grow,
      height,
      labelGlyph,
      labelWidth = defaultLabelWidth,
      horizontalSpacing,
      verticalSpacing,
      verticalJustify,
      width,
      subkind,
      ...otherProps
    } = this.props;

    return (
      <LabelRow
        show={show}
        grow={grow}
        width={width}
        height={height}
        labelGlyph={labelGlyph}
        labelWidth={labelWidth || defaultLabelWidth}
        horizontalSpacing={horizontalSpacing}
        verticalSpacing={verticalSpacing}
        verticalJustify={verticalJustify}
      >
        <Checkbox
          kind={subkind}
          heightStrategy={verticalSpacing === 'compact' ? 'compact' : null}
          text={this.getLabelText()}
          {...otherProps}
          tooltip={this.getTooltip()}
        />
      </LabelRow>
    );
  }

  renderCalendar() {
    const Dynamic = stateMapperToProps(
      Calendar,
      (calendar) => {
        // FIXME: calendar is undefined!
        return {
          visibleDate: calendar.get('visibleDate', null),
          startDate: calendar.get('startDate', null),
          endDate: calendar.get('endDate', null),
          dates: calendar.get('dates', []).valueSeq().toArray(),
          badges: calendar.get('badges', []).valueSeq().toArray(),
        };
      },
      this.fullPath
    );

    return (
      <Dynamic
        grow="1"
        tooltip={this.getTooltip()}
        dateClicked={this.props.dateClicked}
        visibleDateChanged={this.props.visibleDateChanged}
        monthCount={this.props.monthCount}
        frame={this.props.frame}
      />
    );
  }

  renderCalendarBoards() {
    const Dynamic = stateMapperToProps(
      CalendarBoards,
      (calendarBoards) => {
        return {
          boards: calendarBoards.get('boards', []).valueSeq().toArray(),
          selectedDate: calendarBoards.get('selectedDate'),
          selectedId: calendarBoards.get('selectedId'),
        };
      },
      this.fullPath
    );

    return (
      <Dynamic
        grow="1"
        tooltip={this.getTooltip()}
        onBoardChanged={this.props.onBoardChanged}
      />
    );
  }

  renderCalendarRecurrence() {
    const WiredCalendarRecurrence = stateMapperToProps(
      CalendarRecurrence,
      (r) => {
        return {
          startDate: r.get('startDate'),
          endDate: r.get('endDate'),
          days: r.get('days'),
          addDates: r.get('addDates'),
        };
      },
      this.fullPath
    );

    return (
      <WiredCalendarRecurrence
        readonly={this.readonly}
        dateClicked={(date) => {
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
    const mapper = (state) => {
      const entityId = state.get(this.fullPath);
      if (!entityId) {
        return {grow: '1', empty: true};
      }
      const entity = state.get(`backend.${entityId}`);
      let glyph = 'solid/spinner';
      let glyphColor = null;
      let text = T('chargement...');
      if (entity) {
        glyph = entity.get('meta.summaries.glyph');
        glyphColor = entity.get('meta.summaries.glyphColor');
        text = entity.get(`meta.summaries.${summary}`);
      }
      return {
        glyph,
        glyphColor,
        text,
        userSelect: 'text',
      };
    };
    const EntityViewer = stateMapperToProps(Label, mapper, '');
    return (
      <Container
        kind="row-field"
        subkind="light-box"
        grow={this.props.grow}
        width={this.props.width}
        height={this.props.height}
        horizontalSpacing={this.props.horizontalSpacing}
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
      let FinalPlugin = null;
      const pluginId = `${this.props.plugin}-plugin@${this.context.id}`;
      if (this.props.pluginType) {
        const CustomPlugin = widgetImporter(`plugin-${this.props.pluginType}`);
        let CustomPluginWired = Widget.Wired(CustomPlugin);
        WiredPlugin = (props) => <CustomPluginWired id={pluginId} {...props} />;
        FinalPlugin = stateMapperToProps(
          WiredPlugin,
          'entityIds',
          this.fullPath
        );
      } else {
        FinalPlugin = widgetImporter('plugin');
      }

      return (
        <Container
          kind={this.props.containerKind || 'row-field'}
          subkind={this.props.containerSubkind || 'light-box'}
          grow={this.props.grow}
          width={this.props.width}
          height={this.props.height}
          horizontalSpacing={this.props.horizontalSpacing}
          verticalSpacing={this.props.verticalSpacing}
          verticalJustify="top"
        >
          <FinalPlugin
            {...pluginProps}
            id={pluginId}
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
      const Items = (props) => {
        if (!props.entityIds) {
          return <Label grow="1" empty={true} />;
        }
        return (
          <Container
            kind="row-field"
            grow={this.props.grow}
            width={this.props.width}
            height={this.props.height}
            horizontalSpacing={this.props.horizontalSpacing}
            verticalSpacing={this.props.verticalSpacing}
            verticalJustify={this.props.verticalJustify}
          >
            {props.entityIds.map((entityId, index) => {
              const Item = stateMapperToProps(
                this.props.item,
                (state) => (state ? state : null),
                `backend.${entityId}`
              );
              return <Item key={index} />;
            })}
          </Container>
        );
      };
      const FinalItems = stateMapperToProps(Items, 'entityIds', this.fullPath);
      return <FinalItems />;
    } else {
      throw new Error('Property plugin or item is required in this case!');
    }
  }

  renderComboIds() {
    const Option = (props) => {
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
    const ComboIds = (props) => {
      const disabled = this.readonly ? {disabled: true} : null;
      let currentValue = '';
      if (props.currentValue !== null) {
        // currentValue is not null nor undefined
        currentValue = props.currentValue;
      } else if (this.props.defaultValue !== null) {
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
          onChange={(event) => {
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
            const WiredOption = stateMapperToProps(
              Option,
              (state) => {
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

    let FinalCombo = stateMapperToProps(ComboIds, 'entityIds', this.fullPath);
    if (targetPath) {
      FinalCombo = stateMapperToProps(FinalCombo, 'currentValue', targetPath);
    }

    if (this.props.labelText) {
      return (
        <LabelRow
          show={this.props.show}
          grow={this.props.grow}
          width={this.props.width}
          height={this.props.height}
          labelText={this.getLabelText()}
          labelWrap={this.props.labelWrap}
          labelGlyph={this.props.labelGlyph}
          labelWidth={this.props.labelWidth || defaultLabelWidth}
          horizontalSpacing={this.props.horizontalSpacing}
          verticalSpacing={this.props.verticalSpacing}
          verticalJustify={this.props.verticalJustify}
          disabled={this.props.disabled}
        >
          <FinalCombo style={{flexGrow: 1}} />
        </LabelRow>
      );
    }

    return <FinalCombo />;
  }

  renderEditHinter() {
    const {
      show,
      labelWrap,
      labelGlyph,
      labelWidth = defaultLabelWidth,
      horizontalSpacing,
      verticalSpacing,
      verticalJustify,
      width,
      fieldWidth,
      kind,
      ...otherProps
    } = this.props;

    return (
      <LabelRow
        show={show}
        labelText={this.getLabelText()}
        labelWrap={labelWrap}
        labelGlyph={labelGlyph}
        labelWidth={labelWidth}
        horizontalSpacing={horizontalSpacing}
        verticalSpacing={verticalSpacing}
        verticalJustify={verticalJustify}
        width={width}
        grow={this.props.fieldWidth ? null : '1'}
      >
        <HinterField width={fieldWidth} {...otherProps} />
      </LabelRow>
    );
  }

  renderCompleteHinter() {
    const Form = this.Form;

    const CompleteHinter = (props) => {
      if (props.content === '') {
        return (
          <LabelRow
            show={this.props.show}
            grow={this.props.grow}
            width={this.props.width}
            height={this.props.height}
            labelText={this.getLabelText()}
            labelWrap={this.props.labelWrap}
            labelGlyph={this.props.labelGlyph}
            labelWidth={this.props.labelWidth || defaultLabelWidth}
            horizontalSpacing={this.props.horizontalSpacing}
            verticalSpacing={this.props.verticalSpacing}
            verticalJustify={this.props.verticalJustify}
          >
            <Form
              {...this.formConfigWithComponent(
                React.forwardRef((props, ref) => (
                  <TextField
                    ref={ref}
                    id={this.context.id}
                    shape={
                      !this.props.onValue && this.props.enableAdd
                        ? 'left-smooth'
                        : 'smooth'
                    }
                    getGlyph={this.props.getGlyph}
                    hintText={this.props.hintText}
                    tooltip={this.getTooltip()}
                    hinter={this.props.hinter}
                    comboType={this.props.hinter}
                    width={this.props.fieldWidth}
                    grow="1"
                    requiredHinter={true}
                    autocomplete={this.fullPath}
                  />
                ))
              )}
            />
          </LabelRow>
        );
      } else {
        return this.renderEditField();
      }
    };

    const HinterField = stateMapperToProps(
      CompleteHinter,
      'content',
      this.fullPath
    );
    return <HinterField />;
  }

  renderFileInput() {
    const {
      show,
      labelWrap,
      labelGlyph,
      labelWidth = defaultLabelWidth,
      horizontalSpacing,
      verticalSpacing,
      verticalJustify,
      width,
      grow,
      kind,
      ...otherProps
    } = this.props;
    return (
      <LabelRow
        show={show}
        labelText={this.getLabelText()}
        labelWrap={labelWrap}
        labelGlyph={labelGlyph}
        labelWidth={labelWidth}
        horizontalSpacing={horizontalSpacing}
        verticalSpacing={verticalSpacing}
        verticalJustify={verticalJustify}
        width={width}
        grow={grow}
      >
        <FileInput {...otherProps} />
      </LabelRow>
    );
  }

  renderDirectoryInput() {
    const {
      show,
      labelWrap,
      labelGlyph,
      labelWidth = defaultLabelWidth,
      horizontalSpacing,
      verticalSpacing,
      verticalJustify,
      width,
      grow,
      kind,
      ...otherProps
    } = this.props;
    return (
      <LabelRow
        show={show}
        labelText={this.getLabelText()}
        labelWrap={labelWrap}
        labelGlyph={labelGlyph}
        labelWidth={labelWidth}
        horizontalSpacing={horizontalSpacing}
        verticalSpacing={verticalSpacing}
        verticalJustify={verticalJustify}
        width={width}
        grow={grow}
      >
        <DirectoryInput {...otherProps} />
      </LabelRow>
    );
  }

  renderEditStateBrowser() {
    let {
      show,
      labelWrap,
      labelGlyph,
      labelWidth = defaultLabelWidth,
      horizontalSpacing,
      verticalSpacing,
      verticalJustify,
      width,
      grow,
      value,
      model,
      state,
      path,
      ...otherProps
    } = this.props;

    if (model) {
      value = C(model);
    }
    if (path) {
      state = C(path);
    }

    return (
      <LabelRow
        show={show}
        labelText={this.getLabelText()}
        labelWrap={labelWrap}
        labelGlyph={labelGlyph}
        labelWidth={labelWidth}
        horizontalSpacing={horizontalSpacing}
        verticalSpacing={verticalSpacing}
        verticalJustify={verticalJustify}
        width={width}
        grow={grow}
      >
        <StateBrowser
          grow={grow}
          value={value}
          state={state}
          path={path}
          {...otherProps}
        />
      </LabelRow>
    );
  }

  //#endregion

  renderReadonly() {
    switch (this.getKind()) {
      case 'field':
      case 'string':
        return this.renderReadonlyField();
      case 'gadget':
        return this.renderReadonlyGadget();
      case 'date':
      case 'time':
      case 'datetime':
      case 'price':
      case 'weight':
      case 'length':
      case 'pixel':
      case 'volume':
      case 'number':
      case 'integer':
      case 'percent':
      case 'delay':
      case 'color':
        return this.renderReadonlyTyped();
      case 'time-interval':
        return this.renderReadonlyTimeInterval();
      case 'date-interval':
        return this.renderReadonlyDateInterval();
      case 'combo':
        return this.renderReadonlyCombo();
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
        return this.renderFileInput();
      case 'directory':
        return this.renderDirectoryInput();
      case 'id':
        return this.renderReadonlyEntity();
      case 'ids':
        return this.renderReadonlyEntities();
      case 'combo-ids':
        return this.renderComboIds();
      case 'translatable':
        return this.renderReadonlyTranslatable();
      case 'state-browser':
        return this.renderEditStateBrowser();
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
    switch (this.getKind()) {
      case 'field':
      case 'string':
        return this.renderEditField();
      case 'gadget':
        return this.renderEditGadget();
      case 'date':
      case 'time':
      case 'datetime':
      case 'price':
      case 'weight':
      case 'length':
      case 'pixel':
      case 'volume':
      case 'number':
      case 'integer':
      case 'percent':
      case 'delay':
      case 'color':
        return this.renderEditTyped();
      case 'time-interval':
        return this.renderEditTimeInterval();
      case 'date-interval':
        return this.renderEditDateInterval();
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
        return this.renderFileInput();
      case 'directory':
        return this.renderDirectoryInput();
      case 'id':
        return this.renderEditEntity();
      case 'ids':
        return this.renderEditEntities();
      case 'combo-ids':
        return this.renderComboIds();
      case 'translatable':
        return this.renderEditTranslatable();
      case 'state-browser':
        return this.renderEditStateBrowser();
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
