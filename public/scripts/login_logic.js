// all the logic done in the login form
"use strict";

// on form submitted
document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const data = [username, password];
  sessionStorage.setItem("userdata", JSON.stringify(data));
  window.location.href = "/home-container.html";
});

// show modal on load
const loginModal = new bootstrap.Modal(document.getElementById("loginModal"), {
  backdrop: "static",
  keyboard: false,
});
loginModal.show();
