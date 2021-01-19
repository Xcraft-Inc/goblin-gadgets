import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import props from './props';
import scenarios from './scenarios';
import {registerWidget} from 'goblin-gadgets/widgets/widget-doc/widget-list';
import * as styles from './styles';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import GuildHelpers from '../guild-user-logo/guild-helpers';
import {TranslatableDiv} from 'goblin-nabu/widgets/helpers/element-helpers';

/******************************************************************************/

export default class GuildUserLogo extends Widget {
  constructor() {
    super(...arguments);
    this.styles = styles;
  }

  renderGlyph() {
    const glyph = GuildHelpers.getLogoShape(this.props.shape);
    return (
      <div className={this.styles.classNames.glyph}>
        <FontAwesomeIcon icon={['fas', glyph]} />
      </div>
    );
  }

  renderInitials() {
    const text = this.props.initials
      ? this.props.initials.substring(0, 3)
      : '?';

    return <div className={this.styles.classNames.text}>{text}</div>;
  }

  renderLogo() {
    return (
      <TranslatableDiv
        className={this.styles.classNames.guildUserLogo}
        title={this.props.tooltip}
        onClick={this.props.onClick ? this.props.onClick : null}
      >
        {this.renderGlyph()}
        {this.renderInitials()}
      </TranslatableDiv>
    );
  }

  renderUri() {
    return (
      <TranslatableDiv
        className={this.styles.classNames.guildUserLogo}
        title={this.props.tooltip}
        onClick={this.props.onClick ? this.props.onClick : null}
      >
        <img
          className={this.styles.classNames.photo}
          src={this.props.uri}
          alt="gravatar"
        />
      </TranslatableDiv>
    );
  }

  render() {
    if (this.props.uri) {
      return this.renderUri();
    } else {
      return this.renderLogo();
    }
  }
}

/******************************************************************************/

registerWidget(GuildUserLogo, props, scenarios);
