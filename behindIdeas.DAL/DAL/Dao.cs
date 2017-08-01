<<<<<<< HEAD
﻿using Model;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace behindIdeas.DAL.DAL
{
    public class Dao<T> : BaseDao, IDao<T> where T : class
    {
       

        public void Add(T entity)
        {
            this._db.Set<T>().Add(entity);
            this._db.Entry(entity).State = System.Data.Entity.EntityState.Added;
            this.SaveChanges();
        }

        public void Add(IList<T> list)
        {
            this._db.Set<T>().AddRange(list);
            this.SaveChanges();
        }

        public void Delete(T entity)
        {   
            this._db.Set<T>().Attach(entity);
            this._db.Set<T>().Remove(entity);
            this._db.Entry(entity).State = System.Data.Entity.EntityState.Deleted;
            this.SaveChanges();
        }

        public void Delete(IList<T> list)
        {
            list.ToList().ForEach(o =>
            {
                this._db.Set<T>().Remove(o);
                this._db.Entry(o).State = System.Data.Entity.EntityState.Deleted;

            });
            this.SaveChanges();
        }

        public  IQueryable<T> Getlist()
        {
           
            return  this._db.Set<T>();
        }

        protected DbSet<T> Dbset
        {

            get { return this._db.Set<T>(); }
        }
   


        public void Update(T entity)
        {
            this.Dbset.Attach(entity);
            this._db.Entry(entity).State = System.Data.Entity.EntityState.Modified;
            this.SaveChanges();
        }

        public void Update(T entity, Enum enums)
        {
            throw new NotImplementedException();
        }


        public IQueryable<T> Find_By_Filter(System.Linq.Expressions.Expression<Func<T, bool>> filter)
        {
            return this.Dbset.Where(filter);
        }


        public PageResults<T> PaginationDetail(IQueryable<T> paramList,int pageNo, int pageSize)
        {
            return new PageResults<T>(paramList, pageNo, pageSize);
        }


        public IQueryable<T> Pagination(IQueryable<T> paramList,int pageNo, int pageSize)
        {
            var list = paramList.Skip((pageNo - 1) * pageSize).Take(pageSize);
            return list;
        }


        public void transaction()
        {
            using (var context = this._db)
            {
                using (var dbContextTransaction = context.Database.BeginTransaction())
                {
                    try
                    {
                        //trans<T>.doSomesth()
                        context.SaveChanges();

                        dbContextTransaction.Commit();
                    }
                    catch (Exception)
                    {
                        dbContextTransaction.Rollback();
                    }
                }
            }

        }


        public void addNotsave(T entity)
        {
            this._db.Set<T>().Add(entity);
            this._db.Entry(entity).State = System.Data.Entity.EntityState.Added;
        }
        
    }
}
=======
﻿using Model;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace behindIdeas.DAL.DAL
{
    public class Dao<T> : BaseDao, IDao<T> where T : class
    {
       

        public void Add(T entity)
        {
            this._db.Set<T>().Add(entity);
            this._db.Entry(entity).State = System.Data.Entity.EntityState.Added;
            this.SaveChanges();
        }

        public void Add(IList<T> list)
        {
            this._db.Set<T>().AddRange(list);
            this.SaveChanges();
        }

        public void Delete(T entity)
        {   
            this._db.Set<T>().Attach(entity);
            this._db.Set<T>().Remove(entity);
            this._db.Entry(entity).State = System.Data.Entity.EntityState.Deleted;
            this.SaveChanges();
        }

        public void Delete(IList<T> list)
        {
            list.ToList().ForEach(o =>
            {
                this._db.Set<T>().Remove(o);
                this._db.Entry(o).State = System.Data.Entity.EntityState.Deleted;

            });
            this.SaveChanges();
        }

        public  IQueryable<T> Getlist()
        {
           
            return  this._db.Set<T>();
        }

        protected DbSet<T> Dbset
        {

            get { return this._db.Set<T>(); }
        }
   


        public void Update(T entity)
        {
            this.Dbset.Attach(entity);
            this._db.Entry(entity).State = System.Data.Entity.EntityState.Modified;
            this.SaveChanges();
        }

        public void Update(T entity, Enum enums)
        {
            throw new NotImplementedException();
        }


        public IQueryable<T> Find_By_Filter(System.Linq.Expressions.Expression<Func<T, bool>> filter)
        {
            return this.Dbset.Where(filter);
        }


        public PageResults<T> PaginationDetail(IQueryable<T> paramList,int pageNo, int pageSize)
        {
            return new PageResults<T>(paramList, pageNo, pageSize);
        }


        public IQueryable<T> Pagination(IQueryable<T> paramList,int pageNo, int pageSize)
        {
            var list = paramList.Skip((pageNo - 1) * pageSize).Take(pageSize);
            return list;
        }


        public void transaction()
        {
            using (var context = this._db)
            {
                using (var dbContextTransaction = context.Database.BeginTransaction())
                {
                    try
                    {
                        //trans<T>.doSomesth()
                        context.SaveChanges();

                        dbContextTransaction.Commit();
                    }
                    catch (Exception)
                    {
                        dbContextTransaction.Rollback();
                    }
                }
            }

        }


        public void addNotsave(T entity)
        {
            this._db.Set<T>().Add(entity);
            this._db.Entry(entity).State = System.Data.Entity.EntityState.Added;
        }
        
    }
}
>>>>>>> 2023c2e18ae698f405a9c4afacf6e82fa329710c
