import React from 'react';
import Widget from 'laboratory/widget';

import Button from 'gadgets/button/widget';
import Container from 'gadgets/container/widget';
import Label from 'gadgets/label/widget';
import TextFieldCombo from 'gadgets/text-field-combo/widget';
import PolyphemeTicket from 'gadgets/polypheme-ticket/widget';

/******************************************************************************/

class PolyphemeBacklog extends Widget {
  constructor () {
    super (...arguments);
    this.viewType = 'box';
  }

  onCycleViewType () {
    switch (this.viewType) {
      case 'box':
        this.viewType = 'distincts';
        break;
      case 'distincts':
        this.viewType = 'chronos';
        break;
      default:
        this.viewType = 'box';
        break;
    }
    this.forceUpdate ();
  }

  get viewTypeGlyph () {
    switch (this.viewType) {
      case 'box':
        return 'th';
      case 'distincts':
        return 'clock-o';
      default:
        return 'bars';
    }
  }

  get sortedMissions () {
    const result = [];
    const missionIds = [];

    for (const id in this.props.data.Tickets) {
      const ticket = this.props.data.Tickets[id];
      if (missionIds.indexOf (ticket.MissionId) === -1) {
        missionIds.push (ticket.MissionId);
        const tickets = [];
        for (const id in this.props.data.Tickets) {
          const t = this.props.data.Tickets[id];
          if (t.MissionId === ticket.MissionId) {
            tickets.push (t);
          }
        }
        result.push (tickets);
      }
    }

    // TODO: sort result !
    return result;
  }

  renderHoverButton () {
    const style = {
      position: 'absolute',
      left: '0px',
      top: '0px',
    };
    return (
      <div style={style}>
        <Button
          kind="hover"
          glyph={this.viewTypeGlyph}
          onClick={this.onCycleViewType}
        />
      </div>
    );
  }

  renderMission (tickets, index) {
    return <PolyphemeTicket key={index} kind="backlog" data={tickets} />;
  }

  renderMissions () {
    const result = [];
    let index = 0;
    for (const tickets of this.sortedMissions) {
      result.push (this.renderMission (tickets, index++));
    }
    return result;
  }

  render () {
    return (
      <Container kind="view-stretch">
        <Container kind="pane-top">
          <TextFieldCombo
            model=".x"
            readonly="true"
            hintText="Trier"
            comboGlyph="sort"
            width="250px"
            spacing="large"
          />
        </Container>
        <Container kind="panes" dragParentId={this.props.data.id}>
          <Container
            kind={'column'}
            dragController="ticket"
            dragSource="backlog"
            dragMode="all"
            dragOwnerId={this.props.data.id}
            viewParentId="view-backlog"
          >
            {this.renderMissions ()}
          </Container>
        </Container>
        {this.renderHoverButton ()}
      </Container>
    );
  }
}

/******************************************************************************/
export default PolyphemeBacklog;
