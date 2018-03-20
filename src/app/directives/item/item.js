var itemDialog = function () {
    return {
        restrict: 'E',
        scope: {
            colTitle: "@"
        },
        templateUrl: 'app/directives/item/item.html',
        controller: ['$scope', function ($scope) {
            var save = function () {

            }

            var close = function () {

            }
        }]
    }
};

module.exports = itemDialog;