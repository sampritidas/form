const { Field } = require("../src/field");
const { Form } = require("../src/form");
const assert = require('assert');

describe('Form.isResponseValid', () => {
  it('Should throw error if response not valid', () => {
    const alwaysTrue = () => false;
    const identity = x => false;

    const nameField = new Field('Name', 'name', alwaysTrue, identity);
    const form = new Form();

    form.registerField(nameField);

    assert.throws(() => {
      form.isResponseValid('Something')
    }, { message: 'Invalid Response' });
  });

  it('Should return true if response valid', () => {
    const alwaysTrue = () => true;
    const identity = x => x;

    const nameField = new Field('Name', 'name', alwaysTrue, identity);
    const form = new Form();

    form.registerField(nameField);
    assert.strictEqual(form.isResponseValid('Something'), true);
  });
});

describe('Field.hasRemainingFields', () => {
  it('Should return true if any field null', () => {
    const alwaysTrue = () => true;
    const identity = x => x;

    const nameField = new Field('Name', 'name', alwaysTrue, identity);
    const form = new Form();

    form.registerField(nameField);
    assert.strictEqual(form.hasRemainingFields(), true);
  });
});

describe('Field.getResponses', () => {
  it('Should return object of name and response ', () => {
    const alwaysTrue = () => true;
    const identity = x => x;

    const nameField = new Field('Name', 'name', alwaysTrue, identity);
    const form = new Form();

    form.registerField(nameField);
    form.isResponseValid('Something');

    assert.deepStrictEqual(form.getResponses(), { name: null });
  });
});

describe('Field.showCurrentField', () => {
  it('message', () => {
    const alwaysTrue = () => true;
    const identity = x => x;

    const nameField = new Field('Name', 'name', alwaysTrue, identity);
    const form = new Form();

    form.registerField(nameField);
    form.isResponseValid('Something');
    assert.strictEqual(form.showCurrentField(), 'Name');
  });
});
