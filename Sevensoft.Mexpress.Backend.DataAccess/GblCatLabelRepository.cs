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

    public class GblCatLabelRepository : IRepository<Common.Do_Cat_Label>
    {

        #region Region [Variables]
        public IConnectionManager ConnectionManagerInstance { get; private set; }
        public IDbConnection Connection { get; set; }
        public IDbTransaction Transaction { get; set; }
        private string ConnectionString { get; set; }
        #endregion

        #region Region [Constructor]
        public GblCatLabelRepository(string connectionString)
        {
            ConnectionString = connectionString;
        }
        #endregion

        #region Region [Methods]
        public async Task<IEnumerable<Do_Cat_Label>> List(Do_Cat_Label model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                var result = connection.Query<
                    Common.Do_Cat_Label,
                    Common.Do_Cat_Form,
                    Common.Do_Cat_Language,
                    Common.Do_Cat_Organization,
                    Common.Do_Cat_Label>
                    ("PA_CON_CAT_LABEL",
                    map: (a, b, c, d) =>
                      {
                          a.GblCatForm = (Common.Do_Cat_Form)b;
                          a.GblCatLanguage = (Common.Do_Cat_Language)c;
                          a.GblOrganization = (Common.Do_Cat_Organization)d;
                          return a;
                      },
                    splitOn: "PK_GLB_CAT_LABEL, PK_GLB_CAT_FORM, PK_GLB_CAT_LANGUAGE, PK_GLB_MTR_ORGANIZATION",
                    param: new
                    {
                        CODE = model.GblCatForm.Code,
                        PK_GLB_MTR_ORGANIZATION = model.GblOrganization.Pk_Glb_Mtr_Organization,
                        LABEL = model.Label,
                        ISO = model.GblCatLanguage.Iso,
                        P_ROWS_PAGE = model.Rows_Pag,
                        P_PAGE_NUMBER = model.Page_Number
                    },
                    commandTimeout: 0,
                    commandType: CommandType.StoredProcedure);
                return await Task.FromResult<IEnumerable<Do_Cat_Label>>(result.ToList());
            }
        }

        public async Task<Common.Do_Cat_Label> Get(Common.Do_Cat_Label model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                var result = connection.Query<
                     Common.Do_Cat_Label,
                     Common.Do_Cat_Form,
                     Common.Do_Cat_Language,
                     Common.Do_Cat_Organization,
                     Common.Do_Cat_Label>
                     ("PA_CON_CAT_LABEL",
                     map: (a, b, c, d) =>
                       {
                           a.GblCatForm = (Common.Do_Cat_Form)b;
                           a.GblCatLanguage = (Common.Do_Cat_Language)c;
                           a.GblOrganization = (Common.Do_Cat_Organization)d;
                           return a;
                       },
                     splitOn: "PK_GLB_CAT_LABEL, PK_GLB_CAT_FORM, PK_GLB_CAT_LANGUAGE, PK_GLB_MTR_ORGANIZATION",
                     param: new
                     {
                         CODE = model.GblCatForm.Code,
                         PK_GLB_MTR_ORGANIZATION = model.GblOrganization.Pk_Glb_Mtr_Organization,
                         LABEL = model.Label,
                         ISO = model.GblCatLanguage.Iso,
                         P_ROWS_PAGE = model.Rows_Pag,
                         P_PAGE_NUMBER = model.Page_Number
                     },
                     commandType: CommandType.StoredProcedure).FirstOrDefault();
                return await Task.FromResult<Common.Do_Cat_Label>(result);
            }
        }

        public async Task Save(Common.Do_Cat_Label model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                await connection.QueryAsync<Sevensoft.Mexpress.Backend.Common.Do_Cat_Label>
                    ("PA_PRO_GBL_CAT_LABEL",
                    param:
                    new
                    {
                        P_PK_GLB_CAT_LABEL = model.Pk_Gbl_Cat_Label,
                        P_CREATION_USER = model.Creation_User,
                        P_CREATION_DATE = model.Creation_Date,
                        P_MODIFICATION_DATE = model.Modification_Date,
                        P_MODIFICATION_USER = model.Modification_User,
                        P_FK_GLB_CAT_FORM = model.Fk_Gbl_Cat_Form,
                        P_FK_GLB_CAT_LANGUAGE = model.Fk_Gbl_Cat_Language,
                        P_LABEL = model.Label,
                        P_VALUE = model.Value
                    }
                    ,
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
        ~GblCatLabelRepository()
        {
            Dispose(false);
        }
        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
            {
            }
        }
        public Task Delete(Do_Cat_Label entity)
        {
            throw new NotImplementedException();
        }

        #endregion
    }
}
