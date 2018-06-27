'use strict';

(function () {
  window.slider(function (pinLevel) {
    var effect = document.querySelector('input[name="effect"]:checked');
    var EFFECTS =
      {
        'chrome': 1,
        'sepia': 1,
        'marvin': 100,
        'phobos': 5,
        'heat': 2
      };
    for (var key in EFFECTS) {
      if (key === effect.value) {
        var level = scaleLevel(EFFECTS[key], pinLevel);
        setFilter(key, level);
        break;
      }
    }
  });

  var setFilter = function (filterName, level) {
    var effectFilter = document.querySelector('.img-upload__preview');
    switch (filterName) {
      case 'chrome':
        effectFilter.style.filter = 'grayscale(' + level + ')';
        break;
      case 'sepia':
        effectFilter.style.filter = 'sepia(' + level + ')';
        break;
      case 'marvin':
        effectFilter.style.filter = 'invert(' + level + '%)';
        break;
      case 'phobos':
        effectFilter.style.filter = 'blur(' + level + 'px)';
        break;
      case 'heat':
        effectFilter.style.filter = 'brightness(' + (level + 1) + ')';
        break;
    }
  };

  var scaleLevel = function (filterLevel, percent) {
    return filterLevel / 100 * percent;
  };
})();
