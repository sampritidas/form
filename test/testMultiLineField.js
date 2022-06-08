const { MultiLineField } = require("../src/mutliLineField");
const assert = require('assert');

describe('MultiLineField.isFilled', () => {
  it('Should give false if not all filled', () => {
    const notEmpty = (hobbies) => hobbies.length > 0;
    const concat = (elements) => elements.join('\n');

    const prompts = ['Enter address line 1', 'Enter address line 2'];
    const field = new MultiLineField(prompts, 'address', notEmpty, concat);

    field.setResponse('add1');
    assert.strictEqual(field.isFilled(), false);
  });

  it('Should give true if all filled', () => {
    const notEmpty = (hobbies) => hobbies.length > 0;
    const concat = (elements) => elements.join('\n');

    const prompts = ['Enter address line 1', 'Enter address line 2'];
    const field = new MultiLineField(prompts, 'address', notEmpty, concat);

    field.setResponse('add1');
    field.setResponse('add2');
    assert.strictEqual(field.isFilled(), true);
  });
});
