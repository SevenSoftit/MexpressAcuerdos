using System;
using static Sevensoft.Mexpress.Backend.Common.Enum;

namespace Sevensoft.Mexpress.Backend.Common
{
    public partial class Import_Product
    {
        public Import_Product()
        {
            Product_Id_Alias = "";
            Product_Name = "";
            Name_Currency = "";
            Product_Amount = 0;
            Creation_User = "";
            Fk_Gbl_Wrk_Agreement_Header = 0;
            Pk_Gbl_Wrk_Agreement = 0;
            Error = false;
            Message_Error = "";
            It_Processed = false;
            Invalid_Amount = false;
            Not_Exist_Product = false;
            Duplicate_Product_Alias = false;
            Not_Exist_Id_Currency = false;
            File_Path = "";
            Total_Records = 0;
            Fk_Glb_Mtr_Organization = 0;
            Active = true;
            All_Products = true;
            Id_Currency = "";
            Option = Agreement_Option.None;
            Update_Rows = false;

        }
        public String Product_Id_Alias { get; set; }
        public String Product_Name { get; set; }
        public String Name_Currency { get; set; }
        public Decimal Product_Amount { get; set; }
        public String Creation_User { get; set; }
        public Int64 Fk_Gbl_Wrk_Agreement_Header { get; set; }
        public Int64 Pk_Gbl_Wrk_Agreement { get; set; }
        public bool Error { get; set; }
        public String Message_Error { get; set; }
        public bool It_Processed { get; set; }
        public bool Invalid_Amount { get; set; }
        public bool Not_Exist_Product { get; set; }
        public bool Duplicate_Product_Alias { get; set; }
        public bool Not_Exist_Id_Currency { get; set; }
        public String File_Path { get; set; }
        public Int64 Total_Records { get; set; }
        public Int32 Fk_Glb_Mtr_Organization { get; set; }
        public bool Active { get; set; }
        public bool All_Products { get; set; }
        public string Id_Currency { get; set; }
        public Agreement_Option Option { get; set; }
        public bool Update_Rows { get; set; }


    }
}
