using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data;
using Sevensoft.Mexpress.Backend.Common;
using Dapper;
using System.Data.SqlClient;

namespace Sevensoft.Mexpress.Backend.DataAccess
{
    public class GblWrkEmployeeRepository : IRepository<Common.ImportEmployee>
    {
        #region Region [Variables]
        public IConnectionManager ConnectionManagerInstance { get; private set; }
        public IDbConnection Connection { get; set; }
        public IDbTransaction Transaction { get; set; }
        private string ConnectionString { get; set; }
        #endregion

        #region Region [Constructor]
        public GblWrkEmployeeRepository(string connectionString)
        {
            ConnectionString = connectionString;
        }
        #endregion


        #region Region [Methods]

        public async Task<IEnumerable<ImportEmployee>> ListWorkTable(ImportEmployee model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                var result = connection.Query<
                    Common.ImportEmployee>
                    ("PA_PRO_GBL_WRK_PROCESS_VALIDATION",
                    param: new
                    {
                        P_FK_GBL_WRK_EMPLOYEE_HEADER = model.Fk_Gbl_Wrk_Employee_Header,

                    },
                    commandType: CommandType.StoredProcedure);
                return await Task.FromResult<IEnumerable<ImportEmployee>>(result.ToList());
            }
        }

        public async Task<IEnumerable<ImportEmployee>> List(ImportEmployee model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                var result = connection.Query<
                    Common.ImportEmployee>
                    ("PA_PRO_GBL_WRK_VALIDATE_ERRORS",
                    param: new
                    {
                        P_ID_EMPLOYEE = model.Id_Employee,
                        P_EMPLOYEE_NAME = model.Employee_Name, 
                        P_EMPLOYEE_COST_CENTER = model.Employee_Cost_Center, 
                        P_EMPLOYEE_POSITION = model.Employee_Position,
                        P_GROUP_IDENTIFIER = model.Group_Identifier,
                        P_EMPLOYEE_ADD1 = model.Employee_Add1, 
                        P_EMPLOYEE_ADD2 = model.Employee_Add2,
                        P_CREATION_USER = model.Creation_User,
                        P_FK_GBL_WRK_EMPLOYEE_HEADER = model.Fk_Gbl_Wrk_Employee_Header,
                        P_PK_GBL_WRK_EMPLOYEE = model.Pk_Gbl_Wrk_Employee,
                        P_ERROR = model.Error,
                        P_MESSAGE_ERROR = model.Message_Error, 
                        P_IT_PROCESSED = model.It_Processed,
                        P_DUPLICATE_IDENTIFICATION = model.Duplicate_Identification,
                        P_NOT_EXIST_GROUP_IDENTIFIER = model.Not_Exist_Group_Identifier,
                        P_ACTIVE = model.Active

                    },
                    commandType: CommandType.StoredProcedure);
                return await Task.FromResult<IEnumerable<ImportEmployee>>(result.ToList());
            }
        }
        public async Task<ICollection<ImportEmployee>> ListCollection(ImportEmployee model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                var result = connection.Query<
                    Common.ImportEmployee>
                    ("",
                    param: new
                    {

                    },
                    commandType: CommandType.StoredProcedure);
                return await Task.FromResult<ICollection<Common.ImportEmployee>>(result.ToList());
            }
        }
        public async Task<Common.ImportEmployee> Get(Common.ImportEmployee model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                var result = connection.Query<
                    Sevensoft.Mexpress.Backend.Common.ImportEmployee>
                    ("",
                    param: new
                    {

                    },
                    commandType: CommandType.StoredProcedure).FirstOrDefault();
                return await Task.FromResult<Common.ImportEmployee>(result);
            }
        }
        public async Task Save(Common.ImportEmployee model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                await connection.QueryAsync<
                    Sevensoft.Mexpress.Backend.Common.ImportEmployee>
                    ("PA_PRO_GBL_WRK_EMPLOYEE_HEADER",
                    param: new
                    {
                        P_PK_GBL_WRK_EMPLOYEE_HEADER = model.Fk_Gbl_Wrk_Employee_Header,
                        P_CREATION_USER = model.Creation_User,
                        P_MODIFICATION_USER = model.Creation_User,
                        P_TOTAL_RECORDS = model.Total_Records,
                        P_IT_PROCESSED = model.It_Processed,
                        P_FK_GLB_MTR_ORGANIZATION = model.Fk_Glb_Mtr_Organization
                    },
                    commandType: CommandType.StoredProcedure);
            }
        }

        public async Task ExecuteProcess(Common.ImportEmployee model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                await connection.QueryAsync<
                    Sevensoft.Mexpress.Backend.Common.ImportEmployee>
                    ("PA_PRO_GBL_WRK_EMPLOYEE_EXECUTE_PROCESS",
                    param: new
                    {
                        P_PK_GBL_WRK_EMPLOYEE_HEADER = model.Fk_Gbl_Wrk_Employee_Header,
                        P_UPDATE_ROWS = model.Update_Rows
                    },
                    commandType: CommandType.StoredProcedure);
            }
        }
        public async Task Delete(Common.ImportEmployee model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                await connection.QueryAsync<
                    Sevensoft.Mexpress.Backend.Common.ImportEmployee>
                ("",
                param: new
                {
                },
                commandType: CommandType.StoredProcedure);
            }
        }

        public async Task<Common.ImportEmployee> SaveGet(Common.ImportEmployee model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                var result = connection.Query<
                    Common.ImportEmployee>
                    ("PA_PRO_GBL_WRK_EMPLOYEE_HEADER",
                    param: new
                    {
                        P_PK_GBL_WRK_EMPLOYEE_HEADER = model.Fk_Gbl_Wrk_Employee_Header,
                        P_CREATION_USER = model.Creation_User,
                        P_MODIFICATION_USER = model.Creation_User,
                        P_TOTAL_RECORDS = model.Total_Records,
                        P_IT_PROCESSED = model.It_Processed,
                        P_FK_GLB_MTR_ORGANIZATION = model.Fk_Glb_Mtr_Organization
                    },
                    commandType: CommandType.StoredProcedure).FirstOrDefault();
                return await Task.FromResult<Common.ImportEmployee>(result);
            }
        }

        #endregion

        #region Region [Dispose]
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
        ~GblWrkEmployeeRepository()
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