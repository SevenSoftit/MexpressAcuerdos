using System;
using Sevensoft.Mexpress.Backend.Common.Partial;

namespace Sevensoft.Mexpress.Backend.Common
{
    public partial class GblParameter : ICommon
    {
        public GblParameter()
        {
            PK_GLB_PAR_PARAMETER = 0;
            Creation_User = "";
            Creation_Date = Convert.ToDateTime("1900-01-01");
            Modification_User = "";
            Modification_Date = Convert.ToDateTime("1900-01-01");
            SEARCH_KEY = "";
            DESCRIPTION = "";
            VALUE = "";
            CATEGORY = "";
            ACTIVE = true;
        }
        public Int64 PK_GLB_PAR_PARAMETER { get; set; }
        public String Creation_User { get; set; }
        public DateTime Creation_Date { get; set; }
        public String Modification_User { get; set; }
        public DateTime Modification_Date { get; set; }
        public String SEARCH_KEY { get; set; }
        public String DESCRIPTION { get; set; }
        public String VALUE { get; set; }
        public String CATEGORY { get; set; }
        public Boolean ACTIVE { get; set; }
    }
}
