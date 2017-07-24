using behindIdeas.DAL.DAL;
using Model;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace blogApi.Controllers
{
    public class BlogController : ApiController
    {


        IDao<blog> Blog = DaoFactory<Dao<blog>>.GetInstance();
        IQueryable<blog> blogList_AllList { get { return Blog.Getlist(); } }
        // GET api/blog
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        [HttpGet]
        public HttpResponseMessage loadAreas()
        {

            List<string> areas = blogList_AllList.Select(p => p.areaName).Distinct().ToList();
            return Request.CreateResponse<List<string>>(HttpStatusCode.OK, areas);
        }
        [HttpGet]
        public HttpResponseMessage loadKinds(string area)
        {

            List<string> kinds = blogList_AllList.Where(o => o.areaName == area).Select(p => p.kindName).Distinct().ToList();
            return Request.CreateResponse<List<string>>(HttpStatusCode.OK, kinds);
        }

        // GET api/blog/5
        [HttpGet]
        public HttpResponseMessage loadBlog(string area = "", string kind = "", int pageNo = 1, int pageSize = 10)
        {
            //Expression<Func<blog, bool>> expr_filter=p=>(area==""?true:p.areaName==area);      
            IQueryable<blog> viewBlog = null;
            bool b1 = string.IsNullOrEmpty(area);
            bool b2 = string.IsNullOrEmpty(kind);
            if (b1 && b2)
            {
                viewBlog = blogList_AllList.OrderByDescending(p => p.createDate);
            }
            else if (!b1 &&b2)
            {
                viewBlog = blogList_AllList.Where(p => p.areaName == area).OrderByDescending(p => p.createDate);
            }
            else {
                viewBlog = blogList_AllList.Where(p => p.areaName == area&&p.kindName==kind).OrderByDescending(p => p.createDate);
            }
            List<blog> viewBlog_tolist = Blog.Pagination(viewBlog, pageNo, pageSize).ToList();
            return Request.CreateResponse<List<blog>>(HttpStatusCode.OK, viewBlog_tolist);

        }

        // POST api/blog
        public HttpResponseMessage saveBlog(blog blogdetail)
        {


            HttpResponseMessage response = null;
            //新增blog
            if (HttpContext.Current.Session["userId"] == null&&blogdetail.UserId==0)
            {
                response = Request.CreateResponse(HttpStatusCode.InternalServerError);
                return response;
            }
            else
            {
                int id = int.Parse((HttpContext.Current.Session["userId"].ToString()));
                blogdetail.UserId = id;
                Blog.Add(blogdetail);
                response = Request.CreateResponse(HttpStatusCode.Created);

                return response;
            }
        }

        // PUT api/blog/5
        [HttpPut]
        public HttpResponseMessage updateBlog(blog blogdetail)
        {
            Blog.Update(blogdetail);
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
            return response;
        }

       [HttpDelete]
        public HttpResponseMessage Delete(blog blogdetail)
        {
            Blog.Delete(blogdetail);
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
            return response;
        }
    }
}
