class Form {
  #fields;
  #index;
  constructor() {
    this.#fields = [];
    this.#index = 0;
  }

  registerField(field) {
    this.#fields.push(field);
  }

  storeResponse(response) {
    if (this.isResponseValid(response)) {
      this.#fields[this.#index].setResponse(response);
    }
    if (this.#fields[this.#index].isFilled()) {
      this.#index++;
    }
  }

  isResponseValid(response) {
    if (!this.#fields[this.#index].isValid(response)) {
      throw new Error('Invalid Response');
    };
    return true;
  };

  hasRemainingFields() {
    return !this.#fields.every((field) => {
      return field.isFilled();
    })
  }

  getResponses() {
    const responses = {};
    this.#fields.forEach((field) => {
      const [name, response] = field.getEntry();
      responses[name] = response;
    });
    return responses;
  }

  showCurrentField() {
    return this.#fields[this.#index].showPrompt();
  }
}

module.exports = { Form };
