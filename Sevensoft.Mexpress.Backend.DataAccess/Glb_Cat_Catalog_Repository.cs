using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using System.Data;
using System.Data.SqlClient;
using Sevensoft.Mexpress.Backend.Common;

namespace Sevensoft.Mexpress.Backend
{

    public class Glb_Cat_Catalog_Repository : IRepository<Common.Glb_Cat_Catalog>, IDisposable
    {

        #region Region [Variables]
        public IConnectionManager ConnectionManagerInstance { get; private set; }
        public IDbConnection Connection { get; set; }
        public IDbTransaction Transaction { get; set; }
        private string ConnectionString { get; set; }
        #endregion

        #region Region [Constructor]
        public Glb_Cat_Catalog_Repository(string connectionString)
        {
            ConnectionString = connectionString;
        }
        #endregion 

        #region Region [Methods]
        public async Task<IEnumerable<Glb_Cat_Catalog>> List(Glb_Cat_Catalog model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {

                var result = connection.Query<
                    Common.Glb_Cat_Catalog>
                    ("PA_CON_GLB_CAT_CATALOG_GET",
                    param: new
                    {
                        P_SEARCH_KEY = model.Search_Key,

                    },
                    commandType: CommandType.StoredProcedure);
                return await Task.FromResult<IEnumerable<Glb_Cat_Catalog>>(result.ToList());
            }
        }
        public async Task<ICollection<Glb_Cat_Catalog>> ListCollection(Glb_Cat_Catalog model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                var result = connection.Query<
                    Common.Glb_Cat_Catalog>
                    ("PA_CON_GLB_CAT_CATALOG_GET",
                    param: new
                    {
                        P_SEARCH_KEY = model.Search_Key
                        // P_PK_GLB_CAT_CATALOG = model.Pk_Glb_Cat_Catalog,
                        // P_CREATION_DATE = model.Creation_Date,
                        // P_CREATION_USER = model.Creation_User,
                        // P_MODIFICATION_DATE = model.Modification_Date,
                        // P_MODIFICATION_USER = model.Modification_User,
                        // P_FK_GLB_CAT_CATALOG = model.Fk_Glb_Cat_Catalog,
                        // P_FK_GLB_CAT_TYPE_CATALOG = model.Fk_Glb_Cat_Type_Catalog,                     
                        // P_VALUE = model.Value,
                        // P_DESCRIPTION = model.Description,
                        // P_EDITABLE = model.Editable,
                        // P_ACTIVE = model.Active,
                        // P_SEARCH_KEY_TYPE_CATALOG = model.Search_Key_Type_Catalog
                    },
                    commandType: CommandType.StoredProcedure);
                return await Task.FromResult<ICollection<Common.Glb_Cat_Catalog>>(result.ToList());
            }
        }
        public async Task<Common.Glb_Cat_Catalog> Get(Common.Glb_Cat_Catalog model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                var result = connection.Query<
                    Sevensoft.Mexpress.Backend.Common.Glb_Cat_Catalog>
                    ("PA_CON_GLB_CAT_CATALOG_GET",
                    param: new
                    {
                        P_SEARCH_KEY = model.Search_Key
                        // P_PK_GLB_CAT_CATALOG = model.Pk_Glb_Cat_Catalog,
                        // P_CREATION_DATE = model.Creation_Date,
                        // P_CREATION_USER = model.Creation_User,
                        // P_MODIFICATION_DATE = model.Modification_Date,
                        // P_MODIFICATION_USER = model.Modification_User,
                        // P_FK_GLB_CAT_CATALOG = model.Fk_Glb_Cat_Catalog,
                        // P_FK_GLB_CAT_TYPE_CATALOG = model.Fk_Glb_Cat_Type_Catalog,                     
                        // P_VALUE = model.Value,
                        // P_DESCRIPTION = model.Description,
                        // P_EDITABLE = model.Editable,
                        // P_ACTIVE = model.Active,
                        // P_SEARCH_KEY_TYPE_CATALOG = model.Search_Key_Type_Catalog
                    },
                    commandType: CommandType.StoredProcedure).FirstOrDefault();
                return await Task.FromResult<Common.Glb_Cat_Catalog>(result);
            }
        }
        public async Task Save(Common.Glb_Cat_Catalog model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                await connection.QueryAsync<
                    Sevensoft.Mexpress.Backend.Common.Glb_Cat_Catalog>
                    ("PA_MAN_GLB_CAT_CATALOG_SAVE",
                    param: new
                    {
                        P_PK_GLB_CAT_CATALOG = model.Pk_Glb_Cat_Catalog,
                        P_CREATION_DATE = model.Creation_Date,
                        P_CREATION_USER = model.Creation_User,
                        P_MODIFICATION_DATE = model.Modification_Date,
                        P_MODIFICATION_USER = model.Modification_User,
                        P_FK_GLB_CAT_CATALOG = model.Fk_Glb_Cat_Catalog,
                        P_FK_GLB_CAT_TYPE_CATALOG = model.Fk_Glb_Cat_Type_Catalog,
                        P_SEARCH_KEY = model.Search_Key,
                        P_VALUE = model.Value,
                        P_DESCRIPTION = model.Description,
                        P_EDITABLE = model.Editable,
                        P_ACTIVE = model.Active,
                        P_SEARCH_KEY_TYPE_CATALOG = model.Search_Key_Type_Catalog
                    },
                    commandType: CommandType.StoredProcedure);
            }
        }
        public async Task Delete(Common.Glb_Cat_Catalog model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                await connection.ExecuteAsync(
                sql: "PA_GLB_CAT_CATALOG_DELETE",
                param: new
                {
                    P_PK_GLB_CAT_CATALOG = model.Pk_Glb_Cat_Catalog
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
        ~Glb_Cat_Catalog_Repository()
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
