const fs = require('fs');
const { readline } = require("./readLine");


const main = () => {
  const questions = [
    'Enter your name:',
    'Enter your BOD',
    'Enter your hobbies'
  ];
  const form = {};

  let index = 0;
  readline((line) => {
    console.log(questions[index]);
    form[questions[index]] = line;
    console.log(form);
    if (Object.keys(form).length === 3) {
      fs.writeFileSync('form.json', JSON.stringify(form), 'utf8');
    }
    index++;
  });
}

main();
