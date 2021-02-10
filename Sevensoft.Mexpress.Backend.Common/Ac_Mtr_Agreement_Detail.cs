using System;

namespace Sevensoft.Mexpress.Backend.Common
{
    public partial class Ac_Mtr_Agreement_Detail
    {
        public Ac_Mtr_Agreement_Detail()
        {

            Pk_Cat_Agreement_Details = 0;         
            Pk_Ac_Trade_Agreement = 0;
            Pk_Glb_Products = 0;
            Product_Id_Alias = "";
            Product_Name = "";
            Id_Currency = "";
            Recovery_Amount = 0;            
            Creation_Date = Convert.ToDateTime("1900-01-01");
            Creation_User = "";
            Modification_Date = Convert.ToDateTime("1900-01-01");
            Modification_User = "";          
            Active = false;
            Name_Currency = "";

        }
        public Int64 Pk_Cat_Agreement_Details { get; set; }
        public Int32 Pk_Ac_Trade_Agreement { get; set; }
        public Int32 Pk_Glb_Products { get; set; }
         public String Product_Id_Alias { get; set; }
        public String Product_Name { get; set; }
        public String Id_Currency { get; set; }
        public Decimal Recovery_Amount { get; set; }
         public DateTime Creation_Date { get; set; }
        public String Creation_User { get; set; }
        public DateTime Modification_Date { get; set; }
        public String Modification_User { get; set; }
        public Boolean Active { get; set; }  
        public String Name_Currency { get; set; }     
    }
}
