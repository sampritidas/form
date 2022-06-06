const fs = require('fs');
const { Iterator } = require('./iterator');

const isNameGrant = (name) => {
  return /^......*/.test(name);
};

const isDobCorrectlyFormed = (dob) => {
  return true;
};

const isHobbiesCorrectlyFormed = (hobbies) => {
  return formHobbies(hobbies).length > 0;
};

const formHobbies = (chunk) => {
  return chunk.split(',');
};

const isValidate = (chunk, index) => {
  if (index === 0) {
    return isNameGrant(chunk);
  }
  if (index === 1) {
    return isDobCorrectlyFormed(chunk);
  }
  if (index === 2) {
    return isHobbiesCorrectlyFormed(chunk);
  }
  if (index === 3) {
    return /[0-9]{10}/.test(chunk);
  }
  if (index === 4 || index === 5) {
    return chunk.length > 0;
  }
};

const customisechunk = (chunk, index) => {
  if (index === 2) {
    return formHobbies(chunk);
  }
  return chunk.trimEnd();
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

const readline = (index) => {
  const questions = [
    '\nEnter your Name',
    '\nEnter your DOB',
    '\nEnter your Hobbies',
    '\nEnter Phone No.',
    '\nEnter Address Line 1',
    '\nEnter Address Line 2',
  ];

  const iterate = new Iterator(questions);

  const details = [];

  process.stdin.setEncoding('utf8');

  process.stdin.on('data', chunk => {
    if (isValidate(chunk, index)) {
      details.push(customisechunk(chunk, index));
      iterate.nextQuestion();
      index++;
    } else {
      iterate.currentQuestion();
    }

    if (details.length === questions.length) {
      const customizedData = customiseFinalDetails(details);
      fs.writeFileSync(
        'form.json',
        JSON.stringify(customizedData, null, 2),
        'utf8');
      process.stdin.emit('end');
    }
  });

  process.stdin.on('end', () => {
    console.log('Thank you');
    process.exit();
  });

  process.stdin.on('close', () => console.log('close'));
};

exports.readline = readline;
