using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data;
using Sevensoft.Mexpress.Backend.Common;
using Dapper;
using System.Data.SqlClient;


namespace Sevensoft.Mexpress.Backend.DataAccess
{

    public class GblParameterRepository : IRepository<Common.GblParameter>//, IDisposable
    {

        #region Region [Variables]
        public IConnectionManager ConnectionManagerInstance { get; private set; }
        public IDbConnection Connection { get; set; }
        public IDbTransaction Transaction { get; set; }
        private string ConnectionString { get; set; }
        #endregion

        #region Region [Constructor]
        public GblParameterRepository(string connectionString)
        {
            ConnectionString = connectionString;
        }
        #endregion

        #region Region [Methods]
        public async Task<IEnumerable<GblParameter>> List(GblParameter model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                var result = connection.Query<
                    Common.GblParameter>
                    ("PA_CON_GBL_PARAMETER",
                    param: new 
                    {
                        P_PK_GLB_PAR_PARAMETER = model.PK_GLB_PAR_PARAMETER,
                        P_CREATION_USER = model.Creation_User,
                        P_CREATION_DATE = model.Creation_Date,
                        P_MODIFICATION_USER = model.Modification_User,
                        P_MODIFICATION_DATE = model.Modification_Date,
                        P_KEY_SEARCH = model.SEARCH_KEY,
                        P_DESCRIPTION = model.DESCRIPTION,
                        P_VALUE = model.VALUE,
                        P_CATEGORY = model.CATEGORY,
                        P_ACTIVE = model.ACTIVE
                    },
                    commandType: CommandType.StoredProcedure);
                return await Task.FromResult<IEnumerable<GblParameter>>(result.ToList());
            }
        }
        public async Task<ICollection<GblParameter>> ListCollection(GblParameter model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                var result = connection.Query<
                    Common.GblParameter>
                    ("PA_CON_GBL_PARAMETER",
                    param: new
                    {
                        P_PK_GLB_PAR_PARAMETER = model.PK_GLB_PAR_PARAMETER,
                        P_CREATION_USER = model.Creation_User,
                        P_CREATION_DATE = model.Creation_Date,
                        P_MODIFICATION_USER = model.Modification_User,
                        P_MODIFICATION_DATE = model.Modification_Date,
                        P_KEY_SEARCH = model.SEARCH_KEY,
                        P_DESCRIPTION = model.DESCRIPTION,
                        P_VALUE = model.VALUE,
                        P_CATEGORY = model.CATEGORY,
                        P_ACTIVE = model.ACTIVE
                    },
                    commandType: CommandType.StoredProcedure);
                return await Task.FromResult<ICollection<Common.GblParameter>>(result.ToList());
            }
        }
        public async Task<Common.GblParameter> Get(Common.GblParameter model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                var result = connection.Query<
                    Sevensoft.Mexpress.Backend.Common.GblParameter>
                    ("PA_CON_GBL_PARAMETER",
                    param: new
                    {
                        P_PK_GLB_PAR_PARAMETER = model.PK_GLB_PAR_PARAMETER,
                        P_CREATION_USER = model.Creation_User,
                        P_CREATION_DATE = model.Creation_Date,
                        P_MODIFICATION_USER = model.Modification_User,
                        P_MODIFICATION_DATE = model.Modification_Date,
                        P_SEARCH_KEY = model.SEARCH_KEY,
                        P_DESCRIPTION = model.DESCRIPTION,
                        P_VALUE = model.VALUE,
                        P_CATEGORY = model.CATEGORY,
                        P_ACTIVE = model.ACTIVE
                    },
                    commandType: CommandType.StoredProcedure).FirstOrDefault();
                return await Task.FromResult<Common.GblParameter>(result);
            }
        }
        public async Task Save(Common.GblParameter model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                await connection.QueryAsync<
                    Sevensoft.Mexpress.Backend.Common.GblParameter>
                    ("PA_MAN_GBL_PARAMETER",
                    param: new
                    {
                        P_PK_GLB_PAR_PARAMETER = model.PK_GLB_PAR_PARAMETER,
                        P_CREATION_USER = model.Creation_User,
                        P_CREATION_DATE = model.Creation_Date,
                        P_MODIFICATION_USER = model.Modification_User,
                        P_MODIFICATION_DATE = model.Modification_Date,
                        P_KEY_SEARCH = model.SEARCH_KEY,
                        P_DESCRIPTION = model.DESCRIPTION,
                        P_VALUE = model.VALUE,
                        P_CATEGORY = model.CATEGORY,
                        P_ACTIVE = model.ACTIVE
                    },
                    commandType: CommandType.StoredProcedure);
            }
        }
        public async Task Delete(Common.GblParameter model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                await connection.QueryAsync<
                    Sevensoft.Mexpress.Backend.Common.GblParameter>
                ("PA_GBL_PAR_PARAMETER_DELETE",
                param: new
                {
                    P_PK_GLB_PAR_PARAMETER = model.PK_GLB_PAR_PARAMETER
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
        ~GblParameterRepository()
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
