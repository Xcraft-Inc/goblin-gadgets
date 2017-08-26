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
    this.isEdit = false;
  }

  onStartEdition () {
    this.isEdit = true;
    this.forceUpdate ();
  }

  onAccept () {
    this.isEdit = false;
    this.forceUpdate ();
  }

  onCancel () {
    this.isEdit = false;
    this.forceUpdate ();
  }

  renderHeader () {
    if (this.isEdit) {
      return (
        <Container kind="row">
          <TextField
            model=".x"
            selectAllOnFocus="true"
            defaultFocus="true"
            spacing="overlap"
          />
          <Button glyph="check" spacing="overlap" onClick={::this.onAccept} />
          <Button glyph="close" onClick={::this.onCancel} />
        </Container>
      );
    } else {
      return (
        <Button
          kind="tray-title"
          grow={1}
          text={this.props.data.Name}
          onClick={::this.onStartEdition}
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
          height={Unit.multiply ('65px', 2)}
        >
          {this.props.children}
        </Container>
      </div>
    );
  }
}

/******************************************************************************/
export default PolyphemeTray;
