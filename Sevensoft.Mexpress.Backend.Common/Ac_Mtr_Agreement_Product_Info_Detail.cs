using System;
using System.Collections.Generic;

namespace Sevensoft.Mexpress.Backend.Common
{
    public partial class Ac_Mtr_Agreement_Product_Info_Detail
    {
        public Ac_Mtr_Agreement_Product_Info_Detail()
        {
            Pk_Ac_Trade_Agreement = 0;
            Pk_Cat_Agreement_Details_Result = 0;
            Pk_Cat_Agreement_Details_Resume = 0;
            Emp_Id = 0;
            Name_Company = "";
            Type_Doc_Id = 0;
            Name_Document = "";
            Suc_Id = 0;
            Name_Store = "";
            Case_Id = 0;
            Bill_Id = "";
            Product_Quantity = 0;
            Product_Id = "";
            Product_Name = "";
            Product_Serie = "";
            Product_Cost = 0;
            String_Product_Cost = "0";
            Product_Price = 0;
            String_Product_Price = "0";
            Date_Invoice = Convert.ToDateTime("1900-01-01");
            Detail_Days_Warranty = 0;
            Return_Invoice = false;
            Return_Invoice_Date = Convert.ToDateTime("1900-01-01");
            Id_Vendor = "";
            Name_Vendor = "";
            Client_Id = 0;
            Client_Identification = "";
            Client_Name = "";
            Date_Process = Convert.ToDateTime("1900-01-01");
            Id_Currency = "";
            Active = false;
            Name_Currency = "";
            Behavior = "";
            AgreementProductInfoDetailList = new List<Ac_Mtr_Agreement_Product_Info_Detail>();
            Name_Agree = "";
            Agreement_Type_Name = "";
            Provider_Name = "";
            Date_Start = Convert.ToDateTime("1900-01-01");
            Date_Finish = Convert.ToDateTime("1900-01-01");

            Email = "";
            Max_Amount = 0;
            String_Max_Amount = "0";
            Total_Recovery = 0;
            String_Total_Recovery = "0";
            Total_Recovery_Dollars = 0;
            String_Total_Recovery_Dollars = "0";
            Accounting_Account = "";

        }
        public Int64 Pk_Ac_Trade_Agreement { get; set; }
        public Int64 Pk_Cat_Agreement_Details_Result { get; set; }
        public Int64 Pk_Cat_Agreement_Details_Resume { get; set; }
        public Int32 Emp_Id { get; set; }
        public String Name_Company { get; set; }
        public Int32 Type_Doc_Id { get; set; }
        public String Name_Document { get; set; }
        public Int32 Suc_Id { get; set; }
        public String Name_Store { get; set; }
        public Int32 Case_Id { get; set; }
        public String Bill_Id { get; set; }
        public Int32 Product_Quantity { get; set; }
        public String Product_Id { get; set; }
        public String Product_Name { get; set; }
        public String Product_Serie { get; set; }
        public Decimal Product_Cost { get; set; }
        public String String_Product_Cost { get; set; }
        public Decimal Product_Price { get; set; }
        public String String_Product_Price { get; set; }
        public DateTime Date_Invoice { get; set; }
        public Int32 Detail_Days_Warranty { get; set; }
        public Boolean Return_Invoice { get; set; }
        public DateTime Return_Invoice_Date { get; set; }
        public String Id_Vendor { get; set; }
        public String Name_Vendor { get; set; }
        public Int32 Client_Id { get; set; }
        public String Client_Identification { get; set; }
        public String Client_Name { get; set; }
        public DateTime Date_Process { get; set; }
        public String Id_Currency { get; set; }
        public Boolean Active { get; set; }
        public String Name_Currency { get; set; }
        public String Behavior { get; set; }
        public List<Ac_Mtr_Agreement_Product_Info_Detail> AgreementProductInfoDetailList { get; set; }
        public String Name_Agree { get; set; }
        public String Agreement_Type_Name { get; set; }
        public String Provider_Name { get; set; }
        public DateTime Date_Start { get; set; }
        public DateTime Date_Finish { get; set; }
        
        public String Email { get; set; }
        public Decimal Max_Amount { get; set; }
        public String String_Max_Amount { get; set; }
        public Decimal Total_Recovery { get; set; }
        public String String_Total_Recovery { get; set; }
        public Decimal Total_Recovery_Dollars { get; set; }
        public String String_Total_Recovery_Dollars { get; set; }
        public String Accounting_Account { get; set; }

    }
}
