import React from 'react';
import Widget from 'laboratory/widget';
import {Unit} from 'electrum-theme';

import Button from 'gadgets/button/widget';
import Container from 'gadgets/container/widget';
import Label from 'gadgets/label/widget';
import TextField from 'gadgets/text-field/widget';
import PolyphemeTicket from 'gadgets/polypheme-ticket/widget';

/******************************************************************************/

class PolyphemeTray extends Widget {
  constructor () {
    super (...arguments);
  }

  renderHeader () {
    const edit = false;
    if (edit) {
      return (
        <Container kind="row">
          <TextField
            select-all-on-focus="true"
            default-focus="true"
            spacing="overlap"
          />
          <Button glyph="check" spacing="overlap" mouseDown={this.onAccept} />
          <Button glyph="close" mouseDown={this.onCancel} />
        </Container>
      );
    } else {
      return (
        <Button
          kind="tray-title"
          grow={1}
          text={this.props.data.Name}
          mouseDown={this.onMyMouseDown}
        />
      );
    }
  }

  render () {
    const boxClass = this.styles.classNames.box;

    return (
      <div className={boxClass}>
        {this.renderHeader ()}
        <Container
          kind="tickets-tray"
          dragController="ticket"
          dragSource="tray"
          dragOwnerId={this.props.data.id}
        >
          {this.props.children}
        </Container>
      </div>
    );
  }
}

/******************************************************************************/
export default PolyphemeTray;
