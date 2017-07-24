var filt= angular.module('filterApp',[]);
filt.filter('strToDom',function(){
return function(str){
    var dm=document.createElement('div');
    dm.innerHTML=str;
    dm.className='blog-content';
    return dm;
}

})