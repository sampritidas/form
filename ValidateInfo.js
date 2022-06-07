class ValidateInfo {
  constructor(info, index) {
    this.info = info;
    this.index = index;
  }

  isNameValid() {
    return /^......*/.test(this.info);
  }

  isDobValid() {
    return /\d{4}-\d{2}-\d{2}/.test(this.info);
  }

  isHobbiesValid() {
    return this.info.split(',').length > 0;
  }

  isPhoneNoValid() {
    return /[0-9]{10}/.test(this.info);
  }

  isAddressValid() {
    return this.info.length > 0;
  }
}

exports.ValidateInfo = ValidateInfo;
