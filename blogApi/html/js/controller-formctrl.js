(function () {
    rt.controller('formCtrl', function ($scope, $http) {
        $scope.User = { userName: '', passWord: '' }
        if (sessionStorage.getItem('user') != null) {
            window.location.href += "index";
        }

        $scope.postData = function () {
            var userStr = $scope.User;
            var req = {
                method: 'post',
                url: '../api/user/login',
                headers: {
                    'Content-Type': "application/json"
                },
                data: userStr

            }
            $http(req).then(function successCallback(response) {

                if (response.status == 200) {

                    sessionStorage.setItem('user', JSON.stringify(response.data));
                    window.location.href = "../html/login.html#!/";
                } else {

                    alert(response.statusText);
                }
            }, function errorCallback(response) {

                alert(response.statusText);
            })
        }

    })
})();


