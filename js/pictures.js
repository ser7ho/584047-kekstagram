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
var SVG_COUNT = [1, 6];

var pictures = [];

var generatePictures = function (likes, comments, commentCount, descriptions, count) {
  for (var i = 0; i < count; i++) {
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

var similarPictureTemplate = document.querySelector('#picture').content.querySelector('.picture__link');

var makePicture = function (picture) {
  var pictureClone = similarPictureTemplate.cloneNode(true);

  pictureClone.querySelector('.picture__img').src = picture.url;
  pictureClone.querySelector('.picture__stat--likes').textContent = picture.likes;
  pictureClone.querySelector('.picture__stat--comments').textContent = picture.comments.length + '';
  return pictureClone;
};
var fragment = document.createDocumentFragment();
var appendPictures = function (arr) {
  var similarPictures = document.querySelector('.pictures');
  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(makePicture(arr[i]));
  }
  similarPictures.appendChild(fragment);
};

appendPictures(generatePictures(LIKES_COUNT, COMMENTS, COMMENT_COUNT, DESCRIPTIONS, PICTURES_COUNT));

var similarCommentTemplate = document.querySelector('#picture').content.querySelector('.social__comment');

var makeComment = function (comment, svgCount) {
  var commentClone = similarCommentTemplate.cloneNode(true);

  commentClone.querySelector('.social__comment > img').src = 'img/avatar-' + randomInteger(svgCount[0], svgCount[1]) + '.svg';
  commentClone.querySelector('.social__text').textContent = comment;
  return commentClone;
};

var showBigPicture = function (arr) {
  var bigPicture = document.querySelector('.big-picture');
  bigPicture.classList.remove('hidden');
  var similarComment = document.querySelector('.social__comments');
  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(makeComment(arr[i], SVG_COUNT));
  }
  similarComment.appendChild(fragment);
  bigPicture.querySelector('.big-picture__img > img').src = pictures[0].url;
  bigPicture.querySelector('.likes-count').textContent = pictures[0].likes;
  bigPicture.querySelector('.comments-count').textContent = pictures[0].comments.length + '';
  bigPicture.querySelector('.social__caption').textContent = pictures[0].description;
  document.querySelector('.social__comment-count').classList.add('visually-hidden');
  document.querySelector('.social__comment-loadmore').classList.add('visually-hidden');
};

showBigPicture(pictures[0].comments);
