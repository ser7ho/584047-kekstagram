'use strict';

(function () {
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
  var LIKES_RANGE = [15, 250];
  var COMMENTS_RANGE = [1, 2];

  window.utils = {
    generatePictures: function () {
      var pictures = [];
      for (var i = 0; i < PICTURES_COUNT; i++) {
        pictures[i] = {
          url: generateUrl(i + 1),
          likes: window.utils.randomInteger(LIKES_RANGE[0], LIKES_RANGE[1]),
          comments: getComments(COMMENTS, COMMENTS_RANGE),
          description: DESCRIPTIONS[window.utils.randomInteger(0, DESCRIPTIONS.length - 1)]
        };
      }
      return pictures;
    },
    randomInteger: function (min, max) {
      var rand = min + Math.random() * (max + 1 - min);
      return Math.floor(rand);
    }
  };

  var generateUrl = function (count) {
    return 'photos/' + count + '.jpg';
  };

  var getComments = function (comments, commentsRange) {
    var countComments = window.utils.randomInteger(commentsRange[0], commentsRange[1]);
    var commentItems = [];
    for (var i = 0; i < countComments; i++) {
      commentItems[i] = comments[window.utils.randomInteger(0, comments.length - 1)];
    }
    return commentItems;
  };
})();
