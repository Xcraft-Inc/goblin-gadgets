//T:2019-02-27

import React from 'react';
import Form from 'goblin-laboratory/widgets/form';
import Widget from 'goblin-laboratory/widgets/widget';
import * as Bool from 'goblin-gadgets/widgets/helpers/bool-helpers';
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
import RadioList from 'goblin-gadgets/widgets/radio-list/widget';
import CheckList from 'goblin-gadgets/widgets/check-list/widget';
import CalendarRecurrence from 'goblin-gadgets/widgets/calendar-recurrence/widget';
import Calendar from 'goblin-gadgets/widgets/calendar/widget';
import CalendarBoards from 'goblin-gadgets/widgets/calendar-boards/widget';
import FileInput from 'goblin-gadgets/widgets/file-input/widget';
import DirectoryInput from 'goblin-gadgets/widgets/directory-input/widget';
import StateBrowser from 'goblin-gadgets/widgets/state-browser/widget';

import Plugin from 'goblin-desktop/widgets/plugin/widget';

import importer from 'goblin_importer';
import HinterField from 'goblin-gadgets/widgets/hinter-field/widget';
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

  isShowed(value) {
    return Boolean(this.props.showStrategy === 'alwaysVisible' || value);
  }

  /******************************************************************************/

  //#region Readonly
  renderReadonlyField() {
    const {
      show,
      labelText,
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
        show={C(this.props.model, this.isShowed)}
        labelText={labelText}
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
          type={kind}
          selectAllOnFocus={true}
          width={fieldWidth}
          grow={fieldWidth ? null : '1'}
          {...otherProps}
          readonly={true}
          tooltip={this.props.tooltip || this.props.hintText}
        />
      </LabelRow>
    );
  }

  renderReadonlyTranslatable() {
    const {
      show,
      labelText,
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
        show={C(this.props.model, this.isShowed)}
        labelText={labelText}
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
          type={kind}
          selectAllOnFocus={true}
          width={fieldWidth}
          grow={fieldWidth ? null : '1'}
          {...otherProps}
          readonly={true}
          tooltip={this.props.tooltip || this.props.hintText}
        />
      </LabelRow>
    );
  }

  renderReadonlyGadget() {
    const target = this.context.id
      ? `backend.${this.context.id}.gadgets.${this.props.name}`
      : `${this.context.model}.gadgets.${this.props.name}`;

    const parentId = this.context.id || this.context.model;

    const GadgetLoader = props => {
      if (props.available) {
        const gadgetInfo = this.getBackendValue(target, true);
        const type = gadgetInfo.get('type');
        const Gadget = widgetImporter(type);
        const WiredGadget = Widget.Wired(Gadget)(gadgetInfo.get('id'));
        return (
          <WiredGadget readonly={true} {...this.props} parentId={parentId} />
        );
      } else {
        return null;
      }
    };
    const DisplayGadget = this.mapWidget(GadgetLoader, 'available', target);

    return <DisplayGadget />;
  }

  renderReadonlyTyped() {
    const {
      show,
      labelText,
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
        show={C(this.props.model, this.isShowed)}
        labelText={labelText}
        labelWrap={labelWrap}
        labelGlyph={labelGlyph}
        labelWidth={labelWidth}
        horizontalSpacing={horizontalSpacing}
        verticalSpacing={verticalSpacing}
        verticalJustify={verticalJustify}
        width={width}
      >
        <TextFieldTyped
          type={kind}
          selectAllOnFocus={true}
          width={fieldWidth}
          {...otherProps}
          readonly={true}
          tooltip={this.props.tooltip || this.props.hintText}
        />
      </LabelRow>
    );
  }

  renderReadonlyTimeInterval() {
    const {
      show,
      labelText,
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
        labelText={labelText}
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
          tooltip={this.props.tooltip || this.props.hintText}
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
        labelText={this.props.labelText}
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
          tooltip={this.props.tooltip || this.props.hintText}
          width={this.props.fieldWidth}
          hideButtonCombo={this.props.hideButtonCombo}
          selectedId={
            this.props.selectedId ? this.props.selectedId : C(this.props.model)
          }
          readonly={true}
          restrictsToList={this.props.restrictsToList}
          required={this.props.required}
          list={
            this.props.listModel ? C(this.props.listModel) : this.props.list
          }
          menuType="wrap"
          menuItemWidth={this.props.menuItemWidth}
          comboTextTransform="none"
          grow="1"
        />
      </LabelRow>
    );
  }

  renderReadonlyBool() {
    const WiredCheckbox = this.mapWidget(
      Checkbox,
      value => {
        return {checked: value};
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
        <WiredCheckbox
          kind={this.props.subkind}
          glyph={this.props.glyph}
          text={this.props.labelText}
          tooltip={this.props.tooltip || this.props.hintText}
          readonly={true}
        />
      </LabelRow>
    );
  }

  renderReadonlyHinter() {
    const {
      show,
      labelText,
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
        show={C(this.props.model, this.isShowed)}
        labelText={labelText}
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
    const Viewer = props => {
      if (!props.entityId) {
        return (
          <Label
            grow="1"
            empty="true"
            horizontalSpacing={this.props.horizontalSpacing}
          />
        );
      }
      const Info = this.mapWidget(
        Label,
        entity => {
          let glyph = 'solid/spinner';
          let glyphColor = null;
          let text = T('Chargement...');
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
          horizontalSpacing={this.props.horizontalSpacing}
          glyph="solid/pencil"
          tooltip={T('Editer')}
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

    return (
      <LabelRow
        show={this.props.show}
        grow={this.props.grow}
        width={this.props.width}
        height={this.props.height}
        labelText={this.props.labelText}
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
        WiredPlugin = Widget.Wired(CustomPlugin)(
          `${this.props.plugin}-plugin@readonly@${this.context.id}`
        );
        FinalPlugin = this.mapWidget(WiredPlugin, 'entityIds', this.fullPath);
      } else {
        FinalPlugin = Plugin;
      }

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
            id={`${this.props.plugin}-plugin@readonly@${this.context.id}`}
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
      const Items = props => {
        if (!props.entityIds) {
          return (
            <Label
              grow="1"
              empty="true"
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
  //#endregion

  //#region Edit
  renderEditField() {
    const {
      show,
      labelText,
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
        labelText={labelText}
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
          type={kind}
          width={fieldWidth}
          grow={fieldWidth ? null : '1'}
          {...otherProps}
          tooltip={this.props.tooltip || this.props.hintText}
        />
      </LabelRow>
    );
  }

  renderEditTranslatable() {
    const {
      show,
      labelText,
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
        labelText={labelText}
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
          type={kind}
          width={fieldWidth}
          grow={fieldWidth ? null : '1'}
          {...otherProps}
          tooltip={this.props.tooltip || this.props.hintText}
        />
      </LabelRow>
    );
  }

  renderEditGadget() {
    const target = this.context.id
      ? `backend.${this.context.id}.gadgets.${this.props.name}`
      : `${this.context.model}.gadgets.${this.props.name}`;

    const parentId = this.context.id || this.context.model;

    const GadgetLoader = props => {
      if (props.available) {
        const gadgetInfo = this.getBackendValue(target, true);
        const type = gadgetInfo.get('type');
        const Gadget = widgetImporter(type);
        const WiredGadget = Widget.Wired(Gadget)(gadgetInfo.get('id'));
        return <WiredGadget {...this.props} parentId={parentId} />;
      } else {
        return null;
      }
    };
    const DisplayGadget = this.mapWidget(GadgetLoader, 'available', target);

    return <DisplayGadget />;
  }

  renderEditTyped() {
    const {
      show,
      labelText,
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
        labelText={labelText}
        labelWrap={labelWrap}
        labelGlyph={labelGlyph}
        labelWidth={labelWidth}
        horizontalSpacing={horizontalSpacing}
        verticalSpacing={verticalSpacing}
        verticalJustify={verticalJustify}
        width={width}
      >
        <TextFieldTyped
          type={kind}
          selectAllOnFocus={true}
          width={fieldWidth}
          {...otherProps}
          tooltip={this.props.tooltip || this.props.hintText}
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
      labelText,
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
        labelText={labelText}
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
          tooltip={this.props.tooltip || this.props.hintText}
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
        labelText={this.props.labelText}
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
          tooltip={this.props.tooltip || this.props.hintText}
          width={this.props.fieldWidth}
          selectedId={C(this.props.model)}
          readonly={false}
          restrictsToList={this.props.restrictsToList}
          required={this.props.required}
          list={
            this.props.listModel ? C(this.props.listModel) : this.props.list
          }
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
    const WiredRadioList = this.mapWidget(
      RadioList,
      value => {
        if (value && value !== '') {
          return {
            selectedIndex: this.props.list.findIndex(item => {
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
          list={this.props.list}
          selectionChanged={this.radioListSelectionChanged}
        />
      </LabelRow>
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

    return (
      <LabelRow
        show={this.props.show}
        grow={this.props.grow}
        width={this.props.width}
        height={this.props.height}
        labelText={this.props.labelText}
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
          heightStrategy="compact"
          look={this.props.look || 'modern'}
          direction={this.props.direction || 'column'}
          showHeader={this.props.showHeader}
          list={this.props.list}
          readonly={this.readonly}
          selectionChanged={value => {
            this.setBackendValue(this.fullPath, value);
          }}
        />
      </LabelRow>
    );
  }

  renderEditBool() {
    const WiredCheckbox = this.mapWidget(
      Checkbox,
      value => {
        return {checked: value};
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
        <WiredCheckbox
          kind={this.props.subkind}
          glyph={this.props.glyph}
          text={this.props.labelText}
          tooltip={this.props.tooltip || this.props.hintText}
          onChange={() => {
            const checked = this.getBackendValue(this.fullPath);
            this.setBackendValue(this.fullPath, !checked);
            if (this.props.onClick) {
              this.props.onClick();
            }
          }}
        />
      </LabelRow>
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
        readonly={this.readonly}
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
        return <Label grow="1" empty="true" />;
      }
      const Info = this.mapWidget(
        Label,
        entity => {
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
      const pluginId = `${this.props.plugin}-plugin@${
        this.props.mode ? `${this.props.mode}@` : ''
      }${this.context.id}`;
      if (this.props.pluginType) {
        const CustomPlugin = widgetImporter(`plugin-${this.props.pluginType}`);
        WiredPlugin = Widget.Wired(CustomPlugin)(pluginId);
        FinalPlugin = this.mapWidget(WiredPlugin, 'entityIds', this.fullPath);
      } else {
        FinalPlugin = Plugin;
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
            extendOnAdd="true"
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
      const Items = props => {
        if (!props.entityIds) {
          return <Label grow="1" empty="true" />;
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
        <LabelRow
          show={this.props.show}
          grow={this.props.grow}
          width={this.props.width}
          height={this.props.height}
          labelText={this.props.labelText}
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
      labelText,
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
        labelText={labelText}
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

    const CompleteHinter = props => {
      if (props.content === '') {
        return (
          <LabelRow
            show={this.props.show}
            grow={this.props.grow}
            width={this.props.width}
            height={this.props.height}
            labelText={this.props.labelText}
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
                    tooltip={this.props.tooltip || this.props.hintText}
                    hinter={this.props.hinter}
                    comboType={this.props.hinter}
                    width={this.props.fieldWidth}
                    grow="1"
                    requiredHinter="true"
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

    const HinterField = this.mapWidget(
      CompleteHinter,
      'content',
      this.fullPath
    );
    return <HinterField />;
  }

  renderFileInput() {
    const {
      show,
      labelText,
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
        labelText={labelText}
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
      labelText,
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
        labelText={labelText}
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
      labelText,
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
        labelText={labelText}
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
    switch (this.props.kind) {
      case 'field':
        return this.renderReadonlyField();
      case 'gadget':
        return this.renderReadonlyGadget();
      case 'date':
      case 'time':
      case 'datetime':
      case 'price':
      case 'weight':
      case 'length':
      case 'volume':
      case 'number':
      case 'percent':
      case 'delay':
        return this.renderReadonlyTyped();
      case 'time-interval':
        return this.renderReadonlyTimeInterval();
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
    switch (this.props.kind) {
      case 'field':
        return this.renderEditField();
      case 'gadget':
        return this.renderEditGadget();
      case 'date':
      case 'time':
      case 'datetime':
      case 'price':
      case 'weight':
      case 'length':
      case 'volume':
      case 'number':
      case 'percent':
      case 'delay':
        return this.renderEditTyped();
      case 'time-interval':
        return this.renderEditTimeInterval();
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
