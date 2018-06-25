'use strict';

(function () {
  window.makePicture = function (item) {
    var similarPictureTemplate = document.querySelector('#picture').content.querySelector('.picture__link');
    var pictureClone = similarPictureTemplate.cloneNode(true);

    pictureClone.querySelector('.picture__img').src = item.url;
    pictureClone.querySelector('.picture__stat--likes').textContent = item.likes;
    pictureClone.querySelector('.picture__stat--comments').textContent = item.comments.length + '';
    return pictureClone;
  };
})();
