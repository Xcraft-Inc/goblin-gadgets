import React from 'react';
import Widget from 'laboratory/widget';
import * as Bool from 'gadgets/boolean-helpers';
import {date as DateConverters} from 'xcraft-core-converters';

import Container from 'gadgets/container/widget';
import Calendar from 'gadgets/calendar/widget';
import Table from 'gadgets/table/widget';
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

    this.state = {
      visibleDate: DateConverters.moveAtBeginningOfMonth(
        this.props.selectedDate
      ),
      selectedDate: this.props.selectedDate,
      tableId: null,
    };

    this.dateClicked = this.dateClicked.bind(this);
    this.visibleDateChanged = this.visibleDateChanged.bind(this);
    this.tableChanged = this.tableChanged.bind(this);
  }

  //#region get/set
  get visibleDate() {
    return this.state.visibleDate;
  }

  set visibleDate(value) {
    this.setState({
      visibleDate: value,
    });
  }

  get selectedDate() {
    return this.state.selectedDate;
  }

  set selectedDate(value) {
    this.setState({
      selectedDate: value,
    });
  }

  get tableId() {
    return this.state.tableId;
  }

  set tableId(value) {
    this.setState({
      tableId: value,
    });
  }
  //#endregion

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

  getTable() {
    const data = {
      header: {
        column0: {
          id: 'column0',
          name: 'description',
          grow: '1',
          textAlign: 'left',
        },
      },
      rows: {},
    };

    for (const board of this.props.boards) {
      const b = board.toJS();
      if (b.date === this.selectedDate) {
        data.rows[b.id] = {
          id: b.id,
          description: b.description,
        };
      }
    }

    data.rows.create = {
      id: 'create',
      description: 'Créer une nouvelle board',
    };

    return data;
  }

  getFirstBoard(date) {
    for (const board of this.props.boards) {
      const b = board.toJS();
      if (b.date === date) {
        return b;
      }
    }
    return null;
  }

  dateClicked(date) {
    this.selectedDate = date;

    const board = this.getFirstBoard(date);
    if (board) {
      this.tableId = board.id;
    } else {
      this.tableId = 'create';
    }

    if (this.props.onBoardChanged) {
      this.props.onBoardChanged(date, null);
    }
  }

  visibleDateChanged(date) {
    this.visibleDate = date;
  }

  tableChanged(row) {
    this.tableId = row;
  }

  /******************************************************************************/

  renderCalendar() {
    return (
      <Calendar
        monthCount="1"
        frame="true"
        visibleDate={this.visibleDate}
        dates={[this.selectedDate]}
        badges={this.getBadges()}
        dateClicked={this.dateClicked}
        visibleDateChanged={this.visibleDateChanged}
      />
    );
  }

  renderTable() {
    return (
      <Table
        frame="true"
        height="500px"
        grow="1"
        selectionMode="single"
        data={this.getTable()}
        selectedRow={this.tableId}
        onSelectionChanged={this.tableChanged}
      />
    );
  }

  render() {
    if (!this.props.boards) {
      return null;
    }

    return (
      <Container kind="row">
        {this.renderCalendar()}
        <Label text=" " />
        {this.renderTable()}
      </Container>
    );
  }
}

/******************************************************************************/
export default CalendarBoards;
