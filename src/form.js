class Form {
  constructor() {
    this.fields = [];
    this.index = 0;
  }

  registerField(field) {
    this.fields.push(field);
  }

  isResponseValid(response, logger) {
    if (this.fields[this.index].isValid(response)) {
      this.index++;
      return true;
    };
    logger('Invalid Response');
    return false;
  };

  getResponses() {
    const responses = {};
    this.fields.forEach((field) => {
      const [name, response] = field.getEntry();
      responses[name] = response;
    });
    return responses;
  }

  showCurrentField(logger) {
    return this.fields[this.index].showPrompt(logger);
  }

  isFormFilled() {
    return this.fields.length === this.index;
  }
}

module.exports = { Form };
