'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var AVATAR_INDEX_RANGE = [1, 6];
  var items = window.utils.generatePictures();
  var fragmentPictures = document.createDocumentFragment();
  var similarPictures = document.querySelector('.pictures');
  var makePicture = function (item) {
    var similarPictureTemplate = document.querySelector('#picture').content.querySelector('.picture__link');
    var pictureClone = similarPictureTemplate.cloneNode(true);

    pictureClone.querySelector('.picture__img').src = item.url;
    pictureClone.querySelector('.picture__stat--likes').textContent = item.likes;
    pictureClone.querySelector('.picture__stat--comments').textContent = item.comments.length + '';
    return pictureClone;
  };

  items.forEach(function (el) {
    fragmentPictures.appendChild(makePicture(el));
  });
  similarPictures.appendChild(fragmentPictures);

  similarPictures.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('picture__img')) {
      showBigPicture(evt, items[evt.target.attributes.src.value.slice(7, -3) - 1]);
    }
  });

  var makeComment = function (comment, range) {
    var similarCommentTemplate = document.querySelector('#picture').content.querySelector('.social__comment');
    var commentClone = similarCommentTemplate.cloneNode(true);
    commentClone.querySelector('.social__comment > img').src = 'img/avatar-' + window.utils.randomInteger(range[0], range[1]) + '.svg';
    commentClone.querySelector('.social__text').textContent = comment;
    return commentClone;
  };

  var showBigPicture = function (evt, item) {
    var bigPicture = document.querySelector('.big-picture');
    var pictureCancel = document.querySelector('.big-picture__cancel');
    var fragmentComments = document.createDocumentFragment();
    var similarComment = document.querySelector('.social__comments');
    var evtPicture = evt.path[1];

    item.comments.forEach(function (el) {
      fragmentComments.appendChild(makeComment(el, AVATAR_INDEX_RANGE));
    });
    similarComment.appendChild(fragmentComments);

    bigPicture.querySelector('.big-picture__img img').src = evt.target.attributes.src.value;
    bigPicture.querySelector('.likes-count').textContent = evtPicture.querySelector('.picture__stat--likes').textContent;
    bigPicture.querySelector('.comments-count').textContent = evtPicture.querySelector('.picture__stat--comments').textContent;
    bigPicture.querySelector('.social__caption').textContent = item.description;
    bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
    bigPicture.querySelector('.social__loadmore').classList.add('visually-hidden');
    bigPicture.classList.remove('hidden');

    var onCancelClick = function () {
      closePicture();
    };
    var onEscPress = function (evtEsc) {
      if (evtEsc.keyCode === ESC_KEYCODE) {
        closePicture();
      }
    };
    var closePicture = function () {
      bigPicture.classList.add('hidden');
      while (similarComment.firstChild) {
        similarComment.removeChild(similarComment.firstChild);
      }
      document.removeEventListener('click', onCancelClick);
      document.removeEventListener('keydown', onEscPress);
    };

    pictureCancel.addEventListener('click', onCancelClick);
    document.addEventListener('keydown', onEscPress);
  };
})();
