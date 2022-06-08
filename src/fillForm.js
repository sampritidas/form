const fs = require('fs');
const { Field } = require('./field.js');
const { Form } = require('./form.js');

function readResponse(form, response, logger, writeFile) {
  if (!form.isResponseValid(response, logger)) {
    form.showCurrentField(logger);
    return;
  }

  if (form.isFormFilled()) {
    writeFile('form.json', JSON.stringify(form.getResponses()), 'utf8');
    logger('Thank you');
    process.exit();
  }

  form.showCurrentField(logger);
};

const isMoreThanFive = (name) => name.length >= 5;
const isYyyyMmDd = (dob) => /^\d{4}-\d{2}-\d{2}$/.test(dob);
const notEmpty = (hobbies) => hobbies.length > 0;
const is10digits = (phnNo) => /^\d{10}/.test(phnNo);

const identity = (x) => x;
const split = (elements) => elements.split(',');

const registerForm = (form, ...fields) => {
  fields.forEach((field) => {
    form.registerField(field);
  })
};

const createForm = () => {
  const nameField = new Field('Enter name', 'name', isMoreThanFive, identity);
  const dobField = new Field('Enter dob', 'dob', isYyyyMmDd, identity);
  const hobbiesField = new Field('Enter hobbies', 'hobbies', notEmpty, split);
  const phoneField = new Field('Enter phn no.', 'phone', is10digits, identity);

  const newForm = new Form();

  registerForm(newForm,
    nameField, dobField, hobbiesField, phoneField);

  return newForm;
};

const main = () => {
  const newForm = createForm();
  process.stdin.setEncoding('utf8');

  console.log('Enter name');
  process.stdin.on('data', (response) => {
    readResponse(
      newForm, response.trim(), console.log, fs.writeFileSync);;
  })
};

main();
exports.readResponse = readResponse;
