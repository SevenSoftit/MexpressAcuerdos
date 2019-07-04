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

    public class Gbl_Mtr_Evidence_Repository : IRepository<Common.Do_Mtr_Evidence>, IDisposable
    {

        #region Region [Variables]
        public IConnectionManager ConnectionManagerInstance { get; private set; }
        public IDbConnection Connection { get; set; }
        public IDbTransaction Transaction { get; set; }
        private string ConnectionString { get; set; }
        #endregion

        #region Region [Constructor]
        public Gbl_Mtr_Evidence_Repository(string connectionString)
        {
            ConnectionString = connectionString;
        }
        #endregion

        #region Region [Methods]
        public async Task<IEnumerable<Do_Mtr_Evidence>> List(Do_Mtr_Evidence model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                var result = connection.Query<
                    Common.Do_Mtr_Evidence>
                    ("PA_CON_GBL_MTR_EVIDENCE_GET",
                    param: new
                    {

                        P_PK_MTR_PAY_EVIDENCE_PROCESS = model.Pk_Mtr_Pay_Evidence_Process,
                        P_PK_DO_MTR_PAY_SLIP = model.Pk_Do_Mtr_Pay_Slip,
                        P_PK_DO_CAT_GROUP = model.Pk_Do_Cat_Group,
                        P_CREATION_DATE = model.Creation_Date,
                        P_CREATION_USER = model.Creation_User,
                        P_MODIFICATION_DATE = model.Modification_Date,
                        P_MODIFICATION_USER = model.Modification_User,
                        P_ARCHIVE_ORIGINAL_NAME = model.Archive_Original_Name,
                        P_ARCHIVE_NEW_NAME = model.Archive_New_Name,
                        P_URL_ATTACHMENT = model.Url_Attachment,
                        P_ACTIVE = model.Active
                    },
                    commandType: CommandType.StoredProcedure);
                return await Task.FromResult<IEnumerable<Do_Mtr_Evidence>>(result.ToList());
            }
        }

        public async Task<IEnumerable<Do_Mtr_Evidence>> ListSpecial(Do_Mtr_Evidence model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                var result = connection.Query<
                    Common.Do_Mtr_Evidence>
                    ("PA_CON_GBL_MTR_EVIDENCE_GET",
                    param: new
                    {
                        P_PK_DO_MTR_PAY_SLIP = model.Pk_Do_Mtr_Pay_Slip,
                        P_PK_DO_CAT_GROUP = model.Pk_Do_Cat_Group,

                    },
                    commandType: CommandType.StoredProcedure);
                return await Task.FromResult<IEnumerable<Do_Mtr_Evidence>>(result.ToList());
            }
        }
        public async Task<ICollection<Do_Mtr_Evidence>> ListCollection(Do_Mtr_Evidence model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                var result = connection.Query<
                    Common.Do_Mtr_Evidence>
                    ("PA_CON_GBL_MTR_EVIDENCE_GET",
                    param: new
                    {
                        P_PK_MTR_PAY_EVIDENCE_PROCESS = model.Pk_Mtr_Pay_Evidence_Process,
                        P_PK_DO_MTR_PAY_SLIP = model.Pk_Do_Mtr_Pay_Slip,
                        P_PK_DO_CAT_GROUP = model.Pk_Do_Cat_Group,
                        P_CREATION_DATE = model.Creation_Date,
                        P_CREATION_USER = model.Creation_User,
                        P_MODIFICATION_DATE = model.Modification_Date,
                        P_MODIFICATION_USER = model.Modification_User,
                        P_ARCHIVE_ORIGINAL_NAME = model.Archive_Original_Name,
                        P_ARCHIVE_NEW_NAME = model.Archive_New_Name,
                        P_URL_ATTACHMENT = model.Url_Attachment,
                        P_ACTIVE = model.Active
                    },
                    commandType: CommandType.StoredProcedure);
                return await Task.FromResult<ICollection<Common.Do_Mtr_Evidence>>(result.ToList());
            }
        }
        public async Task<Common.Do_Mtr_Evidence> Get(Common.Do_Mtr_Evidence model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                var result = connection.Query<
                    Sevensoft.Mexpress.Backend.Common.Do_Mtr_Evidence>
                    ("PA_CON_GBL_MTR_EVIDENCE_GET",
                    param: new
                    {
                        P_PK_MTR_PAY_EVIDENCE_PROCESS = model.Pk_Mtr_Pay_Evidence_Process,
                        P_PK_DO_MTR_PAY_SLIP = model.Pk_Do_Mtr_Pay_Slip,
                        P_PK_DO_CAT_GROUP = model.Pk_Do_Cat_Group,
                        P_CREATION_DATE = model.Creation_Date,
                        P_CREATION_USER = model.Creation_User,
                        P_MODIFICATION_DATE = model.Modification_Date,
                        P_MODIFICATION_USER = model.Modification_User,
                        P_ARCHIVE_ORIGINAL_NAME = model.Archive_Original_Name,
                        P_ARCHIVE_NEW_NAME = model.Archive_New_Name,
                        P_URL_ATTACHMENT = model.Url_Attachment,
                        P_ACTIVE = model.Active
                    },
                    commandType: CommandType.StoredProcedure).FirstOrDefault();
                return await Task.FromResult<Common.Do_Mtr_Evidence>(result);
            }
        }
        public async Task Save(Common.Do_Mtr_Evidence model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                await connection.QueryAsync<
                    Sevensoft.Mexpress.Backend.Common.Do_Mtr_Evidence>
                    ("PA_MAN_GBL_MTR_EVIDENCE_SAVE",
                    param: new
                    {
                        P_PK_MTR_PAY_EVIDENCE_PROCESS = model.Pk_Mtr_Pay_Evidence_Process,
                        P_PK_DO_MTR_PAY_SLIP = model.Pk_Do_Mtr_Pay_Slip,
                        P_PK_DO_CAT_GROUP = model.Pk_Do_Cat_Group,
                        P_CREATION_DATE = model.Creation_Date,
                        P_CREATION_USER = model.Creation_User,
                        P_MODIFICATION_DATE = model.Modification_Date,
                        P_MODIFICATION_USER = model.Modification_User,
                        P_ARCHIVE_ORIGINAL_NAME = model.Archive_Original_Name,
                        P_ARCHIVE_NEW_NAME = model.Archive_New_Name,
                        P_URL_ATTACHMENT = model.Url_Attachment,
                        P_ACTIVE = model.Active
                    },
                    commandType: CommandType.StoredProcedure);
            }
        }
        public async Task Delete(Common.Do_Mtr_Evidence model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                await connection.ExecuteAsync(
                sql: "PA_MAN_GBL_MTR_EVIDENCE_DELETE",
                param: new
                {
                    P_PK_MTR_PAY_EVIDENCE_PROCESS = model.Pk_Mtr_Pay_Evidence_Process,
                    P_PK_DO_MTR_PAY_SLIP = model.Pk_Do_Mtr_Pay_Slip,
                    P_PK_DO_CAT_GROUP = model.Pk_Do_Cat_Group,
                    P_MODIFICATION_USER = model.Modification_User,
                    P_CREATION_USER = model.Creation_User
                },
                commandType: CommandType.StoredProcedure);
            }
        }

        public async Task<IEnumerable<Do_Mtr_Evidence>> DeleteSpecial(Common.Do_Mtr_Evidence model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                var result = connection.Query<
                    Common.Do_Mtr_Evidence>
                    ("PA_MAN_GBL_MTR_EVIDENCE_DELETE",
                    param: new
                    {
                        P_PK_MTR_PAY_EVIDENCE_PROCESS = model.Pk_Mtr_Pay_Evidence_Process,
                        P_PK_DO_MTR_PAY_SLIP = model.Pk_Do_Mtr_Pay_Slip,
                        P_PK_DO_CAT_GROUP = model.Pk_Do_Cat_Group,
                        P_MODIFICATION_USER = model.Modification_User,
                        P_CREATION_USER = model.Creation_User
                    },
                commandType: CommandType.StoredProcedure);
                return await Task.FromResult<IEnumerable<Do_Mtr_Evidence>>(result.ToList());
            }
        }

        public async Task<IEnumerable<Do_Mtr_Evidence>> DeleteSpecific(Common.Do_Mtr_Evidence model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                var result = connection.Query<
                    Common.Do_Mtr_Evidence>
                    ("PA_MAN_GBL_MTR_EVIDENCE_DELETE_SPECIFIC",
                    param: new
                    {
                        P_URL_ATTACHMENT = model.Url_Attachment,
                        P_MODIFICATION_USER = model.Modification_User,
                        P_CREATION_USER = model.Creation_User
                    },
                commandType: CommandType.StoredProcedure);
                return await Task.FromResult<IEnumerable<Do_Mtr_Evidence>>(result.ToList());
            }
        }
        #endregion
        #region Region [Dispose]
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
        ~Gbl_Mtr_Evidence_Repository()
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
