"use strict";

const baseUrl = "http://localhost:3000/password";

// alert for displaying error
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

// on form submit
document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const studentEmail = document.getElementById("username").value + "@iteso.mx";
  try {
    const options = {
      method: "POST",
      body: JSON.stringify({ studentEmail }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const req = await fetch(baseUrl, options);
    if (req.status !== 200) {
      throw new Error("Not Found");
    } else {
      window.location.href = `/passres?email=${encodeURIComponent(
        studentEmail,
      )}`;
    }
  } catch (e) {
    if (e.message === "Not Found") {
      let alert = document.querySelector(".alert");
      if (!alert) {
        alert = createDangerAlert("El usario que ingresaste es incorrecto");
        document
          .querySelector(".modal")
          .insertAdjacentElement("afterbegin", alert);
      }
    }
  }
});
