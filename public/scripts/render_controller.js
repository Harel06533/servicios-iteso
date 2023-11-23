// controlls rendering and navigation
"use strict";

async function getData() {
  const token = new URLSearchParams(window.location.search).get("token");
  const res = await fetch("http://localhost:3000/home?token=" + token);
  const data = await res.json();
  document.getElementById("userName").textContent =
    data.user_data.first_names[0] + " " + data.user_data.last_names[0];
  renderSection(createUserProfile(data.user_data));
}

// variables

const content = document.querySelector(".content");
const navButtons = Array.from(
  document
    .getElementById("sidebarAccordion")
    .querySelectorAll(".btn-iteso-primary-100")
);
const userAccess = document
  .getElementById("user-menu")
  .querySelector(".user-info");

// to select a section
const avaliableSections = {
  toSchoolBill: () => createBillingSection(),
  toRegisterInfo: (data) => testRender(data),
  toAcademicHistory: (data) => testRender(data),
};
// function to render section
function renderSection(section) {
  content.innerHTML = "";
  content.appendChild(section);
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
      const rendered = avaliableSections[id]();
      renderSection(rendered);
    }
  });
});

// render user profile by default
getData();
