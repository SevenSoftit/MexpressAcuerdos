using System;
using System.Collections.Generic;
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
            Description_Agreement = "";
            Date_Start = Convert.ToDateTime("1900-01-01");
            Date_Finish = Convert.ToDateTime("1900-01-01");
            Date_Process = Convert.ToDateTime("1900-01-01");
            Date_Reprocess = Convert.ToDateTime("1900-01-01");
            All_Products = false;
            Provider_Name = "";
            Name_Agreement = "";
            Fk_Status_Agreement = 0;
            Agreement_Status_Name = "";
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
            list_Agreement_Document = new List<Ac_Mtr_Agreement_Document>();  
            Behavior = "";  
            String_Date_Start = "";  
            String_Date_Finish = "";
            Max_Amount = 0; 
            Email = "";
            Status_Option = false;
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
        public string Description_Agreement { get; set; }
        public DateTime Date_Start { get; set; }
        public DateTime Date_Finish { get; set; }
        public DateTime Date_Process { get; set; }
        public DateTime Date_Reprocess { get; set; }
        public bool All_Products { get; set; }
        public string Provider_Name { get; set; }
        public string Name_Agreement { get; set; }
        public Int32 Fk_Status_Agreement { get; set; }
        public String Agreement_Status_Name { get; set; }
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

        public List<Ac_Mtr_Agreement_Document> list_Agreement_Document { get; set; }
        public String Behavior { get; set; }
        public String String_Date_Start { get; set; }
        public String String_Date_Finish { get; set; }
        public Decimal Max_Amount { get; set; }
        public String Email { get; set; }
         public bool Status_Option { get; set; }
        
        public static implicit operator long(Import_Product v)
        {
            throw new NotImplementedException();
        }
    }
}
