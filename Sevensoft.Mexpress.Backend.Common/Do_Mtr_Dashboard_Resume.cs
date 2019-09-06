using System;

namespace Sevensoft.Mexpress.Backend.Common
{
    public partial class Do_Mtr_Dashboard_Resume
    {
        public Do_Mtr_Dashboard_Resume()
        {
            Active_Agreements_Count = 0;
            Inactive_Agreements_Count = 0;
            In_Process_Agreements_Count = 0;
            Finished_Agreements_Count = 0;
            Conciled_Agreements_Count = 0;
            Expired_Agreements_Count = 0;
            Actual_Month = Convert.ToDateTime("1900-01-01");

        }
        public Int32 Active_Agreements_Count { get; set; }
        public Int32 Inactive_Agreements_Count { get; set; }
        public Int32 In_Process_Agreements_Count { get; set; }
        public Int32 Finished_Agreements_Count { get; set; }
        public Int32 Conciled_Agreements_Count { get; set; }
        public Int32 Expired_Agreements_Count { get; set; }
        public DateTime Actual_Month { get; set; }

    }
}
