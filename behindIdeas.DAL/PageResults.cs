<<<<<<< HEAD
﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace behindIdeas.DAL
{
    public class PageResults<T>
    {        /**
 *pageNo 当前页数
 *pageNums 页面记录数量
 *pageCount 总页数
 *results 得到的结果
 *recordCount 记录总数量
 **/

        public PageResults(IQueryable<T> query, int pageNo, int pageSize)
        {
            this.pageNo = pageNo;
            this.pageSize = pageSize;
            this.recordCount = query.Count();
          
            this.pageCount = recordCount % pageSize == 0 ? recordCount / pageSize : ((recordCount / pageSize) + 1);
        }


        //public PageResults(List<T> list, int pageNo, int pageSize)
        //{
        //    this.pageNo = pageNo;
        //    this.pageSize = pageSize;
        //    this.recordCount = list.Count();
        //    this.results = list.Skip((pageNo - 1) * pageSize).Take(pageSize).ToList();
        //    this.pageCount = recordCount % pageSize == 0 ? recordCount / pageSize : ((recordCount / pageSize) + 1);
        //}


        public int recordCount { set; get; }
        public int pageNo { set; get; }
        public int pageSize { set; get; }
        public List<T> results { set; get; }      
        public int pageCount { set; get; }
   
    }
    }

=======
﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace behindIdeas.DAL
{
    public class PageResults<T>
    {        /**
 *pageNo 当前页数
 *pageNums 页面记录数量
 *pageCount 总页数
 *results 得到的结果
 *recordCount 记录总数量
 **/

        public PageResults(IQueryable<T> query, int pageNo, int pageSize)
        {
            this.pageNo = pageNo;
            this.pageSize = pageSize;
            this.recordCount = query.Count();
          
            this.pageCount = recordCount % pageSize == 0 ? recordCount / pageSize : ((recordCount / pageSize) + 1);
        }


        //public PageResults(List<T> list, int pageNo, int pageSize)
        //{
        //    this.pageNo = pageNo;
        //    this.pageSize = pageSize;
        //    this.recordCount = list.Count();
        //    this.results = list.Skip((pageNo - 1) * pageSize).Take(pageSize).ToList();
        //    this.pageCount = recordCount % pageSize == 0 ? recordCount / pageSize : ((recordCount / pageSize) + 1);
        //}


        public int recordCount { set; get; }
        public int pageNo { set; get; }
        public int pageSize { set; get; }
        public List<T> results { set; get; }      
        public int pageCount { set; get; }
   
    }
    }

>>>>>>> 2023c2e18ae698f405a9c4afacf6e82fa329710c
