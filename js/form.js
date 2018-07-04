'use strict';

(function () {
  var STEP = 25;
  var SIZE_MAX = 100;
  var SIZE_MIN = 25;
  var ESC_KEYCODE = 27;
  var pictureItems = document.querySelector('.pictures');
  var imgUpload = pictureItems.querySelector('#upload-file');
  var imgUploadOverlay = pictureItems.querySelector('.img-upload__overlay');
  var cancelUpload = pictureItems.querySelector('.img-upload__cancel');
  var pin = imgUploadOverlay.querySelector('.scale__pin');
  var effectsList = document.querySelector('.effects__list');
  var imgUploadPreview = imgUploadOverlay.querySelector('.img-upload__preview');
  var inputComment = document.querySelector('.text__description');
  var requirementElements = document.querySelectorAll('.text__hashtags + .text__requirements li');
  var inputHashtags = document.querySelector('.text__hashtags');
  var imgResize = document.querySelector('.img-upload__resize');
  var plusResize = imgResize.querySelector('.resize__control--plus');
  var minusResize = imgResize.querySelector('.resize__control--minus');
  var valueResize = imgResize.querySelector('.resize__control--value');

  var onImgUploadEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE && !evt.target.classList.contains('text__hashtags') && !evt.target.classList.contains('text__description')) {
      window.form.closeImgUpload();
    }
  };

  var openImgUpload = function () {
    pin.style.left = '100%';
    valueResize.value = '100%';
    resize.resizeScale();
    imgUploadOverlay.classList.remove('hidden');
    document.addEventListener('keydown', onImgUploadEscPress);
    effectsList.addEventListener('click', onEffectsClick);
    minusResize.addEventListener('click', onMinusResizeClick);
    plusResize.addEventListener('click', onPlusResizeClick);
  };

  window.form = {
    closeImgUpload: function () {
      imgUploadOverlay.classList.add('hidden');
      document.removeEventListener('keydown', onImgUploadEscPress);
      effectsList.removeEventListener('click', onEffectsClick);
      imgUploadPreview.classList.remove(imgUploadPreview.classList[1]);
      imgUploadPreview.style.filter = '';
      minusResize.removeEventListener('click', onMinusResizeClick);
      plusResize.removeEventListener('click', onPlusResizeClick);
      inputComment.value = '';
      requirementElements.forEach(function (el) {
        el.classList = 'valid';
      });
      inputHashtags.setCustomValidity('');
      document.querySelector('.img-upload__scale').classList.add('hidden');
    }
  };

  imgUpload.addEventListener('change', function () {
    openImgUpload();
  });

  cancelUpload.addEventListener('click', function () {
    window.form.closeImgUpload();
  });

  var onMinusResizeClick = function () {
    resize.setValueResize(false);
    resize.resizeScale();
  };

  var onPlusResizeClick = function () {
    resize.setValueResize(true);
    resize.resizeScale();
  };

  var onEffectsClick = function (evt) {
    var scale = document.querySelector('.img-upload__scale');
    if (evt.target.classList.contains('effects__preview')) {
      imgUploadPreview.classList.remove(imgUploadPreview.classList[1]);
      imgUploadPreview.classList.add(evt.target.classList[1]);
      imgUploadPreview.style.filter = '';
      pin.style.left = '';
      document.querySelector('.scale__level').style.width = '';
      scale.classList.remove('hidden');
    } if (evt.target.classList.contains('effects__preview--none')) {
      scale.classList.add('hidden');
    }
  };

  var resize = {
    resizeScale: function () {
      imgUploadPreview.style.transform = 'scale(' + parseInt(valueResize.value, 10) / 100 + ')';
    },
    setValueResize: function (isPlus) {
      if (isPlus) {
        if (parseInt(valueResize.value, 10) < SIZE_MAX) {
          valueResize.value = parseInt(valueResize.value, 10) + STEP + '%';
        }
      } else if (parseInt(valueResize.value, 10) > SIZE_MIN) {
        valueResize.value = parseInt(valueResize.value, 10) - STEP + '%';
      }
    }
  };

  var form = document.querySelector('.img-upload__form');

  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), function () {
      window.form.closeImgUpload();
    }, window.utils.error);
    evt.preventDefault();
    window.utils.removeError();
  });
})();
