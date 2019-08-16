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

    public class Ac_Mtr_Provider_Repository : IRepository<Common.Ac_Mtr_Provider>, IDisposable
    {

        #region Region [Variables]
        public IConnectionManager ConnectionManagerInstance { get; private set; }
        public IDbConnection Connection { get; set; }
        public IDbTransaction Transaction { get; set; }
        private string ConnectionString { get; set; }
        #endregion

        #region Region [Constructor]
        public Ac_Mtr_Provider_Repository(string connectionString)
        {
            ConnectionString = connectionString;
        }
        #endregion

        #region Region [Methods]
        public async Task<IEnumerable<Ac_Mtr_Provider>> List(Ac_Mtr_Provider model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                var result = connection.Query<
                    Common.Ac_Mtr_Provider>
                    ("PA_CON_AC_MTR_PROVIDER_GET",
                    param: new
                    {
                        P_PK_AC_CAT_PROVIDER = model.Pk_Ac_Cat_Provider,
                        P_CREATION_DATE = model.Creation_Date,
                        P_CREATION_USER = model.Creation_User,
                        P_MODIFICATION_DATE = model.Modification_Date,
                        P_MODIFICATION_USER = model.Modification_User,
                        P_NAME_PROVIDER = model.Name_Provider,
                        P_IDENTIFICATION_PROVIDER = model.Identification_Provider,
                        P_EMAIL_PROVIDER = model.Email_Provider,
                        P_BUSINESS_NAME = model.Business_Name,
                        P_ID_PROVIDER_PDV = model.Id_Provider_Pdv,
                        P_ID_PROVIDER_ERP = model.Id_Provider_Erp,
                        P_ACTIVE = model.Active,
                        P_PAGE_NUMBER = model.Page_Number > 0 ? model.Page_Number : 1,
                        P_ROWS_PAGE = model.Rows_Page > 0 ? model.Rows_Page : int.MaxValue

                    },
                    commandType: CommandType.StoredProcedure);
                return await Task.FromResult<IEnumerable<Ac_Mtr_Provider>>(result.ToList());
            }
        }
        public async Task<ICollection<Ac_Mtr_Provider>> ListCollection(Ac_Mtr_Provider model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                var result = connection.Query<
                    Common.Ac_Mtr_Provider>
                    ("PA_CON_AC_MTR_PROVIDER_GET",
                    param: new
                    {
                        P_PK_AC_CAT_PROVIDER = model.Pk_Ac_Cat_Provider,
                        P_CREATION_DATE = model.Creation_Date,
                        P_CREATION_USER = model.Creation_User,
                        P_MODIFICATION_DATE = model.Modification_Date,
                        P_MODIFICATION_USER = model.Modification_User,
                        P_NAME_PROVIDER = model.Name_Provider,
                        P_IDENTIFICATION_PROVIDER = model.Identification_Provider,
                        P_EMAIL_PROVIDER = model.Email_Provider,
                        P_BUSINESS_NAME = model.Business_Name,
                        P_ID_PROVIDER_PDV = model.Id_Provider_Pdv,
                        P_ID_PROVIDER_ERP = model.Id_Provider_Erp,
                        P_ACTIVE = model.Active
                    },
                    commandType: CommandType.StoredProcedure);
                return await Task.FromResult<ICollection<Common.Ac_Mtr_Provider>>(result.ToList());
            }
        }
        public async Task<Common.Ac_Mtr_Provider> Get(Common.Ac_Mtr_Provider model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                var result = connection.Query<
                    Sevensoft.Mexpress.Backend.Common.Ac_Mtr_Provider>
                    ("PA_CON_AC_MTR_PROVIDER_GET",
                    param: new
                    {
                        P_PK_AC_CAT_PROVIDER = model.Pk_Ac_Cat_Provider,
                        P_CREATION_DATE = model.Creation_Date,
                        P_CREATION_USER = model.Creation_User,
                        P_MODIFICATION_DATE = model.Modification_Date,
                        P_MODIFICATION_USER = model.Modification_User,
                        P_NAME_PROVIDER = model.Name_Provider,
                        P_IDENTIFICATION_PROVIDER = model.Identification_Provider,
                        P_EMAIL_PROVIDER = model.Email_Provider,
                        P_BUSINESS_NAME = model.Business_Name,
                        P_ID_PROVIDER_PDV = model.Id_Provider_Pdv,
                        P_ID_PROVIDER_ERP = model.Id_Provider_Erp,
                        P_ACTIVE = model.Active
                    },
                    commandType: CommandType.StoredProcedure).FirstOrDefault();
                return await Task.FromResult<Common.Ac_Mtr_Provider>(result);
            }
        }
        public async Task Save(Common.Ac_Mtr_Provider model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                await connection.QueryAsync<
                    Sevensoft.Mexpress.Backend.Common.Ac_Mtr_Provider>
                    ("PA_MAN_AC_MTR_PROVIDER_SAVE",
                    param: new
                    {
                        P_PK_AC_CAT_PROVIDER = model.Pk_Ac_Cat_Provider,
                        P_CREATION_DATE = model.Creation_Date,
                        P_CREATION_USER = model.Creation_User,
                        P_MODIFICATION_DATE = model.Modification_Date,
                        P_MODIFICATION_USER = model.Modification_User,
                        P_NAME_PROVIDER = model.Name_Provider,
                        P_IDENTIFICATION_PROVIDER = model.Identification_Provider,
                        P_EMAIL_PROVIDER = model.Email_Provider,
                        P_BUSINESS_NAME = model.Business_Name,
                        P_ID_PROVIDER_PDV = model.Id_Provider_Pdv,
                        P_ID_PROVIDER_ERP = model.Id_Provider_Erp,
                        P_ACTIVE = model.Active
                    },
                    commandType: CommandType.StoredProcedure);
            }
        }
        public async Task Delete(Common.Ac_Mtr_Provider model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                await connection.ExecuteAsync(
                sql: "PA_CON_AC_MTR_PROVIDER_DELETE",
                param: new
                {
                        P_PK_AC_CAT_PROVIDER = model.Pk_Ac_Cat_Provider,
                        P_CREATION_DATE = model.Creation_Date,
                        P_CREATION_USER = model.Creation_User,
                        P_MODIFICATION_DATE = model.Modification_Date,
                        P_MODIFICATION_USER = model.Modification_User,
                        P_NAME_PROVIDER = model.Name_Provider,
                        P_IDENTIFICATION_PROVIDER = model.Identification_Provider,
                        P_EMAIL_PROVIDER = model.Email_Provider,
                        P_BUSINESS_NAME = model.Business_Name,
                        P_ID_PROVIDER_PDV = model.Id_Provider_Pdv,
                        P_ID_PROVIDER_ERP = model.Id_Provider_Erp,
                        P_ACTIVE = model.Active
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
        ~Ac_Mtr_Provider_Repository()
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
