"use strict";

/* Elementos que usamos en el HTML */
const newFormElement = document.querySelector(".js-new-form");
const listElement = document.querySelector(".js-list");
const searchButton = document.querySelector(".js-button-search");
const buttonAdd = document.querySelector(".js-btn-add");
const buttonCancelForm = document.querySelector(".js-btn-cancel");
const inputDesc = document.querySelector(".js-input-desc");
const inputPhoto = document.querySelector(".js-input-photo");
const inputName = document.querySelector(".js-input-name");
const linkNewFormElememt = document.querySelector(".js-button-new-form");
const labelMesageError = document.querySelector(".js-label-error");
const input_search_desc = document.querySelector(".js-buscar-desc");
const input_search_race = document.querySelector(".js-buscar-race");

//Objetos con cada gatito
let kittenDataList = [];

//Funciones
function renderKitten(kittenData) {
  const kitten = `<li class="card">
    <article>
      <img
        class="card_img"
        src=${kittenData.url}
        alt="gatito"
      />
      <h3 class="card_title">${kittenData.name}</h3>
      <h3 class="card_race">${kittenData.race}</h3>
      <p class="card_description">
      ${kittenData.desc}
      </p>
    </article>
    </li>`;
  return kitten;
}

function renderKittenList(kittenDataList) {
  listElement.innerHTML = "";
  for (const kittenItem of kittenDataList) {
    listElement.innerHTML += renderKitten(kittenItem);
  }
}

//Mostrar/ocultar el formulario
function showNewCatForm() {
  newFormElement.classList.remove("collapsed");
}
function hideNewCatForm() {
  newFormElement.classList.add("collapsed");
}

function handleClickNewCatForm(event) {
  event.preventDefault();
  if (newFormElement.classList.contains("collapsed")) {
    showNewCatForm();
  } else {
    hideNewCatForm();
  }
}
//Adicionar nuevo gatito
function addNewKitten(event) {
  event.preventDefault();
  const valueDesc = inputDesc.value;
  const valuePhoto = inputPhoto.value;
  const valueName = inputName.value;
  if (valueDesc === "" && valuePhoto === "" && valueName === "") {
    labelMesageError.innerHTML = "Debe rellenar todos los valores";
  } else {
    if (valueDesc !== "" && valuePhoto !== "" && valueName !== "") {
      labelMesageError.innerHTML = "";
    }
  }

  const gatoNuevo = {
    image: valuePhoto,
    name: valueName,
    race: "",
    desc: valueDesc,
  };

  kittenDataList.push(gatoNuevo);
  renderKittenList(kittenDataList);
  inputDesc.value = ""; //LIMPIAR VALORES DEL INPUT
  inputPhoto.value = "";
  inputName.value = "";

  labelMesageError.innerHTML = "Mola! Un nuevo gatito en Adalab!"; //MENSAJE DE EXITO
}

//Cancelar la b??squeda de un gatito
function cancelNewKitten(event) {
  event.preventDefault();
  newFormElement.classList.add("collapsed");
  inputDesc.value = "";
  inputPhoto.value = "";
  inputName.value = "";
}

// //Filtrar por descripci??n
//
//   event.preventDefault();
//   const descrSearchText = input_search_desc.value;
//   listElement.innerHTML = '';
//   for (const kittenItem of kittenDataList) {
//     if (kittenItem.desc.includes(descrSearchText)) {
//       listElement.innerHTML += renderKitten(kittenItem);
//     }
//   }
// }

//Mostrar el litado de gatitos en ell HTML
renderKittenList(kittenDataList);

//Eventos
linkNewFormElememt.addEventListener("click", handleClickNewCatForm);
searchButton.addEventListener("click", filterKitten);
buttonAdd.addEventListener("click", addNewKitten);
buttonCancelForm.addEventListener("click", cancelNewKitten);

function filterKitten(event) {
  event.preventDefault();
  const kittenListFiltered = kittenDataList
    .filter((cat) => cat.desc.includes(input_search_desc.value))
    .filter((cat) => cat.race.includes(input_search_race.value));

  renderKittenList(kittenListFiltered);
}


// enviamos peticiones al servidor

const GITHUB_USER = "Carmenyo";
const SERVER_URL = `https://adalab-api.herokuapp.com/api/kittens/${GITHUB_USER}`;

fetch(SERVER_URL, {
  method: "GET",
  headers: { "Content-Type": "application/json"},
}).then(function (response) {
    return response.json();
  })
.then(function (data) { console.log(data);  kittenDataList = data.results;
  renderKittenList(kittenDataList);
});
