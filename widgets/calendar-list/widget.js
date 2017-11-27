import React from 'react';
import PropTypes from 'prop-types';
import Form from 'laboratory/form';
import Widget from 'laboratory/widget';
import {date as DateConverters} from 'xcraft-core-converters';
import * as Bool from 'gadgets/boolean-helpers';

import Label from 'gadgets/label/widget';
import Button from 'gadgets/button/widget';
import Calendar from 'gadgets/calendar/widget';

/******************************************************************************/

class CalendarList extends Form {
  constructor () {
    super (...arguments);

    this.state = {
      showBase: false,
      showAdd: true,
      showSub: true,
    };

    this.onShowBase = this.onShowBase.bind (this);
    this.onShowAdd = this.onShowAdd.bind (this);
    this.onShowSub = this.onShowSub.bind (this);
    this.onDateClicked = this.onDateClicked.bind (this);
  }

  //#region get/set
  get showBase () {
    return this.state.showBase;
  }

  set showBase (value) {
    this.setState ({
      showBase: value,
    });
  }

  get showAdd () {
    return this.state.showAdd;
  }

  set showAdd (value) {
    this.setState ({
      showAdd: value,
    });
  }

  get showSub () {
    return this.state.showSub;
  }

  set showSub (value) {
    this.setState ({
      showSub: value,
    });
  }
  //#endregion

  //#region handlers
  onShowBase () {
    this.showBase = !this.showBase;
  }

  onShowAdd () {
    this.showAdd = !this.showAdd;
  }

  onShowSub () {
    this.showSub = !this.showSub;
  }

  onDateClicked (date) {
    const x = this.props.dateClicked;
    if (x) {
      x (date);
    }
  }
  //#endregion

  get listDates () {
    const array = [];
    if (this.showBase) {
      for (const d of this.props.dates) {
        if (d.type === 'base') {
          array.push (d.date + 'a'); // '2017-11-25a'
        }
      }
    }
    if (this.showAdd) {
      for (const d of this.props.dates) {
        if (d.type === 'add') {
          array.push (d.date + 'b'); // '2017-11-25b'
        }
      }
    }
    if (this.showSub) {
      for (const d of this.props.dates) {
        if (d.type === 'sub') {
          array.push (d.date + 'c'); // '2017-11-25c'
        }
      }
    }
    array.sort (); // sort mixing base/add/sub dates

    const result = [];
    for (const d of array) {
      const lastLetter = d[d.length - 1];
      let type = 'base';
      if (lastLetter === 'b') {
        type = 'add';
      }
      if (lastLetter === 'c') {
        type = 'sub';
      }
      const date = d.substring (0, d.length - 1); // remove last letter
      result.push ({type, date});
    }
    return result;
  }

  renderItem (type, date) {
    const dd = DateConverters.getDisplayed (date, 'dMy,W');
    let glyph = 'check-square';
    if (type === 'add') {
      glyph = 'plus';
    } else if (type === 'sub') {
      glyph = 'minus';
    }
    return (
      <Button
        kind="calendar-list"
        subkind={type}
        justify="left"
        active="true"
        glyph={glyph}
        text={dd}
        onClick={() => this.onDateClicked (date)}
      />
    );
  }

  renderItems () {
    const result = [];
    for (const date of this.listDates) {
      result.push (this.renderItem (date.type, date.date));
    }
    return result;
  }

  renderButtons () {
    const buttonsClass = this.styles.classNames.buttons;
    return (
      <div className={buttonsClass}>
        <Button
          kind="calendar-list"
          subkind="base"
          active={this.showBase ? 'true' : 'false'}
          glyph={this.showBase ? 'eye' : 'eye-slash'}
          text="Rég"
          tooltip="Dates régulières"
          grow="1"
          spacing="overlap"
          onClick={this.onShowBase}
        />
        <Button
          kind="calendar-list"
          subkind="add"
          active={this.showAdd ? 'true' : 'false'}
          glyph={this.showAdd ? 'eye' : 'eye-slash'}
          text="Ajouts"
          tooltip="Dates ajoutées"
          grow="1"
          spacing="overlap"
          onClick={this.onShowAdd}
        />
        <Button
          kind="calendar-list"
          subkind="sub"
          active={this.showSub ? 'true' : 'false'}
          glyph={this.showSub ? 'eye' : 'eye-slash'}
          text="Supp"
          tooltip="Dates supprimées"
          grow="1"
          spacing="overlap"
          onClick={this.onShowSub}
        />
        <Button
          kind="calendar"
          glyph="trash"
          tooltip="Supprime toutes les exceptions"
        />
      </div>
    );
  }

  render () {
    const boxClass = this.styles.classNames.box;
    const listClass = this.styles.classNames.list;
    return (
      <div className={boxClass}>
        {this.renderButtons ()}
        <div className={listClass}>
          {this.renderItems ()}
        </div>
      </div>
    );
  }
}

/******************************************************************************/
export default CalendarList;
