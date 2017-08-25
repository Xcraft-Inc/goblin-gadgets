import React from 'react';
import Widget from 'laboratory/widget';
import {Unit} from 'electrum-theme';

import Button from 'gadgets/button/widget';
import Container from 'gadgets/container/widget';
import Label from 'gadgets/label/widget';
import PolyphemeTray from 'gadgets/polypheme-tray/widget';
import PolyphemeTicket from 'gadgets/polypheme-ticket/widget';

/******************************************************************************/

function formatValue (value) {
  if (typeof value === 'string' && !value.endsWith ('px')) {
    return value + 'px';
  } else {
    const p = Unit.parse (value);
    return p.value + p.unit; // by example '30px'
  }
}

/******************************************************************************/

class PolyphemeDesk extends Widget {
  constructor () {
    super (...arguments);
  }

  renderTicket (ticket, index) {
    return <PolyphemeTicket key={index} data={ticket} />;
  }

  renderTrayTickets (tickets) {
    const result = [];
    let index = 0;
    for (var ticket of tickets) {
      result.push (this.renderTicket (ticket, index++));
    }
    return result;
  }

  renderTray (tray, index) {
    const left = tray.Left ? tray.Left : 30 + 280 * index;
    const top = tray.Top ? tray.Top : 30;
    return (
      <PolyphemeTray
        key={index}
        left={formatValue (left)}
        top={formatValue (top)}
        rotate={tray.Rotation}
        data={tray}
      >
        {this.renderTrayTickets (tray.Tickets)}
      </PolyphemeTray>
    );
  }

  renderDesk () {
    const result = [];
    let index = 0;
    for (const id in this.props.data.Trays) {
      const tray = this.props.data.Trays[id];
      result.push (this.renderTray (tray, index++));
    }
    return result;
  }

  render () {
    return (
      <Container kind="tickets-desk">
        {this.renderDesk ()}
      </Container>
    );
  }
}

/******************************************************************************/
export default PolyphemeDesk;
