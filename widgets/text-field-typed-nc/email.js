'use strict';

const T = require('goblin-nabu/widgets/helpers/t.js');

function getDisplayed(canonicalValue) {
  if (!canonicalValue) {
    return null;
  }
  return String(canonicalValue);
}

function parseEdited(editedValue) {
  if (editedValue === null || editedValue === undefined) {
    return {value: null, error: null};
  }

  const value = String(editedValue).trim();
  if (!value) {
    return {value: null, error: null};
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)) {
    return {value, error: T('Adresse e-mail invalide')};
  }

  return {value, error: null};
}

module.exports = {
  getDisplayed,
  parseEdited,
};
