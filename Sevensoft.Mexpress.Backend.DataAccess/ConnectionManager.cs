using System.Data;
using System.Data.SqlClient;

namespace Sevensoft.Mexpress.Backend.DataAccess
{
    public class ConnectionManager : IConnectionManager
    {
        public const string SevenProcessControlDatabase = "SEVEN_PROCESS_CONTROL_DATABASE";

        public IDbConnection GetConnection(string keyName)
        {
            return new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings[keyName].ConnectionString);
        }
       /* private readonly IConfiguration configuration;

        public ConnectionManager(IConfiguration config)
        {
            configuration = config;
        }
        public const string SevenProcessControlDatabase = "SEVEN_PROCESS_CONTROL_DATABASE";

        public IDbConnection GetConnection(string keyName)
        {
            return new SqlConnection(configuration.GetConnectionString(keyName));
        }*/
    }
}
