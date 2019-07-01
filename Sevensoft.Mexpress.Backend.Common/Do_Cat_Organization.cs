using System;

namespace Sevensoft.Mexpress.Backend.Common
{
    public partial class Do_Cat_Organization
    {
        public Do_Cat_Organization()
        {
            Pk_Glb_Mtr_Organization =  0;
            Organization_Id = "";
            Organization_Identification = "";
            Organization_Name = "";
            Creation_User = "";
            Creation_Date = Convert.ToDateTime("1900-01-01");
            Modification_User = "";
            Modification_Date = Convert.ToDateTime("1900-01-01");
            Fk_Gbl_Cat_Language = 0;
        }
        public Int32 Pk_Glb_Mtr_Organization { get; set; }
        public string Organization_Id { get; set; }
        public string Organization_Identification { get; set; }
        public string Organization_Name { get; set; }
        public DateTime Creation_Date { get; set; }
        public String Creation_User { get; set; }
        public DateTime Modification_Date { get; set; }
        public String Modification_User { get; set; }
        public Int32 Fk_Gbl_Cat_Language { get; set; }
    }
}
