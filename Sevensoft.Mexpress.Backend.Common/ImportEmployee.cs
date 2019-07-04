using System;
using static Sevensoft.Mexpress.Backend.Common.Enum;

namespace Sevensoft.Mexpress.Backend.Common
{
    public partial class ImportEmployee
    {
        public ImportEmployee()
        {
            Id_Employee = "";
            Employee_Name = "";
            Employee_Cost_Center = "";
            Employee_Position = "";
            Group_Identifier = "";
            Employee_Add1 = "";
            Employee_Add2 = "";
            Creation_User = "";
            Fk_Gbl_Wrk_Employee_Header = 0;
            Pk_Gbl_Wrk_Employee = 0;
            Error = false;
            Message_Error = "";
            It_Processed = false;
            Duplicate_Identification = false;
            Not_Exist_Group_Identifier = false;
            File_Path = "";
            Total_Records = 0;
            Fk_Glb_Mtr_Organization = 0;
            Active = true;
            Option = Employee_Option.None;
            Update_Rows = false;

        }
        public String Id_Employee { get; set; }
        public String Employee_Name { get; set; }
        public String Employee_Cost_Center { get; set; }
        public String Employee_Position { get; set; }
        public String Group_Identifier { get; set; }
        public String Employee_Add1 { get; set; }
        public String Employee_Add2 { get; set; }
        public String Creation_User { get; set; }
        public Int64 Fk_Gbl_Wrk_Employee_Header { get; set; }
        public Int64 Pk_Gbl_Wrk_Employee { get; set; }
        public bool Error { get; set; }
        public String Message_Error { get; set; }
        public bool It_Processed { get; set; }
        public bool Duplicate_Identification { get; set; }
        public bool Not_Exist_Group_Identifier { get; set; }
        public String File_Path { get; set; }
        public Int64 Total_Records { get; set; }
        public Int64 Fk_Glb_Mtr_Organization { get; set; }

        public bool Active { get; set; }

        public Employee_Option Option{ get; set; }
        public bool Update_Rows{ get; set; }


    }
}
