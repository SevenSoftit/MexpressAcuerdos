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

    public class Do_Mtr_Agreement_Header_Repository : IRepository<Common.Import_Product>, IDisposable
    {

        #region Region [Variables]
        public IConnectionManager ConnectionManagerInstance { get; private set; }
        public IDbConnection Connection { get; set; }
        public IDbTransaction Transaction { get; set; }
        private string ConnectionString { get; set; }
        #endregion

        #region Region [Constructor]
        public Do_Mtr_Agreement_Header_Repository(string connectionString)
        {
            ConnectionString = connectionString;
        }
        #endregion

        #region Region [Methods]
        public async Task<IEnumerable<Import_Product>> List(Import_Product model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                var result = connection.Query<
                    Common.Import_Product>
                    ("PA_CON_AC_MTR_HEADER_AGREEMENT_GET",
                    param: new
                    {
                        P_PK_AC_TRADE_AGREEMENT = model.Pk_Ac_Trade_Agreement,
                        P_PK_CAT_TYPE_AGREEMENT = model.Pk_Cat_Type_Agreement,
                        P_PK_AC_CAT_PROVIDER = model.Pk_Ac_Cat_Provider,
                        P_CREATION_DATE = model.Creation_Date,
                        P_CREATION_USER = model.Creation_User,
                        P_MODIFICATION_DATE = model.Modification_Date,
                        P_MODIFICATION_USER = model.Modification_User,
                        P_NAME_AGREEMENT = model.Name_Agreement,
                        P_DESCRIPTION_AGREEMENT = model.Description_Agreement,
                        P_DATE_START = model.Date_Start,
                        P_DATE_FINISH = model.Date_Finish,
                        P_DATE_PROCESS = model.Date_Process,
                        P_DATE_REPROCESS = model.Date_Reprocess,
                        P_ALL_PRODUCTS = model.All_Products,
                        P_PROVIDER_NAME = model.Provider_Name,
                        P_ACTIVE = model.Active,
                        P_FK_STATUS_AGREEMENT = model.Fk_Status_Agreement,
                        P_FK_GLB_MTR_ORGANIZATION = model.Fk_Glb_Mtr_Organization
                    },
                    commandType: CommandType.StoredProcedure);
                return await Task.FromResult<IEnumerable<Import_Product>>(result.ToList());
            }
        }

        public async Task<Common.Import_Product> Get(Common.Import_Product model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                var result = connection.Query<
                    Sevensoft.Mexpress.Backend.Common.Import_Product>
                    ("PA_CON_AC_MTR_HEADER_AGREEMENT_GET ",
                    param: new
                    {
                        P_PK_AC_TRADE_AGREEMENT = model.Pk_Ac_Trade_Agreement,
                        P_PK_CAT_TYPE_AGREEMENT = model.Pk_Cat_Type_Agreement,
                        P_PK_AC_CAT_PROVIDER = model.Pk_Ac_Cat_Provider,
                        P_CREATION_DATE = model.Creation_Date,
                        P_CREATION_USER = model.Creation_User,
                        P_MODIFICATION_DATE = model.Modification_Date,
                        P_MODIFICATION_USER = model.Modification_User,
                        P_NAME_AGREEMENT = model.Name_Agreement,
                        P_DESCRIPTION_AGREEMENT = model.Description_Agreement,
                        P_DATE_START = model.Date_Start,
                        P_DATE_FINISH = model.Date_Finish,
                        P_DATE_PROCESS = model.Date_Process,
                        P_DATE_REPROCESS = model.Date_Reprocess,
                        P_ALL_PRODUCTS = model.All_Products,
                        P_PROVIDER_NAME = model.Provider_Name,
                        P_ACTIVE = model.Active,
                        P_FK_STATUS_AGREEMENT = model.Fk_Status_Agreement,
                        P_FK_GLB_MTR_ORGANIZATION = model.Fk_Glb_Mtr_Organization
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
                    ("PA_MAN_AC_MTR_AGREEMENT_HEADER_SAVE",
                    param: new
                    {
                        P_PK_AC_TRADE_AGREEMENT = model.Pk_Ac_Trade_Agreement,
                        P_PK_CAT_TYPE_AGREEMENT = model.Pk_Cat_Type_Agreement,
                        P_PK_AC_CAT_PROVIDER = model.Pk_Ac_Cat_Provider,
                        P_CREATION_DATE = model.Creation_Date,
                        P_CREATION_USER = model.Creation_User,
                        P_MODIFICATION_DATE = model.Modification_Date,
                        P_MODIFICATION_USER = model.Modification_User,
                        P_NAME_AGREEMENT = model.Name_Agreement,
                        P_DESCRIPTION_AGREEMENT = model.Description_Agreement,
                        P_DATE_START = model.Date_Start,
                        P_DATE_FINISH = model.Date_Finish,
                        P_DATE_PROCESS = model.Date_Process,
                        P_DATE_REPROCESS = model.Date_Reprocess,
                        P_ALL_PRODUCTS = model.All_Products,
                        P_PROVIDER_NAME = model.Provider_Name,
                        P_PRODUCT_AMOUNT = model.Product_Amount,
                        P_ACTIVE = model.Active,
                        P_FK_GLB_MTR_ORGANIZATION = model.Fk_Glb_Mtr_Organization
                    },
                    commandType: CommandType.StoredProcedure);
            }
        }

        public async Task<IEnumerable<Common.Import_Product>> SaveScalar(Common.Import_Product model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                var result = connection.Query<
                    Sevensoft.Mexpress.Backend.Common.Import_Product>
                    ("PA_MAN_AC_MTR_AGREEMENT_HEADER_SAVE",
                    param: new
                    {
                        P_PK_AC_TRADE_AGREEMENT = model.Pk_Ac_Trade_Agreement,
                        P_PK_CAT_TYPE_AGREEMENT = model.Pk_Cat_Type_Agreement,
                        P_PK_AC_CAT_PROVIDER = model.Pk_Ac_Cat_Provider,
                        P_CREATION_DATE = model.Creation_Date,
                        P_CREATION_USER = model.Creation_User,
                        P_MODIFICATION_DATE = model.Modification_Date,
                        P_MODIFICATION_USER = model.Modification_User,
                        P_NAME_AGREEMENT = model.Name_Agreement,
                        P_DESCRIPTION_AGREEMENT = model.Description_Agreement,
                        P_DATE_START = model.Date_Start,
                        P_DATE_FINISH = model.Date_Finish,
                        P_DATE_PROCESS = model.Date_Process,
                        P_DATE_REPROCESS = model.Date_Reprocess,
                        P_ALL_PRODUCTS = model.All_Products,
                        P_PROVIDER_NAME = model.Provider_Name,
                        P_ACTIVE = model.Active,
                        P_FK_STATUS_AGREEMENT = model.Fk_Status_Agreement,
                        P_FK_GLB_MTR_ORGANIZATION = model.Fk_Glb_Mtr_Organization
                    },
                //     commandType: CommandType.StoredProcedure).FirstOrDefault();
                // return await Task.FromResult<Common.Import_Product>(result);
                commandType: CommandType.StoredProcedure);
                return await Task.FromResult<IEnumerable<Import_Product>>(result.ToList());

            }
        }
        public async Task Delete(Common.Import_Product model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                await connection.ExecuteAsync(
                sql: "PA_MAN_AC_MTR_AGREEMENT_HEADER_DELETE",
                param: new
                {
                    P_PK_AC_TRADE_AGREEMENT = model.Pk_Ac_Trade_Agreement,
                    P_CREATION_USER = model.Creation_User,
                    P_MODIFICATION_DATE = model.Modification_Date,
                    P_MODIFICATION_USER = model.Modification_User
                },
                commandType: CommandType.StoredProcedure);
            }
        }
        public async Task<IEnumerable<Import_Product>> DeleteScalar(Import_Product model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                var result = connection.Query<
                    Common.Import_Product>
                    ("PA_MAN_AC_MTR_AGREEMENT_HEADER_DELETE",
                    param: new
                    {
                        P_PK_AC_TRADE_AGREEMENT = model.Pk_Ac_Trade_Agreement,
                        P_CREATION_USER = model.Creation_User,
                        P_MODIFICATION_DATE = model.Modification_Date,
                        P_MODIFICATION_USER = model.Modification_User
                    },
                    commandType: CommandType.StoredProcedure);
                return await Task.FromResult<IEnumerable<Import_Product>>(result.ToList());
            }
        }

        #endregion
        #region Region [Dispose]
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
        ~Do_Mtr_Agreement_Header_Repository()
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
