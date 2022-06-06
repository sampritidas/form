const fs = require('fs');

isNameGrant = (name) => {
  return /^.....*/.test(name);
};

isDobCorrectlyFormed = (dob) => {
  console.log(dob);
  return /^....-..-..$/.test(dob);
};

const isHobbiesCorrectlyFormed = (hobbies) => {
  return hobbies.length > 0;
};

const formHobbies = (chunk) => {
  return chunk.split(',');
};

const formInformation = (info) => {
  return { Name: info[0], DOB: info[1], Hobbies: info[2] };
};

const readline = (callBack, index) => {
  const questions = [
    'Enter your Name',
    'Enter your DOB',
    'Enter your Hobbies'
  ];
  const details = [];
  process.stdin.setEncoding('utf8');

  process.stdin.on('data', chunk => {
    console.log(index);

    if (index === 0) {
      if (!isNameGrant(chunk.trimEnd())) {
        console.log(questions[index]);
      } else {
        details.push(chunk.trimEnd());
        console.log(questions[index + 1]);
      }
    }

    if (index === 1) {
      if (isDobCorrectlyFormed(chunk)) {
        console.log(questions[index]);
      } else {
        details.push(chunk.trimEnd());
        console.log(questions[index + 1]);
      }
    }

    if (index === 2) {
      const formedHobbies = formHobbies(chunk);
      if (!isHobbiesCorrectlyFormed(formedHobbies)) {
        console.log(questions[index]);
      } else {
        details.push(formedHobbies);
        console.log('hob', details);
      }
    }

    if (details.length === questions.length) {
      fs.writeFileSync(
        'form.json',
        JSON.stringify(formInformation(details), null, 2), 'utf8');
      console.log('Thank you');
      process.exit();
    }

    console.log(details);
    index++;
  });

  process.stdin.on('end', () => {
    console.log('Thank you');
  });

  process.stdin.on('close', () => console.log('close'));
};

exports.readline = readline;
