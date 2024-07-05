// Variables globales
let errorMsg = "";

// DOM Elements
const modalBg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const modalBody = document.querySelector(".modal-body");
const modalConf = document.querySelector(".modal-confirm");

// *****************
// *** Listeners ***
// *****************

// Listen sur l'icône de la navbar
let iconNavBar = document.querySelector(".icon");
iconNavBar.addEventListener("click", () => {
  editNav();
})

// Listen sur le bouton "Je m'inscris !"
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// Listen sur le formulaire
// + validation et submit du formulaire
let form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  validate();
  confirmSubmit();
})

// listen sur la "X" de la modale
let closeX = document.querySelector(".close");
closeX.addEventListener("click", () => {
  closeModale();
})

// listen sur le bouton "Fermer" de la fenêtre de confirmation
let closeBtn = document.querySelector("#close-btn");
closeBtn.addEventListener("click", () => {
  closeModale();
})


// *****************
// *** Functions ***
// *****************

// Mise à blanc d'un message d'erreur
function cleanErrorMsg (errorField, errorClass) {
  errorField = document.querySelector(errorClass);
  errorField.innerText = "";
}

  // Mise à blanc des messages d'erreur
function cleanErrorMsgs () {
  cleanErrorMsg ("errorFirstName", ".error-firstname");

  cleanErrorMsg ("errorLastName", ".error-lastname");

  cleanErrorMsg ("errorEmail", ".error-email");

  cleanErrorMsg ("errorBirthDate", ".error-birthdate");

  cleanErrorMsg ("errorNumberTour", ".error-numbertour");

  cleanErrorMsg ("errorListTour", ".error-listtour");

  cleanErrorMsg ("errorConditions", ".error-conditions");

  // Reset des champs du formulaires
  document.reserve.reset();
}

// Fermeture de la modale (X)
function closeModale () {
  cleanErrorMsgs ();
  modalBg.style.display = "none";
}

  // Ajouter un message de confirmation après soumission
function confirmSubmit () {
  if (errorMsg === "") {
    modalBody.style.display = "none";
    modalConf.style.display = "flex";
    document.reserve.reset();
  }
}

  // Affichage d'un message d'erreur
function displayErrorMsg (errorField, errorClass, inputId) {
  errorField = document.querySelector(errorClass);
  errorField.innerText = errorMsg;
  if (inputId !== "") {
    inputId.focus();
  }
}

// Gestion responsive de la barre de navigation
function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// Afficher le formulaire
function launchModal() {
  modalConf.style.display = "none";
  modalBg.style.display = "block";
  modalBody.style.display = "block";
}

// Validation globale des champs du formulaire
function validate (){
  validateFirstName();

  if (errorMsg === "") {
    validateLastName();
  }
  if (errorMsg === "") {
    validateEmail();
  }
  if (errorMsg === "") {
    validateBirthDate();
  }
  if (errorMsg === "") {
    validateTourneyNumber();
  }
  if (errorMsg === "") {
    validateListTour();
  }
  if (errorMsg === "") {
    validateConditions();
  }
}

function validateBirthDate() {
  let birthDate = document.querySelector("#birthdate");

  if (birthDate.value === "") {
    errorMsg = `Veuillez renseigner le champ "Date de naissance".`;
  } else {
    if (Date.parse(birthDate.value) > Date.now()) {
      errorMsg = `Veuillez entrer une date de naissance inférieure à la date du jour.`;
    } else {
      errorMsg = "";
    }
  }
  // Affichage de l'erreur
  displayErrorMsg ("errorBirthDate", ".error-birthdate", birthDate);
}

// Valider les conditions d'utilisation
function validateConditions() {
  let conditions = document.querySelector("#checkbox1");

  if (!conditions.checked) {
    errorMsg = `Vous devez vérifier que vous acceptez les termes et conditions.`;
  } else {
    errorMsg = "";
  }
  // Affichage de l'erreur
  displayErrorMsg ("errorConditions", ".error-conditions", conditions);
}

// Valider l'email
function validateEmail() {
  let email = document.querySelector("#email");

  let emailRegExp = new RegExp("[a-z._-]+@[a-z._-]+\\.[a-z._-]+");

  if (email.value === "") {
    errorMsg = `Veuillez renseigner le champ "E-mail".`;
  } else {
    if (!emailRegExp.test(email.value)) {
      errorMsg = `Veuillez entrer une adresse E-mail valide`;
    } else {
      errorMsg = "";
    }
  }
  // Affichage de l'erreur
  displayErrorMsg ("errorEmail", ".error-email", email);
}

// Valider le prénom
function validateFirstName() {
  let firstName = document.querySelector("#first");

  if (firstName.value === "") {
    errorMsg = `Veuillez renseigner le champ "Prénom".`;
  } else {
    if (firstName.value.length < 2) {
      errorMsg = `Veuillez entrer 2 caractères ou plus pour le champ "Prénom".`;
    } else {
      errorMsg = "";
    }
  }
  // Affichage de l'erreur
  displayErrorMsg ("errorFirstName", ".error-firstname", firstName);
}

// Valider le nom
function validateLastName() {
  let lastName = document.querySelector("#last");

  if (lastName.value === "") {
    errorMsg = `Veuillez renseigner le champ "Nom".`;
  } else {
    if (lastName.value.length < 2) {
      errorMsg = `Veuillez entrer 2 caractères ou plus pour le champ "Nom".`;
    } else {
      errorMsg = "";
    }
  }
  // Affichage de l'erreur
  displayErrorMsg ("errorLastName", ".error-lastname", lastName);
}

// Valider quel tournoi déjà participé dans l'année
function validateListTour() {
  let listTour = document.querySelectorAll("input[type=radio]");

  for(let i = 0; i < listTour.length; i++) {
    if (listTour[i].checked) {
      errorMsg = ""
      break
    }
    errorMsg = `Vous devez choisir une option.`;
  }
  // Affichage de l'erreur
  displayErrorMsg ("errorListTour", ".error-listtour", "");
}

// Valider le nbre de tournoi(s) participé(s)
function validateTourneyNumber() {
  let numberTour = document.querySelector("#quantity");

  if (!Number.isInteger(parseFloat(numberTour.value))) {
    errorMsg = `Veuillez renseigner un nombre entier".`;
  } else {
    if (parseInt(numberTour.value) < 0 || parseInt(numberTour.value) > 99 ) {
      errorMsg = `Veuillez renseigner un nombre entre 0 et 99.`;
    } else {
      errorMsg = "";
    }
  }
  // Affichage de l'erreur
  displayErrorMsg ("errorNumberTour", ".error-numbertour", numberTour);
}
