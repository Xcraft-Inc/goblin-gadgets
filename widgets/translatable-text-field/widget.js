import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import * as styles from './styles';

import MouseTrap from 'mousetrap';
import ComboHelpers from 'goblin-gadgets/widgets/helpers/combo-helpers';
import {Unit} from 'goblin-theme';
import Button from 'goblin-gadgets/widgets/button/widget';
import Label from 'goblin-gadgets/widgets/label/widget';
import Combo from 'goblin-gadgets/widgets/combo/widget';
import DialogModal from 'goblin-gadgets/widgets/dialog-modal/widget';

import {isShredder} from 'xcraft-core-shredder';
import NabuTextField from './text-field';
import ToNabuObject from 'goblin-nabu/widgets/helpers/t.js';
import T from 't';
import SchemaHelpers from 'goblin-toolbox/lib/schema-helpers';

/******************************************************************************/

function WrapT(...args) {
  // Otherwise extractor complains about T not being statically evaluate-able
  return ToNabuObject(...args);
}

function localeToText(locale) {
  if (locale) {
    return locale.substring(0, 2).toUpperCase();
  } else {
    return null;
  }
}

/******************************************************************************/

class TranslatableTextField extends Widget {
  constructor() {
    super(...arguments);
    this.styles = styles;

    this.mainButtonDiv = null;
    this.primaryButtonDiv = null;
    this.secondaryButtonDiv = null;

    let list = this.props.list || [];
    if (isShredder(list)) {
      list = list.toJS();
    }
    list = list.map((locale) => ({
      value: locale.name,
      text: `${localeToText(locale.name)} — ${locale.text}`,
    }));
    this.list = list;

    this.state = {
      showCombo: null,
      showEdit: false,
      focus: false,
    };

    this.comboLocation = null;

    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onKeyCombo = this.onKeyCombo.bind(this);
    this.onShowCombo = this.onShowCombo.bind(this);
    this.onHideCombo = this.onHideCombo.bind(this);
    this.onShowEdit = this.onShowEdit.bind(this);
    this.onHideEdit = this.onHideEdit.bind(this);
    this.swapLocales = this.swapLocales.bind(this);
  }

  componentDidMount() {
    const nabuId = `${this.context.entityId}${this.props.model}`;

    this.doFor(this.context.entityId, 'change', {
      path: this.props.model.startsWith('.')
        ? this.props.model.slice(1)
        : this.props.model,
      newValue: WrapT(nabuId, null, null, null, true),
    });
  }

  //#region get/set
  get showCombo() {
    return this.state.showCombo;
  }
  set showCombo(value) {
    this.setState({
      showCombo: value,
    });
  }

  get showEdit() {
    return this.state.showEdit;
  }
  set showEdit(value) {
    this.setState({
      showEdit: value,
    });
  }

  get focus() {
    return this.state.focus;
  }
  set focus(value) {
    this.setState({
      focus: value,
    });
  }
  //#endregion

  //#region state in user session
  getPrimaryLocale() {
    let locale = this.props.translatableState.get('primaryLocale', null);
    if (!locale) {
      locale = this.props.defaultValue;
    }
    return locale;
  }

  getSecondaryLocale() {
    let locale = this.props.translatableState.get('secondaryLocale', null);
    if (!locale) {
      const primaryLocale = this.getPrimaryLocale();
      for (const x of this.list) {
        if (x.value !== primaryLocale) {
          locale = x.value;
          break;
        }
      }
    }
    return locale;
  }

  setPrimaryLocale(locale) {
    const newState = {
      primaryLocale: locale,
      secondaryLocale: this.getSecondaryLocale(),
    };
    this.doFor(this.props.clientSessionId, 'set-translatable-text-field', {
      state: newState,
    });
  }

  setSecondaryLocale(locale) {
    const newState = {
      primaryLocale: this.getPrimaryLocale(),
      secondaryLocale: locale,
    };
    this.doFor(this.props.clientSessionId, 'set-translatable-text-field', {
      state: newState,
    });
  }

  swapLocales() {
    const newState = {
      primaryLocale: this.getSecondaryLocale(),
      secondaryLocale: this.getPrimaryLocale(),
    };
    this.doFor(this.props.clientSessionId, 'set-translatable-text-field', {
      state: newState,
    });
  }
  //#endregion

  getEntitySchema() {
    const entityId = this.context.entityId; // by example "portfolio@e564950b-cd9f-4d35-abd0-b85bf93017f1"
    if (entityId) {
      const entityType = entityId.split('@', 2)[0]; // by example "portfolio"
      return this.getSchema(entityType);
    }
    return null;
  }

  getLabelText() {
    const entitySchema = this.getEntitySchema();
    return SchemaHelpers.getLabelText(entitySchema, this.props.model);
  }

  /******************************************************************************/

  onShowCombo(position) {
    if (!this.props.list) {
      return;
    }

    let node = this.mainButtonDiv;
    switch (position) {
      case 'primary':
        node = this.primaryButtonDiv;
        break;
      case 'secondary':
        node = this.secondaryButtonDiv;
        break;
    }

    if (!node) {
      return;
    }

    const itemCount = this.list.length;

    this.comboLocation = ComboHelpers.getComboLocation(
      node,
      this.context.theme.shapes.flyingBalloonTriangleSize,
      this.context.theme.shapes.flyingBalloonPadding,
      itemCount,
      '200px',
      this.context.theme.shapes.menuButtonHeight, // height of Button kind='combo-wrap-item'
      null,
      null,
      Unit.multiply(this.context.theme.shapes.dialogDistanceFromEdge, 2)
    );

    this.showCombo = position || 'main';

    const x = this.props.onShowCombo;
    if (x) {
      x();
    }
  }

  onHideCombo() {
    this.showCombo = null;
  }

  onShowEdit() {
    MouseTrap.bind('esc', this.onHideEdit, 'keydown');
    this.showEdit = true;
  }

  onHideEdit() {
    MouseTrap.unbind('esc');
    this.showEdit = false;
  }

  onChange(e) {
    this.onChange(e);
    const x = this.props.onChange;
    if (x) {
      x(e);
    }
  }

  onFocus() {
    //- console.log ('text-field-combo.onFocus');
    MouseTrap.bind('up', this.onKeyCombo, 'keydown');
    MouseTrap.bind('down', this.onKeyCombo, 'keydown');
    this.focus = true;

    if (this.props.onFocus) {
      this.props.onFocus();
    }
  }

  onBlur() {
    //- console.log ('text-field-combo.onBlur');
    MouseTrap.unbind('up');
    MouseTrap.unbind('down');
    this.focus = false;

    if (this.props.onBlur) {
      this.props.onBlur();
    }
  }

  onMouseUp() {
    if (this.props.readonly) {
      this.onShowCombo('main');
    }
  }

  onKeyCombo(e) {
    if (this.showEdit) {
      return;
    }

    e.preventDefault();
    this.onShowCombo('mainb');
  }

  /******************************************************************************/

  getLocale() {
    if (this.showCombo === 'primary') {
      return this.getPrimaryLocale();
    } else if (this.showCombo === 'secondary') {
      return this.getSecondaryLocale();
    } else {
      return this.getPrimaryLocale();
    }
  }

  setLocale(value) {
    if (this.showCombo === 'primary') {
      this.setPrimaryLocale(value);
    } else if (this.showCombo === 'secondary') {
      this.setSecondaryLocale(value);
    } else {
      this.setPrimaryLocale(value);
    }
  }

  getItem(item) {
    const active = item.value === this.getLocale();

    return {
      text: item.text,
      value: item.value,
      glyph: active ? 'check' : 'none',
      active: active,
      action: () => this.setLocale(item.value),
    };
  }

  /******************************************************************************/

  renderTextField() {
    const {shape, model, defaultValue, ...other} = this.props;

    const s = shape || 'smooth';
    const textFieldShapes = {
      smooth: 'left-smooth',
      rounded: 'left-rounded',
    };
    const textFieldShape = textFieldShapes[s];
    const nabuId = `${this.context.entityId}${model}`;

    if (this.props.readonly && this.props.rows && this.props.rows > 1) {
      return (
        <div className={this.styles.classNames.editReadonly}>
          <NabuTextField
            nabuId={nabuId}
            localeName={this.getPrimaryLocale()}
            workitemId={this.props.id || this.context.id}
            shape={textFieldShape}
            embeddedFocus={true}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            onMouseUp={this.onMouseUp}
            className={this.styles.classNames.nabuTextField}
            preview={true}
            {...other}
          />
        </div>
      );
    } else {
      return (
        <NabuTextField
          nabuId={nabuId}
          localeName={this.getPrimaryLocale()}
          workitemId={this.props.id || this.context.id}
          shape={textFieldShape}
          embeddedFocus={true}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onMouseUp={this.onMouseUp}
          className={this.styles.classNames.nabuTextField}
          {...other}
        />
      );
    }
  }

  renderButtonCombo() {
    const text = localeToText(this.getPrimaryLocale());

    return (
      <div ref={(x) => (this.mainButtonDiv = x)}>
        <Button
          kind="compact"
          width="32px"
          height="32px"
          border="none"
          text={text}
          fontSize="80%"
          disabled={this.props.disabled}
          onClick={() => this.onShowCombo('main')}
        />
      </div>
    );
  }

  renderButtonEdit() {
    if (!this.props.rows || this.props.rows === 1) {
      return null;
    }

    const glyph = this.props.readonly ? 'solid/eye' : 'solid/pen';

    return (
      <Button
        width="32px"
        height="32px"
        border="none"
        glyph={glyph}
        glyphSize="100%"
        disabled={this.props.disabled}
        onClick={this.onShowEdit}
      />
    );
  }

  renderToolbar() {
    return (
      <div className={this.styles.classNames.toolbar}>
        {this.renderButtonCombo()}
        {this.renderButtonEdit()}
      </div>
    );
  }

  /******************************************************************************/

  renderCombo() {
    if (!this.showCombo || !this.comboLocation) {
      return null;
    }

    const x = [];
    for (var item of this.list) {
      if (
        (this.showCombo === 'primary' &&
          item.value === this.getPrimaryLocale()) ||
        (this.showCombo === 'secondary' &&
          item.value === this.getSecondaryLocale())
      ) {
        continue;
      }
      x.push(this.getItem(item));
    }

    return (
      <Combo
        menuType="combo"
        menuItemWidth="200px"
        menuItemTooltips={this.props.menuItemTooltips}
        left={this.comboLocation.center}
        triangleShift={this.comboLocation.triangleShift}
        top={this.comboLocation.top}
        bottom={this.comboLocation.bottom}
        maxHeight={this.comboLocation.maxHeight}
        width={this.comboLocation.width}
        list={x}
        comboTextTransform={this.props.comboTextTransform}
        close={this.onHideCombo}
      />
    );
  }

  /******************************************************************************/

  renderEditLocale(position, locale) {
    if (!locale) {
      return null;
    }

    const nabuId = `${this.context.entityId}${this.props.model}`;

    const selected = this.list.find((x) => x.value === locale);
    const title = selected ? selected.text : null;

    const l = localeToText(locale);
    const isPrimary = position === 'primary';

    return (
      <div className={this.styles.classNames.editLocale}>
        <div className={this.styles.classNames.editTitle}>
          <Label text={title} justify="center" grow="1" />
          <Button
            kind="compact"
            width="32px"
            height="32px"
            border="none"
            glyph={isPrimary ? 'solid/chevron-right' : 'solid/chevron-left'}
            onClick={this.swapLocales}
          />
          <div
            ref={(x) => {
              if (isPrimary) {
                this.primaryButtonDiv = x;
              } else {
                this.secondaryButtonDiv = x;
              }
            }}
          >
            <Button
              kind="compact"
              width="32px"
              height="32px"
              border="none"
              text={l}
              fontSize="80%"
              onClick={() => this.onShowCombo(position)}
            />
          </div>
        </div>
        {this.props.readonly ? null : (
          <div className={this.styles.classNames.editField}>
            <NabuTextField
              nabuId={nabuId}
              localeName={locale}
              workitemId={this.props.id || this.context.id}
              embeddedFocus={true}
              className={this.styles.classNames.nabuTextField}
              stretchHeight={true}
              readonly={this.props.readonly}
              changeMode="throttled"
              throttleDelay={20}
            />
          </div>
        )}
        <div className={this.styles.classNames.editMarkdown}>
          <NabuTextField
            nabuId={nabuId}
            localeName={locale}
            workitemId={this.props.id || this.context.id}
            embeddedFocus={true}
            className={this.styles.classNames.nabuTextField}
            stretchHeight={true}
            preview={true}
          />
        </div>
      </div>
    );
  }

  renderEdit() {
    if (!this.showEdit) {
      return null;
    }

    return (
      <DialogModal
        id="goblin-gadgets/translatable-text-field"
        resizable={true}
        zIndex="10"
        title={this.getLabelText() || T('Edition')}
        minWidth="600px"
        minHeight="400px"
        width="1000px"
        height="600px"
        horizontal="0px"
        vertical="0px"
        close={this.onHideEdit}
      >
        <div className={this.styles.classNames.edit}>
          {this.renderEditLocale('primary', this.getPrimaryLocale())}
          {this.renderEditLocale('secondary', this.getSecondaryLocale())}
        </div>
      </DialogModal>
    );
  }

  /******************************************************************************/

  render() {
    if (this.props.show === false) {
      return null;
    }

    const boxClass = this.focus
      ? this.styles.classNames.translatableTextFieldFocused
      : this.styles.classNames.translatableTextField;

    return (
      <div className={boxClass} disabled={this.props.disabled}>
        {this.renderTextField()}
        {this.renderToolbar()}
        {this.renderEdit()}
        {this.renderCombo()}
      </div>
    );
  }
}

/******************************************************************************/

export default Widget.connect((state, props) => {
  const locales = state.get('backend.nabu.locales');

  if (!locales || locales.length === 0) {
    return {};
  }

  const userSession = Widget.getUserSession(state);
  const clientSessionId = userSession.get('id');
  const translatableState = userSession.get('translatableTextField');

  const selectedLocaleId = userSession.get('locale');
  const defaultLocale =
    locales.find((locale) => locale.get('id') === selectedLocaleId) ||
    locales.first();

  return {
    clientSessionId,
    translatableState,
    list: locales,
    defaultValue: defaultLocale.get('name'),
  };
})(TranslatableTextField);
