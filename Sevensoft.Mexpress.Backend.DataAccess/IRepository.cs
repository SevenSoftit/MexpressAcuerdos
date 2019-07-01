using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sevensoft.Mexpress.Backend.DataAccess
{
    public interface IRepository<T> : IDataAccess, IDisposable
    {
        Task<IEnumerable<T>> List(T entity);
        Task Save(T entity);
        Task Delete(T entity);
        Task<T> Get(T entity);
        System.Data.IDbConnection Connection { get; set; }
        System.Data.IDbTransaction Transaction { get; set; }
    }
}
