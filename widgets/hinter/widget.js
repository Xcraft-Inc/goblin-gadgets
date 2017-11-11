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

    this.handleClick = this.handleClick.bind (this);
    this.handleDbClick = this.handleDbClick.bind (this);
  }

  handleClick (index, row) {
    if (this.props.onRowClick) {
      this.props.onRowClick (index, row);
    }
  }

  handleDbClick (index, row) {
    if (this.props.onRowDbClick) {
      this.props.onRowDbClick (index, row);
    }
  }
  renderRow (row, index) {
    const isActive =
      this.props.selectedIndex && this.props.selectedIndex === `${index}`;

    const boxClass = isActive
      ? this.styles.classNames.boxActive
      : this.styles.classNames.box;

    return (
      <div
        className={boxClass}
        onClick={() => this.handleClick (index, row)}
        onDoubleClick={() => this.handleDbClick (index, row)}
      >
        <Label
          text={row}
          kind="large-single"
          justify="left"
          grow="1"
          wrap="no"
        />
      </div>
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
      <div className={boxClass}>
        <Calendar visibleDate={this.props.date} date={this.props.date} />
      </div>
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
