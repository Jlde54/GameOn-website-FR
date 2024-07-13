// Variables globales
let errorMsg = "";
let flagError = false;

// Array
let errorArray = [
  [".error-firstname"],
  [".error-lastname"],
  [".error-email"],
  [".error-birthdate"],
  [".error-numbertour"],
  [".error-listtour"],
  [".error-conditions"]
]

// DOM Elements
const modalBg = document.querySelector(".bground");
const modalBody = document.querySelector(".modal-body");
const modalBtn = document.querySelectorAll(".modal-btn");
const modalConf = document.querySelector(".modal-confirm");


// *****************
// *** Listeners ***
// *****************

// Listen sur l'icône de la navbar
const iconNavBar = document.querySelector(".icon");
iconNavBar.addEventListener("click", () => {
  editNav();
})

// Listen sur le bouton "Je m'inscris !"
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// Listen sur le bouton "C'est parti" du formulaire
// + validation et submit du formulaire
const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  validate();
  confirmSubmit();
})

// listen sur la "X" de la modale
const closeX = document.querySelector(".close");
closeX.addEventListener("click", () => {
  closeModale();
})

// listen sur le bouton "Fermer" de la fenêtre de confirmation
const closeBtn = document.querySelector("#close-btn");
closeBtn.addEventListener("click", () => {
  closeModale();
})

// *****************
// *** Functions ***
// *****************

  // Mise à blanc des messages d'erreur et des champs
function cleanErrorMsgs () {
  for (let i = 0; i < errorArray.length; i++) {
    errorMsg = document.querySelector(errorArray[i]);
    errorMsg.innerText = "";
  }
  document.reserve.reset();
}

// Fermeture de la modale (X)
function closeModale () {
  cleanErrorMsgs ();
  modalBg.style.display = "none";
}

  // Ajouter un message de confirmation après soumission
function confirmSubmit () {
  if (flagError === false) {
    modalBody.style.display = "none";
    modalConf.style.display = "flex";
    document.reserve.reset();
  }
}

  // Affichage d'un message d'erreur
function displayErrorMsg (errorClass, inputId) {
  let errorField = document.querySelector(errorClass);
  errorField.innerText = errorMsg;
  
  if (errorMsg !== "" && flagError === false) {
    flagError = true;
    if (inputId !== "") {
      inputId.focus();
    }
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
  flagError = false;
  validateFirstLastName("#first", ".error-firstname", "Prénom");
  validateFirstLastName("#last", ".error-lastname", "Nom");
  validateEmail();
  validateBirthDate();
  validateTourneyNumber();
  validateListTour();
  validateConditions();
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
  displayErrorMsg (".error-birthdate", birthDate);
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
  displayErrorMsg (".error-conditions", conditions);
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
  displayErrorMsg (".error-email", email);
}

// Valider le prénom et le nom
function validateFirstLastName(id, className, lib) {
  firstLastName = document.querySelector(id);

  if (firstLastName.value === "") {
    errorMsg = `Veuillez renseigner le champ "${lib}".`;
  } else {
    if (firstLastName.value.length < 2) {
      errorMsg = `Veuillez entrer 2 caractères ou plus pour le champ "${lib}".`;
    } else {
      errorMsg = "";
    }
  }
  // Affichage de l'erreur
  displayErrorMsg (className, firstLastName);
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
  displayErrorMsg (".error-listtour", "");
}

// Valider le nbre de tournoi(s) participé(s)
function validateTourneyNumber() {
  let numberTour = document.querySelector("#quantity");

  if (!Number.isInteger(parseFloat(numberTour.value))) {
    errorMsg = `Veuillez renseigner un nombre entier.`;
  } else {
    if (parseInt(numberTour.value) < 0 || parseInt(numberTour.value) > 99 ) {
      errorMsg = `Veuillez renseigner un nombre entre 0 et 99.`;
    } else {
      errorMsg = "";
    }
  }
  // Affichage de l'erreur
  displayErrorMsg (".error-numbertour", numberTour);
}
