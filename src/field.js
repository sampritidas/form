class Field {
  #response;

  constructor(prompt, name, validator, parser) {
    this.prompt = prompt;
    this.name = name;
    this.validator = validator;
    this.parser = parser;
    this.#response = null;
  }

  isValid(response) {
    if (this.validator(response)) {
      const parsedResponse = this.parser(response);
      this.#response = parsedResponse;
      return true;
    };
    return false;
  }

  showPrompt(logger) {
    logger(this.prompt);
  }

  parseResponse(response) {
    return this.parser(response);
  }

  getEntry() {
    return [this.name, this.#response];
  }
}

module.exports = { Field };
