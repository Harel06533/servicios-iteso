// all the logic done in the login form
"use strict";

// create danger alert
function createDangerAlert(error) {
  const div = document.createElement("div");
  div.classList.add(
    "alert",
    "alert-danger",
    "w-100",
    "alert-dismissable",
    "fade",
    "show",
    "d-flex",
    "align-items-center",
    "justify-content-center",
  );
  div.role = "alert";
  div.style.position = "absolute";
  div.style.gap = "0.4rem";
  div.innerHTML = `
<strong>Error:</strong> ${error}
<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
`;
  return div;
}

// on form submitted -- sends the email and password, if user is found then generates an access token
document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("username").value + "@iteso.mx";
  const password = document.getElementById("password").value;
  try {
    const postMethod = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    };
    const res = await fetch("http://localhost:3000/login", postMethod);
    if (res.status !== 200) throw new Error("Not Found");
    const token = await res.text();
    window.location.href = "/home/profile?token=" + token;
  } catch (e) {
    if (e.message === "Not Found") {
      let alert = document.querySelector(".alert");
      if (!alert) {
        alert = createDangerAlert(
          "El usuario o la contraseña que ingresaste es incorrecto",
        );
        document
          .querySelector(".modal")
          .insertAdjacentElement("afterbegin", alert);
      }
    }
  }
});
