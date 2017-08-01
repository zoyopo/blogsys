(function () {
    rt.controller('addNewBlogCtrl', ['$scope', '$http', '$ocLazyLoad', 'dateFormatService', '$rootScope', 'blog_finder', function ($scope, $http, $ocLazyLoad, dateFormatService, $rootScope, blog_finder) {
        $ocLazyLoad.load('../html/ckeditorjs/ckeditor.js');

        $scope.blogdetail = {
            title: '',
            Content: '',
            createDate: '',
            updateTime: '',
            kindName: '',
            areaName: '',
            userId: 0
        }
        var artId = $rootScope.artId;
        //根据id取出缓存中的blog,此方法应封装成服务
        //  var blogFinder_Id=function(blogs,id) {
        //             var blog={};
        //         for(let _blog in blogs){
        //             if(blogs[_blog].id==id){
        //                blog= blogs[_blog];
        //             }
        //         }
        //         return blog;
        //      }


        setTimeout(function () {
            _editor.setData($scope.blogdetail.Content);
        }, 1000);
        var storageBlogs = localStorage.getItem('bloglist');
        $scope.blogdetail = blog_finder.blogFinder_Id(JSON.parse(storageBlogs), artId);
        $scope.addBlogsubmit = function () {
            var content = _editor.document.getBody().getHtml();
            $scope.blogdetail.Content = content;
            $scope.blogdetail.userId = parseInt(JSON.parse(sessionStorage.getItem('user')).id);
            if (artId) {
                //更新

                $scope.blogdetail.id = artId;

                var req = {
                    method: 'put',
                    url: '../api/blog/updateBlog',
                    headers: {
                        'Content-Type': "application/json"
                    },
                    data: $scope.blogdetail

                }

            } else {
                //新增

                $scope.blogdetail.createDate = dateFormatService.format();
                var req = {
                    method: 'post',
                    url: '../api/blog/saveBlog',
                    headers: {
                        'Content-Type': "application/json"
                    },
                    data: $scope.blogdetail


                }
            }
            $http(req).then(function (response) {
                if (response.status == '201') {
                    var qes = confirm('提交成功!主人,再来一次吗?');
                    if (qes) {
                        window.location.reload();
                    } else {
                        window.location.href = "../html/login.html#!/index";
                    }
                }
            }).catch(function (reason) {
                console.log(reason);
            })
        }
    }])
})();
