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
var LIKES_RANGE = [15, 250];
var COMMENTS_RANGE = [1, 2];
var AVATAR_INDEX_RANGE = [1, 6];

var pictures = [];
var generatePictures = function (likes, comments, commentsRange, descriptions, count) {
  for (var i = 0; i < count; i++) {
    pictures[i] = {
      url: generateUrl(i + 1),
      likes: randomInteger(likes[0], likes[1]),
      comments: getComments(comments, commentsRange),
      description: descriptions[randomInteger(0, descriptions.length - 1)]
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

var getComments = function (comments, commentsRange) {
  var countComments = randomInteger(commentsRange[0], commentsRange[1]);
  var commentItems = [];
  for (var i = 0; i < countComments; i++) {
    commentItems[i] = comments[randomInteger(0, comments.length - 1)];
  }
  return commentItems;
};

var makePicture = function (picture) {
  var similarPictureTemplate = document.querySelector('#picture').content.querySelector('.picture__link');
  var pictureClone = similarPictureTemplate.cloneNode(true);

  pictureClone.querySelector('.picture__img').src = picture.url;
  pictureClone.querySelector('.picture__stat--likes').textContent = picture.likes;
  pictureClone.querySelector('.picture__stat--comments').textContent = picture.comments.length + '';
  return pictureClone;
};

var appendPictures = function (items) {
  var fragmentPictures = document.createDocumentFragment();
  var similarPictures = document.querySelector('.pictures');
  for (var i = 0; i < items.length; i++) {
    fragmentPictures.appendChild(makePicture(items[i]));
  }
  similarPictures.appendChild(fragmentPictures);
};

appendPictures(generatePictures(LIKES_RANGE, COMMENTS, COMMENTS_RANGE, DESCRIPTIONS, PICTURES_COUNT));

var makeComment = function (comment, range) {
  var similarCommentTemplate = document.querySelector('#picture').content.querySelector('.social__comment');
  var commentClone = similarCommentTemplate.cloneNode(true);

  commentClone.querySelector('.social__comment > img').src = 'img/avatar-' + randomInteger(range[0], range[1]) + '.svg';
  commentClone.querySelector('.social__text').textContent = comment;
  return commentClone;
};

var bigPicture = document.querySelector('.big-picture');

var showBigPicture = function (item) {
  var fragmentComments = document.createDocumentFragment();
  bigPicture.classList.remove('hidden');
  var similarComment = document.querySelector('.social__comments');
  for (var i = 0; i < item.comments.length; i++) {
    fragmentComments.appendChild(makeComment(item.comments[i], AVATAR_INDEX_RANGE));
  }
  similarComment.appendChild(fragmentComments);
  bigPicture.querySelector('.big-picture__img img').src = item.url;
  bigPicture.querySelector('.likes-count').textContent = item.likes;
  bigPicture.querySelector('.comments-count').textContent = item.comments.length;
  bigPicture.querySelector('.social__caption').textContent = item.description;
  bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
  bigPicture.querySelector('.social__comment-loadmore').classList.add('visually-hidden');
};

var pictureImg = document.querySelector('.pictures');
var pictureCancel = document.querySelector('.big-picture__cancel');


pictureImg.addEventListener('click', function (evt) {
  if (evt.target.classList.contains('picture__img')) {
    showBigPicture(pictures[evt.target.attributes.src.value.slice(7, -3) - 1]);
  }
});


pictureCancel.addEventListener('click', function () {
  bigPicture.classList.add('hidden');
});

