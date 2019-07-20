using System;
using static Sevensoft.Mexpress.Backend.Common.Enum;

namespace Sevensoft.Mexpress.Backend.Common
{
    public partial class Import_Product
    {
        public Import_Product()
        {
            Pk_Gbl_Wrk_Agreement = 0;
            Product_Id_Alias = "";
            Product_Name = "";
            Id_Currency = "";
            Product_Amount = 0;
            
            Pk_Ac_Trade_Agreement = 0;
            Pk_Cat_Type_Agreement = 0;
            Pk_Ac_Cat_Provider = 0;
            Creation_Date = Convert.ToDateTime("1900-01-01");
            Creation_User = "";
            Modification_Date = Convert.ToDateTime("1900-01-01");
            Modification_User = "";
            Name_Agreement = "";
            Description_Agreement = "";
            Date_Start = Convert.ToDateTime("1900-01-01");
            Date_Finish = Convert.ToDateTime("1900-01-01");
            Date_Process = Convert.ToDateTime("1900-01-01");
            Date_Reprocess = Convert.ToDateTime("1900-01-01");
            All_Products = false;
            Provider_Name = "";
            Active = true;

            Error = false;
            Message_Error = "";
            It_Processed = true;
            Invalid_Amount = false;
            Not_Exist_Product = false;
            Duplicate_Product_Alias = false;
            Not_Exist_Id_Currency = false;
            File_Path = "";
            Total_Records = 0;
            Fk_Glb_Mtr_Organization = 0;
            Option = Agreement_Option.None;
            Update_Rows = false;
            Name_Currency = "";
            Pk_Cat_Agreement_Details = 0;

        }
        public Int64 Pk_Gbl_Wrk_Agreement { get; set; }
        public String Product_Id_Alias { get; set; }
        public String Product_Name { get; set; }
        public String Id_Currency { get; set; }
        public Decimal Product_Amount { get; set; }
        
        public Int64 Pk_Ac_Trade_Agreement { get; set; }
        public Int32 Pk_Cat_Type_Agreement { get; set; }
        public Int32 Pk_Ac_Cat_Provider { get; set; }
        public DateTime Creation_Date { get; set; }
        public String Creation_User { get; set; }
        public DateTime Modification_Date { get; set; }
        public String Modification_User { get; set; }
        public String Status_Agreement { get; set; }
        public String Name_Agreement { get; set; }
        public string Description_Agreement { get; set; }
        public DateTime Date_Start { get; set; }
        public DateTime Date_Finish { get; set; }
        public DateTime Date_Process { get; set; }
        public DateTime Date_Reprocess { get; set; }
        public bool All_Products { get; set; }
        public string Provider_Name { get; set; }
        public bool Active { get; set; }

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
        public Agreement_Option Option { get; set; }
        public bool Update_Rows { get; set; }
        public String Name_Currency { get; set; }

        public Int64 Pk_Cat_Agreement_Details { get; set; }

        public static implicit operator long(Import_Product v)
        {
            throw new NotImplementedException();
        }
    }
}
