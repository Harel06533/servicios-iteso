"use strict";

// since this card is different, we require a special function
function createTotalBillingCard(data) {
  const totalDebt = data.debts.reduce(
    (acc, currentItem) => acc + currentItem.amount,
    0
  );
  const dataSet = [
    [
      "totalDomBilling",
      "money-check-dollar",
      { value: totalDebt.toLocaleString("en-US"), title: "Total domiciliado" },
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
        value: totalDebt.toLocaleString("en-US"),
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

  // TODO --> dynamic payment
  // add payment functionality
  payButton.addEventListener("click", (e) => {
    if (totalDebt === 0) {
      alert("No hay pagos pendintes");
      return;
    }
    const modal = document.getElementById("paymentModal");
    const input = modal.querySelector("input");
    const editButton = modal.querySelector("#editPayment");
    const payButton = modal.querySelector(".btn-iteso-tertiary");
    input.value = totalDebt;

    // on edit button pressed
    editButton.onclick = function () {
      e.preventDefault();
      const isDisabled = input.hasAttribute("disabled");
      if (!isDisabled) {
        let value = Number(input.value) || totalDebt;
        if (value <= 0 || value > totalDebt) value = totalDebt;
        input.value = value;
      }
      input.toggleAttribute("disabled");
    };

    // do payment
    payButton.onclick = async function () {
      let value = Number(input.value) || totalDebt;
      if (value <= 0 || value > totalDebt) {
        alert("Importe ingresado invalido");
        return;
      }
      const put = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: window.location.search.split("=")[1],
        },
        body: JSON.stringify({ amount: value }),
      };
      const res = await fetch("http://localhost:3000/billing", put);
      if (res.status === 201) {
        alert("Pago realizado con éxito");
        window.location.reload();
      } else {
        alert("Problema con el pago");
      }
    };
    const bsModal = new bootstrap.Modal(modal);
    bsModal.show();
    // e.preventDefault();
    // const post = {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     token: window.location.search.split("=")[1],
    //   },
    //   body: JSON.stringify([]), // for now, an empty array will do just fine
    // };
    // try {
    //   const res = await fetch("http://localhost:3000/billing", post);
    //   if (res.status === 201) {
    //     alert("Pago realizado con éxito");
    //     window.location.reload();
    //   } else {
    //     throw new Error(res.status);
    //   }
    // } catch (e) {
    //   alert("No se ha podido hacer el pago: ", e.message);
    // }
  });

  lastItem.appendChild(payButton);
  // create card
  const card = createItemsCard(listGroup, []);
  card.classList.add("flex-grow-1");
  return card;
}

function createBillingSection(data) {
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
    "flex-column",
    "justify-content-center",
    "bg-secondary-100",
    "align-items-center"
  );
  // add all debts
  data.debts.forEach((debt) => {
    const div = document.createElement("div");
    div.classList.add(
      "billing-info",
      "w-100",
      "d-flex",
      "justify-content-between",
      "bg-secondary-100",
      "align-items-center"
    );
    div.innerHTML = `
      <p style="font-size: 1.2rem">
        <strong class="text-iteso-primary-400">Razón de pago:</strong>
        <span>${debt.reason}</span>
      </p>
      <p class="single-debt-price text-iteso-primary-400" style="font-size: 1.2rem">
        $${debt.amount.toLocaleString("en-US")}
      </p>
`;
    billingData.appendChild(div);
  });

  // add user info
  flexible.appendChild(createUserInfoCard(data));
  flexible.append(createTotalBillingCard(data));

  // create and add accordion
  const currentDate = getDateAsFormat(new Date().toLocaleDateString("es-MX"));
  container.appendChild(flexible);
  const accordion = createAccordion(
    "billingAccordion",
    "billingInfo",
    billingData,
    `Adeudos consultados al ${currentDate}`
  );
  accordion.classList.add("mt-4");

  container.appendChild(accordion);

  return container;
}
