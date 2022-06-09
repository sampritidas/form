const fs = require('fs');
const lib = require('./src/library.js');
const { registerResponse, registerForm, isMoreThanFive } = lib;
const { isYyyyMmDd, notEmpty, is10digits } = lib;
const { identity, split, concat } = lib;

const { Field } = require('./src/field.js');
const { Form } = require('./src/form.js');
const { MultiLineField } = require('./src/mutliLineField.js');

const createAddressField = () => {
  const prompts = ['Enter address line 1', 'Enter address line 2'];
  const addressField = new MultiLineField(prompts, 'address', notEmpty, concat);
  return addressField;
}

const createForm = () => {
  const nameField = new Field('Enter name', 'name', isMoreThanFive, identity);
  const dobField = new Field('Enter dob', 'dob', isYyyyMmDd, identity);
  const hobbiesField = new Field('Enter hobbies', 'hobbies', notEmpty, split);
  const phoneField = new Field('Enter phn no.', 'phone', is10digits, identity);
  const addressField = createAddressField();

  const newForm = new Form();

  registerForm(newForm,
    nameField, dobField, hobbiesField, phoneField, addressField);

  return newForm;
};
const onFormReady = (content,) => {
  fs.writeFileSync('form.json', JSON.stringify(content), 'utf8');
  console.log('Thank you');
  process.exit();
};

const main = () => {
  const form = createForm();

  process.stdin.setEncoding('utf8');
  console.log(form.showCurrentField());
  process.stdin.on('data', (chunk) => {
    const responses = chunk.trim().split('\n');
    responses.forEach(response =>
      registerResponse(
        form, response, onFormReady, console.log));
  });
};

main();
