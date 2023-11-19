"use strict";

// throwable class
class UserException {
  constructor(errorMessage) {
    this.errorMessage = errorMessage;
  }
}

// user class
class User {
  // personal data
  #firstNames; // array of first names like -> '["Harel", "Alejandro"]'
  #lastNames; // array of lastNames like -> '["Olguín", "Gaytán"]'
  #fullName; // full name in conjuction -> "Harel Alejandro Olguín Gaytán"
  #personalEmail;

  // academic data
  #studentEmail;
  #bachelor;
  #semester;
  #numOfCredits;

  // constructs the user object
  constructor(firstNames, lastNames, personalEmail, bachelor, semester) {
    this.setFirstNames(firstNames);
    this.setLastNames(lastNames);
    this.setFullName();
    this.setPersonalEmail(personalEmail);
    this.setStudentEmail();
    this.setBachelor(bachelor);
    this.setSemester(semester);
  }

  // setters
  setFirstNames(firstNames) {
    if (!firstNames || firstNames.length === 0)
      throw new UserException("firstNames value must be setted");
    this.#firstNames = [...firstNames];
  }

  setLastNames(lastNames) {
    if (!lastNames || lastNames.length === 0)
      throw new UserException("lastNames value must be setted");
    this.#lastNames = [...lastNames];
  }

  setFullName(fullname) {
    if (fullname) this.#fullName = fullname;
    else
      this.#fullName = `${this.#firstNames.join(" ")} ${this.#lastNames.join(
        " "
      )}`;
  }

  setPersonalEmail(email) {
    if (!email) throw new UserException("personalEmail value must be setted");
    this.#personalEmail = email;
  }

  setStudentEmail(studentEmail) {
    if (studentEmail) this.#studentEmail = studentEmail;
    else {
      const firstName = this.#firstNames[0]
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
      const lastName = this.#lastNames[0]
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
      this.#studentEmail = `${firstName}.${lastName}@iteso.mx`;
    }
  }

  setBachelor(bachelor) {
    if (!bachelor) throw new UserException("bachelor value must be setted");
    this.#bachelor = bachelor;
  }

  setSemester(semester) {
    if (!semester) throw new UserException("semester value must be setted");
    this.#semester = semester;
  }

  setNumOfCredits(numOfCredits) {
    this.#numOfCredits = numOfCredits;
  }

  //getters
  getFirstNames() {
    return this.#firstNames;
  }

  getLastNames() {
    return this.#lastNames;
  }

  getFullName() {
    return this.#fullName;
  }

  getPersonalEmail() {
    return this.#personalEmail;
  }

  getStudentEmail() {
    return this.#studentEmail;
  }

  getBachelor() {
    return this.#bachelor;
  }

  getSemester() {
    return this.#semester;
  }

  getNumOfCredits() {
    return this.#numOfCredits;
  }

  // on JSON.stringify()
  toJSON() {
    return {
      firstNames: this.#firstNames,
      lastNames: this.#lastNames,
      fullName: this.#fullName,
      personalEmail: this.#personalEmail,

      studentEmail: this.#studentEmail,
      bachelor: this.#bachelor,
      semester: this.#semester,
      numOfCredits: this.#numOfCredits,
    };
  }

  // when a JSON is recieved, creates an object from it
  createFromJSON(jsonObj) {
    const object = JSON.parse(jsonObj);
    const { firstNames, lastNames, personalEmail, bachelor, semester } = object;
    const user = new User(
      firstNames,
      lastNames,
      personalEmail,
      bachelor,
      semester
    );
    return user;
  }
}

module.exports = User;
