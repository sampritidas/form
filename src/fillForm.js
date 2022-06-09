const fs = require('fs');
const lib = require('./library.js');
const { registerResponse, registerForm, isMoreThanFive } = lib;
const { isYyyyMmDd, notEmpty, is10digits } = lib;
const { identity, split, concat } = lib;

const { Field } = require('./field.js');
const { Form } = require('./form.js');
const { MultiLineField } = require('./mutliLineField.js');

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
  fs.writeFileSync('form.json', JSON.stringify(content, null, 2), 'utf8');
  console.log('Thank you');
  process.exit();
};

const main = () => {
  const form = createForm();

  process.stdin.setEncoding('utf8');
  console.log(form.showCurrentField());
  process.stdin.on('data', (response) => {
    registerResponse(
      form, response.trim(), onFormReady, console.log);
  });
};

main();
