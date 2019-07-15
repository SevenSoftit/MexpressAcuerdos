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

    public class Ac_Mtr_Type_Of_Agreement_Repository : IRepository<Common.Ac_Mtr_Type_Of_Agreement>, IDisposable
    {

        #region Region [Variables]
        public IConnectionManager ConnectionManagerInstance { get; private set; }
        public IDbConnection Connection { get; set; }
        public IDbTransaction Transaction { get; set; }
        private string ConnectionString { get; set; }
        #endregion

        #region Region [Constructor]
        public Ac_Mtr_Type_Of_Agreement_Repository(string connectionString)
        {
            ConnectionString = connectionString;
        }
        #endregion

        #region Region [Methods]
        public async Task<IEnumerable<Ac_Mtr_Type_Of_Agreement>> List(Ac_Mtr_Type_Of_Agreement model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                var result = connection.Query<
                    Common.Ac_Mtr_Type_Of_Agreement>
                    ("PA_CON_AC_MTR_TYPE_OF_AGREEMENT_GET",
                    param: new
                    {
                        P_PK_CAT_TYPE_AGREEMENT = model.Pk_Cat_Type_Agreement,
                        P_CREATION_DATE = model.Creation_Date,
                        P_CREATION_USER = model.Creation_User,
                        P_MODIFICATION_DATE = model.Modification_Date,
                        P_MODIFICATION_USER = model.Modification_User,
                        P_NAME_AGREEMENT = model.Name_Agreement,
                        P_DESCRIPTION_AGREEMENT = model.Description_Agreement,
                        P_ID_ALIAS = model.Id_Alias,
                        P_BEHAVIOR = model.Behavior

                    },
                    commandType: CommandType.StoredProcedure);
                return await Task.FromResult<IEnumerable<Ac_Mtr_Type_Of_Agreement>>(result.ToList());
            }
        }
        public async Task<ICollection<Ac_Mtr_Type_Of_Agreement>> ListCollection(Ac_Mtr_Type_Of_Agreement model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                var result = connection.Query<
                    Common.Ac_Mtr_Type_Of_Agreement>
                    ("PA_CON_AC_MTR_TYPE_OF_AGREEMENT_GET",
                    param: new
                    {
                        P_PK_CAT_TYPE_AGREEMENT = model.Pk_Cat_Type_Agreement,
                        P_CREATION_DATE = model.Creation_Date,
                        P_CREATION_USER = model.Creation_User,
                        P_MODIFICATION_DATE = model.Modification_Date,
                        P_MODIFICATION_USER = model.Modification_User,
                        P_NAME_AGREEMENT = model.Name_Agreement,
                        P_DESCRIPTION_AGREEMENT = model.Description_Agreement,
                        P_ID_ALIAS = model.Id_Alias,
                        P_BEHAVIOR = model.Behavior
                    },
                    commandType: CommandType.StoredProcedure);
                return await Task.FromResult<ICollection<Common.Ac_Mtr_Type_Of_Agreement>>(result.ToList());
            }
        }
        public async Task<Common.Ac_Mtr_Type_Of_Agreement> Get(Common.Ac_Mtr_Type_Of_Agreement model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                var result = connection.Query<
                    Sevensoft.Mexpress.Backend.Common.Ac_Mtr_Type_Of_Agreement>
                    ("PA_CON_AC_MTR_TYPE_OF_AGREEMENT_GET",
                    param: new
                    {
                        P_PK_CAT_TYPE_AGREEMENT = model.Pk_Cat_Type_Agreement,
                        P_CREATION_DATE = model.Creation_Date,
                        P_CREATION_USER = model.Creation_User,
                        P_MODIFICATION_DATE = model.Modification_Date,
                        P_MODIFICATION_USER = model.Modification_User,
                        P_NAME_AGREEMENT = model.Name_Agreement,
                        P_DESCRIPTION_AGREEMENT = model.Description_Agreement,
                        P_ID_ALIAS = model.Id_Alias,
                        P_BEHAVIOR = model.Behavior
                    },
                    commandType: CommandType.StoredProcedure).FirstOrDefault();
                return await Task.FromResult<Common.Ac_Mtr_Type_Of_Agreement>(result);
            }
        }
        public async Task Save(Common.Ac_Mtr_Type_Of_Agreement model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                await connection.QueryAsync<
                    Sevensoft.Mexpress.Backend.Common.Ac_Mtr_Type_Of_Agreement>
                    ("PA_MAN_AC_MTR_TYPE_OF_AGREEMENT_SAVE",
                    param: new
                    {
                        P_PK_CAT_TYPE_AGREEMENT = model.Pk_Cat_Type_Agreement,
                        P_CREATION_DATE = model.Creation_Date,
                        P_CREATION_USER = model.Creation_User,
                        P_MODIFICATION_DATE = model.Modification_Date,
                        P_MODIFICATION_USER = model.Modification_User,
                        P_NAME_AGREEMENT = model.Name_Agreement,
                        P_DESCRIPTION_AGREEMENT = model.Description_Agreement,
                        P_ID_ALIAS = model.Id_Alias,
                        P_BEHAVIOR = model.Behavior
                    },
                    commandType: CommandType.StoredProcedure);
            }
        }
        public async Task Delete(Common.Ac_Mtr_Type_Of_Agreement model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                await connection.ExecuteAsync(
                sql: "PA_CON_AC_MTR_TYPE_OF_AGREEMENT_DELETE",
                param: new
                {
                        P_PK_CAT_TYPE_AGREEMENT = model.Pk_Cat_Type_Agreement,
                        P_CREATION_DATE = model.Creation_Date,
                        P_CREATION_USER = model.Creation_User,
                        P_MODIFICATION_DATE = model.Modification_Date,
                        P_MODIFICATION_USER = model.Modification_User,
                        P_NAME_AGREEMENT = model.Name_Agreement,
                        P_DESCRIPTION_AGREEMENT = model.Description_Agreement,
                        P_ID_ALIAS = model.Id_Alias,
                        P_BEHAVIOR = model.Behavior
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
        ~Ac_Mtr_Type_Of_Agreement_Repository()
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
