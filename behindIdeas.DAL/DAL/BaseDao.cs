

using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace behindIdeas.DAL.DAL
{
    public  class BaseDao
    {
        private static   testEntities testEntities = null;



        protected static   testEntities CreateInstance()
        {
           
                testEntities = new testEntities();

            
            return testEntities;


        }
        //public static void transaction(Delegate method){
        //    using (var context = new testEntities()) {
        //        using (var dbContextTransaction = context.Database.BeginTransaction()) {
        //            try
        //            {
                     

        //                context.SaveChanges();

        //                dbContextTransaction.Commit();
        //            }
        //            catch (Exception)
        //            {
        //                dbContextTransaction.Rollback();
        //            } 
        //        }
        //    }
        
        //}
        public testEntities _db = CreateInstance();

        public virtual void SaveChanges()
        {
            this._db.Configuration.ValidateOnSaveEnabled = false;
            this._db.SaveChanges();


        }
    }
}
