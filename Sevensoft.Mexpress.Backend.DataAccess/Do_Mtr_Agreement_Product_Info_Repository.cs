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

    public class Do_Mtr_Agreement_Product_Info_Repository : IRepository<Common.Ac_Mtr_Agreement_Product_Info>, IDisposable
    {

        #region Region [Variables]
        public IConnectionManager ConnectionManagerInstance { get; private set; }
        public IDbConnection Connection { get; set; }
        public IDbTransaction Transaction { get; set; }
        private string ConnectionString { get; set; }
        #endregion

        #region Region [Constructor]
        public Do_Mtr_Agreement_Product_Info_Repository(string connectionString)
        {
            ConnectionString = connectionString;
        }
        #endregion

        #region Region [Methods]
        public async Task<IEnumerable<Ac_Mtr_Agreement_Product_Info>> List(Ac_Mtr_Agreement_Product_Info model)
        {
            
            using (var connection = new SqlConnection(ConnectionString))
            { 

                var result = connection.Query<Common.Ac_Mtr_Agreement_Product_Info>
                
                    ("PA_CON_AC_MTR_AGREEMENT_DETAILS_RESUME_GET",
                    param: new
                    {
                        P_PK_AC_TRADE_AGREEMENT = model.Pk_Ac_Trade_Agreement,
                        P_BEHAVIOR = model.Behavior
            },
                    commandType: CommandType.StoredProcedure);
                    return await Task.FromResult<IEnumerable<Ac_Mtr_Agreement_Product_Info>>(result.ToList());           
        }
    }

    public async Task<Common.Ac_Mtr_Agreement_Product_Info> Get(Common.Ac_Mtr_Agreement_Product_Info model)
    {
        using (var connection = new SqlConnection(ConnectionString))
        {
            var result = connection.Query<
                Sevensoft.Mexpress.Backend.Common.Ac_Mtr_Agreement_Product_Info>
                ("PA_CON_AC_MTR_AGREEMENT_DETAILS_RESUME_GET",
                param: new
                {
                        P_PK_AC_TRADE_AGREEMENT = model.Pk_Ac_Trade_Agreement,
                        // P_PK_GLB_PRODUCTS = model.Pk_Glb_Products
                        P_BEHAVIOR = model.Behavior
                },
                commandType: CommandType.StoredProcedure).FirstOrDefault();
            return await Task.FromResult<Common.Ac_Mtr_Agreement_Product_Info>(result);
        }
    }
    public async Task Save(Common.Ac_Mtr_Agreement_Product_Info model)
    {
        using (var connection = new SqlConnection(ConnectionString))
        {
            await connection.QueryAsync<
                Sevensoft.Mexpress.Backend.Common.Ac_Mtr_Agreement_Product_Info>
                ("PA_MAN_AC_MTR_AGREEMENT_DETAILS_RESUME_SAVE",
                param: new
                {
                        P_PK_CAT_AGREEMENT_DETAILS_RESUME = model.Pk_Cat_Agreement_Details_Resume,
                        P_PK_AC_TRADE_AGREEMENT = model.Pk_Ac_Trade_Agreement,
                        P_PK_GLB_PRODUCTS = model.Pk_Glb_Products,
                        P_CREATION_DATE = model.Creation_Date,
                        P_CREATION_USER = model.Creation_User,
                        P_MODIFICATION_DATE = model.Modification_Date,
                        P_MODIFICATION_USER = model.Modification_User,
                        P_PRODUCT_ID = model.Product_Id,
                        P_PRODUCT_NAME = model.Product_Name,
                        P_PRODUCT_AMOUNT = model.Product_Amount,
                        P_PRODUCT_QUANTITY_SOLD= model.Product_Quantity_Sold,
                        P_PRODUCT_AMOUNT_RECOVERY = model.Product_Amount_Recovery,
                        
                        // P_ID_CURRENCY = model.Id_Currency,                     
                        // P_ACTIVE = model.Active
                },
                commandType: CommandType.StoredProcedure);
        }
    }

        public async Task CalculateAmounts(Common.Ac_Mtr_Agreement_Product_Info model)
    {
        using (var connection = new SqlConnection(ConnectionString))
        {
            await connection.QueryAsync<
                Sevensoft.Mexpress.Backend.Common.Ac_Mtr_Agreement_Product_Info>
                ("PA_MAN_AC_MTR_CALCULATE_AMOUNTS",
                param: new
                {
                        P_PK_AC_TRADE_AGREEMENT = model.Pk_Ac_Trade_Agreement,
                        P_BEHAVIOR = model.Behavior
                },
                commandType: CommandType.StoredProcedure);
        }
    }

    public async Task<Common.Ac_Mtr_Agreement_Product_Info> SaveScalar(Common.Ac_Mtr_Agreement_Product_Info model)
    {
        using (var connection = new SqlConnection(ConnectionString))
        {
            var result = connection.Query<
                Sevensoft.Mexpress.Backend.Common.Ac_Mtr_Agreement_Product_Info>
                ("PA_MAN_AC_MTR_AGREEMENT_DETAILS_RESUME_SAVE",
                param: new
                {
                        P_PK_CAT_AGREEMENT_DETAILS_RESUME = model.Pk_Cat_Agreement_Details_Resume,
                        P_PK_AC_TRADE_AGREEMENT = model.Pk_Ac_Trade_Agreement,
                        P_PK_GLB_PRODUCTS = model.Pk_Glb_Products,
                        P_CREATION_DATE = model.Creation_Date,
                        P_CREATION_USER = model.Creation_User,
                        P_MODIFICATION_DATE = model.Modification_Date,
                        P_MODIFICATION_USER = model.Modification_User,
                        P_PRODUCT_ID = model.Product_Id,
                        P_PRODUCT_NAME = model.Product_Name,
                        P_PRODUCT_AMOUNT = model.Product_Amount,
                        P_PRODUCT_QUANTITY_SOLD= model.Product_Quantity_Sold,
                        P_PRODUCT_AMOUNT_RECOVERY = model.Product_Amount_Recovery,
                        
                        // P_ID_CURRENCY = model.Id_Currency,                     
                        // P_ACTIVE = model.Active
                },
                commandType: CommandType.StoredProcedure).FirstOrDefault();
            return await Task.FromResult<Common.Ac_Mtr_Agreement_Product_Info>(result);
        }
    }
    public async Task Delete(Common.Ac_Mtr_Agreement_Product_Info model)
    {
        using (var connection = new SqlConnection(ConnectionString))
        {
            await connection.ExecuteAsync(
            sql: "PA_CON_AC_MTR_AGREEMENT_DETAILS_RESUME_DELETE",
            param: new
            {
                        P_PK_CAT_AGREEMENT_DETAILS_RESUME = model.Pk_Cat_Agreement_Details_Resume,
                        P_PK_AC_TRADE_AGREEMENT = model.Pk_Ac_Trade_Agreement,
                        P_PK_GLB_PRODUCTS = model.Pk_Glb_Products,
                        P_CREATION_USER = model.Creation_User,
                        P_MODIFICATION_DATE = model.Modification_Date,
                        P_MODIFICATION_USER = model.Modification_User

            },
            commandType: CommandType.StoredProcedure);
        }
    }
    public async Task<IEnumerable<Ac_Mtr_Agreement_Product_Info>> DeleteScalar(Ac_Mtr_Agreement_Product_Info model)
    {
        using (var connection = new SqlConnection(ConnectionString))
        {
            var result = connection.Query<
                Common.Ac_Mtr_Agreement_Product_Info>
                ("PA_CON_AC_MTR_AGREEMENT_DETAILS_RESUME_DELETE",
                param: new
                {
                        P_PK_CAT_AGREEMENT_DETAILS_RESUME = model.Pk_Cat_Agreement_Details_Resume,
                        P_PK_AC_TRADE_AGREEMENT = model.Pk_Ac_Trade_Agreement,
                        P_PK_GLB_PRODUCTS = model.Pk_Glb_Products,
                        P_CREATION_USER = model.Creation_User,
                        P_MODIFICATION_DATE = model.Modification_Date,
                        P_MODIFICATION_USER = model.Modification_User
                },
                commandType: CommandType.StoredProcedure);
            return await Task.FromResult<IEnumerable<Ac_Mtr_Agreement_Product_Info>>(result.ToList());
        }
    }

    #endregion
    #region Region [Dispose]
    public void Dispose()
    {
        Dispose(true);
        GC.SuppressFinalize(this);
    }
    ~Do_Mtr_Agreement_Product_Info_Repository()
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
