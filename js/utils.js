'use strict';

(function () {

  window.utils = {
    randomInteger: function (min, max) {
      var rand = min + Math.random() * (max + 1 - min);
      return Math.floor(rand);
    },
    error: function (message, flag) {
      form.appendChild(makeError(message, flag));
      form.querySelector('.error__another').addEventListener('click', function () {
        window.utils.removeError();
        window.form.closeImgUpload();
      });
    },
    removeError: function () {
      var errorElement = form.querySelector('.img-upload__message--error');
      if (errorElement) {
        form.removeChild(errorElement);
      }
    }
  };

  var form = document.querySelector('.img-upload__form');
  var makeError = function (message, flag) {
    var template = document.querySelector('#picture');
    var errorTemplate = template.content.querySelector('.img-upload__message--error');
    var errorClone = errorTemplate.cloneNode(true);
    if (flag) {
      errorClone.querySelector('.error__repeat').type = 'button';
      errorClone.querySelector('.error__repeat').onclick = function () {
        window.location.reload();
      };
    }
    errorClone.querySelector('.error__message').textContent = message;
    document.querySelector('.img-upload__overlay').classList.add('hidden');
    return errorClone;
  };
})();
