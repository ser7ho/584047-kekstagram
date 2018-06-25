'use strict';

(function () {
  var inputHashtags = document.querySelector('.text__hashtags');
  var invalidities = [];

  var addInvalidity = function (message) {
    invalidities.push(message);
  };
  var getInvalidities = function () {
    return invalidities.join('. \n');
  };
  var convertToArray = function (input) {
    var hashtags = input.value.split(' ');
    var arrayHashtags = [];
    hashtags.forEach(function (el) {
      if (el !== '') {
        arrayHashtags.push(el);
      }
    });
    return arrayHashtags;
  };
  var checkValidity = function (input) {
    invalidities.length = 0;
    var arrayHashtags = convertToArray(input);
    hashtagsValidityChecks.forEach(function (el) {
      var isInvalid = el.isInvalid(arrayHashtags);
      if (isInvalid) {
        addInvalidity(el.invalidityMessage);
      }

      var requirementElement = el.element;
      if (requirementElement) {
        if (isInvalid) {
          requirementElement.classList.add('invalid');
          requirementElement.classList.remove('valid');
        } else {
          requirementElement.classList.remove('invalid');
          requirementElement.classList.add('valid');
        }
      }
    });
  };

  var checkInput = function (input) {
    if (input.length !== 0) {
      checkValidity(input);
    }
    if (invalidities.length === 0 && input.value === '') {
      input.setCustomValidity('');
    } else {
      var message = getInvalidities();
      input.setCustomValidity(message);
    }
  };

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
            if (arrayHashtags[i].toLowerCase() === arrayHashtags[j].toLowerCase()) {
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
        for (var i = 0; i < arrayHashtags.length; i++) {
          if ((arrayHashtags[i].length < 2) || arrayHashtags[i].length > 20) {
            return true;
          }
        }
        return false;
      },
      invalidityMessage: 'длина одного хэш-тега от 2 до 20 символов, включая решётку',
      element: document.querySelector('.text__hashtags + .text__requirements li:nth-child(3)')
    },
    {
      isInvalid: function (arrayHashtags) {
        for (var i = 0; i < arrayHashtags.length; i++) {
          if (arrayHashtags[i].charAt(0) !== '#') {
            return true;
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
          if (~arrayHashtags[i].indexOf('#', 1)) {
            return true;
          }
        }
        return false;
      },
      invalidityMessage: 'хэш-теги разделяются пробелами',
      element: document.querySelector('.text__hashtags + .text__requirements li:nth-child(5)')
    }
  ];

  inputHashtags.addEventListener('keyup', function () {
    checkInput(inputHashtags);
  });

})();
