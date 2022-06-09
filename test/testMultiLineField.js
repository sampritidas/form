const { MultiLineField } = require("../src/mutliLineField");
const assert = require('assert');

describe('MultiLineField.isFilled', () => {
  it('Should give false if not all filled', () => {
    const notEmpty = (elements) => elements.length > 0;
    const concat = (elements) => elements.join('\n');

    const prompts = ['Enter address line 1', 'Enter address line 2'];
    const field = new MultiLineField(prompts, 'address', notEmpty, concat);

    field.setResponse('add1');
    assert.strictEqual(field.isFilled(), false);
  });

  it('Should give true if all filled', () => {
    const notEmpty = (elements) => elements.length > 0;
    const concat = (elements) => elements.join('\n');

    const prompts = ['Enter address line 1', 'Enter address line 2'];
    const field = new MultiLineField(prompts, 'address', notEmpty, concat);

    field.setResponse('add1');
    field.setResponse('add2');
    assert.strictEqual(field.isFilled(), true);
  });
});

describe('MultiLineField.isValid', () => {
  it('Should valid response by validator', () => {
    const notEmpty = (elements) => elements.length > 0;
    const concat = (elements) => elements.join('\n');

    const prompts = ['Enter address line 1', 'Enter address line 2'];
    const field = new MultiLineField(prompts, 'address', notEmpty, concat);

    assert.strictEqual(field.isValid('something'), true);
  });

  it('Should not valid response and return false', () => {
    const notEmpty = (elements) => elements.length > 0;
    const concat = (elements) => elements.join('\n');

    const prompts = ['Enter address line 1', 'Enter address line 2'];
    const field = new MultiLineField(prompts, 'address', notEmpty, concat);

    assert.strictEqual(field.isValid(''), false);
  });
});

describe('MultiLineField.showPrompt', () => {
  it('Should show cuurent prompt', () => {
    const notEmpty = (elements) => elements.length > 0;
    const concat = (elements) => elements.join('\n');

    const prompts = ['line 1', 'line 2'];
    const field = new MultiLineField(prompts, 'address', notEmpty, concat);

    assert.strictEqual(field.showPrompt(), 'line 1');
  });
});

describe('suitMultiLineField.getEntry', () => {
  it('Should give entry of two fields', () => {
    const notEmpty = (elements) => elements.length > 0;
    const concat = (elements) => elements.join('\n');

    const prompts = ['line 1', 'line 2'];
    const field = new MultiLineField(prompts, 'address', notEmpty, concat);

    field.setResponse('line1');
    field.setResponse('line2');

    assert.deepStrictEqual(field.getEntry(), ['address', 'line1\nline2']);
  });
});
