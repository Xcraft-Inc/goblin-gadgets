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

    this.state = {
      visibleDate: DateConverters.moveAtBeginningOfMonth(
        this.props.selectedDate
      ),
      selectedDate: this.props.selectedDate,
      tableItemId: this.getFirstBoardId(this.props.selectedDate),
    };

    this.dateClicked = this.dateClicked.bind(this);
    this.visibleDateChanged = this.visibleDateChanged.bind(this);
    this.buttonClicked = this.buttonClicked.bind(this);
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

  get tableItemId() {
    return this.state.tableItemId;
  }

  set tableItemId(value) {
    this.setState({
      tableItemId: value,
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

  getFirstBoardId(date) {
    for (const board of this.props.boards) {
      const b = board.toJS();
      if (b.date === date) {
        return b.id;
      }
    }
    return 'create';
  }

  getDetail() {
    for (const board of this.props.boards) {
      const b = board.toJS();
      if (b.id === this.tableItemId) {
        return b.detail;
      }
    }
    return null;
  }

  dateClicked(date) {
    this.selectedDate = date;
    this.tableItemId = this.getFirstBoardId(date);

    if (this.props.onBoardChanged) {
      // FIXME: onBoardChanged provoque un nouveau rendu qui appelle le constucteur de CalendarBoards !!!
      //???? this.props.onBoardChanged(date, null);
    }
  }

  visibleDateChanged(date) {
    this.visibleDate = date;
  }

  buttonClicked(row) {
    this.tableItemId = row;
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

  renderTableItem(board, index) {
    const active = this.tableItemId === board.id;
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
    const active = this.tableItemId === 'create';
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
      const b = board.toJS();
      if (b.date === this.selectedDate) {
        result.push(this.renderTableItem(b, index++));
      }
    }
    result.push(this.renderTableCreate(index++));
    return result;
  }

  renderDetail() {
    return <Label kind="label-field" grow="1" text={this.getDetail()} />;
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
