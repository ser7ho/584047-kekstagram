'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var fileChooser = document.querySelector('#upload-file');
  var preview = document.querySelector('.img-upload__preview img');
  var effectsPreview = document.querySelectorAll('.effects__preview');

  fileChooser.addEventListener('change', function () {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    var pasteSrc = function () {
      preview.src = reader.result;
      effectsPreview.forEach(function (el) {
        el.style.backgroundImage = 'url("' + reader.result + '")';
      });
    };

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        pasteSrc();
      });

      reader.readAsDataURL(file);
    }
  });
})();
