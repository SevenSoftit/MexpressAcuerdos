using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using System.Data;
using System.Data.SqlClient;
using Sevensoft.Mexpress.Backend.Common;

namespace Sevensoft.Mexpress.Backend.DataAccess.Repository
{

    public class Ac_Cat_Agreement_Goals_Repository : IRepository<Common.Ac_Cat_Agreement_Goals>, IDisposable
    {

        #region Region [Variables]
        public IConnectionManager ConnectionManagerInstance { get; private set; }
        public IDbConnection Connection { get; set; }
        public IDbTransaction Transaction { get; set; }
        private string ConnectionString { get; set; }
        #endregion

        #region Region [Constructor]
        public Ac_Cat_Agreement_Goals_Repository(string connectionString)
        {
            ConnectionString = connectionString;
        }
        #endregion

        #region Region [Methods]
        public async Task<IEnumerable<Ac_Cat_Agreement_Goals>> List(Ac_Cat_Agreement_Goals model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                var result = connection.Query<
                    Common.Ac_Cat_Agreement_Goals>
                    ("PA_CON_AC_CAT_AGREEMENT_GOALS_GET",
                    param: new
                    {
                        P_PK_CAT_AGREEMENT_GOALS = model.Pk_Cat_Agreement_Goals,
                        P_CREATION_DATE = model.Creation_Date,
                        P_CREATION_USER = model.Creation_User,
                        P_MODIFICATION_DATE = model.Modification_Date,
                        P_MODIFICATION_USER = model.Modification_User,
                        P_PK_AC_TRADE_AGREEMENT = model.Pk_Ac_Trade_Agreement,
                        P_PK_CAT_CURRENCY = model.Pk_Cat_Currency,
                        P_DATE_START = model.Date_Start,
                        P_DATE_FINISH = model.Date_Finish,
                        P_GOAL_AMOUNT = model.Goal_Amount,
                        P_TYPE_GOAL = model.Type_Goal,
                        P_BONUS = model.Bonus
                    },
                    commandType: CommandType.StoredProcedure);
                return await Task.FromResult<IEnumerable<Ac_Cat_Agreement_Goals>>(result.ToList());
            }
        }
        public async Task<ICollection<Ac_Cat_Agreement_Goals>> ListCollection(Ac_Cat_Agreement_Goals model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                var result = connection.Query<
                    Common.Ac_Cat_Agreement_Goals>
                    ("PA_CON_AC_CAT_AGREEMENT_GOALS_GET",
                    param: new
                    {
                        P_PK_CAT_AGREEMENT_GOALS = model.Pk_Cat_Agreement_Goals,
                        P_CREATION_DATE = model.Creation_Date,
                        P_CREATION_USER = model.Creation_User,
                        P_MODIFICATION_DATE = model.Modification_Date,
                        P_MODIFICATION_USER = model.Modification_User,
                        P_PK_AC_TRADE_AGREEMENT = model.Pk_Ac_Trade_Agreement,
                        P_PK_CAT_CURRENCY = model.Pk_Cat_Currency,
                        P_DATE_START = model.Date_Start,
                        P_DATE_FINISH = model.Date_Finish,
                        P_GOAL_AMOUNT = model.Goal_Amount,
                        P_TYPE_GOAL = model.Type_Goal,
                        P_BONUS = model.Bonus,
                    },
                    commandType: CommandType.StoredProcedure);
                return await Task.FromResult<ICollection<Common.Ac_Cat_Agreement_Goals>>(result.ToList());
            }
        }
        public async Task<Common.Ac_Cat_Agreement_Goals> Get(Common.Ac_Cat_Agreement_Goals model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                var result = connection.Query<
                    Sevensoft.Mexpress.Backend.Common.Ac_Cat_Agreement_Goals>
                    ("PA_CON_AC_CAT_AGREEMENT_GOALS_GET",
                    param: new
                    {
                        P_PK_CAT_AGREEMENT_GOALS = model.Pk_Cat_Agreement_Goals,
                        P_CREATION_DATE = model.Creation_Date,
                        P_CREATION_USER = model.Creation_User,
                        P_MODIFICATION_DATE = model.Modification_Date,
                        P_MODIFICATION_USER = model.Modification_User,
                        P_PK_AC_TRADE_AGREEMENT = model.Pk_Ac_Trade_Agreement,
                        P_PK_CAT_CURRENCY = model.Pk_Cat_Currency,
                        P_DATE_START = model.Date_Start,
                        P_DATE_FINISH = model.Date_Finish,
                        P_GOAL_AMOUNT = model.Goal_Amount,
                        P_TYPE_GOAL = model.Type_Goal,
                        P_BONUS = model.Bonus,
                    },
                    commandType: CommandType.StoredProcedure).FirstOrDefault();
                return await Task.FromResult<Common.Ac_Cat_Agreement_Goals>(result);
            }
        }
        public async Task Save(Common.Ac_Cat_Agreement_Goals model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                await connection.QueryAsync<
                    Sevensoft.Mexpress.Backend.Common.Ac_Cat_Agreement_Goals>
                    ("PA_MAN_AC_CAT_AGREEMENT_GOALS_SAVE",
                    param: new
                    {
                        P_PK_CAT_AGREEMENT_GOALS = model.Pk_Cat_Agreement_Goals,
                        P_CREATION_DATE = model.Creation_Date,
                        P_CREATION_USER = model.Creation_User,
                        P_MODIFICATION_DATE = model.Modification_Date,
                        P_MODIFICATION_USER = model.Modification_User,
                        P_PK_AC_TRADE_AGREEMENT = model.Pk_Ac_Trade_Agreement,
                        P_PK_CAT_CURRENCY = model.Pk_Cat_Currency,
                        P_DATE_START = model.Date_Start,
                        P_DATE_FINISH = model.Date_Finish,
                        P_GOAL_AMOUNT = model.Goal_Amount,
                        P_TYPE_GOAL = model.Type_Goal,
                        P_BONUS = model.Bonus,
                        P_ACTIVE = model.Active
                    },
                    commandType: CommandType.StoredProcedure);
            }
        }
        public async Task Delete(Common.Ac_Cat_Agreement_Goals model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                await connection.ExecuteAsync(
                sql: "PA_AC_CAT_AGREEMENT_GOALS_DELETE",
                param: new
                {
                    P_MAN_PK_CAT_AGREEMENT_GOALS = model.Pk_Cat_Agreement_Goals
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
        ~Ac_Cat_Agreement_Goals_Repository()
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
