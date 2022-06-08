class Field {
  constructor(prompt, name, validator, parser) {
    this.prompt = prompt;
    this.name = name;
    this.validator = validator;
    this.parser = parser;
  }

  isValid(response) {
    return this.validator(response);
  }

  showPrompt() {
    console.log(this.prompt);
  }

  parseResponse(response) {
    return this.parser(response);
  }
}

module.exports = { Field };
