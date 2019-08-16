using System;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Sevensoft.Mexpress.Utilities.Extender;
using Sevensoft.Mexpress.Backend.Common;
using static Sevensoft.Mexpress.Backend.Common.Enum;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Sevensoft.Mexpress.Backend.BusinessLogic;

namespace Sevensoft.Mexpress.Backend.Web.Api.Controllers
{
    [Route("api/[controller]")]
    [Authorize(AuthenticationSchemes =
    JwtBearerDefaults.AuthenticationScheme)]
    public class AgreementProductInfoController : Controller
    {
        private IConfiguration configuration;
        public AgreementProductInfoController(IConfiguration iConfiguration)
        {
            configuration = iConfiguration;
        }
        #region Region [Methods]
        /// <summary>
        /// Nombre: Listar Ac_Mtr_Agreement_Product_Info
        /// Descripcion: Metodo utilizado para obtener una lista de productos y retornar un objeto datatable
        /// Fecha de creacion: 09/08/2019
        /// Autor: Gustavo ZC
        /// </summary>
        /// <param name="message"></param>
        /// <returns></returns> 
        [Route("List")]
        [HttpPost]
        public async Task<IActionResult> List([FromBody] Common.Ac_Mtr_Agreement_Product_Info model)
        {
            try
            {
                var message = new Message();
                message.BusinessLogic = configuration.GetValue<string>("AppSettings:BusinessLogic:Ac_Mtr_Agreement_Product_Info");
                message.Operation = Operation.List;
                message.Connection = configuration.GetValue<string>("ConnectionStrings:MEXPRESS_AC");
                message.MessageInfo = model.SerializeObject();
                using (var businessLgic = new ServiceManager())
                {
                    var result = await businessLgic.DoWork(message);
                    if (result.Status == Status.Failed)
                    {
                        return BadRequest(result.Result);
                    }
                    var list = result.DeSerializeObject<IEnumerable<Common.Ac_Mtr_Agreement_Product_Info>>();
                    // var dataSuccess = new
                    // {
                    //     Data = list,
                    //     MessageResult = Backend.Common.Enum.Status.Success,
                    //     Message = string.Empty,
                    //     RegisterType = string.Empty
                    // };
                    return Ok(list);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
        /// <summary>
        /// Nombre: Obtener Ac_Mtr_Agreement_Product_Info
        /// Descripcion: Metodo utilizado para obtener una lista de productos y retornar un objeto datatable
        /// Fecha de creacion: 09/08/2019
        /// Autor: Gustavo ZC
        /// </summary>
        /// <param name="message"></param>
        /// <returns></returns>
        [Route("Get")]
        [HttpPost]
        public async Task<IActionResult> Get([FromBody] Common.Ac_Mtr_Agreement_Product_Info model)
        {
            try
            {
                var message = new Message();
                message.BusinessLogic = configuration.GetValue<string>("AppSettings:BusinessLogic:Ac_Mtr_Agreement_Product_Info");
                message.Operation = Operation.Get;
                message.Connection = configuration.GetValue<string>("ConnectionStrings:MEXPRESS_AC");
                message.MessageInfo = model.SerializeObject();
                using (var businessLgic = new ServiceManager())
                {
                    var result = await businessLgic.DoWork(message);
                    if (result.Status == Status.Failed)
                    {
                        return BadRequest(result.Result);
                    }
                    var resultModel = result.DeSerializeObject<Common.Ac_Mtr_Agreement_Product_Info>();
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
        /// Nombre: Guardar Ac_Mtr_Agreement_Product_Info
        /// Descripcion: Metodo utilizado para guardar un objeto de tipo Ac_Mtr_Agreement_Product_Info.
        /// Fecha de creacion: 09/08/2019
        /// Autor: Gustavo ZC
        /// </summary>
        /// <param name="message"></param>
        /// <returns></returns>
        [Route("Save")]
        [HttpPost]
        public async Task<IActionResult> Save([FromBody] Common.Ac_Mtr_Agreement_Product_Info model)
        {
            try
            {

                var message = new Message();
                message.BusinessLogic = configuration.GetValue<string>("AppSettings:BusinessLogic:Ac_Mtr_Agreement_Product_Info");
                message.Operation = Operation.Save;
                message.Connection = configuration.GetValue<string>("ConnectionStrings:MEXPRESS_AC");
                message.MessageInfo = model.SerializeObject();
                using (var businessLgic = new ServiceManager())
                {
                    var result = await businessLgic.DoWork(message);
                    if (result.Status == Status.Failed)
                    {
                        return BadRequest(result.Result);
                    }
                    var resultModel = result.DeSerializeObject<Common.Ac_Mtr_Agreement_Product_Info>();

                    return Ok(resultModel);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Nombre: Eliminar Ac_Mtr_Agreement_Product_Info
        /// Descripcion: Metodo utilizado para eliminar un objeto de tipo Ac_Mtr_Agreement_Product_Info.
        /// Fecha de creacion: 09/08/2019
        /// Autor: Gustavo ZC
        /// </summary>
        /// <param name="message"></param>
        /// <returns></returns>
        [Route("Delete")]
        [HttpPost]
        public async Task<IActionResult> Delete([FromBody] Common.Ac_Mtr_Agreement_Product_Info model)
        {
            try
            {

                var message = new Message();
                message.BusinessLogic = configuration.GetValue<string>("AppSettings:BusinessLogic:Ac_Mtr_Agreement_Product_Info");
                message.Operation = Operation.Delete;
                message.Connection = configuration.GetValue<string>("ConnectionStrings:MEXPRESS_AC");
                message.MessageInfo = model.SerializeObject();
                using (var businessLgic = new ServiceManager())
                {
                    var result = await businessLgic.DoWork(message);
                    if (result.Status == Status.Failed)
                    {
                        return BadRequest(result.Result);
                    }
                    var resultModel = result.DeSerializeObject<IEnumerable<Common.Ac_Mtr_Agreement_Product_Info>>();
                    // var dataSuccess = new
                    // {
                    //     Data = resultModel,
                    //     MessageResult = Backend.Common.Enum.Status.Success,
                    //     Message = string.Empty,
                    //     RegisterType = string.Empty
                    // };
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
