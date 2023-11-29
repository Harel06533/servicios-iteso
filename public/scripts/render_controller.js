// controlls rendering and navigation
"use strict";

async function getData() {
  const token = new URLSearchParams(window.location.search).get("token");
  const res = await fetch("http://localhost:3000/home?token=" + token);
  const data = await res.json();

  const userInfo = document.getElementById("userName");
  userInfo.textContent =
    data.user_data.first_names[0] + " " + data.user_data.last_names[0];
  const navButtons = Array.from(
    document
      .getElementById("sidebarAccordion")
      .querySelectorAll(".btn-iteso-primary-100-sidebar")
  );

  // to select a section
  const avaliableSections = {
    toSchoolBill: () => createBillingSection(data.user_data),
    toAcademicHistory: () => createAcademicSection(data.user_data),
  };

  // for moving in active sections
  navButtons.forEach((b) => {
    b.addEventListener("click", (e) => {
      e.preventDefault();
      const id = b.id;
      if (avaliableSections[id]) {
        const rendered = avaliableSections[id](data.user_data);
        renderSection(rendered);
      }
    });
  });

  // for going back to homepage
  document
    .getElementById("user-menu")
    .querySelector(".user-info")
    .addEventListener("click", (e) => {
      e.preventDefault();
      renderSection(createUserProfile(data.user_data));
    });
  // render userProfile by default
  const userProfile = createUserProfile(data.user_data);
  userProfile.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      const id = a.id;
      if (avaliableSections[id]) {
        const rendered = avaliableSections[id](data.user_data);
        renderSection(rendered);
      }
    });
  });
  renderSection(userProfile);
}

// variables

const content = document.querySelector(".content");
const navButtons = Array.from(
  document
    .getElementById("sidebarAccordion")
    .querySelectorAll(".btn-iteso-primary-100-sidebar")
);
const userAccess = document
  .getElementById("user-menu")
  .querySelector(".user-info");

// function to render section
function renderSection(section) {
  content.innerHTML = "";
  content.appendChild(section);
}

// when user access is clicked, renders userProfile
userAccess.addEventListener("click", (e) => {
  e.preventDefault();
  getData();
});

document.addEventListener("DOMContentLoaded", function () {
  const sidebarButtons = document.querySelectorAll(
    ".btn-iteso-primary-100-sidebar"
  );
  const userInfoButton = document.getElementById("user-menu");

  sidebarButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      // Elimina la clase 'active' de todos los botones del sidebar
      sidebarButtons.forEach(function (btn) {
        btn.classList.remove("active");
      });

      // Agrega la clase 'active' al botón clicado
      button.classList.add("active");
    });
  });

  userInfoButton.addEventListener("click", function () {
    // Elimina la clase 'active' de todos los botones del sidebar
    sidebarButtons.forEach(function (btn) {
      btn.classList.remove("active");
    });
  });
});

// render user profile by default
getData();
