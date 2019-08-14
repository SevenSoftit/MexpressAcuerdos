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

    public class Do_Mtr_Agreement_Product_Info_Detail_Repository : IRepository<Common.Ac_Mtr_Agreement_Product_Info_Detail>, IDisposable
    {

        #region Region [Variables]
        public IConnectionManager ConnectionManagerInstance { get; private set; }
        public IDbConnection Connection { get; set; }
        public IDbTransaction Transaction { get; set; }
        private string ConnectionString { get; set; }
        #endregion

        #region Region [Constructor]
        public Do_Mtr_Agreement_Product_Info_Detail_Repository(string connectionString)
        {
            ConnectionString = connectionString;
        }
        #endregion

        #region Region [Methods]
        public async Task<IEnumerable<Ac_Mtr_Agreement_Product_Info_Detail>> List(Ac_Mtr_Agreement_Product_Info_Detail model)
        {
            
            using (var connection = new SqlConnection(ConnectionString))
            { 

                var result = connection.Query<Common.Ac_Mtr_Agreement_Product_Info_Detail>
                
                    ("PA_CON_AC_MTR_AGREEMENT_DETAILS_RESULT_GET",
                    param: new
                    {
                        P_PK_AC_TRADE_AGREEMENT = model.Pk_Ac_Trade_Agreement,
                        // P_PK_CAT_AGREEMENT_DETAILS_RESUME = model.Pk_Cat_Agreement_Details_Resume,
                        P_BEHAVIOR = model.Behavior
            },
                    commandType: CommandType.StoredProcedure);
                    return await Task.FromResult<IEnumerable<Ac_Mtr_Agreement_Product_Info_Detail>>(result.ToList());           
        }
    }

    public async Task<Common.Ac_Mtr_Agreement_Product_Info_Detail> Get(Common.Ac_Mtr_Agreement_Product_Info_Detail model)
    {
        using (var connection = new SqlConnection(ConnectionString))
        {
            var result = connection.Query<
                Sevensoft.Mexpress.Backend.Common.Ac_Mtr_Agreement_Product_Info_Detail>
                ("PA_CON_AC_MTR_AGREEMENT_DETAILS_RESULT_GET",
                param: new
                {
                        P_PK_AC_TRADE_AGREEMENT = model.Pk_Ac_Trade_Agreement,
                        // P_PK_CAT_AGREEMENT_DETAILS_RESUME = model.Pk_Cat_Agreement_Details_Resume,
                        P_BEHAVIOR = model.Behavior
                },
                commandType: CommandType.StoredProcedure).FirstOrDefault();
            return await Task.FromResult<Common.Ac_Mtr_Agreement_Product_Info_Detail>(result);
        }
    }
    public async Task Save(Common.Ac_Mtr_Agreement_Product_Info_Detail model)
    {
        using (var connection = new SqlConnection(ConnectionString))
        {
            await connection.QueryAsync<
                Sevensoft.Mexpress.Backend.Common.Ac_Mtr_Agreement_Product_Info_Detail>
                ("PA_MAN_AC_MTR_AGREEMENT_DETAILS_RESULT_SAVE",
                param: new
                {
                        P_PK_AC_TRADE_AGREEMENT = model.Pk_Ac_Trade_Agreement,
                        P_PK_CAT_AGREEMENT_DETAILS_RESULT = model.Pk_Cat_Agreement_Details_Result, 
                        P_PK_CAT_AGREEMENT_DETAILS_RESUME = model.Pk_Cat_Agreement_Details_Resume, 
                        P_EMP_ID = model.Emp_Id, 
                        P_NAME_COMPANY = model.Name_Company,
                        P_TYPE_DOC_ID = model.Type_Doc_Id,
                        P_NAME_DOCUMENT = model.Name_Document,
                        P_SUC_ID = model.Suc_Id,
                        P_NAME_STORE = model.Name_Store,
                        P_CASE_ID = model.Case_Id,
                        P_BILL_ID = model.Bill_Id,
                        P_PRODUCT_QUANTITY = model.Product_Quantity,
                        P_PRODUCT_ID = model.Product_Id,
                        P_PRODUCT_NAME = model.Product_Name,
                        P_PRODUCT_SERIE = model.Product_Serie,
                        P_PRODUCT_COST = model.Product_Cost,
                        P_PRODUCT_PRICE = model.Product_Price,
                        P_DATE_INVOICE = model.Date_Invoice,
                        P_DETAIL_DAYS_WARRANTY = model.Detail_Days_Warranty, 
                        P_RETURN_INVOICE = model.Return_Invoice,
                        P_RETURN_INVOICE_DATE = model.Return_Invoice_Date,
                        P_ID_VENDOR = model.Id_Vendor,
                        P_NAME_VENDOR = model.Name_Vendor,
                        P_CLIENT_ID = model.Client_Id,
                        P_CLIENT_IDENTIFICATION = model.Client_Identification, 
                        P_CLIENT_NAME = model.Client_Name,
                        P_DATE_PROCESS = model.Date_Process
                       
                        // P_ID_CURRENCY = model.Id_Currency,                     
                        // P_ACTIVE = model.Active
                },
                commandType: CommandType.StoredProcedure);
        }
    }

    public async Task<Common.Ac_Mtr_Agreement_Product_Info_Detail> SaveScalar(Common.Ac_Mtr_Agreement_Product_Info_Detail model)
    {
        using (var connection = new SqlConnection(ConnectionString))
        {
            var result = connection.Query<
                Sevensoft.Mexpress.Backend.Common.Ac_Mtr_Agreement_Product_Info_Detail>
                ("PA_MAN_AC_MTR_AGREEMENT_DETAILS_RESULT_SAVE",
                param: new
                {
                        P_PK_AC_TRADE_AGREEMENT = model.Pk_Ac_Trade_Agreement,
                        P_PK_CAT_AGREEMENT_DETAILS_RESULT = model.Pk_Cat_Agreement_Details_Result, 
                        P_PK_CAT_AGREEMENT_DETAILS_RESUME = model.Pk_Cat_Agreement_Details_Resume, 
                        P_EMP_ID = model.Emp_Id, 
                        P_NAME_COMPANY = model.Name_Company,
                        P_TYPE_DOC_ID = model.Type_Doc_Id,
                        P_NAME_DOCUMENT = model.Name_Document,
                        P_SUC_ID = model.Suc_Id,
                        P_NAME_STORE = model.Name_Store,
                        P_CASE_ID = model.Case_Id,
                        P_BILL_ID = model.Bill_Id,
                        P_PRODUCT_QUANTITY = model.Product_Quantity,
                        P_PRODUCT_ID = model.Product_Id,
                        P_PRODUCT_NAME = model.Product_Name,
                        P_PRODUCT_SERIE = model.Product_Serie,
                        P_PRODUCT_COST = model.Product_Cost,
                        P_PRODUCT_PRICE = model.Product_Price,
                        P_DATE_INVOICE = model.Date_Invoice,
                        P_DETAIL_DAYS_WARRANTY = model.Detail_Days_Warranty, 
                        P_RETURN_INVOICE = model.Return_Invoice,
                        P_RETURN_INVOICE_DATE = model.Return_Invoice_Date,
                        P_ID_VENDOR = model.Id_Vendor,
                        P_NAME_VENDOR = model.Name_Vendor,
                        P_CLIENT_ID = model.Client_Id,
                        P_CLIENT_IDENTIFICATION = model.Client_Identification, 
                        P_CLIENT_NAME = model.Client_Name,
                        P_DATE_PROCESS = model.Date_Process
                       
                        // P_ID_CURRENCY = model.Id_Currency,                     
                        // P_ACTIVE = model.Active
                },
                commandType: CommandType.StoredProcedure).FirstOrDefault();
            return await Task.FromResult<Common.Ac_Mtr_Agreement_Product_Info_Detail>(result);
        }
    }
    public async Task Delete(Common.Ac_Mtr_Agreement_Product_Info_Detail model)
    {
        using (var connection = new SqlConnection(ConnectionString))
        {
            await connection.ExecuteAsync(
            sql: "PA_CON_AC_MTR_AGREEMENT_DETAILS_RESULT_DELETE",
            param: new
            {
                        P_PK_CAT_AGREEMENT_DETAILS_RESUME = model.Pk_Cat_Agreement_Details_Resume,
                        P_PK_AC_TRADE_AGREEMENT = model.Pk_Ac_Trade_Agreement

            },
            commandType: CommandType.StoredProcedure);
        }
    }
    public async Task<IEnumerable<Ac_Mtr_Agreement_Product_Info_Detail>> DeleteScalar(Ac_Mtr_Agreement_Product_Info_Detail model)
    {
        using (var connection = new SqlConnection(ConnectionString))
        {
            var result = connection.Query<
                Common.Ac_Mtr_Agreement_Product_Info_Detail>
                ("PA_CON_AC_MTR_AGREEMENT_DETAILS_RESULT_DELETE",
                param: new
                {
                        P_PK_CAT_AGREEMENT_DETAILS_RESUME = model.Pk_Cat_Agreement_Details_Resume,
                        P_PK_AC_TRADE_AGREEMENT = model.Pk_Ac_Trade_Agreement
                },
                commandType: CommandType.StoredProcedure);
            return await Task.FromResult<IEnumerable<Ac_Mtr_Agreement_Product_Info_Detail>>(result.ToList());
        }
    }

    #endregion
    #region Region [Dispose]
    public void Dispose()
    {
        Dispose(true);
        GC.SuppressFinalize(this);
    }
    ~Do_Mtr_Agreement_Product_Info_Detail_Repository()
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
