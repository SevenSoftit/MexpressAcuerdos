using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Sevensoft.Mexpress.Backend.Common;
using Sevensoft.Mexpress.Utilities.Extender;
using System.Threading.Tasks;
using static Sevensoft.Mexpress.Backend.Common.Enum;
using System.Linq;
using Sevensoft.Mexpress.Backend.BusinessLogic;

namespace Sevensoft.Mexpress.Backend.WepApi.Controllers
{
    [Route("api/[controller]")]
    public class GblCatLabelController : Controller
    {
        private IConfiguration configuration;
        public GblCatLabelController(IConfiguration iConfiguration)
        {
            configuration = iConfiguration;
        }
         
        /// Nombre: Listar Gbl_Cat_Label
        /// Descripcion: Metodo utilizado para obtener una lista de modelos GBL_CAT_Label y retornar un objeto datatable
        /// Fecha de creacion: 20/03/2019
        /// Autor:Gustavo ZC  
        #region Region [Methods]
        [HttpPost]
        [Route("ListTable")]
        public async Task<IActionResult> ListTable([FromBody] Common.Do_Cat_Label request)
        {
            try
            {
                var queryString = Request.Query;
                int skip = Convert.ToInt32(queryString["$skip"]);
                int take = Convert.ToInt32(queryString["$top"]);
                var message = new Message();
                message.BusinessLogic = configuration.GetValue<string>("AppSettings:BusinessLogic:GblCatLabel");
                message.Connection = configuration.GetValue<string>("ConnectionStrings:MEXPRESS");

                message.Operation = Operation.List;

                using (var businessLgic = new ServiceManager())
                {

                    message.MessageInfo = new Common.Do_Cat_Label() {   Rows_Pag = request.Rows_Pag,
                                                                        Page_Number = request.Page_Number, 
                                                                        GblOrganization = request.GblOrganization,
                                                                        GblCatForm = request.GblCatForm,
                                                                        GblCatLanguage = request.GblCatLanguage
                                                                        
                    }.SerializeObject();
                    var result = await businessLgic.DoWork(message);

                    if (result.Status == Status.Failed)
                    {
                        return BadRequest(result.Result);
                    }

                    var list = result.DeSerializeObject<IEnumerable<Common.Do_Cat_Label>>();
                    var value = new
                    {
                        result = list,
                        count = list.Count() == 0 ? 0 : list.FirstOrDefault().Total_Row
                    };

                    return Ok(value);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
        /// <summary>
        /// Nombre: Listar Gbl_Cat_Label
        /// Descripcion: Metodo utilizado para obtener una lista de modelos GBL_CAT_Label y retornar un objeto datatable
        /// Fecha de creacion: 20/03/2019
        /// Autor:Eddie Jaen
        /// </summary>
        /// <param name="message"></param>
        /// <returns></returns>       
        [HttpPost]
        [Route("list")]
        public async Task<IActionResult> List([FromBody] Common.Do_Cat_Label request)
        {
            try
            {
                var message = new Message();
                message.BusinessLogic = configuration.GetValue<string>("AppSettings:BusinessLogic:GblCatLabel");
                message.Connection = configuration.GetValue<string>("ConnectionStrings:MEXPRESS");

                message.Operation = Operation.List;
                message.MessageInfo = request.SerializeObject();
                using (var businessLgic = new ServiceManager())
                {
                    var result = await businessLgic.DoWork(message);
                    if (result.Status == Status.Failed)
                    {
                        return BadRequest(result.Result);
                    }
                    var list = result.DeSerializeObject<IEnumerable<Common.Do_Cat_Label>>();

                    return Ok(list);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// Nombre: Listar Gbl_Cat_Label
        /// Descripcion: Metodo utilizado para guardar una nueva fila de datos GBL_CAT_Label
        /// Fecha de creacion: 20/03/2019
        /// Autor:Gustavo ZC
        
        [HttpPost]
        [Route("Save")]
        public async Task<IActionResult> Save([FromBody] Common.Do_Cat_Label model)
        {
            try
            {
                var message = new Message();
                message.BusinessLogic = configuration.GetValue<string>("AppSettings:BusinessLogic:GblCatLabel");
                message.Connection = configuration.GetValue<string>("ConnectionStrings:MEXPRESS");
                message.Operation = Operation.Save;
                message.MessageInfo = model.SerializeObject();
                using (var businessLgic = new ServiceManager())
                {
                    var result = await businessLgic.DoWork(message);
                    if (result.Status == Status.Failed)
                    {
                        return BadRequest(result.Result);
                    }
                    var resultModel = result.DeSerializeObject<Common.Do_Cat_Label>();
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
