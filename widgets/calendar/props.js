// @ts-check
import {types, addType} from 'goblin-gadgets/types/types.js';
import {propsList} from '../../types/props-list.js';
import {array, object, union} from 'xcraft-core-stones';

/******************************************************************************/

const samplesDates = [
  {value: 'march2019', text: 'March 2019'},
  {value: 'april2019', text: 'April 2019'},
];

const samplesDatesList = {
  march2019: [
    {date: '2019-03-04', type: 'add'},
    {date: '2019-03-05', type: 'add'},
    {date: '2019-03-06', type: 'sub'},
    {date: '2019-03-07', type: 'base'},
    {date: '2019-03-08', type: 'add'},
    {date: '2019-03-21', type: 'add'},
    {date: '2019-03-22', type: 'add'},
    {date: '2019-03-31', type: 'add'},
  ],
  april2019: [
    '2019-04-01',
    '2019-04-02',
    '2019-04-03',
    '2019-04-04',
    '2019-04-05',
    '2019-04-06',
    '2019-04-25',
  ],
};

addType('dataDates', {
  type: union(array, object),
  widget: 'combo',
  restrictsToList: true,
  samples: samplesDates,
  samplesData: samplesDatesList,
});

/******************************************************************************/

const samplesBadges = [
  {value: 'march2019', text: 'March 2019'},
  {value: 'april2019', text: 'April 2019'},
];

const samplesBadgesList = {
  march2019: [
    {date: '2019-03-04', value: '1', color: 'red'},
    {date: '2019-03-12', value: '2', color: 'green'},
    {date: '2019-03-22', value: '3', color: 'red'},
  ],
  april2019: [
    {date: '2019-03-31', value: '!', color: 'red'},
    {date: '2019-04-02', value: '1', color: 'red'},
    {date: '2019-04-03', value: '2', color: 'red'},
    {date: '2019-04-05', value: '3', color: 'red'},
    {date: '2019-04-16', value: '4', color: 'red'},
    {date: '2019-05-01', value: '!', color: 'red'},
  ],
};

addType('dataBadges', {
  type: array,
  widget: 'combo',
  restrictsToList: true,
  samples: samplesBadges,
  samplesData: samplesBadgesList,
});

/******************************************************************************/

export default propsList({
  // Dates.
  ['dates']: {
    startDate: {
      type: types.date,
    },
    endDate: {
      type: types.date,
    },
    visibleDate: {
      type: types.date,
    },
    selectedDate: {
      type: types.date,
    },
    hoverDates: {
      type: types.dataDates,
    },
    dates: {
      type: types.dataDates,
    },
    badges: {
      type: types.dataBadges,
    },
  },

  ['aspect']: {
    // Aspect.
    frame: {
      type: types.boolean,
    },
    shadow: {
      type: types.boolean,
    },
    readonly: {
      type: types.boolean,
    },
    navigator: {
      type: types.enumeration('', 'standard'),
    },
    hideDaysOutOfMonth: {
      type: types.boolean,
    },
    monthCount: {
      type: types.number,
      min: 1,
      max: 4,
    },
    itemsShape: {
      type: types.enumeration('', 'square', 'round'),
    },
    ItemComponent: {
      type: types.function,
    },
    itemWidth: {
      type: types.pixel,
      min: 10,
      max: 100,
    },
    itemHeight: {
      type: types.pixel,
      min: 10,
      max: 100,
    },
    margin: {
      type: types.pixel,
      min: 0,
      max: 50,
    },
  },

  ['events']: {
    // Events.
    visibleDateChanged: {
      type: types.function,
    },
    dateClicked: {
      type: types.function,
    },
    onChangeTips: {
      type: types.function,
    },
  },

  ['tips']: {
    // Tips.
    useTips: {
      type: types.boolean,
    },
    tipsRank: {
      type: types.number,
    },
  },
});
