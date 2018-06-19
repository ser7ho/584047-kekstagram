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
// --- imgUpload -------------------------------------------------------------------------------------------------------

var pictureItems = document.querySelector('.pictures');
var imgUpload = pictureItems.querySelector('#upload-file');
var imgUploadOverlay = pictureItems.querySelector('.img-upload__overlay');
var cancelUpload = pictureItems.querySelector('.img-upload__cancel');
var pin = imgUploadOverlay.querySelector('.scale__pin');
var effectsList = document.querySelector('.effects__list');
var imgUploadPreview = imgUploadOverlay.querySelector('.img-upload__preview');

var onImgUploadEscPress = function (evt) {
  var ESC_KEYCODE = 27;
  if (evt.keyCode === ESC_KEYCODE && !evt.target.classList.contains('text__hashtags') && !evt.target.classList.contains('text__description')) {
    closeImgUpload();
  }
};

var openImgUpload = function () {
  pin.style.left = '100%';
  valueResize.value = '100%';
  resizeScale();
  imgUploadOverlay.classList.remove('hidden');
  document.addEventListener('keydown', onImgUploadEscPress);
  effectsList.addEventListener('click', onEffectsClick);
  minusResize.addEventListener('click', onMinusResizeClick);
  plusResize.addEventListener('click', onPlusResizeClick);
};

var closeImgUpload = function () {
  imgUploadOverlay.classList.add('hidden');
  document.removeEventListener('keydown', onImgUploadEscPress);
  effectsList.removeEventListener('click', onEffectsClick);
  imgUploadPreview.classList.remove(imgUploadPreview.classList[1]);
  pin.removeEventListener('mouseup', onPinMouseup);
  minusResize.removeEventListener('click', onMinusResizeClick);
  plusResize.removeEventListener('click', onPlusResizeClick);
};

imgUpload.addEventListener('change', function () {
  openImgUpload();
});

cancelUpload.addEventListener('click', function () {
  closeImgUpload();
});

// ---------------------------------------------------------------------------------------------------------------------

// --- effects -------------------------------------------------------------------------------------------------------

var onEffectsClick = function (evt) {
  pin.addEventListener('mouseup', onPinMouseup);
  if (evt.target.classList.contains('effects__preview')) {
    imgUploadPreview.classList.remove(imgUploadPreview.classList[1]);
    imgUploadPreview.classList.add(evt.target.classList[1]);
    imgUploadPreview.style.filter = '';
  }
};
// ---------------------------------------------------------------------------------------------------------------------

// --- slider ----------------------------------------------------------------------------------------------------------

var onPinMouseup = function (evt) {
  var BAR = 453;
  setEffectLevel(evt.target.offsetLeft / BAR * 100);
};

var setEffectLevel = function (pinLevel) {
  var EFFECTS =
    {
      'effects__preview--chrome': 1,
      'effects__preview--sepia': 1,
      'effects__preview--marvin': 100,
      'effects__preview--phobos': 5,
      'effects__preview--heat': 2
    };
  for (var key in EFFECTS) {
    if (key === imgUploadPreview.classList[1]) {
      var level = scaleLevel(EFFECTS[key], pinLevel);
      setFilter(key, level);
      break;
    }
  }
};

var setFilter = function (filterName, level) {
  var effectFilter = document.querySelector('.img-upload__preview');
  if (filterName === ('effects__preview--chrome')) {
    effectFilter.style.filter = 'grayscale(' + level + ')';
  } else if (filterName === ('effects__preview--sepia')) {
    effectFilter.style.filter = 'sepia(' + level + ')';
  } else if (filterName === ('effects__preview--marvin')) {
    effectFilter.style.filter = 'invert(' + level + '%)';
  } else if (filterName === ('effects__preview--phobos')) {
    effectFilter.style.filter = 'blur(' + level + 'px)';
  } else if (filterName === ('effects__preview--heat')) {
    effectFilter.style.filter = 'brightness(' + (level + 1) + ')';
  }
};

var scaleLevel = function (filterLevel, percent) {
  return filterLevel / 100 * percent;
};

// ---------------------------------------------------------------------------------------------------------------------

// --- resize ----------------------------------------------------------------------------------------------------------

var imgResize = document.querySelector('.img-upload__resize');
var plusResize = imgResize.querySelector('.resize__control--plus');
var minusResize = imgResize.querySelector('.resize__control--minus');
var valueResize = imgResize.querySelector('.resize__control--value');

var STEP = 25;
var SIZE_MAX = 100;
var SIZE_MIN = 25;

var resizeScale = function () {
  imgUploadPreview.style.transform = 'scale(' + parseInt(valueResize.value, 10) / 100 + ')';
};

var setValueResize = function (isPlus) {
  if (isPlus) {
    if (parseInt(valueResize.value, 10) < SIZE_MAX) {
      valueResize.value = parseInt(valueResize.value, 10) + STEP + '%';
    }
  } else if (parseInt(valueResize.value, 10) > SIZE_MIN) {
    valueResize.value = parseInt(valueResize.value, 10) - STEP + '%';
  }
};

var onMinusResizeClick = function () {
  setValueResize(false);
  resizeScale();
};

var onPlusResizeClick = function () {
  setValueResize(true);
  resizeScale();
};

// ---------------------------------------------------------------------------------------------------------------------

// hashtags validity ------------------------------------------------------------------------------------------------------

(function () {

  var REGEXP = /[^\S]+/g;
  var invalidities = [];

  var addInvalidity = function (message) {
    invalidities.push(message);
  };
  var getInvalidities = function () {
    return invalidities.join('. \n');
  };
  var convertToArray = function (input) {
    var arrayHashtags = input.value.split(REGEXP);
    for (var i = 0; i < arrayHashtags.length; i++) {
      if (arrayHashtags[i] === '') {
        arrayHashtags.splice(i);
      }
    }
    return arrayHashtags;
  };
  var checkValidity = function (input) {
    invalidities.length = 0;
    for (var i = 0; i < hashtagsValidityChecks.length; i++) {

      var isInvalid = hashtagsValidityChecks[i].isInvalid(convertToArray(input));
      if (isInvalid) {
        addInvalidity(hashtagsValidityChecks[i].invalidityMessage);
      }

      var requirementElement = hashtagsValidityChecks[i].element;
      if (requirementElement) {
        if (isInvalid) {
          requirementElement.classList.add('invalid');
          requirementElement.classList.remove('valid');
        } else {
          requirementElement.classList.remove('invalid');
          requirementElement.classList.add('valid');
        }

      }
    }
  };

  function checkInput(input) {

    checkValidity(input);

    if (invalidities.length === 0 && input.value === '') {
      input.setCustomValidity('');
    } else {
      var message = getInvalidities();
      input.setCustomValidity(message);
    }
  }

  var hashtagsValidityChecks = [
    {
      isInvalid: function (arrayHashtags) {
        return arrayHashtags.length > 5;
      },
      invalidityMessage: 'укажите не больше пяти хэш-тегов',
      element: document.querySelector('.text__hashtags + .text__requirements li:nth-child(1)')
    },
    {
      isInvalid: function (arrayHashtags) {
        for (var i = 0; i < arrayHashtags.length - 1; i++) {
          for (var j = i + 1; j < arrayHashtags.length; j++) {
            if (arrayHashtags[i].toLowerCase() === arrayHashtags[j].toLowerCase() && arrayHashtags[i] !== '') {
              return true;
            }
          }
        }
        return false;
      },
      invalidityMessage: 'один и тот же хэш-тег не может быть использован дважды',
      element: document.querySelector('.text__hashtags + .text__requirements li:nth-child(2)')
    },
    {
      isInvalid: function (arrayHashtags) {
        if (arrayHashtags.length !== 0) {
          for (var i = 0; i < arrayHashtags.length; i++) {
            if ((arrayHashtags[i].length < 2 && arrayHashtags[i] !== '') || arrayHashtags[i].length > 20) {
              return true;
            }
          }
        }
        return false;
      },
      invalidityMessage: 'длина одного хэш-тега от 2 до 20 символов, включая решётку',
      element: document.querySelector('.text__hashtags + .text__requirements li:nth-child(3)')
    },
    {
      isInvalid: function (arrayHashtags) {
        if (arrayHashtags.length !== 0) {
          for (var i = 0; i < arrayHashtags.length; i++) {
            if (arrayHashtags[i].charAt(0) !== '#' && arrayHashtags[i] !== '') {
              return true;
            }
          }
        }
        return false;
      },
      invalidityMessage: 'хэш-тег начинается с символа # (решётка)',
      element: document.querySelector('.text__hashtags + .text__requirements li:nth-child(4)')
    },
    {
      isInvalid: function (arrayHashtags) {
        for (var i = 0; i < arrayHashtags.length; i++) {
          if (~arrayHashtags[i].indexOf('#', 1) && arrayHashtags[i] !== '') {
            return true;
          }
        }
        return false;
      },
      invalidityMessage: 'хэш-теги разделяются пробелами',
      element: document.querySelector('.text__hashtags + .text__requirements li:nth-child(5)')
    }
  ];

  var inputHashtags = document.querySelector('.text__hashtags');

  inputHashtags.addEventListener('keyup', function () {
    checkInput(inputHashtags);
  });
  inputHashtags.addEventListener('change', function () {
    inputHashtags.value = inputHashtags.value.split(REGEXP).join(' ');
  });

})();

// ---------------------------------------------------------------------------------------------------------------------

// comments ------------------------------------------------------------------------------------------------------------
(function () {
  var MAX_LENGTH = 140;
  var inputComment = document.querySelector('.text__description');
  var textCount = document.querySelector('.text__count');

  var checkComment = function () {
    textCount.textContent = 'Осталось символов ' + (MAX_LENGTH - inputComment.value.length);
  };

  inputComment.addEventListener('keyup', function () {
    checkComment();
  });
})();
// ---------------------------------------------------------------------------------------------------------------------
