;(function () {
    var search = (function () {
      /* Select the input where the keywords will be retrieved */
      var searchbox = document.getElementsByClassName('search')[0];
  
      /* To every key pressed and released */
      searchbox.onkeyup = function () {
        /**
         * This will fix a simple problem: When the search input is empty after
         * trying to find a keyword, it selects all the elements and highlight
         */
        var keywords = searchbox.value.trim().length > 0 ?
                       new RegExp(searchbox.value.trim(), "gi") :
                       '';
  
        /* Define the postTitles where the search will run */
        var postTitles = document.getElementsByClassName('post__title');
  
        /* Map all the postTitles */
        for (var i = 0; i < postTitles.length; i++) {
          var title = postTitles[i]; /* Easier to read */
  
          if (title.innerHTML.match(keywords) && keywords !== '') {
            /* If the element don't have the highlight class, it will add one */
            if (!title.parentNode.className.match('highlight')) {
              title.parentNode.className = title.parentNode.className +
                                           ' highlight';
            }
          } else {
            /**
             * Remove all the highlight classes inside the parent node of the
             * title if it didn't match with the keywords searched.
             */
            title.parentNode.className = title.parentNode.className
                                              .replace(/\s*highlight\s*/g, '');
          }
        }
      };
    })();
  })();