using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using System.Data;
using Sevensoft.Mexpress.Backend.Common;
using System.Data.SqlClient;


namespace Sevensoft.Mexpress.Backend.DataAccess
{

    public class Do_Mtr_Agreement_Repository : IRepository<Common.Ac_Mtr_Agreement_Detail>, IDisposable
    {

        #region Region [Variables]
        public IConnectionManager ConnectionManagerInstance { get; private set; }
        public IDbConnection Connection { get; set; }
        public IDbTransaction Transaction { get; set; }
        private string ConnectionString { get; set; }
        #endregion

        #region Region [Constructor]
        public Do_Mtr_Agreement_Repository(string connectionString)
        {
            ConnectionString = connectionString;
        }
        #endregion

        #region Region [Methods]
        public async Task<IEnumerable<Ac_Mtr_Agreement_Detail>> List(Ac_Mtr_Agreement_Detail model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                var result = connection.Query<
                    Common.Ac_Mtr_Agreement_Detail>
                    ("PA_CON_AC_MTR_AGREEMENT_GET",
                    param: new
                    {
                        P_PK_AC_TRADE_AGREEMENT = model.Pk_Ac_Trade_Agreement,
                        // P_PK_GLB_PRODUCTS = model.Pk_Glb_Products
            },
                    commandType: CommandType.StoredProcedure);
            return await Task.FromResult<IEnumerable<Ac_Mtr_Agreement_Detail>>(result.ToList());
        }
    }

            public async Task<IEnumerable<Ac_Mtr_Agreement_Detail>> ListInventory(Ac_Mtr_Agreement_Detail model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                var result = connection.Query<
                    Common.Ac_Mtr_Agreement_Detail>
                    ("PA_PRO_AGREEMENT_SYNC_INVENTORY",
                    param: new
                    {
                        @P_AGREEMENT_ID = model.Pk_Ac_Trade_Agreement
            },
                    commandType: CommandType.StoredProcedure);
            return await Task.FromResult<IEnumerable<Ac_Mtr_Agreement_Detail>>(result.ToList());
        }
    }

    public async Task<Common.Ac_Mtr_Agreement_Detail> Get(Common.Ac_Mtr_Agreement_Detail model)
    {
        using (var connection = new SqlConnection(ConnectionString))
        {
            var result = connection.Query<
                Sevensoft.Mexpress.Backend.Common.Ac_Mtr_Agreement_Detail>
                ("PA_CON_AC_MTR_AGREEMENT_GET",
                param: new
                {
                        P_PK_AC_TRADE_AGREEMENT = model.Pk_Ac_Trade_Agreement,
                        // P_PK_GLB_PRODUCTS = model.Pk_Glb_Products
                },
                commandType: CommandType.StoredProcedure).FirstOrDefault();
            return await Task.FromResult<Common.Ac_Mtr_Agreement_Detail>(result);
        }
    }
    public async Task Save(Common.Ac_Mtr_Agreement_Detail model)
    {
        using (var connection = new SqlConnection(ConnectionString))
        {
            await connection.QueryAsync<
                Sevensoft.Mexpress.Backend.Common.Ac_Mtr_Agreement_Detail>
                ("PA_MAN_AC_MTR_AGREEMENT_SAVE",
                param: new
                {
                        P_PK_CAT_AGREEMENT_DETAILS = model.Pk_Cat_Agreement_Details,
                        P_PK_AC_TRADE_AGREEMENT = model.Pk_Ac_Trade_Agreement,
                        P_PK_GLB_PRODUCTS = model.Pk_Glb_Products,
                        P_PRODUCT_ID_ALIAS = model.Product_Id_Alias,
                        P_PRODUCT_NAME = model.Product_Name,
                        P_ID_CURRENCY = model.Id_Currency,
                        P_RECOVERY_AMOUNT = model.Recovery_Amount,
                        P_CREATION_DATE = model.Creation_Date,
                        P_CREATION_USER = model.Creation_User,
                        P_MODIFICATION_DATE = model.Modification_Date,
                        P_MODIFICATION_USER = model.Modification_User,
                        P_ACTIVE = model.Active
                },
                commandType: CommandType.StoredProcedure);
        }
    }

    public async Task<Common.Ac_Mtr_Agreement_Detail> SaveScalar(Common.Ac_Mtr_Agreement_Detail model)
    {
        using (var connection = new SqlConnection(ConnectionString))
        {
            var result = connection.Query<
                Sevensoft.Mexpress.Backend.Common.Ac_Mtr_Agreement_Detail>
                ("PA_MAN_AC_MTR_AGREEMENT_SAVE",
                param: new
                {
                        P_PK_CAT_AGREEMENT_DETAILS = model.Pk_Cat_Agreement_Details,
                        P_PK_AC_TRADE_AGREEMENT = model.Pk_Ac_Trade_Agreement,
                        P_PK_GLB_PRODUCTS = model.Pk_Glb_Products,
                        P_PRODUCT_ID_ALIAS = model.Product_Id_Alias,
                        P_PRODUCT_NAME = model.Product_Name,
                        P_ID_CURRENCY = model.Id_Currency,
                        P_RECOVERY_AMOUNT = model.Recovery_Amount,
                        P_CREATION_DATE = model.Creation_Date,
                        P_CREATION_USER = model.Creation_User,
                        P_MODIFICATION_DATE = model.Modification_Date,
                        P_MODIFICATION_USER = model.Modification_User,
                        P_ACTIVE = model.Active
                },
                commandType: CommandType.StoredProcedure).FirstOrDefault();
            return await Task.FromResult<Common.Ac_Mtr_Agreement_Detail>(result);
        }
    }
    public async Task Delete(Common.Ac_Mtr_Agreement_Detail model)
    {
        using (var connection = new SqlConnection(ConnectionString))
        {
            await connection.ExecuteAsync(
            sql: "PA_CON_AC_MTR_AGREEMENT_DELETE",
            param: new
            {
                        P_PK_CAT_AGREEMENT_DETAILS = model.Pk_Cat_Agreement_Details,
                        P_PK_AC_TRADE_AGREEMENT = model.Pk_Ac_Trade_Agreement,
                        P_PK_GLB_PRODUCTS = model.Pk_Glb_Products,
                        P_CREATION_USER = model.Creation_User,
                        P_MODIFICATION_DATE = model.Modification_Date,
                        P_MODIFICATION_USER = model.Modification_User

            },
            commandType: CommandType.StoredProcedure);
        }
    }
    public async Task<IEnumerable<Ac_Mtr_Agreement_Detail>> DeleteScalar(Ac_Mtr_Agreement_Detail model)
    {
        using (var connection = new SqlConnection(ConnectionString))
        {
            var result = connection.Query<
                Common.Ac_Mtr_Agreement_Detail>
                ("PA_CON_AC_MTR_AGREEMENT_DELETE",
                param: new
                {
                        P_PK_CAT_AGREEMENT_DETAILS = model.Pk_Cat_Agreement_Details,
                        P_PK_AC_TRADE_AGREEMENT = model.Pk_Ac_Trade_Agreement,
                        P_PK_GLB_PRODUCTS = model.Pk_Glb_Products,
                        P_CREATION_USER = model.Creation_User,
                        P_MODIFICATION_DATE = model.Modification_Date,
                        P_MODIFICATION_USER = model.Modification_User
                },
                commandType: CommandType.StoredProcedure);
            return await Task.FromResult<IEnumerable<Ac_Mtr_Agreement_Detail>>(result.ToList());
        }
    }

    #endregion
    #region Region [Dispose]
    public void Dispose()
    {
        Dispose(true);
        GC.SuppressFinalize(this);
    }
    ~Do_Mtr_Agreement_Repository()
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
