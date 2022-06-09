const assert = require('assert');
const { Field } = require("../src/field");
const { Form } = require("../src/form");
const { registerResponse } = require("../src/library");

describe('registerResponse', () => {
  it('Should register given response and show current field', () => {
    const alwaysTrue = () => true;
    const nameField = new Field('Name', 'name', alwaysTrue, (x) => x);
    const dobField = new Field('Dob', 'dob', alwaysTrue, (x) => x);

    const form = new Form();
    form.registerField(nameField);
    form.registerField(dobField);

    const mockedOnFormReady = _ => true;
    const mockLog = (logs) => {
      return function (content) {
        logs.push(content);
      }
    }
    const logs = [];
    const logger = mockLog(logs);

    registerResponse(form, 'something', mockedOnFormReady, logger);

    assert.deepStrictEqual(logs, ['Dob']);
  });

  it('Should register given response and do onFormReady', () => {
    const alwaysTrue = () => true;
    const nameField = new Field('Name', 'name', alwaysTrue, (x) => x);
    const dobField = new Field('Dob', 'dob', alwaysTrue, (x) => x);

    const form = new Form();
    form.registerField(nameField);
    form.registerField(dobField);

    const mockOnFormReady = (readyLogs) => {
      return function (finalContent) {
        readyLogs.push(finalContent);
      }
    };
    const readyLogs = [];
    const mockedOnFormReady = mockOnFormReady(readyLogs);

    const mockLog = (logs) => {
      return function (content) {
        logs.push(content);
      }
    }
    const logs = [];
    const logger = mockLog(logs);

    registerResponse(form, 'nameContent', mockedOnFormReady, logger);
    registerResponse(form, 'dobContent', mockedOnFormReady, logger);

    assert.deepStrictEqual(logs, ['Dob']);
    assert.deepStrictEqual(readyLogs, [{
      dob: 'dobContent',
      name: 'nameContent',
    }]);
  });
});
