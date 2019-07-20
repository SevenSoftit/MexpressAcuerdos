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
    public class Gbl_Wrk_Agreement_Detail_Repository : IRepository<Common.Import_Product>
    {
        #region Region [Variables]
        public IConnectionManager ConnectionManagerInstance { get; private set; }
        public IDbConnection Connection { get; set; }
        public IDbTransaction Transaction { get; set; }
        private string ConnectionString { get; set; }
        #endregion

        #region Region [Constructor]
        public Gbl_Wrk_Agreement_Detail_Repository(string connectionString)
        {
            ConnectionString = connectionString;
        }
        #endregion


        #region Region [Methods]

        public async Task<IEnumerable<Import_Product>> ListWorkTable(Import_Product model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                var result = connection.Query<
                    Common.Import_Product>
                    ("PA_PRO_GBL_WRK_PROCESS_VALIDATION",
                    param: new
                    {
                        P_PK_AC_TRADE_AGREEMENT = model.Pk_Ac_Trade_Agreement,

                    },
                    commandType: CommandType.StoredProcedure);
                return await Task.FromResult<IEnumerable<Import_Product>>(result.ToList());
            }
        }

        public async Task<IEnumerable<Import_Product>> List(Import_Product model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                var result = connection.Query<
                    Common.Import_Product>
                    ("PA_PRO_GBL_WRK_VALIDATE_ERRORS",
                    param: new
                    {
                        P_PRODUCT_ID_ALIAS = model.Product_Id_Alias,
                        P_PRODUCT_NAME = model.Product_Name,
                        P_ID_CURRENCY = model.Id_Currency,
                        P_PRODUCT_AMOUNT = model.Product_Amount,
                        P_CREATION_USER = model.Creation_User,
                        P_PK_AC_TRADE_AGREEMENT = model.Pk_Ac_Trade_Agreement,
                        P_PK_GBL_WRK_AGREEMENT = model.Pk_Gbl_Wrk_Agreement,
                        P_ERROR = model.Error,
                        P_MESSAGE_ERROR = model.Message_Error,
                        P_IT_PROCESSED = model.It_Processed,
                        P_INVALID_AMOUNT = model.Invalid_Amount,
                        P_NOT_EXIST_PRODUCT = model.Not_Exist_Product,
                        P_DUPLICATE_PRODUCT_ALIAS = model.Duplicate_Product_Alias,
                        P_NOT_EXIST_ID_CURRENCY = model.Not_Exist_Id_Currency,
                        P_ACTIVE = model.Active

                    },
                    commandType: CommandType.StoredProcedure);
                return await Task.FromResult<IEnumerable<Import_Product>>(result.ToList());
            }
        }
        public async Task<ICollection<Import_Product>> ListCollection(Import_Product model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                var result = connection.Query<
                    Common.Import_Product>
                    ("",
                    param: new
                    {

                    },
                    commandType: CommandType.StoredProcedure);
                return await Task.FromResult<ICollection<Common.Import_Product>>(result.ToList());
            }
        }
        public async Task<Common.Import_Product> Get(Common.Import_Product model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                var result = connection.Query<
                    Sevensoft.Mexpress.Backend.Common.Import_Product>
                    ("",
                    param: new
                    {

                    },
                    commandType: CommandType.StoredProcedure).FirstOrDefault();
                return await Task.FromResult<Common.Import_Product>(result);
            }
        }
        public async Task Save(Common.Import_Product model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                await connection.QueryAsync<
                    Sevensoft.Mexpress.Backend.Common.Import_Product>
                    ("PA_PRO_GBL_WRK_AGREEMENT_HEADER",
                    param: new
                    {
                        P_PK_AC_TRADE_AGREEMENT = model.Pk_Ac_Trade_Agreement,                      
                        P_CREATION_USER = model.Creation_User,                     
                        P_MODIFICATION_USER = model.Modification_User,                       
                        P_TOTAL_RECORDS = model.Total_Records,
                        P_IT_PROCESSED = model.It_Processed,
                        P_FK_GLB_MTR_ORGANIZATION = model.Fk_Glb_Mtr_Organization
                    },
                    commandType: CommandType.StoredProcedure);
            }
        }

        public async Task<IEnumerable<Import_Product>> ExecuteProcess(Common.Import_Product model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                var result = connection.Query<
                    Common.Import_Product>
                    ("PA_PRO_GBL_WRK_AGREEMENT_EXECUTE_PROCESS",
                    param: new
                    {
                        P_PK_AC_TRADE_AGREEMENT = model.Pk_Ac_Trade_Agreement,
                        P_UPDATE_ROWS = model.Update_Rows
                    },
                    commandType: CommandType.StoredProcedure);
                    return await Task.FromResult<IEnumerable<Import_Product>>(result.ToList());
            }
        }
        public async Task Delete(Common.Import_Product model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                await connection.QueryAsync<
                    Sevensoft.Mexpress.Backend.Common.Import_Product>
                ("",
                param: new
                {
                },
                commandType: CommandType.StoredProcedure);
            }
        }

        public async Task<Common.Import_Product> SaveGet(Common.Import_Product model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                var result = connection.Query<
                    Common.Import_Product>
                    ("PA_PRO_GBL_WRK_AGREEMENT_HEADER",
                    param: new
                    {
                        P_PK_AC_TRADE_AGREEMENT = model.Pk_Ac_Trade_Agreement,                      
                        P_CREATION_USER = model.Creation_User,                     
                        P_MODIFICATION_USER = model.Modification_User,                       
                        P_TOTAL_RECORDS = model.Total_Records,
                        P_IT_PROCESSED = model.It_Processed,
                        P_FK_GLB_MTR_ORGANIZATION = model.Fk_Glb_Mtr_Organization
                    },
                    commandType: CommandType.StoredProcedure).FirstOrDefault();
                return await Task.FromResult<Common.Import_Product>(result);
            }
        }

        #endregion

        #region Region [Dispose]
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
        ~Gbl_Wrk_Agreement_Detail_Repository()
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