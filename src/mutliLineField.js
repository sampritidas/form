class MultiLineField {
  #prompts;
  #name;
  #validator;
  #parser;
  #index;
  #responses;

  constructor(prompts, name, validator, parser) {
    this.#prompts = prompts;
    this.#name = name;
    this.#validator = validator;
    this.#parser = parser;
    this.#index = 0;
    this.#responses = [];
  }

  isFilled() {
    return this.#responses.length === this.#prompts.length;
  }

  isValid(response) {
    return this.#validator(response);
  }

  setResponse(response) {
    this.#responses.push(response);
    this.#index++;
  }

  showPrompt() {
    return this.#prompts[this.#index];
  }

  getEntry() {
    return [this.#name, this.#parser(this.#responses)];
  }
}

module.exports = { MultiLineField };
