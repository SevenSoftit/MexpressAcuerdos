using System;
using Sevensoft.Mexpress.Backend.Common.Partial;

namespace Sevensoft.Mexpress.Backend.Common
{
    public partial class Do_Cat_Language : ICommon
    {
        public Do_Cat_Language()
        {
            Pk_Glb_Cat_Language = 0;
            Creation_User = "";
            Creation_Date = Convert.ToDateTime("1900-01-01");
            Modification_User = "";
            Modification_Date = Convert.ToDateTime("1900-01-01");
            Language_Family = "";
            Name = "";
            Name_Native = "";
            Iso = "";
            Iso_639_2_B = "";
            Iso_639_2_T = "";
            Iso_639_3 = "";
            Iso_639_6 = "";
            Notes = "";
        }
        public Int64 Pk_Glb_Cat_Language { get; set; }
        public String Creation_User { get; set; }
        public DateTime Creation_Date { get; set; }
        public String Modification_User { get; set; }
        public DateTime Modification_Date { get; set; }
        public String Language_Family { get; set; }
        public String Name { get; set; }
        public String Name_Native { get; set; }
        public String Iso { get; set; }
        public String Iso_639_2_B { get; set; }
        public String Iso_639_2_T { get; set; }
        public String Iso_639_3 { get; set; }
        public String Iso_639_6 { get; set; }
        public String Notes { get; set; }
    }
}
