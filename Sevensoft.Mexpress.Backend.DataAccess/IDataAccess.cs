using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sevensoft.Mexpress.Backend.DataAccess
{
    public interface IDataAccess
    {
        IConnectionManager ConnectionManagerInstance { get; }
    }
}
