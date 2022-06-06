const fs = require('fs');
const { readline } = require("./readLine");


const main = () => {
  const questions = [
    'Enter your name:',
    'Enter your BOD',
    'Enter your hobbies'
  ];

  let index = 0;
  console.log(questions[index]);
  readline(() => x, index);
}

main();
