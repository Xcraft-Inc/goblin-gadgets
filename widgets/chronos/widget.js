import React from 'react';
import ReactDOM from 'react-dom';
import Form from 'laboratory/form';
import {Unit} from 'electrum-theme';
import * as Converters from '../helpers/converters';
import * as Bool from '../helpers/boolean-helpers.js';

import Button from 'gadgets/button/widget';
import Label from 'gadgets/label/widget';
import Container from 'gadgets/container/widget';
import DragCab from 'gadgets/drag-cab/widget';
import Badge from 'gadgets/badge/widget';
import ChronoLine from 'gadgets/chrono-line/widget';

/******************************************************************************/

function getSortingKey (event) {
  if (event.fromDate && event.fromTime) {
    return event.fromDate + ' ' + event.fromTime;
  } else if (event.fromDate && event.startFromTime) {
    return event.fromDate + ' ' + event.startFromTime;
  } else {
    return 'zzz'; // to end
  }
}

function getFlatEvents (events, filters) {
  const lines = [];
  const groups = new Map ();
  var lastGroup = null;
  var hasDates = false;
  var notesCount = 0;
  var minHour = 8;
  var maxHour = 18;
  events.linq
    .select (e => e.toJS ())
    .orderBy (event => getSortingKey (event))
    .forEach (event => {
      hasDates = event.fromDate || event.startFromDate;
      let group;
      if (hasDates) {
        if (event.startFromDate) {
          group = event.startFromDate;
        } else {
          group = event.fromDate;
        }
      } else {
        group = event.group;
      }
      if (filters.length === 0 || filters.indexOf (group) !== -1) {
        if (!lastGroup || lastGroup !== group) {
          if (lastGroup) {
            lines.push ({type: 'sep'});
          }
          lines.push ({
            type: 'top',
            date: event.fromDate,
            group: event.group,
          });
          lastGroup = group;
        }
        lines.push ({type: 'event', event: event});

        if (event.fromTime) {
          minHour = Math.min (
            minHour,
            Converters.splitTime (event.fromTime).hour - 1
          );
        }
        if (event.startFromTime) {
          minHour = Math.min (
            minHour,
            Converters.splitTime (event.startFromTime).hour - 1
          );
        }
        if (event.toTime) {
          maxHour = Math.max (
            maxHour,
            Converters.splitTime (event.toTime).hour + 1
          );
        }
        if (event.endToTime) {
          maxHour = Math.max (
            maxHour,
            Converters.splitTime (event.endToTime).hour + 1
          );
        }

        var noteCount = 0;
        if (event.note) {
          noteCount = 1;
        } else if (event.notes) {
          noteCount = event.notes.length;
        }
        notesCount = Math.max (notesCount, noteCount);

        if (!groups.has (group)) {
          groups.set (group, 0);
        }
        const n = groups.get (group);
        groups.set (group, n + 1);
      }
    });

  const g = [];
  const n = [];
  for (var group of groups) {
    g.push (group[0]);
    n.push (group[1]);
  }

  return {
    hasDates: hasDates,
    groups: g,
    count: n,
    lines: lines,
    notesCount: notesCount,
    minHour: Math.max (minHour, 0),
    maxHour: Math.min (maxHour + 1, 24),
  };
}

/******************************************************************************/

function updateHover (event, state) {
  for (let line of window.document.chronoLines) {
    if (line.props.event === event) {
      line.hover = state;
    } else if (
      event.link &&
      line.props.event.link &&
      event.link === line.props.event.link
    ) {
      line.hover = state;
    }
  }
}

/******************************************************************************/

function filtersGet (filters, key) {
  if (filters.length === 0) {
    return true;
  } else {
    return filters.indexOf (key) !== -1;
  }
}

function filtersSet (filters, key, state) {
  if (state) {
    filters.push (key); // add key
  } else {
    const i = filters.indexOf (key);
    filters.splice (i, 1); // delete key
  }
}

function filtersFlush (filters) {
  filters.splice (0, filters.length);
}

/******************************************************************************/

class Chronos extends Form {
  constructor () {
    super (...arguments);

    this.state = {
      filters: [],
    };

    this.onMouseOver = this.onMouseOver.bind (this);
    this.onMouseOut = this.onMouseOut.bind (this);
    this.onDragEnding = this.onDragEnding.bind (this);
    this.onActionAll = this.onActionAll.bind (this);
    this.onActionFilter = this.onActionFilter.bind (this);
    this.onActionPrevFilter = this.onActionPrevFilter.bind (this);
    this.onActionNextFilter = this.onActionNextFilter.bind (this);
  }

  static get wiring () {
    return {
      id: 'id',
      chronos: 'chronos',
    };
  }

  get filters () {
    return this.state.filters;
  }

  set filters (value) {
    this.setState ({
      filters: value,
    });
    this.updateFilter ();
  }

  updateFilter () {
    const events = this.shred (this.props.chronos);
    this.flatEvents = getFlatEvents (events, []);

    if (this.filters.length === 0) {
      // show all events ?
      this.flatFilteredEvents = this.flatEvents;
    } else {
      // has filter ?
      this.flatFilteredEvents = getFlatEvents (events, this.filters);
    }
  }

  onMouseOver (event) {
    updateHover (event, true);
  }

  onMouseOut (event) {
    updateHover (event, false);
  }

  onDragEnding (selectedIds, toId, ownerId, ownerKind) {
    const x = this.props.dragEnding;
    if (x) {
      x (selectedIds, toId, ownerId, ownerKind);
    }
  }

  onActionAll () {
    //this.filters = [];
    const filters = this.filters;
    filtersFlush (filters);
    this.filters = filters.slice ();
  }

  onActionFilter (e, date) {
    const filters = this.filters;
    if (e.ctrlKey) {
      if (filtersGet (filters, date)) {
        if (filters.length === 0) {
          for (var i = 0; i < this.flatEvents.groups.length; i++) {
            const group = this.flatEvents.groups[i];
            filtersSet (filters, group, true);
          }
        }
        filtersSet (filters, date, false);
      } else {
        filtersSet (filters, date, true);
      }
    } else {
      filtersFlush (filters);
      filtersSet (filters, date, true);
    }
    this.filters = filters.slice ();
  }

  onActionPrevFilter () {
    const filters = this.filters;
    if (filters.length === 1) {
      const index = this.flatEvents.groups.indexOf (filters[0]);
      if (index !== -1 && index > 0) {
        const newDate = this.flatEvents.groups[index - 1];

        const filters = this.filters;
        filtersFlush (filters);
        filtersSet (filters, newDate, true);
        this.filters = filters.slice ();
      }
    }
  }

  onActionNextFilter () {
    const filters = this.filters;
    if (filters.length === 1) {
      const index = this.flatEvents.groups.indexOf (filters[0]);
      if (index !== -1 && index < this.flatEvents.groups.length - 1) {
        const newDate = this.flatEvents.groups[index + 1];

        const filters = this.filters;
        filtersFlush (filters);
        filtersSet (filters, newDate, true);
        this.filters = filters.slice ();
      }
    }
  }

  /******************************************************************************/

  renderNavigationButton (
    glyph,
    text,
    count,
    tooltip,
    disabled,
    active,
    onAction,
    index
  ) {
    return (
      <Button
        key={index}
        kind="chronos-navigator"
        subkind={count ? 'with-badge' : null}
        glyph={glyph}
        text={text}
        tooltip={tooltip}
        border="none"
        disabled={Bool.toString (disabled)}
        active={Bool.toString (active)}
        onClick={onAction}
      >
        {count ? <Badge value={count} kind="chronos-count" /> : null}
      </Button>
    );
  }

  renderNavigationButtons () {
    const result = [];
    const filters = this.filters;
    let index = 0;

    result.push (
      this.renderNavigationButton (
        null,
        'Tout',
        null,
        null,
        false,
        filters.length === 0,
        this.onActionAll,
        index++
      )
    );

    result.push (
      this.renderNavigationButton (
        'chevron-up',
        null,
        null,
        null,
        filters.length !== 1,
        false,
        this.onActionPrevFilter,
        index++
      )
    );

    for (var i = 0; i < this.flatEvents.groups.length; i++) {
      const group = this.flatEvents.groups[i];
      const count = this.flatEvents.count[i];
      var text, tooltip;
      if (this.flatEvents.hasDates) {
        text = Converters.getDisplayedDate (group);
        tooltip = Converters.getDisplayedDate (group, 'W');
      } else {
        text = group;
        tooltip = null;
      }
      const x = group; // necessary, but strange !

      result.push (
        this.renderNavigationButton (
          null,
          text,
          count,
          tooltip,
          false,
          filtersGet (filters, x),
          e => this.onActionFilter (e, x),
          index++
        )
      );
    }

    result.push (
      this.renderNavigationButton (
        'chevron-down',
        null,
        null,
        null,
        filters.length !== 1,
        false,
        this.onActionNextFilter,
        index++
      )
    );

    return result;
  }

  renderNavigation () {
    if (this.props.navigation === 'hidden') {
      return null;
    } else {
      const navigationClass = this.styles.classNames.navigation;
      return (
        <div className={navigationClass}>
          {this.renderNavigationButtons ()}
        </div>
      );
    }
  }

  renderTime (start, width, time, index) {
    const style = {
      position: 'absolute',
      top: '0px',
      height: '100%',
      left: start,
      width: width,
      userSelect: 'none',
    };
    const text = time
      ? Converters.getDisplayedTime (Converters.addSeconds (time, 1), 'h')
      : '';

    return (
      <div style={style} key={index}>
        <Label
          kind="compact"
          text={text}
          justify="center"
          textColor="#fff"
          grow="1"
          wrap="no"
          height="100%"
        />
      </div>
    );
  }

  /******************************************************************************/

  renderContentTopTimes () {
    const result = [];
    let index = 0;
    const minHour = this.flatFilteredEvents.minHour;
    const maxHour = this.flatFilteredEvents.maxHour;
    const lenHour = maxHour - minHour;
    for (var h = minHour + 1; h < maxHour; h++) {
      const width = 100 / lenHour;
      const start = (h - minHour) * 100 / lenHour - width / 2;
      const time = Converters.getTimeFromMinutes (h * 60);
      result.push (this.renderTime (start + '%', width + '%', time, index++));
    }
    return result;
  }

  renderContentTop (text, ownerId, index) {
    const topClass = this.styles.classNames.top;
    const topLabelClass = this.styles.classNames.topLabel;
    const topEventClass = this.styles.classNames.topEvent;

    const width = Unit.add (
      this.props.lineWidth,
      this.context.theme.shapes.chronosSeparatorWidth
    );

    // FIXME: it's a bad idea to mutate the styles in the render, see styles.js
    const topLabelStyle = Object.assign ({}, this.styles.props.topLabel);

    topLabelStyle.width = Unit.sub (
      Unit.multiply (width, this.flatFilteredEvents.notesCount),
      this.context.theme.shapes.chronosLabelMargin
    );

    // The use of "data-owner-id" sets a property "ownerId" accessed later by "node.dataset.ownerId".
    // Don't rename "data-owner-id" to "dataOwnerId" !
    return (
      <div className={topClass} key={index} data-owner-id={ownerId}>
        <div className={topLabelClass} style={topLabelStyle}>
          <Label text={text} textColor="#fff" grow="1" />
        </div>
        <div className={topEventClass}>
          {this.renderContentTopTimes ()}
        </div>
      </div>
    );
  }

  renderContentEvent (event, index) {
    return (
      <DragCab
        key={index}
        dragController={this.props.dragController}
        direction="vertical"
        color={this.context.theme.palette.dragAndDropHover}
        thickness={this.context.theme.shapes.dragAndDropTicketThickness}
        mode="corner-top-left"
        dragOwnerId={event.id}
        doClickAction={this.onClickAction}
        doDragEnding={this.onDragEnding}
      >
        <ChronoLine
          id={event.id}
          event={event}
          lineWidth={this.props.lineWidth}
          glyphWidth={this.props.glyphWidth}
          notesCount={this.flatFilteredEvents.notesCount}
          minHour={this.flatFilteredEvents.minHour}
          maxHour={this.flatFilteredEvents.maxHour}
          mouseOver={this.onMouseOver}
          mouseOut={this.onMouseOut}
        />
      </DragCab>
    );
  }

  renderContentSep (ownerId, index) {
    // The use of "data-owner-id" sets a property "ownerId" accessed later by "node.dataset.ownerId".
    // Don't rename "data-owner-id" to "dataOwnerId" !
    const sepClass = this.styles.classNames.sep;
    return <div className={sepClass} key={index} data-owner-id={ownerId} />;
  }

  renderEventsList () {
    const result = [];
    let index = 0;
    let ownerId = null;
    for (var item of this.flatFilteredEvents.lines) {
      if (item.type === 'top') {
        var text;
        if (item.date) {
          text = Converters.getDisplayedDate (item.date, 'Wdmy');
        } else {
          text = item.group;
        }
        result.push (this.renderContentTop (text, ownerId, index++));
      } else if (item.type === 'event') {
        result.push (this.renderContentEvent (item.event, index++));
        ownerId = item.event.groupId;
      } else if (item.type === 'sep') {
        result.push (this.renderContentSep (ownerId, index++));
      }
    }
    return result;
  }

  renderEvents () {
    return (
      <Container
        kind="chronos-events"
        dragController={this.props.dragController}
        dragSource={this.props.dragSource}
        dragMode={this.props.dragMode}
        dragOwnerId={this.props.id}
        viewParentId={this.props.viewParentId}
      >
        {this.renderEventsList ()}
      </Container>
    );
  }

  render () {
    if (!this.props.id) {
      return null;
    }

    this.updateFilter ();

    const mainClass = this.styles.classNames.main;
    const Form = this.Form;

    return (
      <Form
        {...this.formConfigWithComponent (() => (
          <div className={mainClass}>
            {this.renderNavigation ()}
            {this.renderEvents ()}
          </div>
        ))}
      />
    );
  }
}

/******************************************************************************/
export default Chronos;
