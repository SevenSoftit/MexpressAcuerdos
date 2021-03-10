using System;
namespace Sevensoft.Mexpress.Backend.Common
{
    public class Ac_Cat_Agreement_Goals
    {
        public Ac_Cat_Agreement_Goals()
        {
            Pk_Cat_Agreement_Goals = 0;
            Creation_Date = Convert.ToDateTime("1900-01-01");
            Creation_User = "";
            Modification_Date = Convert.ToDateTime("1900-01-01");
            Modification_User = "";
            Pk_Ac_Trade_Agreement = 0;
            Pk_Cat_Currency = 0;
            Date_Start = Convert.ToDateTime("1900-01-01");
            Date_Finish = Convert.ToDateTime("1900-01-01");
            Goal_Amount = 0;
            Type_Goal = false;
            Bonus = 0;
            Name_Currency = "";
            Active = true;
            Agreement_Amount = 0;
            Id = 0;
        }
        public Int32 Pk_Cat_Agreement_Goals { get; set; }
        public DateTime Creation_Date { get; set; }
        public String Creation_User { get; set; }
        public DateTime Modification_Date { get; set; }
        public String Modification_User { get; set; }
        public Int64 Pk_Ac_Trade_Agreement { get; set; }
        public Int32 Pk_Cat_Currency { get; set; }
        public DateTime Date_Start { get; set; }
        public DateTime Date_Finish { get; set; }
        public Decimal Goal_Amount { get; set; }
        public Decimal Agreement_Amount { get; set; }
        public Boolean Type_Goal { get; set; }
        public Decimal Bonus { get; set; }
        public String Name_Currency { get; set; }
         public Boolean Active { get; set; }
         public Int32 Id { get; set; }
    }
}
