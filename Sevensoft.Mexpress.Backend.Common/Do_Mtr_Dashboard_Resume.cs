using System;

namespace Sevensoft.Mexpress.Backend.Common
{
    public partial class Do_Mtr_Dashboard_Resume
    {
        public Do_Mtr_Dashboard_Resume()
        {
        Active_Er_Count = 0;
        Revision_Er_Count = 0;
        Rejected_Er_Count = 0;
        Finished_Er_Count = 0;
        Special_Er_Count = 0;
        Inactive_Er_Count = 0;
        Collaborator_Count = 0;
        Group_Count = 0;
        Actual_Month = Convert.ToDateTime("1900-01-01");

        }
        public Int32 Active_Er_Count { get; set; }
        public Int32 Revision_Er_Count { get; set; }
        public Int32 Rejected_Er_Count { get; set; }
        public Int32 Finished_Er_Count { get; set; }
        public Int32 Special_Er_Count { get; set; }
        public Int32 Inactive_Er_Count { get; set; }
        public Int32 Collaborator_Count { get; set; }
        public Int32 Group_Count { get; set; }
        public DateTime Actual_Month { get; set; }
        
    }
}
