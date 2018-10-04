import React from 'react';
import Widget from 'laboratory/widget';
import {ColorHelpers} from 'electrum-theme';

import Label from 'gadgets/label/widget';
import Button from 'gadgets/button/widget';
import Container from 'gadgets/container/widget';

/******************************************************************************/

class Notification extends Widget {
  constructor() {
    super(...arguments);
    this.state = {
      extended: false,
    };
    this.swapExtended = this.swapExtended.bind(this);
  }

  //#region get/set
  get extended() {
    return this.state.extended;
  }

  set extended(value) {
    this.setState({
      extended: value,
    });
  }
  //#endregion

  swapExtended() {
    this.extended = !this.extended;
  }

  get hasExtendButton() {
    return this.props.data.message && this.props.data.message.length > 30;
  }

  render() {
    let glyphColor = this.props.data.color;
    if (glyphColor) {
      glyphColor = ColorHelpers.getMarkColor(this.context.theme, glyphColor);
    }

    return (
      <div className={this.styles.classNames.box} onClick={this.props.onClick}>
        <Button
          glyph={this.props.data.glyph}
          backgroundColor={glyphColor}
          kind="round"
          vpos="top"
          spacing="large"
          onClick={this.props.onClickNotification}
        />
        <Label
          text={this.props.data.message}
          kind="notification"
          grow="1"
          wrap={this.extended ? null : 'no'}
          maxLines={this.extended ? null : 2}
          skipEmptyLines={this.extended ? false : true}
        />
        <Container kind="column">
          <Button
            glyph="solid/times"
            kind="notification-close"
            vpos="top"
            onClick={this.props.onDeleteNotification}
          />
          <Label grow="1" />
          {this.hasExtendButton ? (
            <Button
              glyph={this.extended ? 'solid/caret-up' : 'solid/caret-down'}
              kind="notification-extend"
              onClick={this.swapExtended}
            />
          ) : null}
        </Container>
      </div>
    );
  }
}

/******************************************************************************/
export default Notification;
