import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import Props from './props';
import {
  makePropTypes,
  makeDefaultProps,
} from 'xcraft-core-utils/lib/prop-types';
import * as styles from './styles';
import T from 't';
import Label from 'goblin-gadgets/widgets/label/widget';
import Button from 'goblin-gadgets/widgets/button/widget';
import TextField from 'goblin-gadgets/widgets/text-field/widget';
import TextFieldTyped from 'goblin-gadgets/widgets/text-field-typed/widget';
import TextFieldCombo from 'goblin-gadgets/widgets/text-field-combo/widget';
import Separator from 'goblin-gadgets/widgets/separator/widget';
import GuildUserLogo from 'goblin-gadgets/widgets/guild-user-logo/widget';

/******************************************************************************/

export default class GuildUserProfile extends Widget {
  constructor() {
    super(...arguments);
    this.styles = styles;
  }

  get logoInitials() {
    let text = this.props.initials;

    if (!text) {
      const c1 = this.props.firstName
        ? this.props.firstName.substring(0, 1)
        : '';
      const c2 = this.props.lastName ? this.props.lastName.substring(0, 1) : '';
      text = c1 + c2;
    }

    if (!text) {
      text = this.props.pseudo;
    }

    if (!text) {
      text = ' ';
    }

    return text.toUpperCase();
  }

  renderHeader() {
    const text = T('Edition de votre profil');

    return (
      <div className={this.styles.classNames.header}>
        <Label width="42px" />
        <Label text={text} justify="center" grow="1" />
        <GuildUserLogo
          size="32px"
          shape={this.props.logoShape}
          color={this.props.logoColor}
          initials={this.logoInitials}
        />
        <Label width="10px" />
      </div>
    );
  }

  renderTitle(text) {
    return (
      <div className={this.styles.classNames.title}>
        <Label width="170px" />
        <Label text={text} />
      </div>
    );
  }

  renderField(label, value, width) {
    return (
      <div className={this.styles.classNames.field}>
        <Label width="50px" />
        <Label width="120px" text={label} />
        <TextField width={width || '300px'} value={value} />
      </div>
    );
  }

  renderFieldTyped(label, value, type, width) {
    return (
      <div className={this.styles.classNames.field}>
        <Label width="50px" />
        <Label width="120px" text={label} />
        <TextFieldTyped width={width || '300px'} value={value} type={type} />
      </div>
    );
  }

  renderFieldCombo(label, value, list, width) {
    return (
      <div className={this.styles.classNames.field}>
        <Label width="50px" />
        <Label width="120px" text={label} />
        <TextFieldCombo
          width={width || '300px'}
          selectedId={value}
          list={list}
        />
      </div>
    );
  }

  renderFields() {
    return (
      <div className={this.styles.classNames.fields}>
        {this.renderTitle(T('Données personnelles'))}
        {this.renderField(T('Initiales'), this.props.initials, '60px')}
        {this.renderField(T('Pseudo'), this.props.pseudo)}
        {this.renderField(T('Prénom'), this.props.firstName)}
        {this.renderField(T('Nom'), this.props.lastName)}
        <Separator kind="exact" height="50px" />
        {this.renderTitle(T('Interface'))}
        {this.renderFieldCombo(T('Thème'), 'default', [
          'Dark',
          'Default',
          'Dragula',
          'Green',
          'Red',
        ])}
      </div>
    );
  }

  renderLogo() {
    const logoShapes = [
      {id: 'circle', glyph: 'solid/circle', text: T('Cercle')},
      {id: 'hexagon', glyph: 'solid/hexagon', text: T('Hexagone')},
      {id: 'square', glyph: 'solid/square', text: T('Carré')},
      {id: 'triangle', glyph: 'solid/triangle', text: T('Triangle')},
      {id: 'certificate', glyph: 'solid/certificate', text: T('Fleur')},
      {id: 'star', glyph: 'solid/star', text: T('Etoile')},
      {id: 'heart', glyph: 'solid/heart', text: T('Coeur')},
    ];

    return (
      <div className={this.styles.classNames.logo}>
        <TextFieldCombo
          width="150px"
          shape="rounded"
          selectedId={this.props.logoShape || 'hexagon'}
          list={logoShapes}
        />
        <Separator kind="exact" height="40px" />
        <GuildUserLogo
          size="150px"
          shape={this.props.logoShape}
          color={this.props.logoColor}
          initials={this.logoInitials}
        />
        <Separator kind="exact" height="40px" />
        <TextFieldTyped
          width="32px"
          shape="rounded"
          value={this.props.logoColor || '#7abd24'}
          type="color"
        />
        <div className={this.styles.classNames.logoTopLine} />
        <div className={this.styles.classNames.logoTopCircle} />
        <div className={this.styles.classNames.logoBottomLine} />
        <div className={this.styles.classNames.logoBottomCircle} />
      </div>
    );
  }

  renderFooter() {
    return (
      <div className={this.styles.classNames.footer}>
        <div className={this.styles.classNames.buttons}>
          <Button
            kind="action"
            place="1/1"
            justify="center"
            width="200px"
            text={T('Fermer')}
            onClick={this.props.onClose}
          />
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className={this.styles.classNames.guildUserProfile}>
        {this.renderHeader()}
        <div className={this.styles.classNames.content}>
          {this.renderFields()}
          {this.renderLogo()}
        </div>
        {this.renderFooter()}
      </div>
    );
  }
}

/******************************************************************************/

GuildUserProfile.propTypes = makePropTypes(Props);
GuildUserProfile.defaultProps = makeDefaultProps(Props);
