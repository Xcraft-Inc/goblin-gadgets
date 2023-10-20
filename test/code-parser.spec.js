'use strict';

const assert = require('assert');
const parseCode = require('../widgets/widget-doc-preview/parse-code.js');

//-----------------------------------------------------------------------------

describe('goblin.gadgets', function () {
  describe('parseCode function', function () {
    it('parseCode string', function () {
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

    it('parseCode boolean string', function () {
      const code = `<Button visibility={"true"}/>`;
      const res = parseCode(code);
      assert.deepStrictEqual(res, {
        visibility: 'true',
      });
    });

    it('parseCode other string', function () {
      const code = `<Button text='hello "world"'/>`;
      const res = parseCode(code);
      assert.deepStrictEqual(res, {
        text: 'hello "world"',
      });
    });

    it('parseCode boolean', function () {
      const code = `<Button visibility={true} show={true}/>`;
      const res = parseCode(code);
      assert.deepStrictEqual(res, {
        visibility: true,
        show: true,
      });
    });

    it('parseCode number', function () {
      const code = `<Button width={100} height={100}/>`;
      const res = parseCode(code);
      assert.deepStrictEqual(res, {
        width: 100,
        height: 100,
      });
    });

    it('parseCode string, boolean, number and EOF', function () {
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
});
