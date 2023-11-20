"use strict";

const baseUrl = "http://localhost:3000/password";

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
      throw new Error("User was not found");
    } else {
      window.location.href = `/password?email=${encodeURIComponent(
        studentEmail,
      )}`;
    }
  } catch (e) {
    alert("Error: " + e);
  }
});
