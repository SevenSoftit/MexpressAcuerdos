using System;
using Sevensoft.Mexpress.Backend.Common.Partial;

namespace Sevensoft.Mexpress.Backend.Common
{
    public partial class Do_Cat_Label: ICommon
    {
        public Do_Cat_Label()
        {
        Pk_Gbl_Cat_Label = 0;
        Fk_Gbl_Cat_Form = 0;
        Fk_Gbl_Cat_Language = 0;
        Creation_User = "";
        Creation_Date = Convert.ToDateTime("1900-01-01");
        Modification_User = "";
        Modification_Date = Convert.ToDateTime("1900-01-01");
        Label = "";
        Value = "";

        }
        public Int64 Pk_Gbl_Cat_Label { get; set; }
        public Int32 Fk_Gbl_Cat_Form { get; set; }
        public Int32 Fk_Gbl_Cat_Language { get; set; }
        public DateTime Creation_Date { get; set; }
        public String Creation_User { get; set; }
        public DateTime Modification_Date { get; set; }
        public String Modification_User { get; set; }
        public String Label { get; set; }
        public String Value { get; set; }
        public Do_Cat_Form GblCatForm { get; set; }
        public Do_Cat_Language GblCatLanguage { get; set;}
        public Do_Cat_Organization GblOrganization { get; set; }
        
    }
}
