import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import Props from './props';
import {
  makePropTypes,
  makeDefaultProps,
} from 'xcraft-core-utils/lib/prop-types';
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

  render() {
    return (
      <TranslatableDiv
        className={this.styles.classNames.guildUserLogo}
        title={this.props.tooltip}
      >
        {this.renderGlyph()}
        {this.renderInitials()}
      </TranslatableDiv>
    );
  }
}

/******************************************************************************/

GuildUserLogo.propTypes = makePropTypes(Props);
GuildUserLogo.defaultProps = makeDefaultProps(Props);
