using System;

namespace Sevensoft.Mexpress.Backend.Common
{
    public partial class Ac_Mtr_Agreement_Document
    {
        public Ac_Mtr_Agreement_Document()
        {
            Pk_Cat_Document_Agreement = 0;
            Pk_Ac_Trade_Agreement = 0;
            Creation_Date = Convert.ToDateTime("1900-01-01");
            Creation_User = "";
            Modification_Date = Convert.ToDateTime("1900-01-01");
            Modification_User = "";     
            Url_Attachment = "";
            Archive_Original_Name = "";
            Archive_New_Name = "";
            Name_Agreement = "";
            Active = false;
            
        }
        public Int32 Pk_Cat_Document_Agreement { get; set; }
        public Int64 Pk_Ac_Trade_Agreement { get; set; }
        public DateTime Creation_Date { get; set; }
        public String Creation_User { get; set; }
        public DateTime Modification_Date { get; set; }
        public String Modification_User { get; set; }
        public String Url_Attachment { get; set; }
        public String Archive_Original_Name { get; set; }
        public String Archive_New_Name { get; set; }
        public String Name_Agreement { get; set; }
        public Boolean Active { get; set; }
        
    }
}
