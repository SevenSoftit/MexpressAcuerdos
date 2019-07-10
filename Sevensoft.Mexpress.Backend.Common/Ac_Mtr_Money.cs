using System;

namespace Sevensoft.Mexpress.Backend.Common
{
    public partial class Ac_Mtr_Money
    {
        public Ac_Mtr_Money()
        {

            Pk_Cat_Currency = 0;
            Creation_Date = Convert.ToDateTime("1900-01-01");
            Creation_User = "";
            Modification_Date = Convert.ToDateTime("1900-01-01");
            Modification_User = "";     
            Name_Currency = "";
            Id_Currency = "";
        }
        public Int32 Pk_Cat_Currency { get; set; }
        public DateTime Creation_Date { get; set; }
        public String Creation_User { get; set; }
        public DateTime Modification_Date { get; set; }
        public String Modification_User { get; set; }
        public String Name_Currency { get; set; }
        public String Id_Currency { get; set; }
    }
}
