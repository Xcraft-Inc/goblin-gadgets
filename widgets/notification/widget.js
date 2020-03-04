import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import {ColorHelpers} from 'electrum-theme';

import Label from 'goblin-gadgets/widgets/label/widget';
import Button from 'goblin-gadgets/widgets/button/widget';
import Container from 'goblin-gadgets/widgets/container/widget';
import RetroIlluminatedButton from 'goblin-gadgets/widgets/retro-illuminated-button/widget';
import * as styles from './styles';

/******************************************************************************/

export default class Notification extends Widget {
  constructor() {
    super(...arguments);
    this.styles = styles;

    this.state = {
      extended: false,
    };
    this.swapExtended = this.swapExtended.bind(this);
    this.onClick = this.onClick.bind(this);
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
    let message = this.props.data.message._string || this.props.data.message;
    if (!message) {
      return false;
    }

    if (message.nabuId) {
      message = message.nabuId;
    }

    /* Markdown are always full */
    if (message.startsWith('```') && message.endsWith('```')) {
      return false;
    }

    return message.length > 30;
  }

  onClick(e) {
    if (this.props.onClick) {
      this.props.onClick(e);
    }
  }

  /******************************************************************************/

  renderGlyph() {
    let glyphColor = this.props.data.color;
    if (glyphColor) {
      glyphColor = ColorHelpers.getMarkColor(this.context.theme, glyphColor);
    }

    if (this.context.theme.look.name !== 'retro') {
      return (
        <Button
          glyph={this.props.data.glyph}
          backgroundColor={glyphColor}
          kind="round"
          vpos="top"
          horizontalSpacing="large"
          onClick={this.props.onClickNotification}
        />
      );
    } else {
      return (
        <RetroIlluminatedButton
          width="50px"
          height="50px"
          material="led"
          backgroundColor={this.props.data.color}
          color="white"
          status={this.props.status === 'not-read' ? 'flash' : null}
          glyph={this.props.data.glyph}
          glyphSize="150%"
          vpos="top"
          onClick={this.props.onClickNotification}
        />
      );
    }
  }

  renderMessage() {
    let cursor = null;
    if (this.props.onClick) {
      cursor = 'pointer';
    }

    if (this.context.theme.look.name !== 'retro') {
      return (
        <Label
          cursor={cursor}
          text={this.props.data.message}
          kind="notification"
          grow="1"
          wrap={this.extended ? null : 'no'}
          maxLines={this.extended ? null : 2}
          skipEmptyLines={this.extended ? false : true}
          onClick={this.onClick}
          userSelect={'text'}
        />
      );
    } else {
      return (
        <Label
          cursor={cursor}
          text={this.props.data.message}
          textColor={this.props.status === 'not-read' ? '#fff' : '#bbb'}
          kind="notification"
          grow="1"
          wrap={this.extended ? null : 'no'}
          maxLines={this.extended ? null : 2}
          skipEmptyLines={this.extended ? false : true}
          onClick={this.onClick}
          userSelect={'text'}
        />
      );
    }
  }

  render() {
    return (
      <div className={this.styles.classNames.notification}>
        {this.renderGlyph()}
        {this.renderMessage()}
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
