var statusCol = function () {
    return {
        restrict: 'E',
        scope: {
            colTitle: "@",
            items: "="
        },
        templateUrl: 'app/directives/status/status-col.html',

        controller: ['$scope', '$mdDialog', function ($scope, $mdDialog) {

            console.log('items', $scope.items);

            $scope.$watch('items[colTitle]', function (model) {
                $scope.modelAsJson = angular.toJson(model, true);
            }, true);
            $scope.addItem = function (ev) {

                $mdDialog.show({
                    clickOutsideToClose: true,
                    scope: $scope,
                    preserveScope: true,
                    targetEvent: ev,

                    templateUrl: 'app/directives/item/item.html',

                    controller: function DialogController($scope, $mdDialog) {
                        $scope.item = {
                            name: '',
                            assignee: '',
                            estimation: '',
                            type: '',
                            deleted: true
                        };

                        $scope.selectedItem = {};
                        $scope.closeDialog = function () {
                            $mdDialog.hide();
                        };
                        $scope.save = function () {
                            console.log($scope.item, $scope.colTitle);
                            $scope.item.id = $scope.items[$scope.colTitle].length;
                            $scope.items[$scope.colTitle].push($scope.item);
                            $scope.closeDialog();
                        }

                        $scope.selected = function (itemId) {
                            $scope.selectedItemId = itemId;
                        }

                        $scope.removeItem = function () {
                            var item = $scope.items[$scope.colTitle].find(function (item) {
                                return item.id == $scope.selectedItemId
                            })
                            item.deleted = true;
                        }
                    }
                })
            }


        }]
    }
};

module.exports = statusCol;