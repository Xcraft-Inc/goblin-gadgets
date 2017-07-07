import React from 'react';
import Widget from 'laboratory/widget';
import {ColorHelpers} from 'electrum-theme';

import Label from 'gadgets/label/widget';
import Button from 'gadgets/button/widget';

/******************************************************************************/

class Notification extends Widget {
  constructor (props) {
    super (props);
  }

  render () {
    const data = this.props.data;

    let glyphColor = data.color;
    if (glyphColor) {
      glyphColor = ColorHelpers.getMarkColor (this.context.theme, glyphColor);
    }

    const boxClass = this.styles.classNames.box;

    return (
      <div className={boxClass} onClick={this.props.onClick}>
        <Button
          glyph={data.glyph}
          backgroundColor={glyphColor}
          kind="round"
          spacing="large"
        />
        <Label text={data.message} kind="notification" grow="1" />
        <Button
          glyph="close"
          kind="notification-close"
          onClick={this.props.onDelete}
        />
      </div>
    );
  }
}

/******************************************************************************/
export default Notification;
