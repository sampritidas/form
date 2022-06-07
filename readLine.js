const fs = require('fs');
const { QuerryIterator } = require('./querryIterator.js');
const { ValidateInfo } = require("./validateInfo");

const isInfoValidate = (info, index) => {
  const validator = new ValidateInfo(info, index);

  if (index === 0) {
    return validator.isNameValid();
  }
  if (index === 1) {
    return validator.isDobValid();
  }
  if (index === 2) {
    return validator.isHobbiesValid();
  }
  if (index === 3) {
    return validator.isPhoneNoValid();
  }
  if (index === 4 || index === 5) {
    return validator.isAddressValid();
  }
};

const customiseinfo = (info, index) => {
  if (index === 2) {
    return info.split(',');
  }
  return info.trimEnd();
}

const customiseFinalDetails = (details) => {
  const finalDetails = details.slice(0, 4).concat(
    details[4] + ' ' + details[5]);
  return {
    Name: finalDetails[0],
    DOB: finalDetails[1],
    Hobbies: finalDetails[2],
    Phone: finalDetails[3],
    Address: finalDetails[4],
  }
};

const areQuestionsDone = (details, questions) => {
  if (details.length === questions.length) {
    const customizedData = customiseFinalDetails(details);
    fs.writeFileSync(
      'form.json', JSON.stringify(customizedData, null, 2), 'utf8');
    process.stdin.emit('end');
  }
};

const readline = (index) => {
  const questions = [
    '\nEnter your Name',
    '\nEnter your DOB',
    '\nEnter your Hobbies',
    '\nEnter Phone No.',
    '\nEnter Address Line 1',
    '\nEnter Address Line 2'];
  const QuerryList = new QuerryIterator(questions);
  const details = [];

  process.stdin.setEncoding('utf8');

  process.stdin.on('data', info => {
    if (isInfoValidate(info, index)) {
      details.push(customiseinfo(info, index));
      areQuestionsDone(details, questions);
      QuerryList.nextQuestion();
      index++;
    } else {
      QuerryList.currentQuestion();
    }
  });

  process.stdin.on('end', () => {
    console.log('Thank you');
    process.exit();
  });
};

exports.readline = readline;
