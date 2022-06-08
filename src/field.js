class Field {
  #prompt;
  #name;
  #validator;
  #parser;
  #response;

  constructor(prompt, name, validator, parser) {
    this.#prompt = prompt;
    this.#name = name;
    this.#validator = validator;
    this.#parser = parser;
    this.#response = null;
  }

  isFilled() {
    return this.#response !== null;
  }

  isValid(response) {
    return this.#validator(response);
  }

  setResponse(response) {
    this.#response = response;
  }

  showPrompt() {
    return this.#prompt;
  }

  getEntry() {
    return [this.#name, this.#parser(this.#response)];
  }
}

module.exports = { Field };
