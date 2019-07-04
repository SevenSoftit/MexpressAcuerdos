using System;
using System.Collections.Generic;

namespace Sevensoft.Mexpress.Backend.Common
{
    public partial class Do_Mtr_Evidence
    {
        public Do_Mtr_Evidence()
        {
            Pk_Mtr_Pay_Evidence_Process = 0;
            Pk_Do_Mtr_Pay_Slip = 0;
            Pk_Do_Cat_Group = 0;
            Creation_Date = Convert.ToDateTime("1900-01-01");
            Creation_User = "";
            Modification_Date = Convert.ToDateTime("1900-01-01");
            Modification_User = "";
            Archive_Original_Name = "";
            Archive_New_Name = "";
            Url_Attachment = "";           
            Slip_Name = "";
            Active = false;
        }
        public Int32 Pk_Mtr_Pay_Evidence_Process { get; set; }
        public Int32 Pk_Do_Mtr_Pay_Slip { get; set; }
        public Int32 Pk_Do_Cat_Group { get; set; }
        public DateTime Creation_Date { get; set; }
        public String Creation_User { get; set; }
        public DateTime Modification_Date { get; set; }
        public String Modification_User { get; set; }
        public String Archive_Original_Name { get; set; }
        public String Archive_New_Name { get; set; }
        public String Url_Attachment { get; set; }
        public String Slip_Name { get; set; }
        public List<Do_Mtr_Evidence> list_Evidence_Archive { get; set; }
        public Boolean Active { get; set; }


    }
}

