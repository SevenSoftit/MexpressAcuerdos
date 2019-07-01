
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

[Microsoft.AspNetCore.Mvc.Route("api/[controller]")]  
 [AllowAnonymous]  
  public class TokenController : Controller  
 {  
     private IConfiguration configuration;
     public TokenController(IConfiguration iConfiguration)
     {
        configuration = iConfiguration;
     }

     [Route("token")] 
     [Microsoft.AspNetCore.Mvc.HttpPost]  
     public IActionResult Create([FromBody] Api_User user)  
     {  
         if (user.Usuario_Autenticacion != configuration.GetValue<string>("AppSettings:User") && user.Password_Autenticacion != configuration.GetValue<string>("AppSettings:Password"))  
             return Unauthorized();  
  
         var token = new JwtTokenBuilder()  
                             .AddSecurityKey(JwtSecurityKey.Create(configuration.GetValue<string>("AppSettings:Secret")))  
                             .AddSubject(user.userName)  
                             .AddIssuer("Sevensoft")  
                             .AddAudience("Sevensoft")  
                             .AddClaim("test", "test")  
                             .AddExpiry(120)  
                             .Build();  
  
         return Ok(token);  
     }  
 }  