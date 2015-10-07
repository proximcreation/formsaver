app.
directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });
                event.preventDefault();
            }
        });
    };
}).
directive('autoheight', ['$timeout', function($timeout){
   return {
      restrict: 'A',
      link: function(scope, element, attrs){
         var elt = element[0];
         $(document).ready(function(){
            $timeout(function(){
               if(attrs.what === 'children'){
                  if(attrs.copy === undefined){
                     $(elt).children().height($(elt).children().first().realWidth()*attrs.rh/attrs.rw);
                  }
                  else if(attrs.copy === 'parent'){
                     $(elt).children().height($(elt).realHeight());
                  }
                  else{
                     $(elt).children().height($(attrs.copy).realHeight());
                  }
               }
               else{
                  if(attrs.copy === undefined){
                     $(elt).height($(elt).realWidth()*attrs.rh/attrs.rw);
                  }
                  else if(attrs.copy === 'parent'){
                     console.log($(elt).parent().realHeight());
                     $(elt).height($(elt).parent().realHeight());
                  }
                  else{
                     $(elt).height($(attrs.copy).realHeight());
                  }
               }
            });
         });
      }
   };
}]).
directive('screenWatch', ['$window', function($window) {
    return {
        restrict : 'A',
        link : function (scope, element, attrs) {
            $(window).resize(function(){
                // console.log($(window).innerWidth());
                scope.$apply(
                    function() {
                        scope.client.screen = {
                            ih : $(window).innerHeight(),
                            iw : $(window).innerWidth(),
                            ri : $(window).innerWidth()/$(window).innerHeight(),
                            h : $window.outerHeight,
                            w: $window.outerWidth,
                            r : $window.outerWidth/$window.outerHeight
                        };
                    }
                );
            });
        }
    };
}]).
directive('scrollWatch', ['$window', function($window) {
    return {
        restrict : 'A',
        link : function (scope, element, attrs) {
            $(window).scroll(function(){
                scope.$apply(function() {
                     scope.scroll = {
                         x : $window.scrollX,
                         y : $window.scrollY
                     };
                 });
            });
        }
    };
}]).
directive('horizontalScroll', ['$window', function($window){
    return {
        restrict: 'A',
        link : function(scope, element, attrs) {
            function scrollHorizontally(e) {
                d = 100;
                e = $window.event || e;
                var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));

                var slider = $(element[0]);
                slider.each(function(){
                    var s = $(this).scrollLeft();
                    $(this).scrollLeft(s - delta*d);
                });

                e.preventDefault();
            }
            if (window.addEventListener) {
                // IE9, Chrome, Safari, Opera
                window.addEventListener("mousewheel", scrollHorizontally, false);
                // Firefox
                window.addEventListener("DOMMouseScroll", scrollHorizontally, false);
            } else {
                // IE 6/7/8
                window.attachEvent("onmousewheel", scrollHorizontally);
            }
        }
    };
}]).
directive('compile', ['$compile', function ($compile) {
    return function(scope, element, attrs) {
        scope.$watch(
            function(scope) {
                // watch the 'compile' expression for changes
                return scope.$eval(attrs.compile);
            },
            function(value) {
                // when the 'compile' expression changes
                // assign it into the current DOM
                element.html(value);

                // compile the new DOM and link it to the current
                // scope.
                // NOTE: we only compile .childNodes so that
                // we don't get into infinite loop compiling ourselves
                $compile(element.contents())(scope);
            }
        );
    };
}]).
directive('autocomplete', ['$compile', function ($compile) {
    return function(scope, element, attrs) {
      scope.newSite = {
			address: {
				street_number: '',
				route: '',
				postal_code: '',
				locality: '',
				country: ''
			}
		};
      var autocomplete = new google.maps.places.Autocomplete(
         $(element)[0],
         { types: ['geocode'] }
      );

      google.maps.event.addListener(
         autocomplete,
         'place_changed',
         function () {
            var place = autocomplete.getPlace();
            for (var i = 0; i < place.address_components.length; i++) {
               var type = place.address_components[i].types[0];
               if (_.has(scope.newSite.address, type)) {
                  scope.newSite.address[type] = place.address_components[i].long_name;
               }
            }
            scope.newSite.address.formatted_address = place.formatted_address;
            scope.$apply();
         }
      );
    };
}]);
