const fs = require('fs');
const { Field } = require('./field.js');
const { Form } = require('./form.js');

function readResponse(form, response, logger, writeFile) {
  if (!form.isResponseValid(response)) {
    form.showCurrentField();
    return;
  }

  if (form.getResponses().length === 4) {
    const [name, dob, hobbies, phn] = form.getResponses();
    const formDetails = { name, dob, hobbies, phn };
    writeFile('form.json', JSON.stringify(formDetails), 'utf8');
    logger('Thank you');
    process.exit();
  }

  form.showCurrentField();
};

const isMoreThanFive = (name) => name.length >= 5;
const isYyyyMmDd = (dob) => /^\d{4}-\d{2}-\d{2}$/.test(dob);
const notEmpty = (hobbies) => hobbies.length > 0;
const is10digits = (phnNo) => /^\d{10}/.test(phnNo);

const identity = (x) => x;
const split = (elements) => elements.split(',');

const main = () => {
  const nameField = new Field('Enter name', 'name', isMoreThanFive, identity);
  const dobField = new Field('Enter dob', 'dob', isYyyyMmDd, identity);
  const hobbiesField = new Field('Enter hobbies', 'hobbies', notEmpty, split);
  const phoneField = new Field('Enter phone no.', 'phone', is10digits, identity);

  const newForm = new Form();
  newForm.registerField(nameField);
  newForm.registerField(dobField);
  newForm.registerField(hobbiesField);
  newForm.registerField(phoneField);

  process.stdin.setEncoding('utf8');

  console.log('Enter name');
  process.stdin.on('data', (response) => {
    readResponse(
      newForm, response.trim(), console.log, fs.writeFileSync);;
  })
};

main();
exports.readResponse = readResponse;
