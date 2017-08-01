using Model;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace behindIdeas.DAL.DAL
{
  public  interface IDao<T> where T : class
    {
        void Add(T entity);

        void Add(IList<T> list);

        /// <summary>
        /// 根据实体
        /// </summary>
        /// <param name="entity"></param>
        void Update(T entity);
        /// <summary>
        /// 根据属性名
        /// </summary>
        /// <param name="entity"></param>
        /// <param name="enums"></param>
        void Update(T entity, Enum enums);
    
        void Delete(T entity);

        void Delete(IList<T> list);
        IQueryable<T> Getlist();
        IQueryable<T> Find_By_Filter(Expression<Func<T, Boolean>> filter);
        PageResults<T> PaginationDetail(IQueryable<T> paramList, int pageNo, int pageSize);
        IQueryable<T> Pagination(IQueryable<T> paramList,int pageNo, int pageSize);
        void transaction();
        void addNotsave(T entity);
    }
}
