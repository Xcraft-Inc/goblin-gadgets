'use strict';

const assert = require('assert');
const parseCode = require('../widgets/widget-doc-preview/parse-code.js');

//-----------------------------------------------------------------------------

describe('Test parseCode function', function () {
  it('#Test parseCode string', function () {
    const code = `<Button onClick="alert" textColor="task" 
    shortcut="_ctrl_+A" visibility={true} show="true"/>`;
    const res = parseCode(code);
    assert.deepStrictEqual(res, {
      onClick: 'alert',
      textColor: 'task',
      shortcut: '_ctrl_+A',
      visibility: true,
      show: 'true',
    });
  });

  it('#Test parseCode boolean string', function () {
    const code = `<Button visibility={"true"}/>`;
    const res = parseCode(code);
    assert.deepStrictEqual(res, {
      visibility: 'true',
    });
  });

  it('#Test parseCode boolean', function () {
    const code = `<Button visibility={true} show={true}/>`;
    const res = parseCode(code);
    assert.deepStrictEqual(res, {
      visibility: true,
      show: true,
    });
  });

  it('#Test parseCode number', function () {
    const code = `<Button width={100} height={100}/>`;
    const res = parseCode(code);
    assert.deepStrictEqual(res, {
      width: 100,
      height: 100,
    });
  });

  it('#Test parseCode string, boolean, number and EOF', function () {
    const code = `<Button onClick="alert" textColor="task" 
    shortcut="_ctrl_+A" visibility={true} size={100} show="true"/>`;
    const res = parseCode(code);
    assert.deepStrictEqual(res, {
      onClick: 'alert',
      textColor: 'task',
      shortcut: '_ctrl_+A',
      visibility: true,
      size: 100,
      show: 'true',
    });
  });
});
