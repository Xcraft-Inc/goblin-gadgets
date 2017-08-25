import React from 'react';
import Widget from 'laboratory/widget';
import {ColorHelpers} from 'electrum-theme';
import * as GlyphHelpers from '../helpers/glyph-helpers.js';
import * as Converters from '../helpers/converters';
import * as PolyphemeHelpers from '../helpers/polypheme-helpers.js';

import Button from 'gadgets/button/widget';
import Container from 'gadgets/container/widget';
import Label from 'gadgets/label/widget';
import Ticket from 'gadgets/ticket/widget';
import Gauge from 'gadgets/gauge/widget';

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
          <Label text={PolyphemeHelpers.getPackageCount (ticket)} grow="1" />
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
        {this.renderLine (
          'cube',
          PolyphemeHelpers.getPackageDescription (ticket)
        )}
        {this.renderLine ('money', ticket.MeetingPoint.NetPrice)}
        {this.renderLine (
          'info-circle',
          PolyphemeHelpers.getStatusDescription (ticket)
        )}
        {this.renderNotes (ticket.MeetingPoint.Notes)}
      </Container>
    );
  }

  render () {
    const ticket = this.props.data;
    const directionGlyph = PolyphemeHelpers.getDirectionGlyph (
      this.context.theme,
      ticket.Type
    );
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
}

/******************************************************************************/
export default PolyphemeTicket;
