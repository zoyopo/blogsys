# blogsys
这是一个用mysql+ef6+.net web api +angularJs1.6构建的一个博客web项目。
<h1>quick start</h1>
clone项目<br/>
在mysql运行blogApi中的blog.sql<br/>
在webconfig中配置你的数据库信息<br/>
将blogApi/html中的index.html设为起始页。<br/>

<h1>各模块介绍</h1>
1.Model文件夹存项目用到的实体和dbcontext。<br/>
2.behindIdeas.DAL是一个数据访问层，用接口，泛型将一些通用方法进行抽象。<br/>
3.blogApi是项目的主体部分，里面存放了webApi的路由配置，Controller文件夹存放了api的控制器，接收前端的restful请求。<br/>
blog.sql是mysql的数据库文件，存放项目所用到的表</br>
html文件夹是前端部分，存放项目的js类库，文件以及样式,前端通过ui-router+oc.LazyLoad实现js,css资源的按需加载,以及js,html模块化的拆分。
