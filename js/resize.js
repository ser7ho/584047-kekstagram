'use strict';

(function () {

  var STEP = 25;
  var SIZE_MAX = 100;
  var SIZE_MIN = 25;

  var valueResize = document.querySelector('.resize__control--value');
  var imgUploadPreview = document.querySelector('.img-upload__preview');

  window.resize = {
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
})();
