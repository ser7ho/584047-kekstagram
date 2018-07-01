'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var AVATAR_INDEX_RANGE = [1, 6];
  var NEW_PICTURES_COUNT = 10;
  var items;
  var itemsOriginal;
  var fragmentPictures = document.createDocumentFragment();
  var similarPictures = document.querySelector('.pictures');
  var template = document.querySelector('#picture');
  var updatePictures = function () {
    items.forEach(function (el, i) {
      fragmentPictures.appendChild(makePicture(el, i));
    });
    similarPictures.appendChild(fragmentPictures);
  };
  window.backend.load(function (pictures) {
    itemsOriginal = pictures.slice();
    items = pictures.slice();
    var imgFilters = document.querySelector('.img-filters');
    imgFilters.classList.remove('img-filters--inactive');
    updatePictures();
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

  var selectFilter = function (filter) {
    filterImg.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    filter.classList.add('img-filters__button--active');
    while (similarPictures.querySelector('a.picture__link')) {
      similarPictures.removeChild(similarPictures.lastChild);
    }
  };

  var sortDiscussed = function () {
    selectFilter(filterDiscussed);
    items = itemsOriginal.slice();
    items.sort(function (b, a) {
      if (a.comments.length > b.comments.length) {
        return 1;
      }
      if (a.comments.length < b.comments.length) {
        return -1;
      }
      return 0;
    });
    updatePictures();
  };

  var sortNew = function () {
    selectFilter(filterNew);
    items.length = 0;
    var indexes = [];
    var randomIndex;
    for (var i = 0; i < NEW_PICTURES_COUNT; i++) {
      do {
        randomIndex = window.utils.randomInteger(0, itemsOriginal.length - 1);
      } while (indexes.indexOf(randomIndex) > -1);
      indexes.push(randomIndex);
      items.push(itemsOriginal[randomIndex]);
    }
    updatePictures();
  };

  var sortPopular = function () {
    selectFilter(filterPopular);
    items = itemsOriginal.slice();
    updatePictures();
  };

  var onFilterClick = window.debounce(function (evt) {
    switch (evt.target) {
      case filterPopular:
        sortPopular();
        break;
      case filterNew:
        sortNew();
        break;
      case filterDiscussed:
        sortDiscussed();
        break;
    }
  });

  var filterImg = document.querySelector('.img-filters');
  var filterPopular = filterImg.querySelector('#filter-popular');
  var filterNew = filterImg.querySelector('#filter-new');
  var filterDiscussed = filterImg.querySelector('#filter-discussed');

  filterImg.addEventListener('click', onFilterClick);
})();
