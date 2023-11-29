// class of a bachelor degree

"use strict";
class Bachelor {
  #name;
  #semesters;
  #totalCredits = 0;

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
    this.#semesters.forEach((sem) => {
      this.#totalCredits += sem.subjects.reduce(
        (acc, sub) => acc + sub.credits,
        0
      );
    });
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
