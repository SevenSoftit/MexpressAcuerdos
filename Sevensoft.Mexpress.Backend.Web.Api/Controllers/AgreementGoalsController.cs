
using System;
using Microsoft.AspNetCore.Mvc;
using Sevensoft.Mexpress.Backend.BusinessLogic;
using Sevensoft.Mexpress.Utilities.Extender;
using Sevensoft.Mexpress.Backend.Common;
using static Sevensoft.Mexpress.Backend.Common.Enum;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
namespace Sevensoft.Mexpress.Backend.Web.Api.Controllers
{
    [Route("api/[controller]")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class AgreementGoalsController : Controller
    {
        private IConfiguration configuration;
        public AgreementGoalsController(IConfiguration iConfiguration)
        {
            configuration = iConfiguration;
        }
        #region Region [Methods]
        /// <summary>
        /// Nombre: ListarAc_Cat_Agreement_Goals
        /// Descripcion: Metodo utilizado para ontener una lista de modelos AC_CAT_AGREEMENT_GOALS y retornar un objeto datatable
        /// Fecha de creacion: 8/6/2019
        /// Autor:
        /// </summary>
        /// <param name="message"></param>
        /// <returns></returns>
        [Route("List")]
        [HttpPost]
        public async Task<IActionResult> List([FromBody] Common.Ac_Cat_Agreement_Goals model)
        {
            try
            {
                var message = new Message();
                message.BusinessLogic = configuration.GetValue<string>("AppSettings:BusinessLogic:Ac_Cat_Agreement_Goals");
                message.Connection = configuration.GetValue<string>("ConnectionStrings:MEXPRESS_AC");
                message.Operation = Operation.List;
                message.MessageInfo = model.SerializeObject();
                using (var businessLgic = new ServiceManager())
                {
                    var result = await businessLgic.DoWork(message);
                    if (result.Status == Status.Failed)
                    {
                        return BadRequest(result.Result);
                    }
                    var list = result.DeSerializeObject<IEnumerable<Common.Ac_Cat_Agreement_Goals>>();
                    var dataSuccess = new
                    {
                        Data = list,
                        MessageResult = Backend.Common.Enum.Status.Success,
                        Message = string.Empty,
                        RegisterType = string.Empty
                    };
                    return Ok(dataSuccess);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
        /// <summary>
        /// Nombre: ObtenerAc_Cat_Agreement_Goals
        /// Descripcion: Metodo utilizado para ontener una lista de modelos AC_CAT_AGREEMENT_GOALS y retornar un objeto datatable
        /// Fecha de creacion: 8/6/2019
        /// Autor:
        /// </summary>
        /// <param name="message"></param>
        /// <returns></returns>
        [Route("Get")]
        [HttpPost]
        public async Task<IActionResult> Get([FromBody] Common.Ac_Cat_Agreement_Goals model)
        {
            try
            {
                var message = new Message();
                message.BusinessLogic = configuration.GetValue<string>("AppSettings:BusinessLogic:Ac_Cat_Agreement_Goals");
                message.Connection = configuration.GetValue<string>("ConnectionStrings:MEXPRESS_AC");
                message.Operation = Operation.Get;
                message.MessageInfo = model.SerializeObject();
                using (var businessLgic = new ServiceManager())
                {
                    var result = await businessLgic.DoWork(message);
                    if (result.Status == Status.Failed)
                    {
                        return BadRequest(result.Result);
                    }
                    var resultModel = result.DeSerializeObject<Common.Ac_Cat_Agreement_Goals>();
                    var dataSuccess = new
                    {
                        Data = resultModel,
                        MessageResult = Backend.Common.Enum.Status.Success,
                        Message = string.Empty,
                        RegisterType = string.Empty
                    };
                    return Ok(dataSuccess);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
        /// <summary>
        /// Nombre: GuardarAc_Cat_Agreement_Goals
        /// Descripcion: Metodo utilizado para ontener una lista de modelos AC_CAT_AGREEMENT_GOALS y retornar un objeto datatable
        /// Fecha de creacion: 8/6/2019
        /// Autor:
        /// </summary>
        /// <param name="message"></param>
        /// <returns></returns>
        [Route("Save")]
        [HttpPost]
        public async Task<IActionResult> Save([FromBody] Common.Ac_Cat_Agreement_Goals model)
        {
            try
            {
                var message = new Message();
                message.BusinessLogic = configuration.GetValue<string>("AppSettings:BusinessLogic:Ac_Cat_Agreement_Goals");
                message.Connection = configuration.GetValue<string>("ConnectionStrings:MEXPRESS_AC");
                message.Operation = Operation.Save;
                message.MessageInfo = model.SerializeObject();
                using (var businessLgic = new ServiceManager())
                {
                    var result = await businessLgic.DoWork(message);
                    if (result.Status == Status.Failed)
                    {
                        return BadRequest(result.Result);
                    }
                    var resultModel = result.DeSerializeObject<Common.Ac_Cat_Agreement_Goals>();
                    var dataSuccess = new
                    {
                        Data = resultModel,
                        MessageResult = Backend.Common.Enum.Status.Success,
                        Message = string.Empty,
                        RegisterType = string.Empty
                    };
                    return Ok(dataSuccess);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
        #endregion Region [Methods]
    }
}
