using behindIdeas.DAL.DAL;
using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;



namespace blogApi.Controllers
{
    public class UserController : ApiController
    {
        IDao<users> user = DaoFactory<Dao<users>>.GetInstance();
     


        [HttpPost]        
        public HttpResponseMessage login(users userStr )
        {
            var userCK = user.Find_By_Filter(p => p.userName == userStr.userName && p.passWord == userStr.passWord).SingleOrDefault();
            HttpResponseMessage response = null;
            if (userCK != null)
            {
                response = Request.CreateResponse<users>(HttpStatusCode.OK, userCK);
                HttpContext.Current.Session["userName"] = userCK.userName;
              HttpContext.Current.Session["userId"] = userCK.id;
            }
            else {
                response = Request.CreateResponse<users>(HttpStatusCode.NoContent, userCK);
            }
            return response;
        }


    

        // POST api/values
      

        // PUT api/values/5
        public void Put(int id, [FromBody]string value)
        {
           
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
          
        }

    }
}