'use strict';

(function () {
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
    var ESC_KEYCODE = 27;
    if (evt.keyCode === ESC_KEYCODE && !evt.target.classList.contains('text__hashtags') && !evt.target.classList.contains('text__description')) {
      closeImgUpload();
    }
  };

  var openImgUpload = function () {
    pin.style.left = '100%';
    valueResize.value = '100%';
    window.resize.resizeScale();
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
    minusResize.removeEventListener('click', onMinusResizeClick);
    plusResize.removeEventListener('click', onPlusResizeClick);
    inputComment.value = '';
    requirementElements.forEach(function (el) {
      el.classList = 'valid';
    });
    inputHashtags.setCustomValidity('');
    document.querySelector('.img-upload__scale').classList.add('hidden');
  };

  imgUpload.addEventListener('change', function () {
    openImgUpload();
  });

  cancelUpload.addEventListener('click', function () {
    closeImgUpload();
  });

  var onMinusResizeClick = function () {
    window.resize.setValueResize(false);
    window.resize.resizeScale();
  };

  var onPlusResizeClick = function () {
    window.resize.setValueResize(true);
    window.resize.resizeScale();
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
})();
