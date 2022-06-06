const readline = (callBack) => {
  let input = '';
  process.stdin.setEncoding('utf8');

  process.stdin.on('data', chunk => {
    input += chunk;
    const slicedInput = input.split('\n');
    const lines = slicedInput.slice(0, -1);
    lines.forEach((line) => {
      callBack(line);
    });
    input = slicedInput.slice(-1)[0];
  });

  process.stdin.on('end', () => {
    callBack(input);
  });

  process.stdin.on('close', () => console.log('close'));
};

exports.readline = readline;
