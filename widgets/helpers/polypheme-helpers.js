import {ColorHelpers} from 'electrum-theme';
import * as Converters from '../helpers/converters';

export function getDirectionGlyph (theme, type) {
  const transit = type.endsWith ('-transit');
  const color = ColorHelpers.getMarkColor (theme, type);
  if (type.startsWith ('pick')) {
    if (transit) {
      return {
        glyph: 'plus-square-o',
        color: color,
      };
    } else {
      return {
        glyph: 'plus-square',
        color: color,
      };
    }
  } else if (type.startsWith ('drop')) {
    if (transit) {
      return {
        glyph: 'minus-square-o',
        color: color,
      };
    } else {
      return {
        glyph: 'minus-square',
        color: color,
      };
    }
  } else {
    return {
      glyph: 'square',
      color: color,
    };
  }
}

export function getPackageCount (ticket) {
  if (ticket.Packages) {
    return ticket.Packages.length + 'x';
  } else {
    return '';
  }
}

export function getPackageDescription (ticket) {
  let desc = getPackageCount (ticket);
  if (ticket.Weight) {
    desc += ` — ${ticket.Weight}`;
  }
  if (ticket.Product) {
    desc += ` — ${ticket.Product}`;
  }
  return desc;
}

export function getStatusDescription (ticket) {
  if (ticket.Status === 'pre-dispatched') {
    return 'Pré-dispatché';
  } else if (ticket.Status === 'dispatched') {
    return 'Dispatché';
  } else if (ticket.Status === 'delivered') {
    return 'Livré';
  } else {
    return ticket.Status;
  }
}

export function getPeriod (startTime, endTime) {
  const s = Converters.getDisplayedTime (startTime);
  const e = Converters.getDisplayedTime (endTime);
  if (s === e) {
    return s;
  } else {
    return `${s} — ${e}`;
  }
}
