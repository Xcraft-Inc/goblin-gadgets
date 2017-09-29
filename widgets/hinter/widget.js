import React from 'react';
import Widget from 'laboratory/widget';

import Container from 'gadgets/container/widget';
import Label from 'gadgets/label/widget';
import Button from 'gadgets/button/widget';
import Calendar from 'gadgets/calendar/widget';

/******************************************************************************/

class Hinter extends Widget {
  constructor () {
    super (...arguments);
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
    const result = [];
    let index = 0;
    for (const row of this.props.rows) {
      result.push (this.renderRow (row, index));
      index++;
    }
    return result;
  }

  renderDate () {
    return (
      <Container kind="row-pane" subkind="large-box">
        <Calendar visibleDate={this.props.date} date={this.props.date} />
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

  renderButtonNew () {
    if (this.props.displayNewButton && this.props.onNew) {
      return (
        <Container kind="actions">
          <Button
            kind="action"
            place="1/1"
            glyph="plus"
            text={
              this.props.newButtonTitle
                ? this.props.newButtonTitle
                : `Nouveau ${this.props.titleText}`
            }
            width="0px"
            grow="1"
            onClick={this.props.onNew}
          />
        </Container>
      );
    } else {
      return null;
    }
  }

  render () {
    return (
      <Container kind="view" grow="1">
        <Container kind="pane-header-light">
          <Label
            kind="title"
            glyph={this.props.titleGlyph}
            text={this.props.titleText}
          />
        </Container>
        <Container kind="panes">
          <Container kind="pane-top">
            {this.renderContent ()}
          </Container>
        </Container>
        {this.renderButtonNew ()}
      </Container>
    );
  }
}

/******************************************************************************/
export default Hinter;
