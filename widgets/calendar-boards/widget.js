import React from 'react';
import Widget from 'laboratory/widget';
import * as Bool from 'gadgets/boolean-helpers';
import {date as DateConverters} from 'xcraft-core-converters';

import Container from 'gadgets/container/widget';
import Calendar from 'gadgets/calendar/widget';
import RadioList from 'gadgets/radio-list/widget';
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

function getBadges(boards) {
  const badges = [];
  for (const board of boards) {
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

function getRadioList(boards, selectedDate) {
  const list = [];
  for (const board of boards) {
    const date = board.get('date');
    if (date === selectedDate) {
      const info = board.get('info');
      list.push(info);
    }
  }
  list.push('Créer');
  return list;
}

function getRadioIndex(boards, selectedDate, selectedBoardId) {
  let index = 0;
  for (const board of boards) {
    const date = board.get('date');
    if (date === selectedDate) {
      const id = board.get('id');
      if (id === selectedBoardId) {
        return index;
      }
      index++;
    }
  }
  return index;
}

function getRadioBoardId(boards, selectedDate, index) {
  let i = 0;
  for (const board of boards) {
    const date = board.get('date');
    if (date === selectedDate) {
      if (i === index) {
        return board.get('id');
      }
      i++;
    }
  }
  return null;
}

function getDetail(boards, selectedBoardId) {
  for (const board of boards) {
    const id = board.get('id');
    if (id === selectedBoardId) {
      return board.get('detail');
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
    this.radioClicked = this.radioClicked.bind(this);
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

  visibleDateChanged(date) {
    this.doAs('calendar-boards-gadget', 'showDate', {visibleDate: date});
  }

  dateClicked(date) {
    this.doAs('calendar-boards-gadget', 'selectDate', {selectedDate: date});

    const boardId = getRadioBoardId(this.props.boards, date, 0);
    this.doAs('calendar-boards-gadget', 'selectBoardId', {
      selectedBoardId: boardId,
    });
  }

  radioClicked(index) {
    const boardId = getRadioBoardId(
      this.props.boards,
      this.props.selectedDate,
      index
    );
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
        badges={getBadges(this.props.boards)}
        visibleDateChanged={this.visibleDateChanged}
        dateClicked={this.dateClicked}
      />
    );
  }

  renderRadios() {
    return (
      <RadioList
        list={getRadioList(this.props.boards, this.props.selectedDate)}
        selectedIndex={getRadioIndex(
          this.props.boards,
          this.props.selectedDate,
          this.props.selectedBoardId
        )}
        selectionChanged={this.radioClicked}
      />
    );
  }

  renderDetail() {
    return (
      <Label
        kind="label-field"
        grow="1"
        text={getDetail(this.props.boards, this.props.selectedBoardId)}
      />
    );
  }

  render() {
    if (!this.props.boards) {
      return null;
    }

    const radioBoxClass = this.styles.classNames.radioBox;
    const detailBoxClass = this.styles.classNames.detailBox;

    return (
      <Container kind="row">
        {this.renderCalendar()}
        <div className={radioBoxClass}>{this.renderRadios()}</div>
        <div className={detailBoxClass}>{this.renderDetail()}</div>
      </Container>
    );
  }
}

/******************************************************************************/
export default CalendarBoards;