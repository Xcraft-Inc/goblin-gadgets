//T:2019-02-27
import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import * as Bool from 'goblin-gadgets/widgets/helpers/bool-helpers';
import {TranslatableDiv} from 'nabu/helpers/element-helpers';

import Label from 'goblin-gadgets/widgets/label/widget';
import Badge from 'goblin-gadgets/widgets/badge/widget';
import * as styles from './styles';

/******************************************************************************/

export default class CalendarButton extends Widget {
  constructor() {
    super(...arguments);
    this.styles = styles;

    this.onClick = this.onClick.bind(this);
  }

  static get wiring() {
    return {
      id: 'id',
      text: 'text',
      glyph: 'glyph',
    };
  }

  get disabled() {
    return Bool.isTrue(this.props.disabled) || Bool.isTrue(this.props.readonly);
  }

  onClick(e) {
    if (this.disabled) {
      return;
    }
    if (this.props.onClick) {
      this.props.onClick(e);
    }
  }

  /******************************************************************************/

  renderBadge() {
    if (this.props.badgeValue) {
      return (
        <Badge
          value={this.props.badgeValue}
          layer={this.props.badgePosition || 'over'}
          shape={this.props.badgeShape}
          color={this.props.badgeColor}
          size={this.props.badgeSize}
          disabled={this.props.dimmed}
        />
      );
    } else {
      return null;
    }
  }

  renderLabel() {
    const {tooltip, ...otherProps} = this.props;
    return (
      <Label
        key="label"
        {...otherProps}
        kind="calendar"
        disabled={this.disabled}
        grow="1"
        insideButton="true"
      />
    );
  }

  render() {
    if (Bool.isFalse(this.props.show)) {
      return null;
    }

    return (
      <TranslatableDiv
        className={this.styles.classNames.calendarButton}
        title={this.props.tooltip}
        workitemId={this.context.desktopId || this.getNearestId()}
        key={this.props.index}
        onClick={this.onClick}
      >
        {this.renderLabel()}
        {this.renderBadge()}
      </TranslatableDiv>
    );
  }
}

/******************************************************************************/
