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

  renderRow (row, index) {
    let isActive = null;
    if (this.props.selectedIndex && this.props.selectedIndex === `${index}`) {
      isActive = {
        selected: 'true',
      };
    }
    return (
      <Container key={index} kind="row-pane" subkind="large-box" {...isActive}>
        <Button
          kind="container"
          width="100%"
          onClick={() =>
            this.props.onRowClick ? this.props.onRowClick (index, row) : null}
        >
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
    let index = 0;
    for (const row of rows) {
      result.push (this.renderRow (row, index));
      index++;
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
