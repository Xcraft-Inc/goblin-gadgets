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

class PolyphemeMission extends Widget {
  constructor () {
    super (...arguments);
  }

  renderGlyph (glyph, index) {
    const g = GlyphHelpers.getGlyph (glyph);
    return (
      <Label
        key={index}
        glyph={g.glyph}
        glyphColor={g.color}
        zIndex={0}
        spacing="compact"
      />
    );
  }

  renderShortNote (note) {
    if (!note || !note.Glyphs) {
      return null;
    } else {
      let line = [];
      let index = 0;
      for (var glyph of note.Glyphs) {
        if (glyph.Glyph) {
          line.push (this.renderGlyph (glyph.Glyph, index++));
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

  renderMeetingPoint (meetingPoint, border, index) {
    if (meetingPoint) {
      const directionGlyph = PolyphemeHelpers.getDirectionGlyph (
        this.context.theme,
        meetingPoint.Type
      );
      const dimmedSize = this.context.theme.shapes.ticketDimmedSize;

      return (
        <Container index={index} kind="thin-row" border={border} grow="1">
          <Container kind="thin-row" width="120px">
            <Label
              text={PolyphemeHelpers.getPeriod (
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

  render () {
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
                  text={PolyphemeHelpers.getPackageCount (ticket)}
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
}

/******************************************************************************/
export default PolyphemeMission;
