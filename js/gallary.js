'use strict';

(function () {
  var items = window.utils.generatePictures();
  var fragmentPictures = document.createDocumentFragment();
  var similarPictures = document.querySelector('.pictures');

  items.forEach(function (el) {
    fragmentPictures.appendChild(window.makePicture(el));
  });
  similarPictures.appendChild(fragmentPictures);

  similarPictures.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('picture__img')) {
      window.showBigPicture(evt, items[evt.target.attributes.src.value.slice(7, -3) - 1]);
    }
  });

})();
