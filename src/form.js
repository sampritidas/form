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
    const [Name, Dob, Hobbies, Phn, Add1, Add2] = this.responses;
    return { Name, Dob, Hobbies, Phn, Address: `${Add1} ${Add2}` };
  }

  showCurrentField(logger) {
    return this.fields[this.index].showPrompt(logger);
  }

  isFormFilled() {
    return this.fields.length === this.responses.length;
  }
}

module.exports = { Form };
