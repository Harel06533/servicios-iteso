// controlls rendering and navigation
"use strict";

// test render, this should not be used
function testRender(id) {
  const div = document.createElement("div");
  div.textContent = id;
  renderSection(div);
}

// variables
const main = document.querySelector("main");
const navButtons = Array.from(
  document
    .getElementById("sidebarAccordion")
    .querySelectorAll(".btn-iteso-primary-100"),
);
const userAccess = document
  .getElementById("user-menu")
  .querySelector(".user-info");

// to select a section
const avaliableSections = {
  toSchoolBill: (data) => testRender(data),
  toRegisterInfo: (data) => testRender(data),
  toAcademicHistory: (data) => testRender(data),
};
// function to render section
function renderSection(section) {
  main.innerHTML = "";
  main.appendChild(section);
}

// when user access is clicked, renders userProfile
userAccess.addEventListener("click", (e) => {
  e.preventDefault();
  renderSection(createUserProfile());
});

// for moving in active sections
navButtons.forEach((b) => {
  b.addEventListener("click", (e) => {
    e.preventDefault();
    const id = b.id;
    if (avaliableSections[id]) {
      avaliableSections[id](id);
    }
  });
});

// render user profile by default
//renderSection(createUserProfile());
