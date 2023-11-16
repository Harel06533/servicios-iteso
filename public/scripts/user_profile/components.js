// individual components used all along the project
"use strict";

// creates a card which stores a list of items
function createItemsCard(itemsList, customBodyClasses) {
  const card = document.createElement("div");
  const cardBody = document.createElement("div");
  card.classList.add("card");
  card.style.borderRadius = "2rem";
  customBodyClasses.forEach((className) => cardBody.classList.add(className));
  cardBody.classList.add("card-body");
  cardBody.style.gap = "5rem";
  cardBody.appendChild(itemsList);
  card.appendChild(cardBody);
  return card;
}

// creates a single list item
function createListItem(id, faItem, data, customItemClasses) {
  const li = document.createElement("li");
  const { value, title } = data;
  li.id = id;
  li.classList.add("list-group-item", "p-3", "d-flex");
  customItemClasses.forEach((className) => li.classList.add(className));
  li.style.gap = "0.6rem";
  li.innerHTML = `
                <span
                  class="fa-solid fa-${faItem} text-iteso-secondary"
                  style="font-size: 1.5rem"
                ></span>
                <div class="d-flex align-items-center">
                  <p class="m-0 lh-1">
                    ${value} <br />
                    <span
                      class="fw-bold"
                      style="color: #888; font-size: 0.7rem"
                      aria-label="type"
                    >${title}</span
                    >
                  </p>
                </div>
`;
  return li;
}

// data object comes in the form of [ divId, faItem {value, title}]
// returns a list group with all the items passed
function createListGroup(dataObjects, customItemsClasses) {
  const list = document.createElement("ul");
  list.classList.add("list-group", "list-group-flush", "w-100");
  const listItems = [];
  dataObjects.forEach((dataArray) => {
    const [divId, faItem, data, span] = dataArray;
    const item = createListItem(divId, faItem, data, customItemsClasses);
    if (span) item.appendChild(span);
    listItems.push(item);
  });
  listItems.forEach((i) => {
    list.appendChild(i);
  });
  return list;
}

function createProgressBar(percentage) {
  const progressBar = document.createElement("div");
  progressBar.classList.add("progress", "mt-4");
  progressBar.role = "progressbar";
  progressBar.ariaValueMax = "100";
  progressBar.ariaValueMin = "0";
  progressBar.innerHTML = `
                    <div
                      class="progress-bar bg-iteso-secondary"
                      style="width: ${percentage}%"
                    >
                      ${percentage}%
                    </div>
`;
  return progressBar;
}
