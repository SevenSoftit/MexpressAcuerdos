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

    public class Do_Mtr_Agreement_Repository : IRepository<Common.Do_Mtr_Agreement>, IDisposable
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
        public async Task<IEnumerable<Do_Mtr_Agreement>> List(Do_Mtr_Agreement model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                var result = connection.Query<
                    Common.Do_Mtr_Agreement>
                    ("PA_CON_DO_CAT_EMPLOYEE_GET",
                    param: new
                    {
                        P_PK_DO_CAT_EMPLOYEE = model.Pk_Do_Cat_Employee,
                        P_FK_GLB_MTR_ORGANIZATION = model.Fk_Glb_Mtr_Organization,
                        P_GROUP_IDENTIFIER = model.Group_Identifier,
                        P_CREATION_DATE = model.Creation_Date,
                        P_CREATION_USER = model.Creation_User,
                        P_MODIFICATION_DATE = model.Modification_Date,
                        P_MODIFICATION_USER = model.Modification_User,
                        P_EMPLOYEE_NAME = model.Employee_Name,
                        P_EMPLOYEE_COST_CENTER = model.Employee_Cost_Center,
                        P_EMPLOYEE_POSITION = model.Employee_Position,
                        P_EMPLOYEE_ADD1 = model.Employee_Add1,
                        P_EMPLOYEE_ADD2 = model.Employee_Add2,
                        P_ID_EMPLOYEE = model.Id_Employee,
                        P_ACTIVE = model.Active
                    },
                    commandType: CommandType.StoredProcedure);
                return await Task.FromResult<IEnumerable<Do_Mtr_Agreement>>(result.ToList());
            }
        }

        public async Task<Common.Do_Mtr_Agreement> Get(Common.Do_Mtr_Agreement model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                var result = connection.Query<
                    Sevensoft.Mexpress.Backend.Common.Do_Mtr_Agreement>
                    ("PA_CON_DO_CAT_EMPLOYEE_GET",
                    param: new
                    {
                        P_PK_DO_CAT_EMPLOYEE = model.Pk_Do_Cat_Employee,
                        P_FK_GLB_MTR_ORGANIZATION = model.Fk_Glb_Mtr_Organization,
                        P_GROUP_IDENTIFIER = model.Group_Identifier,
                        P_CREATION_DATE = model.Creation_Date,
                        P_CREATION_USER = model.Creation_User,
                        P_MODIFICATION_DATE = model.Modification_Date,
                        P_MODIFICATION_USER = model.Modification_User,
                        P_EMPLOYEE_NAME = model.Employee_Name,
                        P_EMPLOYEE_COST_CENTER = model.Employee_Cost_Center,
                        P_EMPLOYEE_POSITION = model.Employee_Position,
                        P_EMPLOYEE_ADD1 = model.Employee_Add1,
                        P_EMPLOYEE_ADD2 = model.Employee_Add2,
                        P_ID_EMPLOYEE = model.Id_Employee,
                        P_ACTIVE = model.Active
                    },
                    commandType: CommandType.StoredProcedure).FirstOrDefault();
                return await Task.FromResult<Common.Do_Mtr_Agreement>(result);
            }
        }
        public async Task Save(Common.Do_Mtr_Agreement model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                await connection.QueryAsync<
                    Sevensoft.Mexpress.Backend.Common.Do_Mtr_Agreement>
                    ("PA_MAN_DO_CAT_EMPLOYEE_SAVE",
                    param: new
                    {
                        P_PK_DO_CAT_EMPLOYEE = model.Pk_Do_Cat_Employee,
                        P_FK_GLB_MTR_ORGANIZATION = model.Fk_Glb_Mtr_Organization,
                        P_GROUP_IDENTIFIER = model.Group_Identifier,
                        P_CREATION_DATE = model.Creation_Date,
                        P_CREATION_USER = model.Creation_User,
                        P_MODIFICATION_DATE = model.Modification_Date,
                        P_MODIFICATION_USER = model.Modification_User,
                        P_EMPLOYEE_NAME = model.Employee_Name,
                        P_EMPLOYEE_COST_CENTER = model.Employee_Cost_Center,
                        P_EMPLOYEE_POSITION = model.Employee_Position,
                        P_EMPLOYEE_ADD1 = model.Employee_Add1,
                        P_EMPLOYEE_ADD2 = model.Employee_Add2,
                        P_ID_EMPLOYEE = model.Id_Employee,
                        P_ACTIVE = model.Active
                    },
                    commandType: CommandType.StoredProcedure);
            }
        }

        public async Task<Common.Do_Mtr_Agreement> SaveScalar(Common.Do_Mtr_Agreement model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                var result = connection.Query<
                    Sevensoft.Mexpress.Backend.Common.Do_Mtr_Agreement>
                    ("PA_MAN_DO_CAT_EMPLOYEE_SAVE",
                    param: new
                    {
                        P_PK_DO_CAT_EMPLOYEE = model.Pk_Do_Cat_Employee,
                        P_FK_GLB_MTR_ORGANIZATION = model.Fk_Glb_Mtr_Organization,
                        P_GROUP_IDENTIFIER = model.Group_Identifier,
                        P_CREATION_DATE = model.Creation_Date,
                        P_CREATION_USER = model.Creation_User,
                        P_MODIFICATION_DATE = model.Modification_Date,
                        P_MODIFICATION_USER = model.Modification_User,
                        P_EMPLOYEE_NAME = model.Employee_Name,
                        P_EMPLOYEE_COST_CENTER = model.Employee_Cost_Center,
                        P_EMPLOYEE_POSITION = model.Employee_Position,
                        P_EMPLOYEE_ADD1 = model.Employee_Add1,
                        P_EMPLOYEE_ADD2 = model.Employee_Add2,
                        P_ID_EMPLOYEE = model.Id_Employee,
                        P_ACTIVE = model.Active
                    },
                    commandType: CommandType.StoredProcedure).FirstOrDefault();
                return await Task.FromResult<Common.Do_Mtr_Agreement>(result);
            }
        }
        public async Task Delete(Common.Do_Mtr_Agreement model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                await connection.ExecuteAsync(
                sql: "PA_CON_DO_CAT_EMPLOYEE_DELETE",
                param: new
                {
                    P_PK_DO_CAT_EMPLOYEE = model.Pk_Do_Cat_Employee,
                    P_CREATION_USER = model.Creation_User,
                    P_MODIFICATION_DATE = model.Modification_Date,
                    P_MODIFICATION_USER = model.Modification_User,
                },
                commandType: CommandType.StoredProcedure);
            }
        }
        public async Task<IEnumerable<Do_Mtr_Agreement>> DeleteScalar(Do_Mtr_Agreement model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                var result = connection.Query<
                    Common.Do_Mtr_Agreement>
                    ("PA_CON_DO_CAT_EMPLOYEE_DELETE",
                    param: new
                    {
                    P_PK_DO_CAT_EMPLOYEE = model.Pk_Do_Cat_Employee,
                    P_CREATION_USER = model.Creation_User,
                    P_MODIFICATION_DATE = model.Modification_Date,
                    P_MODIFICATION_USER = model.Modification_User,
                    },
                    commandType: CommandType.StoredProcedure);
                return await Task.FromResult<IEnumerable<Do_Mtr_Agreement>>(result.ToList());
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
