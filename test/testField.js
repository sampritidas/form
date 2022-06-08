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
    field.showPrompt();
    assert.deepStrictEqual(field.showPrompt(), 'Prompt');
  });
});

describe('Field.getEntry', () => {
  it('Should give name and parsed response', () => {
    const alwaysTrue = () => true;
    const field = new Field('', 'name', alwaysTrue, (x) => x);
    field.setResponse('something');

    assert.deepStrictEqual(
      field.getEntry(), ['name', 'something']);
  });
});

describe('Field.isFilled', () => {
  it('Should return true if response not null', () => {
    const alwaysTrue = () => true;
    const field = new Field('', 'name', alwaysTrue, (x) => x);

    field.setResponse('something');
    assert.strictEqual(field.isFilled(), true);
  });

  it('Should return false if response null', () => {
    const alwaysTrue = () => true;
    const field = new Field('', 'name', alwaysTrue, (x) => x);

    assert.strictEqual(field.isFilled(), false);
  });
});