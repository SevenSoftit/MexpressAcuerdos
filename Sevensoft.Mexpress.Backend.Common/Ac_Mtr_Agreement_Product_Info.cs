using System;
using System.Collections.Generic;

namespace Sevensoft.Mexpress.Backend.Common
{
    public partial class Ac_Mtr_Agreement_Product_Info
    {
        public Ac_Mtr_Agreement_Product_Info()
        {

            Pk_Cat_Agreement_Details_Resume = 0;
            Pk_Ac_Trade_Agreement = 0;
            Pk_Glb_Products = 0;
            Creation_Date = Convert.ToDateTime("1900-01-01");
            Creation_User = "";
            Modification_Date = Convert.ToDateTime("1900-01-01");
            Modification_User = "";
            Product_Id = "";
            Product_Name = "";
            Product_Amount = 0;
            String_Product_Amount = "0";
            Product_Quantity_Sold = 0;
            Product_Amount_Recovery = 0;
            String_Product_Amount_Recovery = "0";
            Calculate_Recovery_Amount = 0;
            String_Calculate_Recovery_Amount = "0";
            Id_Currency = "";
            Active = false;
            Name_Currency = "";
            Behavior = "";
            Agreement_Product_Info_List = new List<Import_Product>();
            Inventory_Quantity = 0;
            Inventory_Date = Convert.ToDateTime("1900-01-01");
            Average_Cost = 0;
        }
        public Int64 Pk_Cat_Agreement_Details_Resume { get; set; }
        public Int64 Pk_Ac_Trade_Agreement { get; set; }
        public Int32 Pk_Glb_Products { get; set; }
        public DateTime Creation_Date { get; set; }
        public String Creation_User { get; set; }
        public DateTime Modification_Date { get; set; }
        public String Modification_User { get; set; }
        public String Product_Id { get; set; }
        public String Product_Name { get; set; }
        public Decimal Product_Amount { get; set; }
        public String String_Product_Amount { get; set; }
        public Int32 Product_Quantity_Sold { get; set; }
        public Decimal Product_Amount_Recovery { get; set; }
        public String String_Product_Amount_Recovery { get; set; }
        public Decimal Calculate_Recovery_Amount { get; set; }
        public String String_Calculate_Recovery_Amount { get; set; }
        public String Id_Currency { get; set; }
        public Boolean Active { get; set; }
        public String Name_Currency { get; set; }
        public String Behavior { get; set; }
        public List<Import_Product> Agreement_Product_Info_List { get; set; }
        public Int32 Inventory_Quantity { get; set; }
        public Decimal Average_Cost { get; set; }
        public DateTime Inventory_Date { get; set; }
    }
}
