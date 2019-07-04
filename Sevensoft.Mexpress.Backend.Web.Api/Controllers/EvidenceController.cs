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
using Sevensoft.Mexpress.Backend.BusinessLogic;
using Sevensoft.Mexpress.Utilities.Extender;
using Sevensoft.Mexpress.Backend.Common;
using static Sevensoft.Mexpress.Backend.Common.Enum;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Server.HttpSys;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Sevensoft.Mexpress.Backend.Web.Api.Helpers;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Net.Http.Headers;
using Microsoft.Extensions.DependencyInjection;
using System.Text;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.Globalization;
using Microsoft.Extensions.Primitives;
using Microsoft.Win32;

namespace Sevensoft.Mexpress.Backend.Web.Api.Controllers
{
    [Route("api/[controller]")]
    //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class EvidenceController : Controller
    {

        private static readonly Microsoft.AspNetCore.Http.Features.FormOptions _defaultFormOptions = new Microsoft.AspNetCore.Http.Features.FormOptions();

        private IHostingEnvironment _hostingEnvironment;
        private IConfiguration configuration;

        public EvidenceController(IHostingEnvironment hostingEnvironment, IConfiguration iConfiguration)
        {
            _hostingEnvironment = hostingEnvironment;
            configuration = iConfiguration;
        }

        #region Region [Methods]
        /// <summary>
        /// Nombre: List
        /// Descripcion: Metodo utilizado para obtener una lista de modelos Do_Mtr_Evidence y retornar un objeto datatable
        /// Fecha de creacion: 26/04/2019
        /// Autor: Gustavo ZC
        /// </summary>
        /// <param name="message"></param>
        /// <returns></returns>
        [Route("List")]
        [HttpPost]
        public async Task<IActionResult> List([FromBody] Common.Do_Mtr_Evidence model)
        {
            try
            {
                var message = new Message();
                message.BusinessLogic = configuration.GetValue<string>("AppSettings:BusinessLogic:Gbl_Mtr_Evidence");
                message.Connection = configuration.GetValue<string>("ConnectionStrings:MEXPRESS");
                message.Operation = Operation.List;
                message.MessageInfo = model.SerializeObject();
                using (var businessLgic = new ServiceManager())
                {
                    var result = await businessLgic.DoWork(message);
                    if (result.Status == Status.Failed)
                    {
                        return BadRequest(result.Result);
                    }
                    var list = result.DeSerializeObject<IEnumerable<Common.Do_Mtr_Evidence>>();
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
        /// Nombre: Obtener Do_Mtr_Evidence
        /// Descripcion: Metodo utilizado para obtener una lista de modelos Do_Mtr_Evidence y retornar un objeto datatable
        /// Fecha de creacion: 26/04/2019
        /// Autor: Gustavo ZC
        /// </summary>
        /// <param name="message"></param>
        /// <returns></returns>
        [Route("Get")]
        [HttpPost]
        public async Task<IActionResult> Get([FromBody] Common.Do_Mtr_Evidence model)
        {
            try
            {
                var message = new Message();
                message.BusinessLogic = configuration.GetValue<string>("AppSettings:BusinessLogic:Gbl_Mtr_Evidence");
                message.Connection = configuration.GetValue<string>("ConnectionStrings:MEXPRESS");
                message.Operation = Operation.Get;
                message.MessageInfo = model.SerializeObject();
                using (var businessLgic = new ServiceManager())
                {
                    var result = await businessLgic.DoWork(message);
                    if (result.Status == Status.Failed)
                    {
                        return BadRequest(result.Result);
                    }
                    var resultModel = result.DeSerializeObject<Common.Do_Mtr_Evidence>();
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
        /// Nombre: Save
        /// Descripcion: Metodo utilizado para guardar una evidencia
        /// Fecha de creacion: 26/04/2019
        /// Autor: Gustavo ZC
        /// </summary>
        /// <param name="message"></param>
        /// <returns></returns>
        [Route("Save")]
        [HttpPost]
        public async Task<IActionResult> Save([FromBody] Common.Do_Mtr_Evidence model)
        {
            try
            {
                var message = new Message();
                message.BusinessLogic = configuration.GetValue<string>("AppSettings:BusinessLogic:Gbl_Mtr_Evidence");
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
                    var resultModel = result.DeSerializeObject<Common.Do_Mtr_Evidence>();
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

        [Route("SetToken")]
        [HttpGet]
        [GenerateAntiforgeryTokenCookieForAjax]
        public IActionResult SetToken()
        {
            return Ok();
        }

        [Route("Upload")]
        [HttpPost]
        [DisableFormValueModelBinding]
        // [ValidateAntiForgeryToken]


        public async Task<IActionResult> Upload()
        {
            try
            {
                if (!MultipartRequestHelper.IsMultipartContentType(Request.ContentType))
                {
                    return BadRequest($"Expected a multipart request, but got {Request.ContentType}");
                }

                // Used to accumulate all the form url encoded key value pairs in the 
                // request.
                var formAccumulator = new KeyValueAccumulator();
                var nameFile = String.Empty;
                string targetFilePathBackUp = string.Empty;
                // string targetFilePath = string.Empty;


                var boundary = MultipartRequestHelper.GetBoundary(
                    Microsoft.Net.Http.Headers.MediaTypeHeaderValue.Parse(Request.ContentType),
                    _defaultFormOptions.MultipartBoundaryLengthLimit);
                var reader = new MultipartReader(boundary, HttpContext.Request.Body);

                var section = await reader.ReadNextSectionAsync();
                var extension = "";
                while (section != null)
                {
                    Microsoft.Net.Http.Headers.ContentDispositionHeaderValue contentDisposition;
                    var hasContentDispositionHeader = Microsoft.Net.Http.Headers.ContentDispositionHeaderValue.TryParse(section.ContentDisposition, out contentDisposition);
                    if (hasContentDispositionHeader)
                    {
                        if (MultipartRequestHelper.HasFileContentDisposition(contentDisposition))
                        {

                            extension = GetDefaultExtension(section.ContentType);

                            if(string.IsNullOrEmpty(extension))
                                extension = contentDisposition.FileName.Value.Substring(contentDisposition.FileName.Value.IndexOf('.'), (contentDisposition.FileName.Value.Length - contentDisposition.FileName.Value.IndexOf('.')));

                            nameFile = contentDisposition.FileName.Value;
                            targetFilePathBackUp = string.Format("{0}{1}", configuration.GetValue<string>("Files:RutaEvidencia"), nameFile);
                            using (var targetStream = System.IO.File.Create(targetFilePathBackUp))
                            {
                                await section.Body.CopyToAsync(targetStream);
                            }
                        }
                        else if (MultipartRequestHelper.HasFormDataContentDisposition(contentDisposition))
                        {
                            // Content-Disposition: form-data; name="key"
                            //
                            // value

                            // Do not limit the key name length here because the 
                            // multipart headers length limit is already in effect.
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

                // OJO 
                var archive = new Common.Do_Mtr_Evidence();

                archive.list_Evidence_Archive = GetArchives(formAccumulator.GetResults());

                archive = await ProcessPathArchiveAsync(archive, extension);

                var message = new Message();
                message.BusinessLogic = configuration.GetValue<string>("AppSettings:BusinessLogic:Gbl_Mtr_Evidence");
                message.Connection = configuration.GetValue<string>("ConnectionStrings:MEXPRESS");
                message.Operation = Operation.Save;
                message.MessageInfo = archive.SerializeObject();
                using (var businessLgic = new ServiceManager())
                {
                    var result = await businessLgic.DoWork(message);
                    if (result.Status == Status.Failed)
                    {
                        return BadRequest(result.Result);
                    }
                    var resultModel = result.DeSerializeObject<Common.Do_Mtr_Evidence>();

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
            catch (System.Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        public static string GetDefaultExtension(string mimeType)
        {
            string result;
            RegistryKey key;
            object value;

            key = Registry.ClassesRoot.OpenSubKey(@"MIME\Database\Content Type\" + mimeType, false);
            value = key != null ? key.GetValue("Extension", null) : null;
            result = value != null ? value.ToString() : string.Empty;

            return result;
        }

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

        private List<Common.Do_Mtr_Evidence> GetArchives(Dictionary<string, StringValues> fields)
        {
            var list = new List<Common.Do_Mtr_Evidence>();
            var contador = (fields["Archive_New_Name"].Count);

            for (var x = 0; x < contador; x++)
            {
                var obj = new Common.Do_Mtr_Evidence();

                foreach (var dictionary in fields)
                {
                    if (dictionary.Key == "Archive_New_Name")
                        obj.Archive_New_Name = dictionary.Value[x];

                    else if (dictionary.Key == "Pk_Mtr_Pay_Evidence_Process")
                        obj.Pk_Mtr_Pay_Evidence_Process = Convert.ToInt32(dictionary.Value[x]);

                    else if (dictionary.Key == "Pk_Do_Mtr_Pay_Slip")
                        obj.Pk_Do_Mtr_Pay_Slip = Convert.ToInt32(dictionary.Value[x]);

                    else if (dictionary.Key == "Pk_Do_Cat_Group")
                        obj.Pk_Do_Cat_Group = Convert.ToInt32(dictionary.Value[x]);

                    else if (dictionary.Key == "Creation_User")
                        obj.Creation_User = dictionary.Value[x];

                    else if (dictionary.Key == "Modification_User")
                        obj.Modification_User = dictionary.Value[x];

                    else if (dictionary.Key == "Archive_Original_Name")
                        obj.Archive_Original_Name = dictionary.Value[x];

                    else if (dictionary.Key == "Active")
                        obj.Active = Convert.ToBoolean(dictionary.Value[x]);

                    else if (dictionary.Key == "Slip_Name")
                        obj.Slip_Name = dictionary.Value[x];
                }

                list.Add(obj);
            }

            return list;
        }

        private async Task<Do_Mtr_Evidence> ProcessPathArchiveAsync(Common.Do_Mtr_Evidence archive, string extension)
        {
            var newArchive = new Common.Do_Mtr_Evidence();
            string targetFilePath = "";

            foreach (var item in archive.list_Evidence_Archive)
            {
                var targetFilePathBackUp = string.Format("{0}{1}", configuration.GetValue<string>("Files:RutaEvidencia"), item.Archive_Original_Name);

                if (System.IO.File.Exists(targetFilePathBackUp))
                {
                    string Path = string.Format("{0}{1}{2}\\", configuration.GetValue<string>("Files:RutaEvidencia"), "Archivo evidencia planilla-", item.Slip_Name);

                    if (item.Archive_New_Name != item.Archive_Original_Name)
                    {
                        item.Archive_New_Name = item.Archive_New_Name + extension;
                        targetFilePath = string.Format("{0}{1}{2}\\{3}", configuration.GetValue<string>("Files:RutaEvidencia"), "Archivo evidencia planilla-", item.Slip_Name, item.Archive_New_Name);
                    }
                    else
                    {

                        targetFilePath = string.Format("{0}{1}{2}\\{3}", configuration.GetValue<string>("Files:RutaEvidencia"), "Archivo evidencia planilla-", item.Slip_Name, item.Archive_New_Name);
                    }
                    if (!System.IO.File.Exists(targetFilePath) && item.Active == true)
                    {

                        if (!Directory.Exists(Path))
                        {
                            Directory.CreateDirectory(Path);
                        }

                        Directory.Move(targetFilePathBackUp, targetFilePath);
                        item.Url_Attachment = targetFilePath.Replace(configuration.GetValue<string>("Files:FilePathReplace"), configuration.GetValue<string>("Files:FilePathDownload"));

                    }
                    else
                    {
                        System.IO.File.Delete(targetFilePath);
                        archive.Url_Attachment = targetFilePath;
                        archive.Modification_User = item.Modification_User;
                        await DeleteSpecific(archive);
                        if (!Directory.Exists(Path))
                        {
                            Directory.CreateDirectory(Path);
                        }

                        Directory.Move(targetFilePathBackUp, targetFilePath);
                        item.Url_Attachment = targetFilePath.Replace(configuration.GetValue<string>("Files:FilePathReplace"), configuration.GetValue<string>("Files:FilePathDownload"));
                    }
                }
            }

            // item.Url_Attachment = targetFilePath;


            newArchive = archive;

            return newArchive;

        }


        /// <summary>
        /// Nombre: Eliminar Do_Mtr_Evidence
        /// Descripcion: Metodo utilizado para eliminar un objeto de tipo Do_Mtr_Evidence.
        /// Fecha de creacion: 30/04/2019
        /// Autor: Gustavo ZC
        /// </summary>
        /// <param name="message"></param>
        /// <returns></returns>
        [Route("Delete")]
        [HttpPost]
        public async Task<IActionResult> Delete([FromBody] Common.Do_Mtr_Evidence model)
        {
            try
            {
                var message = new Message();
                message.BusinessLogic = configuration.GetValue<string>("AppSettings:BusinessLogic:Gbl_Mtr_Evidence");
                message.Operation = Operation.Delete;
                message.Connection = configuration.GetValue<string>("ConnectionStrings:MEXPRESS");
                message.MessageInfo = model.SerializeObject();
                using (var businessLgic = new ServiceManager())
                {
                    var result = await businessLgic.DoWork(message);
                    if (result.Status == Status.Failed)
                    {
                        return BadRequest(result.Result);
                    }
                    var resultModel = result.DeSerializeObject<IEnumerable<Common.Do_Mtr_Evidence>>();
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

        /// <summary>
        /// Nombre: Eliminar Do_Mtr_Evidence
        /// Descripcion: Metodo utilizado para eliminar un objeto de tipo Do_Mtr_Evidence.
        /// Fecha de creacion: 30/04/2019
        /// Autor: Gustavo ZC
        /// </summary>
        /// <param name="message"></param>
        /// <returns></returns>
        [Route("DeleteSpecific")]
        [HttpPost]
        public async Task<IActionResult> DeleteSpecific([FromBody] Common.Do_Mtr_Evidence model)
        {
            try
            {
                var message = new Message();
                message.BusinessLogic = configuration.GetValue<string>("AppSettings:BusinessLogic:Gbl_Mtr_Evidence");
                message.Operation = Operation.DeleteSpecific;
                message.Connection = configuration.GetValue<string>("ConnectionStrings:MEXPRESS");
                message.MessageInfo = model.SerializeObject();
                using (var businessLgic = new ServiceManager())
                {
                    var result = await businessLgic.DoWork(message);
                    if (result.Status == Status.Failed)
                    {
                        return BadRequest(result.Result);
                    }
                    var resultModel = result.DeSerializeObject<IEnumerable<Common.Do_Mtr_Evidence>>();
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
