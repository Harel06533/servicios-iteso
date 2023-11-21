// class of a bachelor degree

"use strict";
class Bachelor {
  #name;
  #semesters;
  #totalCredits;

  // constructor
  constructor(name, semesters) {
    this.setName(name);
    this.setSemesters(semesters);
    this.setTotalCredits();
  }

  // setters
  setName(name) {
    this.#name = name;
  }

  setSemesters(semesters) {
    this.#semesters = [...semesters];
  }

  setTotalCredits() {
    let sum = 0;
    this.#semesters.forEach((semester) => {
      sum += semester.credits;
    });
    this.#totalCredits = sum;
  }
  // getters
  getName() {
    return this.#name;
  }

  getSemesters() {
    return this.#semesters;
  }

  getTotalCredits() {
    return this.#totalCredits;
  }

  // on JSON stringify or create fast object
  toJSON() {
    return {
      name: this.#name,
      semesters: this.#semesters,
      total_credits: this.#totalCredits,
    };
  }
}

export default Bachelor;
