function createAcademicSection(data) {
  const container = document.createElement("div");
  const { subjects_taken } = data;
  container.classList.add("container", "bg-white", "p-3");
  container.innerHTML = `
  <div class="data-table">
    <div class="table-title w-100 bg-iteso-secondary text-white fw-bold text-center p-2" style="font-size: 1.2rem">Asignaturas cursadas</div>
    <table class="table table-stripped">
      <thead>
        <tr>
          <th scope="col">Nombre</th>
          <th scope="col">Área plan de estudios</th>
          <th scope="col">Periodo Escolar</th>
          <th scope="col">Calificación obtenida</th>
          <th scope="col">Tipo de evaluación</th>
        </tr>
      </thead>
      <tbody class="table table-bordered table-stripped text-center"></tbody>
      <!-- <tbody class="table table-bordered table-stripped text-center">
        <tr>
          <td>Materia 1</td>
          <td>M1-PdeS</td>
          <td>Primavera 2023</td>
          <td>9.4</td>
          <td>Ordinaria</td>
        </tr>
        <tr>
          <td>Materia 1</td>
          <td>M1-PdeS</td>
          <td>Primavera 2023</td>
          <td>9.4</td>
          <td>Ordinaria</td>
        </tr>
        <tr>
          <td>Materia 1</td>
          <td>M1-PdeS</td>
          <td>Primavera 2023</td>
          <td>9.4</td>
          <td>Ordinaria</td>
        </tr>        <tr>
          <td>Materia 1</td>
          <td>M1-PdeS</td>
          <td>Primavera 2023</td>
          <td>9.4</td>
          <td>Ordinaria</td>
        </tr>        <tr>
          <td>Materia 1</td>
          <td>M1-PdeS</td>
          <td>Primavera 2023</td>
          <td>9.4</td>
          <td>Ordinaria</td>
        </tr>        <tr>
          <td>Materia 1</td>
          <td>M1-PdeS</td>
          <td>Primavera 2023</td>
          <td>9.4</td>
          <td>Ordinaria</td>
        </tr>        <tr>
          <td>Materia 1</td>
          <td>M1-PdeS</td>
          <td>Primavera 2023</td>
          <td>9.4</td>
          <td>Ordinaria</td>
        </tr>        <tr>
          <td>Materia 1</td>
          <td>M1-PdeS</td>
          <td>Primavera 2023</td>
          <td>9.4</td>
          <td>Ordinaria</td>
        </tr>
      </tbody> -->
    </table>
  </div>
`;

  container
    .querySelector("thead")
    .querySelectorAll("th")
    .forEach((th) => {
      th.classList.add(
        "text-iteso-primary-500",
        "fw-light",
        "text-center",
        "bg-iteso-secondary-100"
      );
    });
  const table = container.querySelector("table");
  table.querySelector("tbody").innerHTML = "";
  subjects_taken.forEach((sub) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
          <td>${sub.name}</td>
          <td>${sub.area}</td>
          <td>${sub.term}</td>
          <td>${sub.grade}</td>
          <td>${sub.eval_type}</td>    
    `;
    table.querySelector("tbody").appendChild(tr);
  });
  return container;
}
