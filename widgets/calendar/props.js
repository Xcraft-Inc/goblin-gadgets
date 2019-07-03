import {types, addType} from 'goblin-gadgets/types/types.js';
import PropTypes from 'prop-types';

/******************************************************************************/

const samplesDates = [
  {id: 'march2019', text: 'March 2019'},
  {id: 'april2019', text: 'April 2019'},
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
    '2019-04-25',
  ],
};

addType('dataDates', {
  type: 'dataDates',
  widget: 'combo',
  restrictsToList: true,
  samples: samplesDates,
  samplesData: samplesDatesList,
  propType: PropTypes.array,
});

/******************************************************************************/

const samplesBadges = [
  {id: 'march2019', text: 'March 2019'},
  {id: 'april2019', text: 'April 2019'},
];

const samplesBadgesList = {
  march2019: [
    {date: '2019-03-04', value: '1', color: 'red'},
    {date: '2019-03-12', value: '2', color: 'green'},
    {date: '2019-03-22', value: '3', color: 'red'},
  ],
  april2019: [
    {date: '2019-03-31', value: '1', color: 'red'},
    {date: '2019-04-02', value: '1', color: 'red'},
    {date: '2019-04-03', value: '2', color: 'red'},
    {date: '2019-04-05', value: '3', color: 'red'},
    {date: '2019-04-16', value: '4', color: 'red'},
    {date: '2019-05-01', value: '1', color: 'red'},
  ],
};

addType('dataBadges', {
  type: 'dataBadges',
  widget: 'combo',
  restrictsToList: true,
  samples: samplesBadges,
  samplesData: samplesBadgesList,
  propType: PropTypes.array,
});

/******************************************************************************/

export default [
  // Dates.
  {
    name: 'startDate',
    group: 'dates',
    type: types.date,
  },
  {
    name: 'endDate',
    group: 'dates',
    type: types.date,
  },
  {
    name: 'visibleDate',
    group: 'dates',
    type: types.date,
  },
  {
    name: 'dates',
    group: 'dates',
    type: types.dataDates,
  },
  {
    name: 'badges',
    group: 'dates',
    type: types.dataBadges,
  },

  // Aspect.
  {
    name: 'frame',
    group: 'aspect',
    type: types.bool,
  },
  {
    name: 'readonly',
    group: 'aspect',
    type: types.bool,
  },
  {
    name: 'navigator',
    group: 'aspect',
    type: types.bool,
  },
  {
    name: 'hideDaysOutOfMonth',
    group: 'aspect',
    type: types.bool,
  },
  {
    name: 'monthCount',
    group: 'aspect',
    type: types.number,
  },

  // Events.
  {
    name: 'visibleDateChanged',
    group: 'events',
    type: types.function,
  },
  {
    name: 'dateClicked',
    group: 'events',
    type: types.function,
  },
];
