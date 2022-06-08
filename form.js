class Form {
  constructor() {
    this.fields = [];
    this.index = 0;
    this.responses = [];
  }

  registerField(field) {
    this.fields.push(field);
  }

  isResponseValid(response) {
    if (this.fields[this.index].isValid(response)) {
      const parsedResponse = this.fields[this.index].parseResponse(response);
      this.responses.push(parsedResponse);
      this.index++;
      return true;
    };
    return false;
  };

  getResponses() {
    return this.responses;
  }

  showCurrentField() {
    return this.fields[this.index].showPrompt();
  }

  showFields() {
    console.log(this.fields);
  }
}

module.exports = { Form };
