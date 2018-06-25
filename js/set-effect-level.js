'use strict';

(function () {
  window.setEffectLevel = function (pinLevel) {
    var imgUploadPreview = document.querySelector('.img-upload__preview');
    var EFFECTS =
      {
        'effects__preview--chrome': 1,
        'effects__preview--sepia': 1,
        'effects__preview--marvin': 100,
        'effects__preview--phobos': 5,
        'effects__preview--heat': 2
      };
    for (var key in EFFECTS) {
      if (key === imgUploadPreview.classList[1]) {
        var level = scaleLevel(EFFECTS[key], pinLevel);
        setFilter(key, level);
        break;
      }
    }
  };

  var setFilter = function (filterName, level) {
    var effectFilter = document.querySelector('.img-upload__preview');
    if (filterName === ('effects__preview--chrome')) {
      effectFilter.style.filter = 'grayscale(' + level + ')';
    } else if (filterName === ('effects__preview--sepia')) {
      effectFilter.style.filter = 'sepia(' + level + ')';
    } else if (filterName === ('effects__preview--marvin')) {
      effectFilter.style.filter = 'invert(' + level + '%)';
    } else if (filterName === ('effects__preview--phobos')) {
      effectFilter.style.filter = 'blur(' + level + 'px)';
    } else if (filterName === ('effects__preview--heat')) {
      effectFilter.style.filter = 'brightness(' + (level + 1) + ')';
    }
  };

  var scaleLevel = function (filterLevel, percent) {
    return filterLevel / 100 * percent;
  };
})();
