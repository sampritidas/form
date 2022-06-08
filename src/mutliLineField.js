class MultiLineField {
  constructor(prompts, name, validator, parser) {
    this.prompts = prompts;
    this.name = name;
    this.validator = validator;
    this.parser = parser;
    this.index = 0;
  }

  isValid(response) {
    if (this.validator(response)) {
      this.index++;
      this.showPrompt(logger)
    };
    this.showPrompt[this.index];
    // return this.validator(response);
  }

  showPrompt(logger) {
    logger(this.prompt);
  }

  parseResponse(response) {
    return this.parser(response);
  }
}

module.exports = { MultiLineField };
