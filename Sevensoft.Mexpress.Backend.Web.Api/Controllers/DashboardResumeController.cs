using System.IO;
using System.Data;
using System.Net.Http.Headers;
using Microsoft.AspNetCore.Http;
using System;
using System.Linq;
using AutoMapper;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Sevensoft.Mexpress.Utilities.Extender;
using Sevensoft.Mexpress.Backend.Common;
using static Sevensoft.Mexpress.Backend.Common.Enum;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Server.HttpSys;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Sevensoft.Mexpress.Backend.BusinessLogic;


namespace Sevensoft.Mexpress.Backend.Web.Api.Controllers
{
    [Route("api/[controller]")]
    [Authorize(AuthenticationSchemes =
    JwtBearerDefaults.AuthenticationScheme)]
    public class DashboardResumeController : Controller
    {
        private IConfiguration configuration;
        public DashboardResumeController(IConfiguration iConfiguration)
        {
            configuration = iConfiguration;
        }
        #region Region [Methods]
        /// Nombre: Listar Do_Mtr_Dashboard_Resume
        /// Descripcion: Metodo utilizado para obtener una lista de modelos Do_Mtr_Dashboard_Resume y retornar un objeto datatable
        /// Fecha de creacion: 09/05/2019
        /// Autor: Gustavo ZC
         [Route("ListDashboardResume")]
        [HttpPost]
        public async Task<IActionResult> ListDashboardResume([FromBody] Common.Do_Mtr_Dashboard_Resume model)
        {
            try
            {
                var message = new Message();
                message.BusinessLogic = configuration.GetValue<string>("AppSettings:BusinessLogic:Do_Mtr_Dashboard_Resume");
                message.Operation = Operation.List;
                message.Connection = configuration.GetValue<string>("ConnectionStrings:MEXPRESS");
                message.MessageInfo = model.SerializeObject();
                using (var businessLgic = new ServiceManager())
                {
                    var result = await businessLgic.DoWork(message);
                    if (result.Status == Status.Failed)
                    {
                        return BadRequest(result.Result);
                    }
                    var list = result.DeSerializeObject<IEnumerable<Common.Do_Mtr_Dashboard_Resume>>();
                    var dataSuccess = new
                    {
                        Data = list,
                        MessageResult = Backend.Common.Enum.Status.Success,
                        Message = string.Empty,
                        RegisterType = string.Empty
                    };
                    return Ok(list);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
        /// <summary>
        /// Nombre: Obtener Do_Mtr_Dashboard_Resume
        /// Descripcion: Metodo utilizado para obtener una lista de modelos Do_Mtr_Dashboard_Resume y retornar un objeto datatable
        /// Fecha de creacion: 09/05/2019
        /// Autor: Gustavo ZC
        /// </summary>
        /// <param name="message"></param>
        /// <returns></returns>
         [Route("Get")]
        [HttpPost]
        public async Task<IActionResult> Get([FromBody] Common.Do_Mtr_Dashboard_Resume model)
        {
            try
            {
                var message = new Message();
                message.BusinessLogic = configuration.GetValue<string>("AppSettings:BusinessLogic:Do_Mtr_Dashboard_Resume");
                message.Operation = Operation.Get;
                message.Connection = configuration.GetValue<string>("ConnectionStrings:MEXPRESS");
                message.MessageInfo = model.SerializeObject();
                using (var businessLgic = new ServiceManager())
                {
                    var result = await businessLgic.DoWork(message);
                    if (result.Status == Status.Failed)
                    {
                        return BadRequest(result.Result);
                    }
                    var resultModel = result.DeSerializeObject<Common.Do_Mtr_Dashboard_Resume>();
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
        /// Nombre: Guardar Do_Mtr_Dashboard_Resume
        /// Descripcion: Metodo utilizado para obtener una lista de modelos Do_Mtr_Dashboard_Resume y retornar un objeto datatable
        /// Fecha de creacion: 09/05/2019
        /// Autor: Gustavo ZC
        /// </summary>
        /// <param name="message"></param>
        /// <returns></returns>
         [Route("Save")]
        [HttpPost]
        public async Task<IActionResult> Save([FromBody] Common.Do_Mtr_Dashboard_Resume model)
        {
            try
            {

                var message = new Message();
                message.BusinessLogic = configuration.GetValue<string>("AppSettings:BusinessLogic:Do_Mtr_Dashboard_Resume");
                message.Operation = Operation.Save;
                message.Connection = configuration.GetValue<string>("ConnectionStrings:MEXPRESS");
                message.MessageInfo = model.SerializeObject();
                using (var businessLgic = new ServiceManager())
                {
                    var result = await businessLgic.DoWork(message);
                    if (result.Status == Status.Failed)
                    {
                        return BadRequest(result.Result);
                    }
                    var resultModel = result.DeSerializeObject<Common.Do_Mtr_Dashboard_Resume>();
                    var dataSuccess = new
                    {
                        Data = resultModel,
                        MessageResult = Backend.Common.Enum.Status.Success,
                        Message = string.Empty,
                        RegisterType = string.Empty
                    };
                    return Ok(resultModel);
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
