import React from 'react';
import Widget from 'laboratory/widget';
import {ColorHelpers} from 'electrum-theme';
import * as GlyphHelpers from '../helpers/glyph-helpers.js';
import * as Converters from '../helpers/converters';

import Button from 'gadgets/button/widget';
import Container from 'gadgets/container/widget';
import Label from 'gadgets/label/widget';
import Ticket from 'gadgets/ticket/widget';
import Gauge from 'gadgets/gauge/widget';

/******************************************************************************/

function getDirectionGlyph (theme, type) {
  const transit = type.endsWith ('-transit');
  const color = ColorHelpers.getMarkColor (theme, type);
  if (type.startsWith ('pick')) {
    if (transit) {
      return {
        glyph: 'plus-square-o',
        color: color,
      };
    } else {
      return {
        glyph: 'plus-square',
        color: color,
      };
    }
  } else if (type.startsWith ('drop')) {
    if (transit) {
      return {
        glyph: 'minus-square-o',
        color: color,
      };
    } else {
      return {
        glyph: 'minus-square',
        color: color,
      };
    }
  } else {
    return {
      glyph: 'square',
      color: color,
    };
  }
}

function getPackageCount (ticket) {
  if (ticket.Packages) {
    return ticket.Packages.length + 'x';
  } else {
    return '';
  }
}

function getPeriod (startTime, endTime) {
  const s = Converters.getDisplayedTime (startTime);
  const e = Converters.getDisplayedTime (endTime);
  if (s === e) {
    return s;
  } else {
    return `${s} — ${e}`;
  }
}

function getPackageDescription (ticket) {
  let desc = getPackageCount (ticket);
  if (ticket.Weight) {
    desc += ` — ${ticket.Weight}`;
  }
  if (ticket.Product) {
    desc += ` — ${ticket.Product}`;
  }
  return desc;
}

function getStatusDescription (ticket) {
  if (ticket.Status === 'pre-dispatched') {
    return 'Pré-dispatché';
  } else if (ticket.Status === 'dispatched') {
    return 'Dispatché';
  } else if (ticket.Status === 'delivered') {
    return 'Livré';
  } else {
    return ticket.Status;
  }
}

/******************************************************************************/

class PolyphemeTicket extends Widget {
  constructor () {
    super (...arguments);
  }

  renderGlyph (glyph) {
    const g = GlyphHelpers.getGlyph (glyph);
    return (
      <Label
        glyph={g.glyph}
        glyphColor={g.color}
        zIndex={0}
        spacing="compact"
      />
    );
  }

  renderNoteGlyph (note) {
    if (!note || !note.Glyphs) {
      return null;
    } else {
      let line = [];
      for (var glyph of note.Glyphs) {
        if (glyph.Glyph) {
          line.push (this.renderGlyph (glyph.Glyph));
        }
      }
      return line;
    }
  }

  renderNoteGlyphs (notes) {
    if (!notes) {
      return null;
    } else {
      let line = [];
      for (var note of notes) {
        line.push (this.renderNoteGlyph (note));
      }
      return line;
    }
  }

  renderShortNote (note) {
    if (!note || !note.Glyphs) {
      return null;
    } else {
      let line = [];
      for (var glyph of note.Glyphs) {
        if (glyph.Glyph) {
          line.push (this.renderGlyph (glyph.Glyph));
        }
      }
      return line;
    }
  }

  renderShortNotes (notes) {
    if (!notes) {
      return null;
    } else {
      let line = [];
      for (var note of notes) {
        line.push (this.renderShortNote (note));
      }
      return line;
    }
  }

  renderNote (note, index) {
    let glyph = null;
    if (note.Glyphs.length >= 1) {
      glyph = note.Glyphs[0].Glyph; // only first glyph !
    }
    return this.renderLine (glyph, note.Content, index);
  }

  renderNotes (notes) {
    if (!notes) {
      return null;
    } else {
      let line = [];
      let index = 0;
      for (var note of notes) {
        line.push (this.renderNote (note, index++));
      }
      return line;
    }
  }

  renderLine (glyph, text, index) {
    if (!text) {
      return null;
    } else {
      const g = GlyphHelpers.getGlyph (glyph);
      return (
        <Container key={index} kind="ticket-row">
          <Label width="15px" />
          <Label glyph={g.glyph} glyphColor={g.color} width="35px" />
          <Label
            text={text}
            fontSize={this.context.theme.shapes.ticketExtendedTextSize}
            wrap="yes"
            grow="1"
          />
        </Container>
      );
    }
  }

  renderWarning (text) {
    if (!text) {
      return null;
    } else {
      return (
        <Container kind="column">
          <Container kind="row">
            <Label
              kind="ticket-warning"
              text={text}
              font-style="italic"
              wrap="no"
              grow="1"
            />
          </Container>
          <Separator kind="ticket-warning" />
        </Container>
      );
    }
  }

  renderRoadbookCompacted (ticket, directionGlyph, delivered) {
    let topTime, bottomTime;
    if (delivered) {
      topTime = ticket.MeetingPoint.RealisedTime;
      bottomTime = null;
    } else {
      topTime = ticket.MeetingPoint.StartPlanedTime;
      bottomTime = ticket.MeetingPoint.EndPlanedTime;
    }

    return (
      <Container kind="ticket-column" grow="1">
        {this.renderWarning (ticket.Warning)}
        <Container kind="ticket-row" marginBottom="-10px">
          <Label
            text={Converters.getDisplayedTime (topTime)}
            fontWeight="bold"
            width="55px"
          />
          <Label
            glyph={directionGlyph.glyph}
            glyphColor={directionGlyph.color}
            width="25px"
          />
          <Label
            text={ticket.MeetingPoint.ShortDescription}
            fontWeight="bold"
            wrap="no"
            grow="1"
          />
        </Container>
        <Container kind="ticket-row">
          <Label
            text={Converters.getDisplayedTime (bottomTime)}
            fontWeight="bold"
            width="55px"
          />
          <Label text="" width="25px" />
          <Label glyph="cube" spacing="compact" />
          <Label text={getPackageCount (ticket)} grow="1" />
          {this.renderNoteGlyphs (ticket.MeetingPoint.Notes)}
        </Container>
      </Container>
    );
  }

  renderRoadbookExtended (ticket, directionGlyph, delivered) {
    let topTime;
    if (delivered) {
      topTime = ticket.MeetingPoint.RealisedTime;
    } else {
      topTime = ticket.MeetingPoint.StartPlanedTime;
    }

    return (
      <Container kind="ticket-column" grow="1">
        {this.renderWarning (ticket.Warning)}
        <Container kind="ticket-row">
          <Label
            text={Converters.getDisplayedTime (topTime)}
            fontWeight="bold"
            width="55px"
          />
          <Label
            glyph={directionGlyph.glyph}
            glyphColor={directionGlyph.color}
            width="25px"
          />
          <Label
            text={ticket.MeetingPoint.ShortDescription}
            fontWeight="bold"
            wrap="no"
            grow="1"
          />
        </Container>
        {this.renderLine ('building', ticket.MeetingPoint.LongDescription)}
        {this.renderLine ('map-marker', ticket.MeetingPoint.Zone)}
        {this.renderNotes (ticket.MeetingPoint.Notes)}
        {this.renderLine ('cube', getPackageDescription (ticket))}
        {this.renderLine ('money', ticket.MeetingPoint.NetPrice)}
        {this.renderLine ('info-circle', getStatusDescription (ticket))}
        {this.renderNotes (ticket.MeetingPoint.Notes)}
      </Container>
    );
  }

  renderRoadbook () {
    const ticket = this.props.data;
    const directionGlyph = getDirectionGlyph (this.context.theme, ticket.Type);
    const delivered = false;
    const color = this.context.theme.palette.ticketBackground;
    const width = this.context.theme.shapes.dispatchTicketWidth;
    const shape = ticket.Type === 'pick' ? 'first' : 'last';

    if (this.props.state === 'extended') {
      return (
        <Ticket
          kind="rect"
          width={width}
          verticalSpacing="2px"
          color={color}
          shape={shape}
          hoverShape={shape}
        >
          {this.renderRoadbookExtended (ticket, directionGlyph, delivered)}
        </Ticket>
      );
    } else {
      const height = ticket.Warning ? '95px' : '65px';
      return (
        <Ticket
          kind="ticket"
          width={width}
          height={height}
          verticalSpacing="2px"
          color={color}
          shape={shape}
          hoverShape={shape}
        >
          {this.renderRoadbookCompacted (ticket, directionGlyph, delivered)}
        </Ticket>
      );
    }
  }

  renderMeetingPoint (meetingPoint, border, index) {
    if (meetingPoint) {
      const directionGlyph = getDirectionGlyph (
        this.context.theme,
        meetingPoint.Type
      );
      const dimmedSize = this.context.theme.shapes.ticketDimmedSize;

      return (
        <Container index={index} kind="thin-row" border={border} grow="1">
          <Container kind="thin-row" width="120px">
            <Label
              text={getPeriod (
                meetingPoint.StartPlanedTime,
                meetingPoint.EndPlanedTime
              )}
              fontWeight="bold"
              wrap="no"
            />
          </Container>
          <Container kind="thin-row" width="20px">
            <Label
              glyph={directionGlyph.glyph}
              glyphColor={directionGlyph.color}
            />
          </Container>
          <Container kind="thin-row" grow="1" width="100px">
            <Label text={meetingPoint.ShortDescription} wrap="no" />
          </Container>
          <Container kind="thin-row" width="60px">
            <Label
              text={meetingPoint.Zone}
              textTransform="uppercase"
              wrap="no"
              fontSize={dimmedSize}
            />
          </Container>
          <Container kind="thin-row" width="80px">
            <Label grow="1" />
            {this.renderShortNotes (meetingPoint.Notes)}
          </Container>
        </Container>
      );
    } else {
      return (
        <Container index={index} kind="thin-row" border={border} grow="1" />
      );
    }
  }

  renderMeetingPoints (meetingPoints) {
    const result = [];
    let index = 0;
    for (var i = 0; i < this.props.data.length; i++) {
      const meetingPoint = this.props.data[i].MeetingPoint;
      const border = i < this.props.data.length - 1 ? 'bottom' : null;
      result.push (this.renderMeetingPoint (meetingPoint, border, index++));
    }
    return result;
  }

  renderBacklog () {
    const ticket = this.props.data[0]; // use first ticket for common data
    const dimmedColor = this.context.theme.palette.ticketDimmed;
    const dimmedSize = this.context.theme.shapes.ticketDimmedSize;

    return (
      <Ticket
        kind="thin"
        color={this.context.theme.palette.ticketBackground}
        verticalSpacing="10px"
      >
        <Container kind="row" grow="1">
          <Container kind="thin-column" border="right" width="10px">
            <Gauge value={ticket.Urgency} />
          </Container>

          <Container kind="thin-column" border="right" grow="1">
            {this.renderMeetingPoints (ticket.MeetingPoints)}
          </Container>

          <Container kind="thin-column" border="right" width="150px">
            <Container kind="thin-row" grow="1">
              <Container kind="thin-row" grow="2">
                <Label glyph="cube" glyphColor={dimmedColor} />
              </Container>
              <Container kind="thin-row" grow="3">
                <Label
                  text={getPackageCount (ticket)}
                  justify="right"
                  grow="1"
                  wrap="no"
                />
              </Container>
            </Container>
            <Container kind="thin-row" grow="1">
              <Container kind="thin-row" grow="2">
                <Label
                  text="total"
                  fontSize={dimmedSize}
                  textColor={dimmedColor}
                />
              </Container>
              <Container kind="thin-row" grow="3">
                <Label
                  text={ticket.Weight}
                  justify="right"
                  grow="1"
                  wrap="no"
                />
              </Container>
            </Container>
          </Container>

          <Container kind="thin-column" width="100px">
            <Container kind="thin-row" grow="1">
              <Label
                text={ticket.NetPrice}
                justify="right"
                grow="1"
                wrap="no"
              />
            </Container>
            <Container kind="thin-row" grow="1">
              <Container kind="thin-row" grow="2" />
              <Container kind="thin-row" grow="3">
                <Label grow="1" />
                {this.renderShortNotes (ticket.Notes)}
              </Container>
            </Container>
          </Container>

        </Container>
      </Ticket>
    );
  }

  render () {
    switch (this.props.kind) {
      case 'roadbook':
        return this.renderRoadbook ();
      case 'backlog':
        return this.renderBacklog ();
      default:
        const message = `PolyphemeTicket: Unknown kind ${this.props.kind}`;
        return <Label text={message} />;
    }
  }
}

/******************************************************************************/
export default PolyphemeTicket;
