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
import RetroIlluminatedButton from 'goblin-gadgets/widgets/retro-illuminated-button/widget';
import GuildUserLogo from 'goblin-gadgets/widgets/guild-user-logo/widget';

/******************************************************************************/

export default class GuildEntry extends Widget {
  constructor() {
    super(...arguments);
    this.styles = styles;
  }

  get locked() {
    return this.props.status === 'locked';
  }

  renderHeader() {
    const text = `${this.props.appName} — Administrateur: ${this.props.guildMaster}`;

    return (
      <div className={this.styles.classNames.header}>
        <Label width="42px" />
        <Label text={text} justify="center" grow="1" />
        <GuildUserLogo size="32px" initials="D" shape="" color="" />
        <Label width="10px" />
      </div>
    );
  }

  renderTitle() {
    const text = this.locked
      ? T(
          "Vous devez demander à l'administrateur qu'il vous ajoute dans la liste des utilisateurs autorisés."
        )
      : T(
          "L'administrateur vous a ajouté dans la liste des utilisateurs autorisés."
        );

    return (
      <div className={this.styles.classNames.title}>
        <Label text={text} fontSize="150%" justify="center" />
      </div>
    );
  }

  renderLeds() {
    return (
      <div className={this.styles.classNames.leds}>
        <RetroIlluminatedButton
          width="50px"
          height="50px"
          material="led"
          backgroundColor={this.locked ? '#f00' : '#aaa'}
        />
        <Label width="25px" />
        <RetroIlluminatedButton
          width="50px"
          height="50px"
          material="led"
          backgroundColor={!this.locked ? '#0f0' : '#aaa'}
        />
      </div>
    );
  }

  renderFooter() {
    return (
      <div className={this.styles.classNames.footer}>
        <div className={this.styles.classNames.buttons}>
          <Button
            kind="action"
            place="1/2"
            justify="center"
            width="200px"
            text={T('Editer mon profil')}
            fontSize="150%"
            onClick={this.props.onEditProfile}
          />
          <Button
            kind="action"
            place="2/2"
            justify="center"
            width="200px"
            text={T('Entrer')}
            fontSize="150%"
            disabled={this.locked}
            onClick={this.props.onEnter}
          />
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className={this.styles.classNames.guildEntry}>
        {this.renderHeader()}
        <div className={this.styles.classNames.content}>
          {this.renderTitle()}
          {this.renderLeds()}
        </div>
        {this.renderFooter()}
      </div>
    );
  }
}

/******************************************************************************/

GuildEntry.propTypes = makePropTypes(Props);
GuildEntry.defaultProps = makeDefaultProps(Props);
