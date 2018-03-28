import React from 'react';
import Widget from 'laboratory/widget';
import * as Bool from 'gadgets/boolean-helpers';
import {date as DateConverters} from 'xcraft-core-converters';

import Container from 'gadgets/container/widget';
import Calendar from 'gadgets/calendar/widget';
import Button from 'gadgets/button/widget';
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

  getRadioList() {
    const list = [];
    for (const board of this.props.boards) {
      const date = board.get('date');
      if (date === this.props.selectedDate) {
        const info = board.get('info');
        list.push(info);
      }
    }
    list.push('Créer');
    return list;
  }

  getRadioIndex() {
    let index = 0;
    for (const board of this.props.boards) {
      const date = board.get('date');
      if (date === this.props.selectedDate) {
        const id = board.get('id');
        if (id === this.props.selectedBoardId) {
          return index;
        }
        index++;
      }
    }
    return index;
  }

  getRadioBoardId(index) {
    let i = 0;
    for (const board of this.props.boards) {
      const date = board.get('date');
      if (date === this.props.selectedDate) {
        if (i === index) {
          return board.get('id');
        }
        i++;
      }
    }
    return null;
  }

  getDetail() {
    for (const board of this.props.boards) {
      const id = board.get('id');
      if (id === this.props.selectedBoardId) {
        return board.get('detail');
      }
    }
    return null;
  }

  visibleDateChanged(date) {
    this.doAs('calendar-boards-gadget', 'showDate', {visibleDate: date});
  }

  dateClicked(date) {
    this.doAs('calendar-boards-gadget', 'selectDate', {selectedDate: date});

    const boardId = this.getRadioBoardId(0);
    this.doAs('calendar-boards-gadget', 'selectBoardId', {
      selectedBoardId: boardId,
    });
  }

  radioClicked(index) {
    const boardId = this.getRadioBoardId(index);
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

  renderRadios() {
    return (
      <RadioList
        list={this.getRadioList()}
        selectedIndex={this.getRadioIndex()}
        selectionChanged={this.radioClicked}
      />
    );
  }

  renderDetail(boards) {
    return <Label kind="label-field" grow="1" text={this.getDetail(boards)} />;
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
