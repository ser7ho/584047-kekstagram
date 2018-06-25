'use strict';

(function () {
  var AVATAR_INDEX_RANGE = [1, 6];

  var makeComment = function (comment, range) {
    var similarCommentTemplate = document.querySelector('#picture').content.querySelector('.social__comment');
    var commentClone = similarCommentTemplate.cloneNode(true);
    commentClone.querySelector('.social__comment > img').src = 'img/avatar-' + window.utils.randomInteger(range[0], range[1]) + '.svg';
    commentClone.querySelector('.social__text').textContent = comment;
    return commentClone;
  };

  window.showBigPicture = function (evt, item) {
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
      var ESC_KEYCODE = 27;
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
