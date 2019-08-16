using System;

namespace Sevensoft.Mexpress.Backend.Common
{
    public partial class Ac_Mtr_Provider
    {
        public Ac_Mtr_Provider()
        {
            Pk_Ac_Cat_Provider = 0;
            Creation_Date = Convert.ToDateTime("1900-01-01");
            Creation_User = "";
            Modification_Date = Convert.ToDateTime("1900-01-01");
            Modification_User = "";
            Name_Provider = "";
            Identification_Provider = "";
            Email_Provider = "";
            Business_Name = "";
            Id_Provider_Pdv = "";
            Id_Provider_Erp = "";
            Active = false;
            Total_Row = 0;
            Page_Number = 0;
            Rows_Page = 0;
        }
        public Int32 Pk_Ac_Cat_Provider { get; set; }
        public DateTime Creation_Date { get; set; }
        public String Creation_User { get; set; }
        public DateTime Modification_Date { get; set; }
        public String Modification_User { get; set; }
        public String Name_Provider { get; set; }
        public String Identification_Provider { get; set; }
        public String Email_Provider { get; set; }
        public String Business_Name { get; set; }
        public String Id_Provider_Pdv { get; set; }
        public String Id_Provider_Erp { get; set; }
        public Boolean Active { get; set; }
        public int Total_Row { get; set; }
        public int Page_Number { get; set; }
        public int Rows_Page { get; set; }
    }
}
