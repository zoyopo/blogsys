(function () {
    rt.controller('upnavController', function ($scope, $http, $rootScope, blog_finder, requestFactory, requestLogicFactory) {
        $scope.areas = [];
        $scope.blogs = [];
        $scope.kinds = [];
        $scope.if_login = false;
        $scope.login_info = !$scope.if_login;
        $scope.blog_finded = {};
        $scope.vis_blogs = false;
        $scope.vis_finded = true;
        $scope.vis_second_menu = true;
        $scope.deals_options_vis = true;
        // $scope.username="";
        params = {
            'area': "",
            'kind': ""
        }

        var logic = {
            f1: function (el, status) {
                if (el.status == status) {
                    localStorage.setItem('bloglist', JSON.stringify(el.data));
                    $scope.blogs = el.data;
                } else {
                    console.log(el);
                }
            },
            f2: function (el, status) {
                if (el.status == status) {
                    $scope.kinds = el.data;
                } else {
                    console.log(el);
                }
            },
            f3: function (el, status) {
                if (el.status == status) {
                    $scope.areas = el.data;
                } else {
                    console.log(el);
                }
            },
            delete: function (el, status) {
                if (el.status == status) {
                    alert('删除成功');
                } else {
                    console.log(el);
                }
            },
            update: function (el, status) {
                if (el.status == status) {
                    alert('更新成功');
                    var qes = confirm('是否返回主界面?');
                    if (qes) {
                        window.location.href = "../html/login.html#!/"
                    }
                } else {
                    console.log(el);
                }
            }
        }


        requestFactory.reqFuc(requestFactory.req.req_list(params), logic.f1, 200);

        //登录之后逻辑
        if (sessionStorage.getItem('user')) {
            $scope.if_login = true;
            $scope.login_info = !$scope.if_login;
            $scope.username = JSON.parse(sessionStorage.getItem('user'))['userName'];
            $scope.deals_options_vis = false;

        }

        $scope.clickEve = function (event) {
            var currentElement = event.target;
            paramData = currentElement.innerText;
            params = {
                'area': paramData
            }
            //    var req_list={
            //         method:'get',
            //         url:'../api/blog/loadBlog',
            //         params:{
            //             'area' :paramData,                       
            //             'pageNo' :1, 
            //             'pageSize' :10
            //         }

            //    }
            //    $http(req_list).then(function(response){
            //     //console.log(response.data);
            //     $scope.blogs=response.data;
            //    }).catch(function(reason){
            //     console.log(reason);
            //    }
            //    )
            requestFactory.reqFuc(requestFactory.req.req_list(params), logic.f1, 200);
            requestFactory.reqFuc(requestFactory.req.req_kinds(params), logic.f2, 200);
            $scope.vis_second_menu = false;
        }
        $scope.mouseLeaveFC = function () {
            $scope.vis_second_menu = true;
        }
        $scope.kindClick = function (event) {
            var currentElement = event.target;
            kind = currentElement.innerText;
            params = {
                'area': paramData,
                'kind': kind
            }
            requestFactory.reqFuc(requestFactory.req.req_list(params), logic.f1, 200);
        }
        $scope.backToCat = function () {
            $scope.vis_finded = true;
            $scope.vis_blogs = !$scope.vis_finded;

        }
        $scope.viewArticle = function (event) {

            var currentElement = event.target;
            //  if(currentElement.tagName==="ARTICLE"){
            $scope.vis_finded = false;
            $scope.vis_blogs = !$scope.vis_finded;
            //  var blogFinder_Id=function(blogs,id) {
            //         var blog={};
            //     for(let _blog in blogs){
            //         if(blogs[_blog].id==id){
            //            blog= blogs[_blog];
            //         }
            //     }
            //     return blog;
            //  }

            var id = currentElement.parentElement.parentElement.attributes["data-id"].value;

            var storageBlogs = localStorage.getItem('bloglist');
            $scope.blog_finded = blog_finder.blogFinder_Id(JSON.parse(storageBlogs), id);
            localStorage.setItem('blogFinded', JSON.stringify($scope.blog_finded));
            //  }
        }
        $scope.updateArticle = function (event) {
            var currentElement = event.target;
            var id = currentElement.parentElement.parentElement.attributes["data-id"].value;
            $rootScope.artId = id;
            window.location.href = "../html/login.html#!/add";

        }
        //物理删除
        $scope.deleteArticle = function (event) {
            var currentElement = event.target;
            var id = currentElement.parentElement.parentElement.attributes["data-id"].value;
            var storageBlogs = localStorage.getItem('bloglist');
            var blogdetail = blog_finder.blogFinder_Id(JSON.parse(storageBlogs), id);
            blogdetail.id = id;
            var conf = confirm('确认删除该篇文章吗?');
            if (conf) {
                requestFactory.reqFuc(requestFactory.req.req_blog_delete(blogdetail), logic.delete, 200);
            }

        }
        // var req_areas={
        //     method:'get',

        //         url: '../api/blog/loadAreas',
        //         headers: {
        //             'Content-Type': "application/json"
        //         }

        // }
        // $http(req_areas).then(function(response){
        // $scope.areas=response.data;
        // }).catch(function(reason){
        //     console.log(reason);
        // })
        requestFactory.reqFuc(requestFactory.req.req_areas(params), logic.f3, 200);
    })

})();
