import React from 'react';
import CronParser from 'cron-parser';
import Form from 'laboratory/form';
import * as Converters from '../helpers/converters';
import * as CronHelpers from '../helpers/cron-helpers';
import * as Bool from '../helpers/boolean-helpers.js';

import Calendar from 'gadgets/calendar/widget';
import LabelTextField from 'gadgets/label-text-field/widget';
import TextFieldTyped from 'gadgets/text-field-typed/widget';
import Button from 'gadgets/button/widget';
import Label from 'gadgets/label/widget';

/******************************************************************************/

function monthCount () {
  return 1; // display 2 months simultaneously
}

function pushCron (result, date, startDate, endDate, cron, deleteList) {
  const year = Converters.getYear (date);
  const month = Converters.getMonth (date);
  var options = {
    currentDate: new Date (year, month - 2, 1),
    endDate: new Date (year, month + monthCount (), 1),
    iterator: true,
  };
  try {
    const interval = CronParser.parseExpression (cron, options);
    /* eslint no-constant-condition: 0 */
    while (true) {
      const next = interval.next ();
      if (next.done) {
        break;
      }
      const itemDate = Converters.jsToCanonicalDate (next.value);
      if (itemDate >= startDate && itemDate <= endDate) {
        const deleted = deleteList.indexOf (itemDate) !== -1;
        const item = {
          Date: itemDate,
          Type: deleted ? 'deleted' : 'default',
        };
        result.push (item);
      }
    }
  } catch (e) {}
}

function getRecurrenceItems (
  date,
  startDate,
  endDate,
  days,
  months,
  deleteList,
  addList
) {
  const result = [];
  if (!startDate) {
    startDate = '2000-01-01';
  }
  if (!endDate) {
    endDate = '2100-12-31';
  }

  if (days && days !== '' && months && months !== '') {
    const cron = CronHelpers.getCron (days, months);
    if (cron) {
      pushCron (result, date, startDate, endDate, cron, deleteList);
    }
  }

  for (var a of addList) {
    if (a >= startDate && a <= endDate) {
      const item = {
        Date: a,
        Type: 'added',
      };
      result.push (item);
    }
  }
  return result;
}

function getRecurrenceItem (date, recurrenceList) {
  for (var item of recurrenceList) {
    if (item.Date === date) {
      return item;
    }
  }
  return {
    Date: date,
    Type: 'none',
  };
}

/******************************************************************************/

class Recurrence extends Form {
  constructor () {
    super (...arguments);

    this.visibleDate = this.props.visibleDate
      ? this.props.visibleDate
      : Converters.getNowCanonicalDate ();

    this.onEraseEvents = this.onEraseEvents.bind (this);
    this.onDateClicked = this.onDateClicked.bind (this);
    this.onVisibleDateChanged = this.onVisibleDateChanged.bind (this);
    this.onSwapExtended = this.onSwapExtended.bind (this);
  }

  static get wiring () {
    return {
      id: 'id',
      order: 'order',
      startDate: 'startDate',
      endDate: 'endDate',
      days: 'days',
      months: 'months',
      deleteList: 'deleteList',
      addList: 'addList',
    };
  }

  get periodInfo () {
    return Converters.getPeriodDescription (
      this.props.startDate,
      this.props.endDate
    );
  }

  get cronInfo () {
    return CronHelpers.getDisplayedCron (
      this.props.days,
      this.props.months,
      this.props.deleteList,
      this.props.addList
    );
  }

  get items () {
    return getRecurrenceItems (
      this.visibleDate,
      this.props.startDate,
      this.props.endDate,
      this.props.days,
      this.props.months,
      this.props.deleteList.toArray (),
      this.props.addList.toArray ()
    );
  }

  get dates () {
    const dates = [];
    for (let item of this.items) {
      if (item.Type === 'default' || item.Type === 'added') {
        dates.push (item.Date);
      }
    }
    return dates;
  }

  get hasExceptions () {
    return this.props.addList.size > 0 || this.props.deleteList.size > 0;
  }

  onDateClicked (date) {
    if (!Bool.isTrue (this.props.readonly)) {
      const item = getRecurrenceItem (date, this.items);
      this.do ('select-date', {date: date, type: item.Type});
    }
  }

  onEraseEvents () {
    this.do ('erase-events');
  }

  onVisibleDateChanged (date) {
    this.visibleDate = date;
  }

  onSwapExtended (recurrenceId) {
    const x = this.props.swapExtended;
    if (x) {
      x (recurrenceId);
    }
  }

  get cursor () {
    if (Bool.isTrue (this.props.readonly)) {
      return 'default';
    } else {
      return 'ns-resize';
    }
  }

  /******************************************************************************/

  renderInfo (extended) {
    const headerInfoClass = this.styles.classNames.headerInfo;
    const headerDragClass = this.styles.classNames.headerDrag;
    return (
      <div className={headerInfoClass}>
        <div className={headerDragClass}>
          <Label
            text={this.periodInfo}
            kind="title-recurrence"
            grow="2"
            cursor={this.cursor}
          />
          <Label
            text={this.cronInfo}
            kind="title-recurrence"
            grow="2"
            cursor={this.cursor}
          />
        </div>
        <Button
          kind="recurrence"
          glyph={extended ? 'caret-up' : 'caret-down'}
          tooltip={
            extended
              ? 'Compacte la récurrence'
              : 'Etend la récurrence pour la modifier'
          }
          active={Bool.toString (extended)}
          activeColor={
            this.context.theme.palette.recurrenceExtendedBoxBackground
          }
          onClick={() => this.onSwapExtended (this.props.id)}
        />
      </div>
    );
  }

  renderEditor (extended) {
    if (extended && !Bool.isTrue (this.props.readonly)) {
      const editorClass = this.styles.classNames.editor;
      return (
        <div className={editorClass}>
          <TextFieldTyped
            type="date"
            selectAllOnFocus="true"
            hintText="Date de début"
            tooltip="Date de début"
            labelText="Du"
            grow="1"
            spacing="large"
            model=".startDate"
          />
          <TextFieldTyped
            type="date"
            selectAllOnFocus="true"
            hintText="Date de fin"
            tooltip="Date de fin"
            labelText="Au"
            grow="1"
            spacing="large"
            model=".endDate"
          />
          <LabelTextField
            selectAllOnFocus="true"
            hintText="Jours de la semaine"
            tooltip="1..7 = lundi..dimanche   - = à   , = et"
            labelText="Jours"
            grow="0.8"
            spacing="large"
            model=".days"
          />
          <LabelTextField
            selectAllOnFocus="true"
            hintText="Mois de l´année"
            tooltip="1..12 = janvier..décembre   - = à   , = et"
            labelText="Mois"
            grow="0.8"
            spacing="large"
            model=".months"
          />
          <Button
            glyph="eraser"
            tooltip="Supprime toutes les exceptions"
            spacing="overlap"
            visibility={Bool.toString (this.hasExceptions)}
            onClick={this.onEraseEvents}
          />
          <Button
            glyph="trash"
            tooltip="Supprime la récurrence"
            onClick={this.props.deleteRecurrence}
          />
        </div>
      );
    } else {
      return null;
    }
  }

  renderCalendar (extended) {
    if (extended) {
      const calClass = this.styles.classNames.calendar;
      return (
        <div className={calClass}>
          <Calendar
            monthCount={monthCount ()}
            navigator="standard"
            visibleDate={this.visibleDate}
            dates={this.dates}
            startDate={this.props.startDate}
            endDate={this.props.endDate}
            dateClicked={this.onDateClicked}
            visibleDateChanged={this.onVisibleDateChanged}
          />
        </div>
      );
    } else {
      return null;
    }
  }

  render () {
    if (!this.props.id) {
      return null;
    }

    const extended = Bool.isTrue (this.props.extended);
    const mainClass = this.styles.classNames.main;

    const initialState = {
      startDate: this.props.startDate,
      endDate: this.props.endDate,
    };

    const Form = this.Form;

    return (
      <div className={mainClass}>
        <Form {...this.formConfig}>
          {this.renderInfo (extended)}
          {this.renderEditor (extended)}
          {this.renderCalendar (extended)}
        </Form>
      </div>
    );
  }
}

/******************************************************************************/
export default Recurrence;
