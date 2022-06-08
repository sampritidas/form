const isMoreThanFive = (name) => name.length >= 5;
const isYyyyMmDd = (dob) => /^\d{4}-\d{2}-\d{2}$/.test(dob);
const notEmpty = (hobbies) => hobbies.length > 0;
const is10digits = (phnNo) => /^\d{10}/.test(phnNo);

const identity = (x) => x;
const split = (elements) => elements.split(',');
const concat = (elements) => elements.join('\n');

const registerForm = (form, ...fields) => {
  fields.forEach((field) => {
    form.registerField(field);
  })
};

const onFormReady = (content, logger, writeFile) => {
  writeFile('form.json', JSON.stringify(content, null, 2), 'utf8');
  logger('Thank you');
  process.exit();
}

function registerResponse(form, response, logger, writeFile) {
  try {
    form.storeResponse(response);
  } catch (error) {
    logger(error.message);
  }

  if (form.hasRemainingFields()) {
    logger(form.showCurrentField());
    return;
  }
  onFormReady(form.getResponses(), logger, writeFile);
};

module.exports = {
  registerResponse, registerForm, isMoreThanFive,
  isYyyyMmDd, notEmpty, is10digits, identity, split, concat,
};
