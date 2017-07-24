(function () {
    'use strict'
    angular.module('settings', ["ngResource"])
    .constant("appSettings", {
        serverPath: "http://localhost:1931/"
    })

}())