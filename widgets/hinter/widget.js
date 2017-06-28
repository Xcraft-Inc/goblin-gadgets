import React from 'react';
import Widget from 'laboratory/widget';

import Container from 'gadgets/container/widget';
import Label from 'gadgets/label/widget';
import Button from 'gadgets/button/widget';
import Calendar from 'gadgets/calendar/widget';

/******************************************************************************/

class Hinter extends Widget {
  constructor (props) {
    super (props);
  }

  renderRow (row) {
    return (
      <Container kind="row-pane" subkind="large-box">
        <Button kind="container" width="100%">
          <Label
            text={row}
            kind="large-single"
            justify="left"
            grow="1"
            wrap="no"
          />
        </Button>
      </Container>
    );
  }

  renderRows () {
    const rows = this.props.rows;
    const result = [];
    for (const row of rows) {
      result.push (this.renderRow (row));
    }
    return result;
  }

  renderDate () {
    const date = this.props.date;
    return (
      <Container kind="row-pane" subkind="large-box">
        <Calendar visible-date={date} date={date} />
      </Container>
    );
  }

  renderContent (kind) {
    if (kind === 'list') {
      return this.renderRows ();
    } else if (kind === 'date') {
      return this.renderDate ();
    } else {
      throw new Error (`Unknow kind ${kind} into Hinter`);
    }
  }

  render () {
    const {state} = this.props;
    const disabled = this.props.disabled;
    const kind = this.props.kind;
    const titleGlyph = this.props['title-glyph'];
    const titleText = this.props['title-text'];

    if (kind === 'hide') {
      return null;
    } else {
      return (
        <Container kind="view-short">
          <Container kind="panes-short">
            <Container kind="pane">
              <Container kind="row-pane">
                <Label glyph={titleGlyph} text={titleText} kind="title" />
              </Container>
              {this.renderContent (kind)}
            </Container>
          </Container>
        </Container>
      );
    }
  }
}

/******************************************************************************/
export default Hinter;
