import React from 'react';
import Widget from 'laboratory/widget';
import {ColorHelpers} from 'electrum-theme';

import Label from 'gadgets/label/widget';
import Button from 'gadgets/button/widget';

/******************************************************************************/

class Notification extends Widget {
  constructor() {
    super(...arguments);
  }

  render() {
    let glyphColor = this.props.data.color;
    if (glyphColor) {
      glyphColor = ColorHelpers.getMarkColor(this.context.theme, glyphColor);
    }

    const boxClass = this.styles.classNames.box;

    return (
      <div className={boxClass} onClick={this.props.onClick}>
        <Button
          glyph={this.props.data.glyph}
          backgroundColor={glyphColor}
          kind="round"
          vpos="top"
          spacing="large"
          onClick={this.props.onClickNotification}
        />
        <Label text={this.props.data.message} kind="notification" grow="1" />
        <Button
          glyph="solid/times"
          kind="notification-close"
          vpos="top"
          onClick={this.props.onDeleteNotification}
        />
      </div>
    );
  }
}

/******************************************************************************/
export default Notification;
