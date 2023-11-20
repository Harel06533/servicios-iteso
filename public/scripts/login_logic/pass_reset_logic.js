"use strict";

// creates a danger alert
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

// base submit, updates the user password if possible
document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const basePassword = document.getElementById("passwordBase").value;
  const repeatPassword = document.getElementById("passwordRepeat").value;
  try {
    if (basePassword.length < 8) throw new Error("pass-short");
    if (basePassword !== repeatPassword) throw new Error("pass-neq");
    if (!/[A-Z]/.test(basePassword)) throw new Error("pass-low");
    const postMethod = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password: basePassword }),
    };
    const res = await fetch(window.location.href, postMethod);
    if (res.status !== 201) throw new Error(res.statusText);
    else window.location.href = "/";
  } catch (e) {
    let alertMessage = "";
    switch (e.message) {
      case "pass-short":
        alertMessage = "La contraseña que ingresaste es muy corta";
        break;
      case "pass-neq":
        alertMessage = "Las contraseñas no coinciden";
        break;
      case "pass-low":
        alertMessage = "La contraseña debe contener al menos una mayúscula";
        break;
      default:
        alertMessage = e.message;
        break;
    }
    let alert = document.querySelector(".alert");
    if (!alert) {
      alert = createDangerAlert(alertMessage);
      document
        .querySelector(".modal")
        .insertAdjacentElement("afterbegin", alert);
    }
  }
});
