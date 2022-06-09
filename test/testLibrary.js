const assert = require('assert');
const { Field } = require("../src/field");
const { Form } = require("../src/form");
const { registerResponse, isMoreThanFive, isYyyyMmDd, notEmpty, is10digits } = require("../src/library");

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

describe('isMoreThanFive', () => {
  it('Should return true if name more than equal 5', () => {
    assert.strictEqual(isMoreThanFive('something'), true);
  });

  it('Should return false if name not more than equal 5', () => {
    assert.strictEqual(isMoreThanFive('some'), false);
  });
});

describe('isYyyyMmDd', () => {
  it('Should return true if parameter in date format', () => {
    assert.strictEqual(isYyyyMmDd('1999-10-21'), true);
  });

  it('Should return false if parameter is not in date format', () => {
    assert.strictEqual(isYyyyMmDd('1999-10'), false);
  });
});

describe('notEmpty', () => {
  it('Should return true if parameter not empty', () => {
    assert.strictEqual(notEmpty('some'), true);
  });

  it('Should return false if parameter empty', () => {
    assert.strictEqual(notEmpty(''), false);
  });
});

describe('is10Digit', () => {
  it('Should return true if parameter 10 digit', () => {
    assert.strictEqual(is10digits('1234567890'), true);
  });

  it('Should return false if parameter is not 10 digit', () => {
    assert.strictEqual(is10digits('12345'), false);
  });
});
