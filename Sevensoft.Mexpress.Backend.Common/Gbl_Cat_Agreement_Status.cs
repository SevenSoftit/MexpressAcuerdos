using System;

namespace Sevensoft.Mexpress.Backend.Common
{
    public partial class Gbl_Cat_Agreement_Status
    {
        public Gbl_Cat_Agreement_Status()
        {
            Pk_Glb_Cat_Catalog = 0;
            Creation_Date = Convert.ToDateTime("1900-01-01");
            Creation_User = "";
            Modification_Date = Convert.ToDateTime("1900-01-01");
            Modification_User = "";
            Fk_Glb_Cat_Catalog = 0;
            Fk_Glb_Cat_Type_Catalog = 0;
            Search_Key = "";
            Value = "";
            Description = "";
            Editable = false;
            Active = false;
            Search_Key_Type_Catalog = "";
            Mask="";
        }
        public Int32 Pk_Glb_Cat_Catalog { get; set; }
        public DateTime Creation_Date { get; set; }
        public String Creation_User { get; set; }
        public DateTime Modification_Date { get; set; }
        public String Modification_User { get; set; }
        public Int32 Fk_Glb_Cat_Catalog { get; set; }
        public Int32 Fk_Glb_Cat_Type_Catalog { get; set; }
        public String Search_Key { get; set; }
        public String Value { get; set; }
        public String Description { get; set; }
        public Boolean Editable { get; set; }
        public Boolean Active { get; set; }
        public String Search_Key_Type_Catalog { get; set; }
        public String Mask { get; set; }

       
    }
}
