const { Field } = require("../src/field");
const assert = require('assert');

describe('Field.isValid', () => {
  it('Should give boolean on validation', () => {
    const alwaysTrue = () => true;
    const field = new Field('', '', alwaysTrue, (x) => x);
    field.isValid('anything')
    assert.strictEqual(field.isValid('anything'), true);
  });
});

describe('Field.showPrompt', () => {
  it('Should give current prompt line', () => {
    const alwaysTrue = () => true;
    const field = new Field('Prompt', '', alwaysTrue, (x) => x);

    const logs = [];
    const mockLog = (logs) => {
      return function (response) {
        logs.push(response);
      }
    }
    const logger = mockLog(logs);

    field.showPrompt(logger);
    assert.deepStrictEqual(logs, ['Prompt']);
  });
});

describe('Field.parseResponse', () => {
  it('Should parse a response based on given parser', () => {
    const notEmpty = (x) => x;
    const field = new Field('', '', '', notEmpty);

    assert.strictEqual(field.parseResponse('One'), 'One');
  });
});