using System;

namespace Sevensoft.Mexpress.Backend.Common
{
    public partial class Do_Mtr_Agreement
    {
        public Do_Mtr_Agreement()
        {

            Pk_Do_Cat_Employee = 0;            
            Fk_Glb_Mtr_Organization = 0;
            Group_Identifier = "";
            Creation_Date = Convert.ToDateTime("1900-01-01");
            Creation_User = "";
            Modification_Date = Convert.ToDateTime("1900-01-01");
            Modification_User = "";
            Employee_Name = "";
            Employee_Cost_Center = "";
            Employee_Position = "";
            Employee_Add1 = "";
            Employee_Add2 = "";
            Id_Employee = "";
            Active = false;
        }
        public Int32 Pk_Do_Cat_Employee { get; set; }
        public Int32 Fk_Glb_Mtr_Organization { get; set; }
        public String Group_Identifier { get; set; }
        public DateTime Creation_Date { get; set; }
        public String Creation_User { get; set; }
        public DateTime Modification_Date { get; set; }
        public String Modification_User { get; set; }
        public String Employee_Name { get; set; }
        public String Employee_Cost_Center { get; set; }
        public String Employee_Position { get; set; }
        public String Employee_Add1 { get; set; }
        public String Employee_Add2 { get; set; }
        public String Id_Employee { get; set; }
        public Boolean Active { get; set; }
    }
}
