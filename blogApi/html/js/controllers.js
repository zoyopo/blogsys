var app = angular.module('formCtrlParts', ['oc.lazyLoad','appService','directiveApp']);

app.controller('formCtrl', function ($scope, $http) {
    $scope.User = { userName: '', passWord: '' }
    if(sessionStorage.getItem('user')!=null){
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

                sessionStorage.setItem('user',JSON.stringify(response.data));
                window.location.href = "../html/login.html#!/";
            } else {

                alert(response.statusText);
            }
        }, function errorCallback(response) {

            alert(response.statusText);
        })
    }

})


app.controller('upnavController', function ($scope, $http,$rootScope,blog_finder,requestFactory,requestLogicFactory) {
    $scope.areas = [];
    $scope.blogs = [];
    $scope.kinds = [];
    $scope.if_login=false;
    $scope.login_info=!$scope.if_login;
    $scope.blog_finded={};
    $scope.vis_blogs=false;
    $scope.vis_finded=true;
    $scope.vis_second_menu=true;
    $scope.deals_options_vis=true;
    // $scope.username="";
    params={
        'area':"",
        'kind':""
    }    

    var logic = {
        f1: function (el, status) {
            if (el.status == status) {
                localStorage.setItem('bloglist',JSON.stringify(el.data));
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
        delete:function(el,status){
            if(el.status==status){
                alert('删除成功');
            }else{
                console.log(el);
            }
        },
        update:function(el,status){
            if(el.status==status){
                alert('更新成功');
                  var qes = confirm('是否返回主界面?');
                  if(qes){
                      window.location.href="../html/login.html#!/"
                  }
            }else{
                console.log(el);
            }
        }
    }

       
    $scope.myPromise= requestFactory.reqFuc(requestFactory.req.req_list(params), logic.f1, 200);

//登录之后逻辑
if(sessionStorage.getItem('user')){
    $scope.if_login=true;
    $scope.login_info=!$scope.if_login;
    $scope.username=JSON.parse(sessionStorage.getItem('user'))['userName'];
    $scope.deals_options_vis=false;
    
}

    $scope.clickEve = function (event) {
        var currentElement = event.target;
        paramData = currentElement.innerText;
        params={
            'area':paramData
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
        $scope.myPromise=  requestFactory.reqFuc(requestFactory.req.req_list(params),logic.f1, 200);
        $scope.myPromise=requestFactory.reqFuc(requestFactory.req.req_kinds(params), logic.f2, 200);
        $scope.vis_second_menu=false;
    }
    $scope.mouseLeaveFC=function() {
           $scope.vis_second_menu=true;
    }
    $scope.kindClick = function (event) {
        var currentElement = event.target;
        kind = currentElement.innerText;
        params={
            'area':paramData,
            'kind':kind
        }
        $scope.myPromise=  requestFactory.reqFuc(requestFactory.req.req_list(params),logic.f1, 200);
    }
    $scope.backToCat=function(){
          $scope.vis_finded=true;
        $scope.vis_blogs=!$scope.vis_finded;

    }
    $scope.viewArticle=function(event){
       
     var currentElement = event.target;
    //  if(currentElement.tagName==="ARTICLE"){
          $scope.vis_finded=false;
        $scope.vis_blogs=!$scope.vis_finded;
        //  var blogFinder_Id=function(blogs,id) {
        //         var blog={};
        //     for(let _blog in blogs){
        //         if(blogs[_blog].id==id){
        //            blog= blogs[_blog];
        //         }
        //     }
        //     return blog;
        //  }

         var id= currentElement.parentElement.parentElement.attributes["data-id"].value;
        
         var  storageBlogs=localStorage.getItem('bloglist');
         $scope.blog_finded=blog_finder.blogFinder_Id(JSON.parse(storageBlogs),id);
         localStorage.setItem('blogFinded',JSON.stringify( $scope.blog_finded));
    //  }
}
$scope.updateArticle=function(event){
    var currentElement = event.target;
    var id= currentElement.parentElement.parentElement.attributes["data-id"].value;
   $rootScope.artId=id;
   window.location.href="../html/login.html#!/add";
   
}
//物理删除
$scope.deleteArticle=function(event){
     var currentElement = event.target;
     var id= currentElement.parentElement.parentElement.attributes["data-id"].value;
     var  storageBlogs=localStorage.getItem('bloglist');
     var blogdetail= blog_finder.blogFinder_Id(JSON.parse(storageBlogs),id);
     blogdetail.id=id;
     var conf=confirm('确认删除该篇文章吗?');
     if(conf){
         $scope.myPromise=   requestFactory.reqFuc(requestFactory.req.req_blog_delete(blogdetail),logic.delete,200);
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
    requestFactory.reqFuc(requestFactory.req.req_areas(params),logic.f3, 200);
})

app.controller('addNewBlogCtrl', ['$scope', '$http', '$ocLazyLoad', 'dateFormatService','$rootScope','blog_finder', function ($scope, $http, $ocLazyLoad, dateFormatService,$rootScope,blog_finder) {
    $ocLazyLoad.load('../html/ckeditorjs/ckeditor.js');
    
    $scope.blogdetail = {
        title: '',
        Content: '',
        createDate: '',
        updateTime: '',
        kindName: '',
        areaName: '',
        userId:0
    }
   var artId=$rootScope.artId;
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
        
       
       setTimeout(function() {
            _editor.setData($scope.blogdetail.Content);
       },1000); 
        var  storageBlogs=localStorage.getItem('bloglist');
        $scope.blogdetail=blog_finder.blogFinder_Id(JSON.parse(storageBlogs),artId);
    $scope.addBlogsubmit = function () {
        var content = _editor.document.getBody().getHtml();
        $scope.blogdetail.Content = content;
        $scope.blogdetail.userId=parseInt(JSON.parse(sessionStorage.getItem('user')).id);
        if(artId){
            //更新
           
            $scope.blogdetail.id=artId;
           
            var req={
                method:'put',
                url:'../api/blog/updateBlog',
                 headers: {
                'Content-Type': "application/json"
            },
                data: $scope.blogdetail

            } 

        }else{
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
