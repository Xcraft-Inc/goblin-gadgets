import React from 'react';
import Widget from 'laboratory/widget';
import * as Bool from 'gadgets/boolean-helpers';
import {date as DateConverters} from 'xcraft-core-converters';

import Container from 'gadgets/container/widget';
import Calendar from 'gadgets/calendar/widget';
import Button from 'gadgets/button/widget';
import Label from 'gadgets/label/widget';

/******************************************************************************/

function getBadge(badges, date) {
  for (const badge of badges) {
    if (badge.date === date) {
      return badge;
    }
  }
  return null;
}

/******************************************************************************/

class CalendarBoards extends Widget {
  constructor() {
    super(...arguments);

    this.visibleDateChanged = this.visibleDateChanged.bind(this);
    this.dateClicked = this.dateClicked.bind(this);
    this.buttonClicked = this.buttonClicked.bind(this);
  }

  static get wiring() {
    return {
      id: 'id',
      boards: 'boards',
      visibleDate: 'visibleDate',
      selectedDate: 'selectedDate',
      selectedBoardId: 'selectedBoardId',
    };
  }

  /******************************************************************************/

  getBadges() {
    const badges = [];
    for (const board of this.props.boards) {
      const date = board.get('date');
      const badge = getBadge(badges, date);
      if (badge) {
        badge.value++;
      } else {
        badges.push({date: date, value: 1});
      }
    }
    return badges;
  }

  getFirstBoardId(date) {
    for (const board of this.props.boards) {
      if (board.date === date) {
        return board.id;
      }
    }
    return 'create';
  }

  getDetail() {
    for (const board of this.props.boards) {
      if (board.id === this.props.selectedBoardId) {
        return board.detail;
      }
    }
    return null;
  }

  visibleDateChanged(date) {
    this.doAs('calendar-boards-gadget', 'showDate', {visibleDate: date});
  }

  dateClicked(date) {
    this.doAs('calendar-boards-gadget', 'selectDate', {selectedDate: date});

    const boardId = this.getFirstBoardId(date);
    this.doAs('calendar-boards-gadget', 'selectBoardId', {
      selectedBoardId: boardId,
    });
  }

  buttonClicked(boardId) {
    this.doAs('calendar-boards-gadget', 'selectBoardId', {
      selectedBoardId: boardId,
    });
  }

  /******************************************************************************/

  renderCalendar() {
    return (
      <Calendar
        monthCount="1"
        frame="true"
        visibleDate={this.props.visibleDate}
        dates={this.props.selectedDate ? [this.props.selectedDate] : []}
        badges={this.getBadges()}
        visibleDateChanged={this.visibleDateChanged}
        dateClicked={this.dateClicked}
      />
    );
  }

  renderTableItem(board, index) {
    const active = this.props.selectedBoardId === board.id;
    return (
      <Button
        key={index}
        border="none"
        text={board.info}
        active={active}
        onClick={() => this.buttonClicked(board.id)}
      />
    );
  }

  renderTableCreate(index) {
    const active = this.props.selectedBoardId === 'create';
    return (
      <Button
        key={index}
        border="none"
        text="Créer"
        active={active}
        onClick={() => this.buttonClicked('create')}
      />
    );
  }

  renderTable() {
    const result = [];
    let index = 0;
    for (const board of this.props.boards) {
      if (board.date === this.props.selectedDate) {
        result.push(this.renderTableItem(board, index++));
      }
    }
    result.push(this.renderTableCreate(index++));
    return result;
  }

  renderDetail(boards) {
    return <Label kind="label-field" grow="1" text={this.getDetail(boards)} />;
  }

  render() {
    if (!this.props.boards) {
      return null;
    }

    const tableBoxClass = this.styles.classNames.tableBox;
    const detailBoxClass = this.styles.classNames.detailBox;

    return (
      <Container kind="row">
        {this.renderCalendar()}
        <Label text=" " />
        <div className={tableBoxClass}>{this.renderTable()}</div>
        <Label text=" " />
        <div className={detailBoxClass}>{this.renderDetail()}</div>
      </Container>
    );
  }
}

/******************************************************************************/
export default CalendarBoards;
