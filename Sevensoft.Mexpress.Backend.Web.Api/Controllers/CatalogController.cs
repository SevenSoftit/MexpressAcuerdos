using System;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Sevensoft.Mexpress.Backend.BusinessLogic;
using Sevensoft.Mexpress.Utilities.Extender;
using Sevensoft.Mexpress.Backend.Common;
using static Sevensoft.Mexpress.Backend.Common.Enum;
using Microsoft.Extensions.Configuration;


namespace Sevensoft.Mexpress.Backend.Web.Api.Controllers

{
    [Route("api/[controller]")]
    public class CatalogController : Controller
    {
        private IConfiguration configuration;
        public CatalogController(IConfiguration iConfiguration)
        {
            configuration = iConfiguration;
        }
        #region Region [Methods]
        /// <summary>
        /// Nombre: Listar Glb_Cat_Catalog
        /// Descripcion: Metodo utilizado para obtener una lista de modelos GLB_CAT_CATALOG y retornar un objeto datatable
        /// Fecha de creacion: 10/05/2019
        /// Autor: Gustavo ZC
        /// </summary>
        /// <param name="message"></param>
        /// <returns></returns>
        [Route("list")]
        [HttpPost]
        public async Task<IActionResult> List([FromBody] Common.Glb_Cat_Catalog model)
        {
            try
            {
                var message = new Message();
                message.BusinessLogic = configuration.GetValue<string>("AppSettings:BusinessLogic:Glb_Cat_Catalog");
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
                    var list = result.DeSerializeObject<IEnumerable<Common.Glb_Cat_Catalog>>();
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
        /// Nombre: Obtener Glb_Cat_Catalog
        /// Descripcion: Metodo utilizado para obtener una lista de modelos GLB_CAT_CATALOG y retornar un objeto datatable
        /// Fecha de creacion: 10/05/2019
        /// Autor: Gustavo ZC
        /// </summary>
        /// <param name="message"></param>
        /// <returns></returns>
        [Route("Get")]
        [HttpPost]
        public async Task<IActionResult> Get([FromBody] Common.Glb_Cat_Catalog model)
        {
            try
            {
                var message = new Message();
                message.BusinessLogic = System.Configuration.ConfigurationManager.AppSettings["BusinessLogic:Glb_Cat_Catalog"];
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
                    var resultModel = result.DeSerializeObject<Common.Glb_Cat_Catalog>();
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
        /// Nombre: Guardar Glb_Cat_Catalog
        /// Descripcion: Metodo utilizado para guardar un objeto GLB_CAT_CATALOG 
        /// Fecha de creacion: 10/05/2019
        /// Autor: Gustavo ZC
        /// </summary>
        /// <param name="message"></param>
        /// <returns></returns>
        [Route("Save")]
        [HttpPost]
        public async Task<IActionResult> Save([FromBody] Common.Glb_Cat_Catalog model)
        {
            try
            {


                var message = new Message();
                message.BusinessLogic = System.Configuration.ConfigurationManager.AppSettings["BusinessLogic:Glb_Cat_Catalog"];
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
                    var resultModel = result.DeSerializeObject<Common.Glb_Cat_Catalog>();
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
