//------------------------------------------------------------------------------
// <auto-generated>
//    此代码是根据模板生成的。
//
//    手动更改此文件可能会导致应用程序中发生异常行为。
//    如果重新生成代码，则将覆盖对此文件的手动更改。
// </auto-generated>
//------------------------------------------------------------------------------

namespace Model
{
    using System;
    using System.Collections.Generic;
    
    public partial class blog
    {
        public int id { get; set; }
        public string title { get; set; }
        public string Content { get; set; }
        public System.DateTime createDate { get; set; }
        public System.DateTime updateTime { get; set; }
        public string kindName { get; set; }
        public string areaName { get; set; }
        public int UserId { get; set; }
    }
}
