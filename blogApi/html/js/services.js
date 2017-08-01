(function(){
    rt.service('dateFormatService',function(){
        var dt=new  Date();
        var funcFormat=function(datePart){
            return(datePart>=10)?datePart:'0'+datePart;
        }


        this.format=function(){
            var dtFormatStr = dt.getFullYear()+'-'+funcFormat(dt.getMonth()+1)+'-'+funcFormat(dt.getDate())+" "+funcFormat(dt.getHours())+':'+dt.getMinutes()+':'+dt.getSeconds();
            return dtFormatStr;
        }
    })
    rt.factory('requestFactory',function($http){
        var request = {
            req: {
                req_list: function (params) {
                    return {
                        method: 'get',
                        url: '../api/blog/loadBlog',
                        params: params
                    }
                },
                req_areas: function (params) {
                    return {
                        method: 'get',
                        url: '../api/blog/loadAreas',
                        headers: {
                            'Content-Type': "application/json"
                        }
                    }
                },
                req_kinds: function (params) {
                    return {
                        method: 'get',
                        url: '../api/blog/loadKinds',
                        headers: {
                            'Content-Type': "application/json"
                        },
                        params: params
                    }
                }
            },
            reqFuc: function (req, f, status) {
                var response = {};

                   $http(req).then(function (res) {

                    f(res, status);

                }).catch(function (error) {

                    f(error);
                })

            }

        
        }
        return request;

    })
    rt.factory('requestLogicFactory',function(){
        var logic = {
            f1: function (el, status, bind) {
                if (el.status == status) {
                    localStorage.setItem('bloglist',JSON.stringify(el.data));
                    return el.data;
                } else {
                    console.log(el);
                }
            },
            f2: function (el, status, bind) {
                if (el.status == status) {
                    return el.data;
                } else {
                    console.log(el);
                }
            },
            f3: function (el, status, bind) {
                if (el.status == status) {
                    return el.data;
                } else {
                    console.log(el);
                }
            }
        }
        return logic;

    })

    rt.service('blog_finder',function(){

        this.blogFinder_Id=function(blogs,id) {
            var blog={};
            for(let _blog in blogs){
                if(blogs[_blog].id==id){
                blog= blogs[_blog];
            }
        }
        return blog;
    }
    })
})();
