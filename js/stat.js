'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_GAP = 10;
// var COLUMN_GAP = 40;
var FONT_GAP = 20;
var GAP = 50;
var BAR_WIDTH = 40;
var HISTO_HEIGHT = 150;
var CLOUD_COLOR = '#ffffff';
var CLOUD_BACKGROUND = 'rgba(0, 0, 0, 0.7)';
var BLACK_COLOR = '#000000';

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);

};

var messageY = 30;
var drawMessage = function (ctx, messageText) {
  ctx.fillStyle = BLACK_COLOR;
  ctx.font = '16px PT Mono';
  ctx.fillText(messageText, 220, messageY);
  messageY += 20;
};

var getMax = function (arr) {
  var max = arr[0];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  return max;
};

var getColor = function (name) {
  if (name === 'Вы') {
    return 'rgba(255 , 0, 0, 1.0)';
  } else {
    var opacity = Math.random().toFixed(1);
    return ['rgba(0, 0, 255, ' + opacity + ')'];
  }
};


window.renderStatistics = function (ctx, players, times) {
  var maxTime = getMax(times);

  renderCloud(ctx, CLOUD_X + CLOUD_GAP, CLOUD_Y + CLOUD_GAP, CLOUD_BACKGROUND);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_COLOR);

  messageY = 30;
  drawMessage(ctx, 'Ура, Вы победили!', CLOUD_X + FONT_GAP, GAP);
  drawMessage(ctx, 'Список результатов:', CLOUD_X + FONT_GAP, GAP + FONT_GAP);

  for (var i = 0; i < players.length; i++) {
    var barHeight = (HISTO_HEIGHT * times[i]) / maxTime;
    ctx.fillText(Math.round(times[i]), CLOUD_X + GAP + (BAR_WIDTH + GAP) * i, CLOUD_Y + CLOUD_HEIGHT - GAP - barHeight - CLOUD_GAP);
    ctx.fillStyle = getColor(players[i]);
    ctx.fillRect(CLOUD_X + GAP + (BAR_WIDTH + GAP) * i, CLOUD_Y + CLOUD_HEIGHT - GAP - barHeight, BAR_WIDTH, barHeight);
    ctx.fillStyle = BLACK_COLOR;
    ctx.fillText(players[i], CLOUD_X + GAP + (BAR_WIDTH + GAP) * i, CLOUD_Y + CLOUD_HEIGHT - FONT_GAP);
  }
};
