"use strict";

// creates the user info card
function createUserInfoCard(data) {
  console.log(data);
  const dataSet = [
    ["tagNumber", "tag", { value: data.expedient, title: "Expediente" }], // tag number
    [
      "verifier_digit",
      "barcode",
      { value: data.verifier_digit, title: "Dígito verificador" },
    ], // digit
    [
      "student_email",
      "envelope",
      { value: data.student_email, title: "Correo electrónico" },
    ], // school email
  ];
  const userListGroup = createListGroup(dataSet, []);
  const card = createItemsCard(userListGroup, [
    "d-flex",
    "align-items-center",
    "px-5",
    "py-4",
  ]);
  const userImage = document.createElement("div");
  userImage.classList.add(
    "user-pic",
    "d-flex",
    "flex-column",
    "align-items-center",
  );
  userImage.innerHTML = `
              <img
                src="/assets/user_placeholder.png"
                alt="user placeholder pic"
                class="rounded-circle"
                style="width: 10rem"
              />
              <h6 class="text-uppercase mt-1" style="color: #888">
              ${data.first_names[0]} ${data.last_names[0]} 
              </h6>
`;
  card.firstElementChild.insertAdjacentElement("afterbegin", userImage);
  return card;
}

// creates a card for displaying the personal data
function createPersonalDataCard(data) {
  const dataSet = [
    [
      "phone_number",
      "phone",
      { value: data.phone_number, title: "Número telefónico" },
    ], // phone number
    [
      "personal_email",
      "envelope",
      { value: data.personal_email, title: "Correo personal" },
    ], // personal email
    ["location", "location-dot", { value: data.location, title: "Ubicación" }], // location
    ["bachelor", "graduation-cap", { value: data.bachelor, title: "Carrera" }], // location
  ];

  // wrap every inner data from the li into a div
  const userListGroup = createListGroup(dataSet, [
    "d-flex",
    "justify-content-between",
  ]);
  const listItems = Array.from(userListGroup.children);
  listItems.forEach((li) => {
    const inner = li.innerHTML;
    li.innerHTML = `
    <div class="modifier d-flex" style="gap: 0.6rem;"></div>
`;
    // create a modify button with functionality
    li.firstElementChild.insertAdjacentHTML("afterbegin", inner);
    if (li.id !== "bachelor") {
      const modifyButton = document.createElement("button");
      modifyButton.classList.add("modify-button", "fa-solid", "fa-pen", "btn");
      modifyButton.style.fontSize = "1rem";
      modifyButton.style.color = "#888";
      modifyButton.onclick = function () {
        const changeModal = document.getElementById("dataChangeModal");
        const title = li.querySelector(".fw-bold").textContent;
        const id = li.id;
        changeModal.querySelector(".modal-title").textContent = title;
        changeModal.querySelector("input").value = "";
        changeModal
          .querySelector(".btn-iteso-secondary")
          .addEventListener("click", async () => {
            const newData = changeModal.querySelector("input").value;
            if (newData) {
              try {
                const jsonFormat = `{"${id}":"${newData}"}`;
                const post = {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    token: window.location.search.split("=")[1],
                  },
                  body: jsonFormat,
                };
                await fetch("http://localhost:3000/login/change", post);
                window.location.reload();
              } catch (e) {
                alert("No se ha podido cambiar el dato, error: " + e.message);
              }
            }
          });
        const bsModal = new bootstrap.Modal(changeModal, {});
        bsModal.show();
      };
      li.appendChild(modifyButton);
    }
  });

  // creates the card based on the list group
  const card = createItemsCard(userListGroup, []);
  card.classList.add("mt-3");
  card.style.width = "40%";

  // creates a title for the card
  const title = document.createElement("h5");
  title.classList.add("me-1");
  title.style.color = "#9a9a9a";
  title.style.textAlign = "left";
  title.textContent = "Datos personales";
  card.firstElementChild.insertAdjacentElement("afterbegin", title);
  return card;
}

// creates a card to display the academic information
function createAcademicInformationCard(data) {
  const dataSet = [
    [
      "pay",
      "coins",
      {
        value: data.debts.length > 0 ? "Por pagar" : "Pagado",
        title: "Colegiatura",
      },
    ], // phone number
    [
      "subjects",
      "list-check",
      { value: "10 de marzo del 2024", title: "Inscripción de materias" },
    ], // personal email
    ["average", "flag-checkered", { value: "9.2", title: "Promedio escolar" }], // location
  ];

  const userListGroup = createListGroup(dataSet, [
    "d-flex",
    "justify-content-between",
  ]);
  const listItems = Array.from(userListGroup.children);
  const linkOptions = [
    "Ir a colegiaturas",
    "Ir a ficha de inscripción",
    "Ir a historia académica",
  ];

  // wrap every inner data from the li into a div
  let index = 0;
  if (data.debts.length > 0) {
    listItems[0].classList.add("text-warning");
  }
  listItems.forEach((li) => {
    const inner = li.innerHTML;
    li.innerHTML = `
    <div class="modifier d-flex" style="gap: 0.6rem;"></div>
`;
    li.firstElementChild.insertAdjacentHTML("afterbegin", inner);
    const link = document.createElement("a");
    link.href = "#";
    link.textContent = linkOptions[index];
    index++;
    li.appendChild(link);
  });

  // creates the progressbar for the user
  const li = createListItem("barprogress", "", {}, []);
  const progressbar = createProgressBar(Math.floor(data.credits_percent * 100));
  li.classList.add("mt-4", "justify-content-between", "progress-bar");
  li.innerHTML = "";
  li.appendChild(progressbar);
  li.insertAdjacentHTML(
    "beforeend",
    '<span class="fw-bold" style="color: #888; font-size: 0.7rem" aria-label="type">Creditos aprobados</span>',
  );
  userListGroup.appendChild(li);

  // creates the card based on the list group
  const card = createItemsCard(userListGroup, []);
  card.classList.add("mt-3", "flex-grow-1");
  card.style.width = "40%";

  // creates a title for the card
  const title = document.createElement("h5");
  title.classList.add("me-1");
  title.style.color = "#9a9a9a";
  title.style.textAlign = "end";
  title.textContent = "Información académica";
  card.firstElementChild.insertAdjacentElement("afterbegin", title);

  return card;
}

// returns the user profile to render
function createUserProfile(data) {
  // set the container
  const container = document.createElement("div");
  container.classList.add("container");
  const title = document.createElement("h4");
  title.classList.add("text-end", "me-3");
  title.style.color = "#9a9a9a";
  title.textContent = "Mi Perfil";
  container.appendChild(title);

  container.appendChild(createUserInfoCard(data));

  // div for academic and personal info
  const div = document.createElement("div");
  div.style.gap = "1rem";
  div.classList.add("d-flex");
  div.appendChild(createPersonalDataCard(data));
  div.appendChild(createAcademicInformationCard(data));

  // set div to container
  container.appendChild(div);
  return container;
}
