(function () {
    rt.directive('jsLoading', function () {

        return {
            restrict: "EA",
            template: '<script src="../html/ckeditorjs/ckeditor.js"></script>'
        }
    })
    rt.directive('comjsLoading', function () {
        return {
            restrict: "EA",
            template: '<script> CKEDITOR.replace("blog_content");</script>'
        }
    })

    rt.directive('repeatDir', function ($compile) {
        return {
            restrict: 'AE',
            replace: true,

            link: function ($scope, $elem, attrs) {
                $scope.$watch('blogs', function (oldVal, newVal) {
                    var elements = "";
                    angular.forEach($scope.blogs, function (element) {
                        elements += ['<div class=article-box data-id=' + element.id + '>',
                        '<article>', '<h3  ng-click="viewArticle($event)">' + element.title + '</h3>', element.Content, '</article>',
                      '<div class="time-stamp">', '<label>创建于:</label>', '<time>', element.createDate == null ? element.createDate : element.createDate.replace('T', ' '), '</time>', '</div>',
                        '<div class="deal-options" ng-hide="deals_options_vis">', '&nbsp<a href="javascript:void(0);" ng-click="updateArticle($event)">更新</a>', '&nbsp<a href="javascript:void(0);"ng-click="deleteArticle($event)">删除</a>', '</div>',
                        '</div>'].join('');
                    });
                    //先将元素进行编译绑定点击事件，再添加
                    var t = $compile(elements)($scope);
                    //If IE is your primary browser, innerHTML is recommended to increase the performance
                    // $elem.context.innerHTML = elements;
                    //If IE is not your primary browser, just appending the content to the element is enough 
                    $elem.empty();
                    $elem.append(t);
                    //    angular.forEach($elem[0].children,function(element){
                    //        element.children[0].addEventListener('click',function(){
                    //            $scope.viewArticle(element.children[0]);
                    //        })
                    //    })
                })
            }
        }

    })
    rt.directive('blogFinded', function ($compile) {
        return {
            replace: true,
            link: function ($scope, $elem, attrs) {
                $scope.$watch('blog_finded', function (oldVal, newVal) {
                    var element = $scope.blog_finded;

                    var elements = ['<section>', '<div class="back"><i class="icon-back"></i><span class="back-sign" ng-click="backToCat()">返回</span>&nbsp&nbsp<a href="../html/views/reader.html">更换阅读模式</a></div>', '<h1>' + element.title + '</h1>',
                      '<article>', element.Content, '</article>',
                      '<div class="time-stamp">', '<label>创建于:</label>', '<span>' + element.createDate.replace('T', ' ') + '</span>', '</div>',
                      '</section'].join('');

                    //If IE is your primary browser, innerHTML is recommended to increase the performance
                    // $elem.context.innerHTML = elements;
                    //If IE is not your primary browser, just appending the content to the element is enough 
                    var t = $compile(elements)($scope);
                    $elem.empty();
                    $elem.append(t);
                })
            }
        }

    })
})();
