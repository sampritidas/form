class Iterator {
  constructor(qusetions) {
    this.question = qusetions;
    this.index = 0;
  }

  currentQuestion() {
    console.log(this.question[this.index]);
  }

  nextQuestion() {
    this.index += 1;
    return this.currentQuestion();
  }
}

exports.Iterator = Iterator;