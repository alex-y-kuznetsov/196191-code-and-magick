'use strict';

var ESC_KEY = 27;
var ENTER_KEY = 13;
var userDialog = document.querySelector('.setup');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');
var similarListContainer = document.querySelector('.setup-similar');
var similarListElement = document.querySelector('.setup-similar-list');
var setupOpen = document.querySelector('.setup-open');
var setupClose = userDialog.querySelector('.setup-close');
var userNameInput = document.querySelector('.setup-user-name');
var mainWizardCoat = document.querySelector('.wizard-coat');
var mainWizardEyes = document.querySelector('.wizard-eyes');
var mainWizardFireball = document.querySelector('.setup-fireball-wrap');

var wizardNames = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];
var wizardLastNames = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];
var wizardCoatColors = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];
var wizardEyesColors = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];
var wizardFireballColors = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
];

// Utils
var removeHidden = function (elem) {
  elem.classList.remove('hidden');
};

var addHidden = function (elem) {
  elem.classList.add('hidden');
};

// Создание рандомных волшебников
var generateRandom = function (propertyArr) {
  return propertyArr[Math.floor(Math.random() * (propertyArr.length - 0)) + 0];
};

var generateRandomWizard = function () {
  var randomWizard = {
    name: generateRandom(wizardNames) + ' ' + generateRandom(wizardLastNames),
    coatColor: generateRandom(wizardCoatColors),
    eyesColor: generateRandom(wizardEyesColors)
  };
  return randomWizard;
};

var wizards = [];

for (var i = 0; i < 4; i++) {
  wizards[i] = generateRandomWizard();
}

// Отрисовка волшебников
var fragment = document.createDocumentFragment();

for (i = 0; i < wizards.length; i++) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizards[i].name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizards[i].coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizards[i].eyesColor;

  fragment.appendChild(wizardElement);
}

similarListElement.appendChild(fragment);

removeHidden(similarListContainer);

// Взаимодействие с окном
var openDialogHandler = function () {
  removeHidden(userDialog);
  document.addEventListener('keydown', escDialogHandler);
};

var closeDialogHandler = function () {
  addHidden(userDialog);
  setupClose.removeEventListener('keydown', escDialogHandler);
};

var escDialogHandler = function (evt) {
  if (evt.keyCode === ESC_KEY && !evt.target.classList.contains('setup-user-name')) {
    addHidden(userDialog);
  }
};

var enterDialogHandler = function (evt) {
  if (evt.keyCode === ENTER_KEY) {
    removeHidden(userDialog);
  }
};

setupOpen.addEventListener('click', openDialogHandler);
setupOpen.addEventListener('keydown', enterDialogHandler);
setupClose.addEventListener('click', closeDialogHandler);
setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEY) {
    userDialog.classList.add('hidden');
  }
});

// Валидация формы
userNameInput.addEventListener('invalid', function () {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя не должно превышать 25 символов');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  } else {
    userNameInput.setCustomValidity('');
  }
});

// Изменения главного волшебника
var wizardCoatColorHandler = function () {
  mainWizardCoat.style.fill = generateRandom(wizardCoatColors);
};
var wizardEyesColorHandler = function () {
  mainWizardEyes.style.fill = generateRandom(wizardEyesColors);
};
var wizardFireballColorHandler = function () {
  mainWizardFireball.style.backgroundColor = generateRandom(wizardFireballColors);
};

mainWizardCoat.addEventListener('click', wizardCoatColorHandler);
mainWizardEyes.addEventListener('click', wizardEyesColorHandler);
mainWizardFireball.addEventListener('click', wizardFireballColorHandler);
