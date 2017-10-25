const BigNumber = require ('bignumber.js');

const displayedFormat = {
  decimalSeparator: '.',
  groupSeparator: "'",
  groupSize: 3,
  secondaryGroupSize: 0,
  fractionGroupSeparator: ' ',
  fractionGroupSize: 0,
};

const parseFormat = {
  decimalSeparator: '.',
  groupSeparator: '',
  groupSize: 0,
  secondaryGroupSize: 0,
  fractionGroupSeparator: ' ',
  fractionGroupSize: 0,
};

// With price = '1234.5', return "1'234.50".
export function getDisplayed (price, format) {
  if (!price) {
    return null;
  }

  BigNumber.config ({FORMAT: displayedFormat, ERRORS: false});

  const x = new BigNumber (price);
  return x.toFormat (2); // 2 decimals
}

// With editedPrice = '12.666', return '12.67'.
export function parseEdited (editedPrice) {
  if (!editedPrice || editedPrice === '') {
    return {value: null, error: null};
  }

  BigNumber.config ({FORMAT: parseFormat, DECIMAL_PLACES: 2, ERRORS: false});

  editedPrice = editedPrice.replace (/ |'|/g, ''); // remove spaces and quotes
  const x = new BigNumber (editedPrice, 10); // base 10 for rounding to 2 decimals
  if (x.isNaN ()) {
    return {value: null, error: 'Montant incorrect'};
  } else {
    return {value: x.toString (), error: null};
  }
}
