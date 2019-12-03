//T:2019-02-27
import T from 't';
import React from 'react';
import Form from 'goblin-laboratory/widgets/form';
import {date as DateConverters} from 'xcraft-core-converters';
import * as Bool from 'gadgets/helpers/bool-helpers';

import Button from 'goblin-gadgets/widgets/button/widget';

/******************************************************************************/

class CalendarList extends Form {
  constructor() {
    super(...arguments);

    this.state = {
      showBase: false,
      showAdd: true,
      showSub: true,
    };

    this.onShowBase = this.onShowBase.bind(this);
    this.onShowAdd = this.onShowAdd.bind(this);
    this.onShowSub = this.onShowSub.bind(this);
    this.onDateClicked = this.onDateClicked.bind(this);
    this.onFlushAdd = this.onFlushAdd.bind(this);
  }

  //#region get/set
  get showBase() {
    return this.state.showBase;
  }

  set showBase(value) {
    this.setState({
      showBase: value,
    });
  }

  get showAdd() {
    return this.state.showAdd;
  }

  set showAdd(value) {
    this.setState({
      showAdd: value,
    });
  }

  get showSub() {
    return this.state.showSub;
  }

  set showSub(value) {
    this.setState({
      showSub: value,
    });
  }
  //#endregion

  //#region handlers
  onShowBase() {
    this.showBase = !this.showBase;
  }

  onShowAdd() {
    this.showAdd = !this.showAdd;
  }

  onShowSub() {
    this.showSub = !this.showSub;
  }

  onDateClicked(date) {
    const x = this.props.dateClicked;
    if (x) {
      x(date);
    }
  }

  onFlushAdd() {
    const x = this.props.flushAdd;
    if (x) {
      x();
    }
  }
  //#endregion

  get hasAdd() {
    for (const d of this.props.dates) {
      if (d.type === 'add' || d.type === 'sub') {
        return true;
      }
    }
    return false;
  }

  get listDates() {
    const array = [];
    for (const d of this.props.dates) {
      if (this.showBase && d.type === 'base') {
        array.push(d.date + 'a'); // '2017-11-25a'
      }
      if (this.showAdd && d.type === 'add') {
        array.push(d.date + 'b'); // '2017-11-25b'
      }
      if (this.showSub && d.type === 'sub') {
        array.push(d.date + 'c'); // '2017-11-25c'
      }
    }
    array.sort(); // sort mixing base/add/sub dates

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
      const date = d.substring(0, d.length - 1); // remove last letter
      result.push({type, date});
    }
    return result;
  }

  renderItem(type, date, index) {
    const dd = DateConverters.getDisplayed(date, 'dMy,W');
    let glyph = 'solid/check-square';
    if (type === 'add') {
      glyph = 'solid/plus';
    } else if (type === 'sub') {
      glyph = 'solid/minus';
    }
    return (
      <Button
        key={index}
        kind="calendar-list"
        subkind={type}
        justify="left"
        active="true"
        glyph={glyph}
        text={dd}
        onClick={() => this.onDateClicked(date)}
      />
    );
  }

  renderItems() {
    const result = [];
    let index = 0;
    for (const date of this.listDates) {
      result.push(this.renderItem(date.type, date.date, index++));
    }
    return result;
  }

  renderButtons() {
    const buttonsClass = this.styles.classNames.buttons;
    return (
      <div className={buttonsClass}>
        <Button
          kind="calendar-list"
          subkind="base"
          active={this.showBase ? 'true' : 'false'}
          text={T('Régul.')}
          tooltip={T('Montre ou cache les dates régulières')}
          grow="1"
          horizontalSpacing="overlap"
          onClick={this.onShowBase}
        />
        <Button
          kind="calendar-list"
          subkind="add"
          active={this.showAdd ? 'true' : 'false'}
          text={T('Ajouts')}
          tooltip={T('Montre ou cache les dates ajoutées')}
          grow="1"
          horizontalSpacing="overlap"
          onClick={this.onShowAdd}
        />
        <Button
          kind="calendar-list"
          subkind="sub"
          active={this.showSub ? 'true' : 'false'}
          text={T('Supp.')}
          tooltip={T('Montre ou cache les dates supprimées')}
          grow="1"
          horizontalSpacing="overlap"
          onClick={this.onShowSub}
        />
        <Button
          kind="calendar-navigator"
          glyph="solid/trash"
          tooltip={T('Supprime toutes les exceptions')}
          disabled={!this.hasAdd || Bool.isTrue(this.props.readonly)}
          onClick={this.onFlushAdd}
        />
      </div>
    );
  }

  render() {
    const boxClass = this.styles.classNames.box;
    const listClass = this.styles.classNames.list;
    return (
      <div className={boxClass}>
        {this.renderButtons()}
        <div className={listClass}>{this.renderItems()}</div>
      </div>
    );
  }
}

/******************************************************************************/
export default CalendarList;
