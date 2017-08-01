using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace behindIdeas.DAL.DAL
{
    public class DaoFactory<T> where T : class,new()
    {

        public static T t = null;
        public static T GetInstance()
        {
            t = new T();
            return t;

        }
    }
}
