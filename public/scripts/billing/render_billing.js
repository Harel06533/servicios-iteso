"use strict";

// since this card is different, we require a special function
function createTotalBillingCard() {
  const dataSet = [
    [
      "totalDomBilling",
      "money-check-dollar",
      { value: (20118.48).toLocaleString("en-US"), title: "Total domiciliado" },
    ],
    [
      "notDomBilling",
      "money-check-dollar",
      { value: (0.0).toLocaleString("en-US"), title: "Total sin domiciliar" },
    ],
    [
      "absoluteTotal",
      "receipt",
      {
        value: (20118.48).toLocaleString("en-US"),
        title: "Total",
      },
    ],
  ];

  // add pay button
  const listGroup = createListGroup(dataSet, []);
  const lastItem = listGroup.lastElementChild;
  const lastInner = lastItem.innerHTML;
  lastItem.innerHTML = `
    <div class="d-flex" style="gap: 0.6rem;"></div>
  `;
  lastItem.firstElementChild.insertAdjacentHTML("afterbegin", lastInner);
  lastItem.classList.add("justify-content-between");

  const payButton = document.createElement("button");
  payButton.textContent = "Pagar";
  payButton.classList.add("btn", "text-white", "btn-iteso-tertiary");
  lastItem.appendChild(payButton);

  // create card
  const card = createItemsCard(listGroup, []);
  card.classList.add("flex-grow-1");
  return card;
}

function createBillingSection() {
  // set the container
  const container = document.createElement("div");
  container.classList.add("container");
  const title = document.createElement("h4");
  title.classList.add("text-end", "me-3");
  title.style.color = "#9a9a9a";
  title.textContent = "Pago de colegiatura";
  container.appendChild(title);

  // set flexible container for cards
  const flexible = document.createElement("div");
  flexible.classList.add("d-flex");
  flexible.style.gap = "1rem";

  // create billing data for accordion
  const billingData = document.createElement("div");
  billingData.classList.add(
    "bill-header",
    "w-100",
    "d-flex",
    "justify-content-between",
    "bg-secondary-100",
    "align-items-center",
  );
  billingData.innerHTML = `
  <p style="font-size: 1.2rem">
    <strong class="text-iteso-primary-400">Fecha de pago:</strong>
    <span>1 de dic de 2023</span>
  </p>
  <p
    class="single-debt-price text-iteso-primary-400"
    style="font-size: 1.2rem"
  >
    20,118,48
  </p>
`;

  // add user info
  flexible.appendChild(createUserInfoCard());
  flexible.append(createTotalBillingCard());

  container.appendChild(flexible);
  const accordion = createAccordion(
    "billingAccordion",
    "billingInfo",
    billingData,
  );
  accordion.classList.add("mt-4");

  container.appendChild(accordion);

  return container;
}
