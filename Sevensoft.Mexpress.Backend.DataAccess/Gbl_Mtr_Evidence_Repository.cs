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

    public class Gbl_Mtr_Evidence_Repository : IRepository<Common.Ac_Mtr_Agreement_Document>, IDisposable
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
        public async Task<IEnumerable<Ac_Mtr_Agreement_Document>> List(Ac_Mtr_Agreement_Document model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                var result = connection.Query<
                    Common.Ac_Mtr_Agreement_Document>
                    ("PA_CON_GBL_MTR_EVIDENCE_GET",
                    param: new
                    {
                     P_PK_AC_TRADE_AGREEMENT = model.Pk_Ac_Trade_Agreement
                    },
                    commandType: CommandType.StoredProcedure);
                return await Task.FromResult<IEnumerable<Ac_Mtr_Agreement_Document>>(result.ToList());
            }
        }

        public async Task<ICollection<Ac_Mtr_Agreement_Document>> ListCollection(Ac_Mtr_Agreement_Document model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                var result = connection.Query<
                    Common.Ac_Mtr_Agreement_Document>
                    ("PA_CON_GBL_MTR_EVIDENCE_GET",
                    param: new
                    {
                        P_PK_AC_TRADE_AGREEMENT = model.Pk_Ac_Trade_Agreement
                    },
                    commandType: CommandType.StoredProcedure);
                return await Task.FromResult<ICollection<Common.Ac_Mtr_Agreement_Document>>(result.ToList());
            }
        }
        public async Task<Common.Ac_Mtr_Agreement_Document> Get(Common.Ac_Mtr_Agreement_Document model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                var result = connection.Query<
                    Sevensoft.Mexpress.Backend.Common.Ac_Mtr_Agreement_Document>
                    ("PA_CON_GBL_MTR_EVIDENCE_GET",
                    param: new
                    {
                        P_PK_AC_TRADE_AGREEMENT = model.Pk_Ac_Trade_Agreement
                    },
                    commandType: CommandType.StoredProcedure).FirstOrDefault();
                return await Task.FromResult<Common.Ac_Mtr_Agreement_Document>(result);
            }
        }

        public async Task Save(Common.Ac_Mtr_Agreement_Document model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                await connection.QueryAsync<
                    Sevensoft.Mexpress.Backend.Common.Ac_Mtr_Agreement_Document>
                    ("PA_MAN_GBL_MTR_EVIDENCE_SAVE",
                    param: new
                    {
                        P_PK_CAT_DOCUMENT_AGREEMENT = model.Pk_Cat_Document_Agreement,
                        P_PK_AC_TRADE_AGREEMENT = model.Pk_Ac_Trade_Agreement,
                        P_CREATION_DATE = model.Creation_Date,
                        P_CREATION_USER = model.Creation_User,
                        P_MODIFICATION_DATE = model.Modification_Date,
                        P_MODIFICATION_USER = model.Modification_User,
                        P_URL_ATTACHMENT = model.Url_Attachment,
                        P_ARCHIVE_ORIGINAL_NAME = model.Archive_Original_Name,
                        P_ARCHIVE_NEW_NAME = model.Archive_New_Name,
                        P_FILE_DESCRIPTION = model.File_Description,
                        P_NAME_AGREEMENT = model.Name_Agreement,
                        P_ACTIVE = model.Active,
                        P_IS_INVOICE = model.Is_Invoice
                    },
                    commandType: CommandType.StoredProcedure);
            }
        }
        public async Task SaveSpecial(Common.Import_Product model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                await connection.QueryAsync<
                    Sevensoft.Mexpress.Backend.Common.Ac_Mtr_Agreement_Document>
                    ("PA_MAN_GBL_MTR_EVIDENCE_SAVE",
                    param: new
                    {
                        
                    },
                    commandType: CommandType.StoredProcedure);
            }
        }

        public async Task Delete(Common.Ac_Mtr_Agreement_Document model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                await connection.ExecuteAsync(
                sql: "PA_MAN_GBL_MTR_EVIDENCE_DELETE",
                param: new
                {
                        P_PK_CAT_DOCUMENT_AGREEMENT = model.Pk_Cat_Document_Agreement,
                        P_PK_AC_TRADE_AGREEMENT = model.Pk_Ac_Trade_Agreement,
                        P_MODIFICATION_USER = model.Modification_User
                },
                commandType: CommandType.StoredProcedure);
            }
        }

        public async Task<IEnumerable<Ac_Mtr_Agreement_Document>> DeleteSpecial(Common.Ac_Mtr_Agreement_Document model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                var result = connection.Query<
                    Common.Ac_Mtr_Agreement_Document>
                    ("PA_MAN_GBL_MTR_EVIDENCE_DELETE",
                    param: new
                    {
                        P_PK_CAT_DOCUMENT_AGREEMENT = model.Pk_Cat_Document_Agreement,
                        P_PK_AC_TRADE_AGREEMENT = model.Pk_Ac_Trade_Agreement,
                        P_MODIFICATION_USER = model.Modification_User
                    },
                commandType: CommandType.StoredProcedure);
                return await Task.FromResult<IEnumerable<Ac_Mtr_Agreement_Document>>(result.ToList());
            }
        }

        public async Task<IEnumerable<Ac_Mtr_Agreement_Document>> DeleteSpecific(Common.Ac_Mtr_Agreement_Document model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                var result = connection.Query<
                    Common.Ac_Mtr_Agreement_Document>
                    ("PA_MAN_GBL_MTR_EVIDENCE_DELETE_SPECIFIC",
                    param: new
                    {
                        P_URL_ATTACHMENT = model.Url_Attachment,
                        P_MODIFICATION_USER = model.Modification_User,
                        P_CREATION_USER = model.Creation_User
                    },
                commandType: CommandType.StoredProcedure);
                return await Task.FromResult<IEnumerable<Ac_Mtr_Agreement_Document>>(result.ToList());
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
