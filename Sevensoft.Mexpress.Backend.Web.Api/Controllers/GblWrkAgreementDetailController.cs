using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Sevensoft.Mexpress.Backend.Common;
using Sevensoft.Mexpress.Utilities.Extender;
using System.Threading.Tasks;
using static Sevensoft.Mexpress.Backend.Common.Enum;
using System.IO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.WebUtilities;
using System.Text;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.Globalization;
using Microsoft.Extensions.Primitives;
using ChiKien276.AspNetCore.MultipartHelper;
using Microsoft.Net.Http.Headers;
using Sevensoft.Mexpress.Backend.BusinessLogic;

namespace Sevensoft.Mexpress.Backend.Web.Api.Controllers
{
    [Route("api/[controller]")]
    //  [Authorize(AuthenticationSchemes =
    //  JwtBearerDefaults.AuthenticationScheme)]
    public class GblWrkAgreementDetailController : Controller
    {
        private static readonly Microsoft.AspNetCore.Http.Features.FormOptions _defaultFormOptions = new Microsoft.AspNetCore.Http.Features.FormOptions();
        private IConfiguration configuration;

        public GblWrkAgreementDetailController(IConfiguration iConfiguration)
        {
            configuration = iConfiguration;
        }


        #region Region [Methods]
        /// <summary>
        /// Name: ImportFile
        /// Description: Method to import excel file
        /// Creation date: 05/07/2019.
        /// Author: Gustavo ZC
        /// </summary>
        /// <param name="message"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("ImportFile")]
        [DisableFormValueModelBinding]
        public async Task<IActionResult> ImportFile()
        {
            try
            {
                try
                {
                    if (!MultipartRequestHelper.IsMultipartContentType(Request.ContentType))
                    {
                        return BadRequest($"Expected a multipart request, but got {Request.ContentType}");
                    }
                    var queryString = Request.Query;
                    /*
                        Sacamos la ruta de la carpeta para importar medios de contactos  
                    */

                    var parameter = new Common.GblParameter();
                    parameter.SEARCH_KEY = "IMPORT_PRODUCT_PENDING";

                    var message = new Message();
                    message.BusinessLogic = configuration.GetValue<string>("AppSettings:BusinessLogic:GblParameter");
                    message.Connection = configuration.GetValue<string>("ConnectionStrings:MEXPRESS_AC");
                    message.Operation = Operation.Get;
                    using (var businessLgic = new ServiceManager())
                    {
                        message.MessageInfo = parameter.SerializeObject();
                        var parameterResult = await businessLgic.DoWork(message);
                        if (parameterResult.Status == Status.Failed)
                        {
                            return BadRequest(parameterResult.Result);
                        }
                        parameter = parameterResult.DeSerializeObject<Common.GblParameter>();
                    }



                    // Used to accumulate all the form url encoded key value pairs in the 
                    // request.

                    var formAccumulator = new KeyValueAccumulator();
                    var nameFile = String.Empty;
                    string targetFilePathBackUp = string.Empty;
                    string targetFilePath = string.Empty;
                    var boundary = MultipartRequestHelper.GetBoundary(
                        Microsoft.Net.Http.Headers.MediaTypeHeaderValue.Parse(Request.ContentType),
                        _defaultFormOptions.MultipartBoundaryLengthLimit);
                    var reader = new MultipartReader(boundary, HttpContext.Request.Body);

                    var section = await reader.ReadNextSectionAsync();
                    while (section != null)
                    {
                        Microsoft.Net.Http.Headers.ContentDispositionHeaderValue contentDisposition;
                        var hasContentDispositionHeader = Microsoft.Net.Http.Headers.ContentDispositionHeaderValue.TryParse(section.ContentDisposition, out contentDisposition);

                        if (hasContentDispositionHeader)
                        {
                            if (MultipartRequestHelper.HasFileContentDisposition(contentDisposition))
                            {
                                var date = DateTime.Now;
                                var dateNow = date.Year.ToString() + "_" + date.Month.ToString() + "_" + date.Day.ToString() + "_" + date.Hour.ToString() + "_" + date.Minute.ToString() + "_" + date.Millisecond.ToString();
                                nameFile = configuration.GetValue<string>("Files:FileName");
                                targetFilePathBackUp = string.Format("{0}{1}_{2}{3}", parameter.VALUE, nameFile, dateNow, ".xlsx");
                                nameFile = string.Format("{0}_{1}{2}", nameFile, dateNow, ".xlsx");
                                if (!System.IO.File.Exists(targetFilePath))
                                {
                                    if (!Directory.Exists(parameter.VALUE))
                                    {
                                        Directory.CreateDirectory(parameter.VALUE);
                                    }
                                }


                                using (var targetStream = System.IO.File.Create(targetFilePathBackUp))
                                {
                                    await section.Body.CopyToAsync(targetStream);
                                }
                            }
                            else if (MultipartRequestHelper.HasFormDataContentDisposition(contentDisposition))
                            {

                                var key = HeaderUtilities.RemoveQuotes(contentDisposition.Name);
                                var encoding = GetEncoding(section);
                                using (var streamReader = new StreamReader(
                                    section.Body,
                                    encoding,
                                    detectEncodingFromByteOrderMarks: true,
                                    bufferSize: 1024,
                                    leaveOpen: true))
                                {
                                    // The value length limit is enforced by MultipartBodyLengthLimit
                                    var value = await streamReader.ReadToEndAsync();
                                    if (String.Equals(value, "undefined", StringComparison.OrdinalIgnoreCase))
                                    {
                                        value = String.Empty;
                                    }
                                    formAccumulator.Append(key.Value, value);

                                    if (formAccumulator.ValueCount > _defaultFormOptions.ValueCountLimit)
                                    {
                                        throw new InvalidDataException($"Form key count limit {_defaultFormOptions.ValueCountLimit} exceeded.");
                                    }
                                }
                            }
                        }

                        // Drains any remaining section body that has not been consumed and
                        // reads the headers for the next section.
                        section = await reader.ReadNextSectionAsync();
                    }

                    var model = new Common.Import_Product();
                    model = GetHeaderPk(formAccumulator.GetResults());
                    model.Creation_User = (queryString["User"]).ToString();
                    model.File_Path = ProcessPathDocumentAsync(nameFile, targetFilePathBackUp).Result;

                    var formValueProvider = new FormValueProvider(
                        BindingSource.Form,
                        new FormCollection(formAccumulator.GetResults()),
                        CultureInfo.CurrentCulture);

                    var bindingSuccessful = await TryUpdateModelAsync(model, prefix: "",
                        valueProvider: formValueProvider);


                    message.BusinessLogic = configuration.GetValue<string>("AppSettings:BusinessLogic:Gbl_Wrk_Agreement_Detail");
                    message.Connection = configuration.GetValue<string>("ConnectionStrings:MEXPRESS_AC");
                    message.Operation = Operation.Save;
                    using (var businessLgic = new ServiceManager())
                    {
                        message.MessageInfo = model.SerializeObject();
                        var result = await businessLgic.DoWork(message);

                        if (result.Status == Status.Failed)
                        {
                            return BadRequest(result.Result);
                        }
                        var list = result.DeSerializeObject<IEnumerable<Common.Import_Product>>();

                        return Ok(list);
                    }
                }
                catch (Exception ex)
                {
                    return BadRequest(ex);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }


        /// <summary>
        /// Nombre: GetEncoding
        /// Descripcion: 
        /// Fecha de creacion: 05/07/2019
        /// Autor: Gustavo ZC
        /// </summary>
        /// <param name="message"></param>
        /// <returns></returns>
        private static Encoding GetEncoding(MultipartSection section)
        {
            Microsoft.Net.Http.Headers.MediaTypeHeaderValue mediaType;
            var hasMediaTypeHeader = Microsoft.Net.Http.Headers.MediaTypeHeaderValue.TryParse(section.ContentType, out mediaType);
            // UTF-7 is insecure and should not be honored. UTF-8 will succeed in 
            // most cases.
            if (!hasMediaTypeHeader || Encoding.UTF7.Equals(mediaType.Encoding))
            {
                return Encoding.UTF8;
            }
            return mediaType.Encoding;
        }


        private async Task<string> ProcessPathDocumentAsync(string FileName, string targetFilePathBackUp)
        {
            var parameters = new Common.GblParameter();
            parameters.SEARCH_KEY = "IMPORT_PRODUCT_FINISHED";

            var message = new Message();
            message.BusinessLogic = configuration.GetValue<string>("AppSettings:BusinessLogic:GblParameter");
            message.Connection = configuration.GetValue<string>("ConnectionStrings:MEXPRESS_AC");
            message.Operation = Operation.Get;
            using (var businessLgic = new ServiceManager())
            {
                message.MessageInfo = parameters.SerializeObject();
                var parameterResult = await businessLgic.DoWork(message);
                parameters = parameterResult.DeSerializeObject<Common.GblParameter>();
            }


            string targetFilePath = "";
            if (System.IO.File.Exists(targetFilePathBackUp))
            {

                targetFilePath = string.Format("{0}\\{1}", parameters.VALUE, FileName);
                string Path = string.Format("{0}", parameters.VALUE);

                if (!System.IO.File.Exists(targetFilePath))
                {
                    if (!Directory.Exists(Path))
                    {
                        Directory.CreateDirectory(Path);
                    }

                    Directory.Move(targetFilePathBackUp, targetFilePath);

                }
                else
                {

                    // System.IO.File.Delete(targetFilePath);
                    // if (!Directory.Exists(Path))
                    // {
                    //     Directory.CreateDirectory(Path);
                    // }
                    Directory.Move(targetFilePathBackUp, targetFilePath);

                    //throw new Exception("El archivo ingresado ya existe");
                }
            }

            targetFilePath = string.Format("{0}\\{1}", parameters.VALUE, FileName);
            return targetFilePath;
        }

        private Common.Import_Product GetDocuments(Dictionary<string, StringValues> fields, Common.Import_Product model)
        {
            foreach (var dictionary in fields)
            {
                if (dictionary.Key == "UserName")
                {
                    //model.CompanyName = dictionary.Value[0];
                }
                else if (dictionary.Key == "FK_GBL_CAT_COMPANY")
                {
                    //model.FK_GBL_CAT_COMPANY = Convert.ToInt64(dictionary.Value[0]);
                }
            }
            return model;
        }

        private Common.Import_Product GetHeaderPk(Dictionary<string, StringValues> fields)
        {
            var model = new Common.Import_Product();
            foreach (var dictionary in fields)
            {
                if (dictionary.Key == "Pk_Ac_Trade_Agreement")
                    model.Pk_Ac_Trade_Agreement = Convert.ToInt64(dictionary.Value[0]);
            }

            return model;
        }



        #endregion Region [Methods]
    }

}