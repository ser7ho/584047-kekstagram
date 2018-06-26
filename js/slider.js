'use strict';

(function () {
  window.slider = function (callback) {
    var pin = document.querySelector('.scale__pin');
    pin.addEventListener('mousedown', function (downEvt) {
      downEvt.preventDefault();
      var sliderElem = document.querySelector('.scale__line');
      var sliderLevel = document.querySelector('.scale__level');
      var bar = sliderElem.clientWidth;

      var shiftX = downEvt.clientX - pin.offsetLeft;

      var onPinMousemove = function (moveEvt) {
        moveEvt.preventDefault();
        var pinLeft = (moveEvt.clientX - shiftX) / bar * 100;
        if (pinLeft < 0) {
          pinLeft = 0;
        } else if (pinLeft > 100) {
          pinLeft = 100;
        }
        pin.style.left = pinLeft + '%';
        sliderLevel.style.width = pinLeft + '%';
        callback(pinLeft);
      };

      var onPinMouseup = function () {
        document.removeEventListener('mousemove', onPinMousemove);
        document.removeEventListener('mouseup', onPinMouseup);
      };

      document.addEventListener('mousemove', onPinMousemove);
      document.addEventListener('mouseup', onPinMouseup);
    });
  };
})();
