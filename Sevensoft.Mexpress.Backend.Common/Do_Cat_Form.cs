using System;
using Sevensoft.Mexpress.Backend.Common.Partial;

namespace Sevensoft.Mexpress.Backend.Common
{
    public partial class Do_Cat_Form : ICommon
    {
        public Do_Cat_Form()
        {
            Pk_Glb_Cat_Form = 0;
            Fk_Glb_Mtr_Organization = 0;
            Creation_User = "";
            Creation_Date = Convert.ToDateTime("1900-01-01");
            Modification_User = "";
            Modification_Date = Convert.ToDateTime("1900-01-01");           
            Name = "";
            Description = "";
            Code = "";
        }
        public Int64 Pk_Glb_Cat_Form { get; set; }
        public int Fk_Glb_Mtr_Organization { get; set; }
        public String Creation_User { get; set; }
        public DateTime Creation_Date { get; set; }
        public String Modification_User { get; set; }
        public DateTime Modification_Date { get; set; }        
        public String Name { get; set; }
        public String Description { get; set; }
        public String Code { get; set; }
    }
}
