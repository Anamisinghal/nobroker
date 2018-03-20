var homeCtrl = function ($scope, API, Flash) {
    $scope.items = {
        TO_DO: [],
        IN_PROGRESS: [],
        DONE: []
    }
};

module.exports = homeCtrl;