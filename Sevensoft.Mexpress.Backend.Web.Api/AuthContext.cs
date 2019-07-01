using System.Data.Entity;
using Sevensoft.Mexpress.Backend.Common;
using Microsoft.AspNet.Identity.EntityFramework;

namespace Sevensoft.Mexpress.Backend.Web.Api
{
    public class AuthContext : IdentityDbContext<IdentityUser>
    {
        public AuthContext() : base("AuthContext")
        {

        }
        public DbSet<Client> Clients { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }

    }
}