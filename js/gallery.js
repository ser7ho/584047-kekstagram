'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var AVATAR_INDEX_RANGE = [1, 6];
  var items;
  var fragmentPictures = document.createDocumentFragment();
  var similarPictures = document.querySelector('.pictures');
  var template = document.querySelector('#picture');
  window.backend.load(function (pictures) {
    items = pictures;
    items.forEach(function (el, i) {
      fragmentPictures.appendChild(makePicture(el, i));
    });
    similarPictures.appendChild(fragmentPictures);
  }, window.utils.error);
  var makePicture = function (item, i) {
    var similarPictureTemplate = template.content.querySelector('.picture__link');
    var pictureClone = similarPictureTemplate.cloneNode(true);
    var pictureImg = pictureClone.querySelector('.picture__img');

    pictureImg.src = item.url;
    pictureImg.dataset.index = i;
    pictureClone.querySelector('.picture__stat--likes').textContent = item.likes;
    pictureClone.querySelector('.picture__stat--comments').textContent = item.comments.length + '';
    return pictureClone;
  };

  similarPictures.addEventListener('click', function (evt) {
    var evtTarget = evt.target;
    if (evtTarget.classList.contains('picture__img')) {
      showBigPicture(items[evtTarget.dataset.index]);
    }
  });

  var makeComment = function (comment, range) {
    var similarCommentTemplate = template.content.querySelector('.social__comment');
    var commentClone = similarCommentTemplate.cloneNode(true);
    commentClone.querySelector('.social__comment > img').src = 'img/avatar-' + window.utils.randomInteger(range[0], range[1]) + '.svg';
    commentClone.querySelector('.social__text').textContent = comment;
    return commentClone;
  };

  var showBigPicture = function (item) {
    var bigPicture = document.querySelector('.big-picture');
    var pictureCancel = document.querySelector('.big-picture__cancel');
    var fragmentComments = document.createDocumentFragment();
    var similarComment = document.querySelector('.social__comments');

    item.comments.forEach(function (el) {
      fragmentComments.appendChild(makeComment(el, AVATAR_INDEX_RANGE));
    });
    similarComment.appendChild(fragmentComments);

    bigPicture.querySelector('.big-picture__img img').src = item.url;
    bigPicture.querySelector('.likes-count').textContent = item.likes;
    bigPicture.querySelector('.comments-count').textContent = item.comments.length;
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
