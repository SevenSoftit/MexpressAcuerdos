using System;

namespace Sevensoft.Mexpress.Backend.Common
{
    public partial class Ac_Mtr_Type_Of_Agreement
    {
        public Ac_Mtr_Type_Of_Agreement()
        {

            Pk_Cat_Type_Agreement = 0;
            Creation_Date = Convert.ToDateTime("1900-01-01");
            Creation_User = "";
            Modification_Date = Convert.ToDateTime("1900-01-01");
            Modification_User = "";
            Name_Agreement = "";
            Description_Agreement = "";
            Id_Alias = "";
            Behavior = "";




        }
        public Int32 Pk_Cat_Type_Agreement { get; set; }
        public DateTime Creation_Date { get; set; }
        public String Creation_User { get; set; }
        public DateTime Modification_Date { get; set; }
        public String Modification_User { get; set; }
        public String Name_Agreement { get; set; }
        public String Description_Agreement { get; set; }
        public String Id_Alias { get; set; }
        public String Behavior { get; set; }
    }
}
