import React from 'react';
import Widget from 'laboratory/widget';
import * as Bool from '../helpers/boolean-helpers.js';

import Button from 'gadgets/button/widget';
import Container from 'gadgets/container/widget';
import Label from 'gadgets/label/widget';
import Ticket from 'gadgets/ticket/widget';
import PolyphemeTicket from 'gadgets/polypheme-ticket/widget';

/******************************************************************************/

class PolyphemeRoadbook extends Widget {
  constructor () {
    super (...arguments);
  }

  mouseOver (ticket) {
    console.log ('mouseOver');
    window.document.hilitedTicket = ticket.id;
    this.forceUpdate ();
  }

  mouseOut (ticket) {
    console.log ('mouseOut');
    window.document.hilitedTicket = null;
    this.forceUpdate ();
  }

  renderMessengerExtended (roadbook) {
    const width = this.context.theme.shapes.dispatchTicketWidth;
    const height = this.context.theme.shapes.messengerHeight;
    const color = this.context.theme.palette.ticketMessengerBackground;

    const photo = roadbook.Messenger &&
      roadbook.Messenger.Photo &&
      roadbook.Messenger.Photo.Glyph
      ? roadbook.Messenger.Photo.Glyph
      : 'user';
    const name = roadbook.Messenger && roadbook.Messenger.Name
      ? roadbook.Messenger.Name
      : 'A définir';

    return (
      <Ticket
        kind="ticket"
        width={width}
        height={height}
        verticalSpacing="2px"
        color={color}
        shape="last"
        hoverShape="last"
      >
        <Container kind="column" grow="2">
          <Button glyph={photo} kind="identity" />
        </Container>
        <Container kind="column" grow="1">
          <Label glyph={roadbook.Transport} glyphSize="150%" />
        </Container>
        <Container kind="column" grow="3">
          <Label text={name} textColor="#fff" />
          <Label text={roadbook.Revenue} fontWeight="bold" textColor="#fff" />
        </Container>
      </Ticket>
    );
  }

  renderMessengerCompacted (roadbook) {
    const width = this.context.theme.shapes.dispatchTicketCompactedWidth;
    const color = this.context.theme.palette.ticketMessengerBackground;

    let name = roadbook.Messenger && roadbook.Messenger.Name
      ? roadbook.Messenger.Name
      : 'A définir';
    const n = roadbook.Tickets.length;
    if (n > 0) {
      // has trips ?
      name = `${name} (${n})`;
    }

    return (
      <Ticket kind="cover" width={width} color={color}>
        <Container kind="column" grow="1">
          <Label text={name} textColor="#fff" />
        </Container>
      </Ticket>
    );
  }

  renderTicket (ticket, index) {
    return (
      <PolyphemeTicket
        key={index}
        state="compacted"
        data={ticket}
        backgroundText={
          ticket.id === window.document.hilitedTicket ? ticket.Order + 1 : null
        }
        mouseOver={() => ::this.mouseOver (ticket)}
        mouseOut={() => ::this.mouseOut (ticket)}
      />
    );
  }

  renderTickets () {
    const result = [];
    let index = 0;
    for (const ticket of this.props.data.Tickets) {
      result.push (this.renderTicket (ticket, index++));
    }
    return result;
  }

  renderExtended () {
    const boxClass = this.styles.classNames.extendedBox;
    return (
      <div className={boxClass}>
        {this.renderMessengerExtended (this.props.data)}
        <Container kind="tickets-trips">
          {this.renderTickets ()}
        </Container>
      </div>
    );
  }

  renderCompacted () {
    const boxClass = this.styles.classNames.compactedBox;
    return (
      <div className={boxClass}>
        {this.renderMessengerCompacted (this.props.data)}
      </div>
    );
  }

  render () {
    if (Bool.isTrue (this.props.compacted)) {
      return this.renderCompacted ();
    } else {
      return this.renderExtended ();
    }
  }
}

/******************************************************************************/
export default PolyphemeRoadbook;
