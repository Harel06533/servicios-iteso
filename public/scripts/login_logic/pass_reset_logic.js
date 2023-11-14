"use strict";
document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const email = document.getElementById("password").value;
  const data = [email, password];
  window.location.href = "/password-reset.html";
});
