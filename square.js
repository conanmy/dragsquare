angular.module('square', ['ngRoute'])
.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      controller:'SquareController',
      templateUrl:'square.html'
    })
    .otherwise({
      redirectTo:'/'
    });
})
.directive('draggable', ['$document' , function($document) {
  return {
    restrict: 'A',
    link: function(scope, elm, attrs) {
      var startX, startY, initialMouseX, initialMouseY;
      elm.css({position: 'absolute'});

      elm.bind('mousedown', function($event) {
        startX = elm.prop('offsetLeft');
        startY = elm.prop('offsetTop');
        initialMouseX = $event.clientX;
        initialMouseY = $event.clientY;
        $document.bind('mousemove', mousemove);
        $document.bind('mouseup', mouseup);
        return false;
      });

      function mousemove($event) {
        var dx = $event.clientX - initialMouseX;
        var dy = $event.clientY - initialMouseY;
        elm.css({
          top:  startY + dy + 'px',
          left: startX + dx + 'px'
        });
        scope[attrs.onMouseMove]({top: startY + dy, left: startX + dx});
        return false;
      }

      function mouseup() {
        $document.unbind('mousemove', mousemove);
        $document.unbind('mouseup', mouseup);
      }
    }
  };
}])
.controller('SquareController', ['$scope', function($scope) {
  var squareWidth = 100;
  var squareHeight = 100;

  var square1 = {
    left: 0,
    top: 0
  };

  var square2 = {
    left: 300,
    top: 300
  };

  $scope.square1Style = {};
  $scope.square1Style.width = squareWidth;
  $scope.square1Style.height = squareWidth;
  $scope.square1Style.left = square1.left + 'px';
  $scope.square1Style.top = square1.top + 'px';

  $scope.square2Style = {};
  $scope.square2Style.width = squareWidth;
  $scope.square2Style.height = squareWidth;
  $scope.square2Style.left = square2.left + 'px';
  $scope.square2Style.top = square2.top + 'px';

  $scope.onSquare1MouseMove = function(position) {
    square1.left = position.left;
    square1.top = position.top;
    calculateOverlap();
    $scope.$apply();
  };

  $scope.onSquare2MouseMove = function(position) {
    square2.left = position.left;
    square2.top = position.top;
    calculateOverlap();
    $scope.$apply();
  };

  var overlapSquare = {};
  $scope.overlapSquareStyle = {};
  $scope.overlapArea = 0;

  calculateOverlap();

  function calculateOverlap() {
    overlapSquare.left = Math.max(square1.left, square2.left);
    overlapSquare.right = Math.min(square1.left + squareWidth, square2.left + squareWidth);
    overlapSquare.top = Math.max(square1.top, square2.top);
    overlapSquare.bottom = Math.min(square1.top + squareWidth, square2.top + squareWidth);

    $scope.overlapSquareStyle.left = overlapSquare.left + 'px';
    $scope.overlapSquareStyle.top = overlapSquare.top + 'px';
    $scope.overlapSquareStyle.width = overlapSquare.right - overlapSquare.left;
    $scope.overlapSquareStyle.height = overlapSquare.bottom - overlapSquare.top;

    $scope.overlapArea = Math.max(0, $scope.overlapSquareStyle.width) * Math.max(0, $scope.overlapSquareStyle.height);
  }

}]);