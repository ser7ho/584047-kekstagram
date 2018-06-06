'use strict';

var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var DESCRIPTIONS = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'
];
var PICTURES_COUNT = 25;
var LIKES_COUNT = [15, 250];
var COMMENT_COUNT = [1, 2];

var generatePictures = function (likes, comments, commentCount, descriptions, count) {
  var pictures = [];
  for (var i = 0; i <= count; i++) {
    pictures[i] = {
      url: generateUrl(i + 1),
      likes: randomInteger(likes[0], likes[1]),
      comments: getComments(comments, commentCount),
      description: descriptions[getIndexArray(descriptions)]
    };
  }
  return pictures;
};

var generateUrl = function (count) {
  return 'photos/' + count + '.jpg';
};

var randomInteger = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

var getComments = function (arr, count) {
  var countComments = randomInteger(count[0], count[1]);
  var commentItems = [];
  for (var i = 0; i < countComments; i++) {
    commentItems[i] = arr[getIndexArray(arr)];
  }
  return commentItems;
};

var getIndexArray = function (arr) {
  return Math.floor(Math.random() * arr.length);
};

generatePictures(LIKES_COUNT, COMMENTS, COMMENT_COUNT, DESCRIPTIONS, PICTURES_COUNT);
