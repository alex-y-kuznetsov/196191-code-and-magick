'use strict';

var userDialog = document.querySelector('.setup');
var similarWizardTemplate = document.querySelector("#similar-wizard-template")
  .content
  .querySelector('.setup-similar-item');
var similarListContainer = document.querySelector('.setup-similar');
var similarListElement = document.querySelector('.setup-similar-list');

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

var removeHidden = function (elem) {
  elem.classList.remove('hidden');
};

//Создание рандомных волшебников
var generateRandom = function (propertyArr) {
  for (var i = 0; i < propertyArr.length; i++) {
    var generatedProperty = propertyArr[Math.floor(Math.random() * (propertyArr.length - 0)) + 0];
  }
  return generatedProperty;
};

var generateRandomWizard = function () {
  var randomWizard = {
    name : generateRandom(wizardNames) + ' ' + generateRandom(wizardLastNames),
    coatColor: generateRandom(wizardCoatColors),
    eyesColor: generateRandom(wizardEyesColors)
  }
  return randomWizard;
};

var wizards = [];

for (var i = 0; i < 4; i++) {
  wizards[i] = generateRandomWizard();
};

//Отрисовка волшебников
var fragment = document.createDocumentFragment();

for (var i = 0; i < wizards.length; i++) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizards[i].name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizards[i].coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizards[i].eyesColor;

  fragment.appendChild(wizardElement);
};

similarListElement.appendChild(fragment);

removeHidden(userDialog);
removeHidden(similarListContainer);
