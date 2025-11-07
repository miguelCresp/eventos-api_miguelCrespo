import { Temporal } from "https://cdn.jsdelivr.net/npm/@js-temporal/polyfill/+esm";

const titulo = document.getElementById("card-title");
const tareas = document.getElementById("tareas");

fetch("http://localhost:3000/api/tareas")
  .then((response) => response.json())
  .then((data) => {
    for (const tarea of data) {
      const title = tarea.title;
      const description = tarea.description;
      const category = tarea.category;
      const imgUrl = tarea.imgUrl;
      const dateTime = tarea.dateTime;
      let intervalo;
      const fin = Temporal.PlainDateTime.from(dateTime);

      const card = document.createElement("div");

      card.classList.add("card");
      card.innerHTML = `<img
          src= ${imgUrl}
          class="card-img"
        />
        <div class="card-content-container">
          <span class="category tareaColor">${category}</span>
          <h2 class="card-title">${title}</h2>
          <p class="card-subtitle">${description}</p>
          <div class="event-date">
            <img src="./img/calendar-icon.svg" />
            <span>${fin.day}/${fin.month}/${fin.year}</span>
          </div>

          <div class="countdown-area">
            <div class="countdown-item">
              <span class="countdown-value" id="dias"></span>
              <span class="countdown-label">Días</span>
            </div>

            <div class="countdown-item">
              <span class="countdown-value" id="horas"></span>
              <span class="countdown-label">Horas</span>
            </div>

            <div class="countdown-item">
              <span class="countdown-value" id="minutos"></span>
              <span class="countdown-label">Minutos</span>
            </div>

            <div class="countdown-item">
              <span class="countdown-value" id="segundos"></span>
              <span class="countdown-label">segundos</span>
            </div>
          </div>
        </div>`;

      const diasSel = card.querySelector("#dias");
      const horasSel = card.querySelector("#horas");
      const minutosSel = card.querySelector("#minutos");
      const segundosSel = card.querySelector("#segundos");

      function consultaActualizaHora() {
        const inicio = Temporal.Now.plainDateTimeISO();

        const diff = inicio.until(fin);
        if (diff.total("seconds") >= 0) {
          const segundos = diff.seconds;
          const minutos = diff.minutes;
          const horas = diff.hours;
          const dias = diff.days;
          diasSel.textContent = String(dias).padStart(2, "0");
          horasSel.textContent = String(horas).padStart(2, "0");
          minutosSel.textContent = String(minutos).padStart(2, "0");
          segundosSel.textContent = String(segundos).padStart(2, "0");
        } else {
          diasSel.textContent = "00";
          horasSel.textContent = "00";
          minutosSel.textContent = "00";
          segundosSel.textContent = "00";
          card.style.backgroundColor = "lightblue";
          clearInterval(intervalo);
        }
      }

      consultaActualizaHora();
      intervalo = setInterval(consultaActualizaHora, 1000);

      tareas.appendChild(card);
    }
  })
  .catch((error) => {
    console.error("Error al obtener las tareas:", error);
  });
