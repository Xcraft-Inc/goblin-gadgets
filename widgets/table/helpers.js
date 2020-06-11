const {date, time, price, number, integer} = require('xcraft-core-converters');
const DateConverters = date;
const TimeConverters = time;
const PriceConverters = price;
const NumberConverters = number;
const IntegerConverters = integer;

/******************************************************************************/

function getFilterContent(row, columnName, type) {
  let content = row.get(columnName);
  switch (type) {
    case 'date':
      content = DateConverters.getDisplayed(content);
      break;
    case 'time':
      content = TimeConverters.getDisplayed(content);
      break;
    case 'price':
      content = PriceConverters.getDisplayed(content);
      break;
    case 'number':
      content = NumberConverters.getDisplayed(content);
      break;
    case 'integer':
      content = IntegerConverters.getDisplayed(content);
      break;
  }
  return typeof content === 'string' ? content.toUpperCase() : '';
}

function filterRow(row, header, filter) {
  for (const column of header) {
    const columnName = column.get('name');
    const type = column.get('type');
    const content = getFilterContent(row, columnName, type);
    if (content.includes(filter)) {
      return true;
    }
  }
  return false;
}

function filter(rows, header, filter) {
  if (!filter || filter === '') {
    return rows;
  } else {
    return rows.filter((row) => filterRow(row, header, filter.toUpperCase()));
  }
}

/******************************************************************************/

function getSortingColumn(row, columnName, type) {
  let content = row.get(columnName);
  if (type === 'price') {
    const i = parseInt(content);
    if (isNaN(i) || !content) {
      content = Number.MIN_SAFE_INTEGER;
    } else {
      content = i;
    }
  } else {
    content = typeof content === 'string' ? content.toUpperCase() : '';
  }
  return content;
}

function getColumnType(header, columnName) {
  for (const column of header) {
    if (column.get('name') === columnName) {
      return column.get('type');
    }
  }
  return null;
}

function sort(rows, header, sortingColumns) {
  if (sortingColumns) {
    return rows.sort(function (a, b) {
      for (let columnName of sortingColumns) {
        let e = 1;
        if (columnName.startsWith('!')) {
          columnName = columnName.substring(1);
          e = -1;
        }
        const type = getColumnType(header, columnName);
        const ka = getSortingColumn(a, columnName, type);
        const kb = getSortingColumn(b, columnName, type);
        if (ka < kb) {
          return -e;
        } else if (ka > kb) {
          return e;
        }
      }
      return 0;
    });
  } else {
    return rows;
  }
}

/******************************************************************************/

// Recursively traverses rows to generate a flat list containing levels.
function flatten(list, rows, level) {
  for (let i = 0; i < rows.size; i++) {
    const row = rows.get(i);
    const horizontalSeparator = row.get('horizontalSeparator');
    list.push({
      row: row,
      level: level,
      topSeparator:
        horizontalSeparator === 'up' ||
        horizontalSeparator === 'top' ||
        horizontalSeparator === 'both',
      bottomSeparator:
        horizontalSeparator === 'down' ||
        horizontalSeparator === 'bottom' ||
        horizontalSeparator === 'both',
    });

    const subRows = row.get('rows');
    if (subRows) {
      flatten(list, subRows, level + 1);
    }
  }
}

// Distributes the adjacent line separators.
// An upper horizontal separator must be mentioned as a lower separator in the previous line.
// A lower horizontal separator must be mentioned as upper separator in the following line.
// When a row is drawn, it is always only its top separator that is drawn.
function diffuseSeparators(list) {
  for (let i = 0; i < list.length; i++) {
    const prev = i > 0 ? list[i - 1] : null;
    const current = list[i];
    const next = i < list.length - 1 ? list[i + 1] : null;

    if (prev && current.topSeparator) {
      prev.bottomSeparator = true;
    }

    if (next && current.bottomSeparator) {
      next.topSeparator = true;
    }

    current.isLast = i === list.length - 1; // Is this the last line of the table?
    current.index = i;
  }
}

/******************************************************************************/

module.exports = {
  sort,
  filter,
  flatten,
  diffuseSeparators,
};
