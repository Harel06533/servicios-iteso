// class user, for managing data easier
"use strict";

import { isNumericString, normalizeString } from "./utils";

class UserException {
  constructor(message) {
    this.message = message;
  }
}

class User {
  // attr
  #firstNames; // ["firstname", "secondfirstname"]
  #lastNames; // ["lastname", "secondlastname"]
  #fullName; // firstname + secondname + lastname + secondlastname
  #expedient; // 000000
  #verifierDigit; // 000
  #personalEmail; // persem@mail.com
  #studentEmail; // firstname.lastname@iteso.mx
  #phoneNumber; // 33-333-3333
  #location; // Guadalajara, Jalisco, Mex
  #bachelor; // degree name
  #semester; // number of semester
  #numOfCredits; // number of credits taken
  #debts; // [ {"reason": 0.0} ] reason - amount

  // constructor (object)
  constructor({
    firstNames,
    lastNames,
    expedient,
    verifierDigit,
    personalEmail,
    phoneNumber,
    location,
    bachelor,
    semester,
    numberOfCredits,
    debts,
  }) {
    this.setFirstNames(firstNames);
    this.setLastNames(lastNames);
    this.setFullName();
    this.setExpedient(expedient);
    this.setVerifierDigit(verifierDigit);
    this.setPersonalEmail(personalEmail);
    this.setStudentEmail();
    this.setPhoneNumber(phoneNumber);
    this.setLocation(location);
    this.setBachelor(bachelor);
    this.setSemester(semester);
    this.setNumberOfCredits(numberOfCredits);
    this.setDebts(debts);
  }

  // setters
  setFirstNames(firstNames) {
    this.#firstNames = [...firstNames];
  }

  setLastNames(lastNames) {
    this.#lastNames = [...lastNames];
  }

  setFullName(fullName) {
    if (fullName) {
      this.#fullName = fullName;
    } else {
      this.#fullName =
        this.#firstNames.join(" ") + " " + this.#lastNames.join(" ");
    }
  }

  setExpedient(expedient) {
    if (!isNumericString(expedient))
      throw new UserException("expedient must be numbers");
    this.#expedient = expedient;
  }

  setVerifierDigit(verifierDigit) {
    if (verifierDigit.length !== 3)
      throw new UserException("verifier digit must be 3 digits long");
    if (!isNumericString(verifierDigit))
      throw new UserException("verifier must be numbers");
    this.#verifierDigit = verifierDigit;
  }

  // lets suppose the email validation is done in the frontend
  setPersonalEmail(personalEmail) {
    this.#personalEmail = personalEmail;
  }

  setStudentEmail(studentEmail) {
    if (studentEmail) {
      this.#studentEmail = studentEmail;
    } else {
      const firstName = normalizeString(this.#firstNames[0]);
      const lastName = normalizeString(this.#lastNames[0]);
      this.#studentEmail = `${firstName}.${lastName}@iteso.mx`;
    }
  }

  setPhoneNumber(phoneNumber) {
    this.#phoneNumber = phoneNumber;
  }

  setLocation(location) {
    this.#location = location;
  }

  setBachelor(bachelor) {
    this.#bachelor = bachelor;
  }

  setSemester(semester) {
    if (!Number.isInteger(semester))
      throw new UserException("semester value must be an integer");
    this.#semester = semester;
  }

  setNumberOfCredits(numOfCredits) {
    if (!Number.isInteger(numOfCredits))
      throw new UserException("number of credits value must be an integer");
    this.#numOfCredits = numOfCredits;
  }

  setDebts(debts) {
    this.#debts = [...debts];
  }

  // getters
  getFirstNames() {
    return this.#firstNames;
  }

  getLastNames() {
    return this.#lastNames;
  }

  getFullName() {
    return this.#fullName;
  }

  getExpedient() {
    return this.#expedient;
  }

  getVerifierDigit() {
    return this.#verifierDigit;
  }

  getPersonalEmail() {
    return this.#personalEmail;
  }

  getStudentEmail() {
    return this.#studentEmail;
  }

  getPhoneNumber() {
    return this.#phoneNumber;
  }

  getLocation() {
    return this.#location;
  }

  getBachelor() {
    return this.#bachelor;
  }

  getSemester() {
    return this.#semester;
  }

  getNumberOfCredits() {
    return this.#numOfCredits;
  }

  getDebts() {
    return this.#debts;
  }

  // when JSON.stringify is called or need a fast object
  toJSON() {
    return {
      first_names: this.getFirstNames(),
      last_names: this.getLastNames(),
      full_name: this.getFullName(),
      expedient: this.getExpedient(),
      verifier_digit: this.getVerifierDigit(),
      personal_email: this.getPersonalEmail(),
      student_email: this.getStudentEmail(),
      phone_number: this.getPhoneNumber(),
      location: this.getLocation(),
      bachelor: this.getBachelor(),
      semester: this.getSemester(),
      num_of_credits: this.getNumberOfCredits(),
      debts: this.getDebts(),
    };
  }
  static createFromObject(object) {
    const {
      fullName,
      expedient,
      verifierDigit,
      personalEmail,
      studentEmail,
      phoneNumber,
      location,
      bachelor,
      semester,
      numOfCredits,
      debts,
    } = object;
    const names = fullName.split(" ");
    const firstNames = names.slice(0, 2);
    const lastNames = names.slice(2);
    const user = new User(
      firstNames,
      lastNames,
      expedient,
      verifierDigit,
      personalEmail,
      phoneNumber,
      location,
      bachelor,
      semester,
      numOfCredits,
      debts,
    );
    user.setStudentEmail(studentEmail);
  }
}

export default User;
