using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;

namespace Sevensoft.Mexpress.Backend.DataAccess
{
    public interface IConnectionManager
    {
        IDbConnection GetConnection(string keyName);
    }
}
