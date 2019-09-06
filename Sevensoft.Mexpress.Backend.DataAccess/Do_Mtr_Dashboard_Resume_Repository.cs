using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using System.Data;
using Sevensoft.Mexpress.Backend.Common;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;


namespace Sevensoft.Mexpress.Backend.DataAccess
{

    public class Do_Mtr_Dashboard_Resume_Repository : IRepository<Common.Do_Mtr_Dashboard_Resume>, IDisposable
    {

        #region Region [Variables]
        public IConnectionManager ConnectionManagerInstance { get; private set; }
        public IDbConnection Connection { get; set; }
        public IDbTransaction Transaction { get; set; }
        private string ConnectionString { get; set; }
        #endregion

        #region Region [Constructor]
        public Do_Mtr_Dashboard_Resume_Repository(string connectionString)
        {
            ConnectionString = connectionString;
        }
        #endregion

        #region Region [Methods]
        public async Task<IEnumerable<Do_Mtr_Dashboard_Resume>> List(Do_Mtr_Dashboard_Resume model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                var result = connection.Query<
                    Common.Do_Mtr_Dashboard_Resume>
                    ("PA_CON_AC_GBL_MTR_AGREEMENT_DASHBOARD_RESUME_GET",
                    param: new
                    {
    
                    },
                    commandType: CommandType.StoredProcedure);
                return await Task.FromResult<IEnumerable<Do_Mtr_Dashboard_Resume>>(result.ToList());
            }
        }
        public async Task<ICollection<Do_Mtr_Dashboard_Resume>> ListCollection(Do_Mtr_Dashboard_Resume model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                var result = connection.Query<
                    Common.Do_Mtr_Dashboard_Resume>
                    ("PA_CON_AC_GBL_MTR_AGREEMENT_DASHBOARD_RESUME_GET",
                    param: new
                    {

                    },
                    commandType: CommandType.StoredProcedure);
                return await Task.FromResult<ICollection<Common.Do_Mtr_Dashboard_Resume>>(result.ToList());
            }
        }
        public async Task<Common.Do_Mtr_Dashboard_Resume> Get(Common.Do_Mtr_Dashboard_Resume model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                var result = connection.Query<
                    Sevensoft.Mexpress.Backend.Common.Do_Mtr_Dashboard_Resume>
                    ("PA_CON_AC_GBL_MTR_AGREEMENT_DASHBOARD_RESUME_GET",
                    param: new
                    {

                    },
                    commandType: CommandType.StoredProcedure).FirstOrDefault();
                return await Task.FromResult<Common.Do_Mtr_Dashboard_Resume>(result);
            }
        }
        public async Task Save(Common.Do_Mtr_Dashboard_Resume model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                await connection.QueryAsync<
                    Sevensoft.Mexpress.Backend.Common.Do_Mtr_Dashboard_Resume>
                    ("PA_MAN_AC_GBL_MTR_AGREEMENT_DASHBOARD_RESUME_SAVE",
                    param: new
                    {

                    },
                    commandType: CommandType.StoredProcedure);
            }
        }
        public async Task Delete(Common.Do_Mtr_Dashboard_Resume model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                await connection.ExecuteAsync(
                sql: "PA_CON_AC_GBL_MTR_AGREEMENT_DASHBOARD_RESUME_DELETE",
                param: new
                {

                },
                commandType: CommandType.StoredProcedure);
            }
        }
        #endregion
        #region Region [Dispose]
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
        ~Do_Mtr_Dashboard_Resume_Repository()
        {
            Dispose(false);
        }
        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
            {
            }
        }
        #endregion
    }
}
