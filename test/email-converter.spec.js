'use strict';

const assert = require('assert');
const EmailConverters = require('../widgets/text-field-typed-nc/email.js');

describe('email converter', function () {
  it('accepts and trims a valid email address', function () {
    assert.deepStrictEqual(
      EmailConverters.parseEdited('  user+pod@example.com  '),
      {value: 'user+pod@example.com', error: null}
    );
  });

  it('accepts an empty optional value', function () {
    assert.deepStrictEqual(EmailConverters.parseEdited(''), {
      value: null,
      error: null,
    });
  });

  it('rejects invalid email addresses', function () {
    const result = EmailConverters.parseEdited('invalid-address');
    assert.strictEqual(result.value, 'invalid-address');
    assert(result.error);
  });
});
