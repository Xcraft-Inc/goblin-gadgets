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

  renderList () {
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

  renderContent () {
    switch (this.props.kind) {
      case 'list':
        return this.renderList ();
      case 'date':
        return this.renderDate ();
      default:
        throw new Error (`Unknow kind ${this.props.kind} into Hinter`);
    }
  }

  render () {
    const {state} = this.props;
    const disabled = this.props.disabled;
    const titleGlyph = this.props['title-glyph'];
    const titleText = this.props['title-text'];

    return (
      <Container kind="view-short">
        <Container kind="panes-short">
          <Container kind="pane">
            <Container kind="row-pane">
              <Label glyph={titleGlyph} text={titleText} kind="title" />
            </Container>
            {this.renderContent ()}
          </Container>
        </Container>
      </Container>
    );
  }
}

/******************************************************************************/
export default Hinter;
