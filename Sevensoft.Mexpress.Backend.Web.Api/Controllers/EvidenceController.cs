using System.IO;
using Microsoft.AspNetCore.Http;
using System;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Sevensoft.Mexpress.Backend.BusinessLogic;
using Sevensoft.Mexpress.Utilities.Extender;
using Sevensoft.Mexpress.Backend.Common;
using static Sevensoft.Mexpress.Backend.Common.Enum;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Hosting;
using Sevensoft.Mexpress.Backend.Web.Api.Helpers;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Net.Http.Headers;
using System.Text;
using Microsoft.Extensions.Primitives;
using Microsoft.Win32;

namespace Sevensoft.Mexpress.Backend.Web.Api.Controllers
{
    [Route("api/[controller]")]
    //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class EvidenceController : Controller
    {
        public string correctName = "";

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
        /// Descripcion: Metodo utilizado para obtener una lista de modelos Ac_Mtr_Agreement_Document y retornar un objeto datatable
        /// Fecha de creacion: 24/07/2019
        /// Autor: Gustavo ZC
        /// </summary>
        /// <param name="message"></param>
        /// <returns></returns>
        [Route("List")]
        [HttpPost]
        public async Task<IActionResult> List([FromBody] Common.Ac_Mtr_Agreement_Document model)
        {
            try
            {
                var message = new Message();
                message.BusinessLogic = configuration.GetValue<string>("AppSettings:BusinessLogic:Gbl_Mtr_Evidence");
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
                    var list = result.DeSerializeObject<IEnumerable<Common.Ac_Mtr_Agreement_Document>>();
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
        /// Nombre: Obtener Ac_Mtr_Agreement_Document
        /// Descripcion: Metodo utilizado para obtener una lista de modelos Ac_Mtr_Agreement_Document y retornar un objeto datatable
        /// Fecha de creacion: 24/07/2019
        /// Autor: Gustavo ZC
        /// </summary>
        /// <param name="message"></param>
        /// <returns></returns>
        [Route("Get")]
        [HttpPost]
        public async Task<IActionResult> Get([FromBody] Common.Ac_Mtr_Agreement_Document model)
        {
            try
            {
                var message = new Message();
                message.BusinessLogic = configuration.GetValue<string>("AppSettings:BusinessLogic:Gbl_Mtr_Evidence");
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
                    var resultModel = result.DeSerializeObject<Common.Ac_Mtr_Agreement_Document>();
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
        /// Fecha de creacion: 24/07/2019
        /// Autor: Gustavo ZC
        /// </summary>
        /// <param name="message"></param>
        /// <returns></returns>
        [Route("Save")]
        [HttpPost]
        public async Task<IActionResult> Save([FromBody] Common.Ac_Mtr_Agreement_Document model)
        {
            try
            {
                var message = new Message();
                message.BusinessLogic = configuration.GetValue<string>("AppSettings:BusinessLogic:Gbl_Mtr_Evidence");
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
                    var resultModel = result.DeSerializeObject<Common.Ac_Mtr_Agreement_Document>();
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
                var boundary = MultipartRequestHelper.GetBoundary(
                    Microsoft.Net.Http.Headers.MediaTypeHeaderValue.Parse(Request.ContentType),
                    _defaultFormOptions.MultipartBoundaryLengthLimit);
                var reader = new MultipartReader(boundary, HttpContext.Request.Body);
                var section = await reader.ReadNextSectionAsync();
                var extension = String.Empty;

                while (section != null)
                {
                    Microsoft.Net.Http.Headers.ContentDispositionHeaderValue contentDisposition;
                    var hasContentDispositionHeader = Microsoft.Net.Http.Headers.ContentDispositionHeaderValue.TryParse(section.ContentDisposition, out contentDisposition);
                    if (hasContentDispositionHeader)
                    {
                        if (MultipartRequestHelper.HasFileContentDisposition(contentDisposition))
                        {
                            extension = GetDefaultExtension(section.ContentType);
                            if (string.IsNullOrEmpty(extension))
                            {
                                extension = contentDisposition.FileName.Value.Substring(contentDisposition.FileName.Value.IndexOf('.'), (contentDisposition.FileName.Value.Length - contentDisposition.FileName.Value.IndexOf('.')));
                            }

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

                            //var lista_trola = GetArchives(formAccumulator.GetResults());



                        }
                    }

                    // Drains any remaining section body that has not been consumed and
                    // reads the headers for the next section.
                    section = await reader.ReadNextSectionAsync();



                }
                // OJO 
                var document = new Common.Import_Product();

                document.list_Agreement_Document = GetArchives(formAccumulator.GetResults());

                document = await ProcessPathArchiveAsync(document, extension);

                var message = new Message();
                message.BusinessLogic = configuration.GetValue<string>("AppSettings:BusinessLogic:Gbl_Mtr_Evidence");
                message.Connection = configuration.GetValue<string>("ConnectionStrings:MEXPRESS_AC");
                message.Operation = Operation.Save;
                message.MessageInfo = document.SerializeObject();
                using (var businessLgic = new ServiceManager())
                {
                    var result = await businessLgic.DoWork(message);
                    if (result.Status == Status.Failed)
                    {
                        return BadRequest(result.Result);
                    }
                    var resultModel = result.DeSerializeObject<Common.Ac_Mtr_Agreement_Document>();

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

        private List<Common.Ac_Mtr_Agreement_Document> GetArchives(Dictionary<string, StringValues> fields)
        {
            var list = new List<Common.Ac_Mtr_Agreement_Document>();
            var contador = (fields["Archive_New_Name"].Count);

            for (var x = 0; x < contador; x++)
            {
                var obj = new Common.Ac_Mtr_Agreement_Document();

                foreach (var dictionary in fields)
                {
                    if (dictionary.Key == "Archive_New_Name")
                        obj.Archive_New_Name = dictionary.Value[x];

                    else if (dictionary.Key == "Pk_Cat_Document_Agreement")
                        obj.Pk_Cat_Document_Agreement = Convert.ToInt32(dictionary.Value[x]);

                    else if (dictionary.Key == "Pk_Ac_Trade_Agreement")
                        obj.Pk_Ac_Trade_Agreement = Convert.ToInt64(dictionary.Value[x]);

                    else if (dictionary.Key == "Creation_User")
                        obj.Creation_User = dictionary.Value[x];

                    else if (dictionary.Key == "Modification_User")
                        obj.Modification_User = dictionary.Value[x];

                    else if (dictionary.Key == "Archive_Original_Name")
                        obj.Archive_Original_Name = dictionary.Value[x];

                    else if (dictionary.Key == "File_Description")
                        obj.File_Description = dictionary.Value[x];

                    else if (dictionary.Key == "Name_Agreement")
                        obj.Name_Agreement = dictionary.Value[x];

                    else if (dictionary.Key == "Active")
                        obj.Active = Convert.ToBoolean(dictionary.Value[x]);
                }

                list.Add(obj);
            }

            return list;
        }

        private async Task<Import_Product> ProcessPathArchiveAsync(Common.Import_Product document, String correctExtension)
        {
            var newDocument = new Common.Import_Product();
            string targetFilePath = "";
            string actualDate = Convert.ToString(DateTime.Now);
            actualDate = actualDate.Replace("/", "-");
            if (actualDate.Contains(":"))
            {
                actualDate = actualDate.Replace(":", "-");
            }
            foreach (var item in document.list_Agreement_Document)
            {
                var targetFilePathBackUp = string.Format("{0}{1}", configuration.GetValue<string>("Files:RutaEvidencia"), item.Archive_Original_Name);

                if (System.IO.File.Exists(targetFilePathBackUp))
                {
                    string Path = string.Format("{0}{1}{2}\\", configuration.GetValue<string>("Files:RutaEvidencia"), "Archivo evidencia acuerdo-", item.Name_Agreement);

                    StringBuilder sb = new StringBuilder(item.Archive_New_Name);
                    if (item.Archive_New_Name != item.Archive_Original_Name)
                    {
                        this.correctName = "";
                        this.correctName = Convert.ToString(sb);
                        if (item.Archive_New_Name.Contains("/"))
                        {
                            this.correctName = Convert.ToString(sb.Replace("/", "_"));
                        }
                        if (item.Archive_New_Name.Contains("\\"))
                        {
                            this.correctName = Convert.ToString(sb.Replace("\\", "_"));
                        }
                        if (item.Archive_New_Name.Contains(":"))
                        {
                            this.correctName = Convert.ToString(sb.Replace(":", "_"));
                        }
                        if (item.Archive_New_Name.Contains("*"))
                        {
                            this.correctName = Convert.ToString(sb.Replace("*", "_"));
                        }
                        if (item.Archive_New_Name.Contains("?"))
                        {
                            this.correctName = Convert.ToString(sb.Replace("?", "_"));
                        }
                        if (item.Archive_New_Name.Contains("<"))
                        {
                            this.correctName = Convert.ToString(sb.Replace("<", "_"));
                        }
                        if (item.Archive_New_Name.Contains(">"))
                        {
                            this.correctName = Convert.ToString(sb.Replace(">", "_"));
                        }
                        if (item.Archive_New_Name.Contains("|"))
                        {
                            this.correctName = Convert.ToString(sb.Replace("|", "_"));
                        }
                        if (item.Archive_New_Name.Contains("%"))
                        {
                            this.correctName = Convert.ToString(sb.Replace("%", "_"));
                        }
                        if (item.Archive_New_Name.Contains("#"))
                        {
                            this.correctName = Convert.ToString(sb.Replace("#", "_"));
                        }

                        item.Archive_New_Name = actualDate + "_" + this.correctName + correctExtension;
                        targetFilePath = string.Format("{0}{1}{2}\\{3}", configuration.GetValue<string>("Files:RutaEvidencia"), "Archivo evidencia acuerdo-", item.Name_Agreement, item.Archive_New_Name);
                    }
                    else
                    {      
                        this.correctName = item.Archive_New_Name;            
                        if (item.Archive_New_Name.Contains("%"))
                        {
                            this.correctName = Convert.ToString(sb.Replace("%", "_"));
                        }
                        if (item.Archive_New_Name.Contains("#"))
                        {
                            this.correctName = Convert.ToString(sb.Replace("#", "_"));
                        }
                        
                        item.Archive_New_Name = actualDate + "_" + this.correctName;
                        targetFilePath = string.Format("{0}{1}{2}\\{3}", configuration.GetValue<string>("Files:RutaEvidencia"), "Archivo evidencia acuerdo-", item.Name_Agreement, item.Archive_New_Name);
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
                        item.Url_Attachment = targetFilePath;
                        item.Modification_User = item.Modification_User;
                        await DeleteSpecific(item);
                        if (!Directory.Exists(Path))
                        {
                            Directory.CreateDirectory(Path);
                        }

                        Directory.Move(targetFilePathBackUp, targetFilePath);
                        item.Url_Attachment = targetFilePath.Replace(configuration.GetValue<string>("Files:FilePathReplace"), configuration.GetValue<string>("Files:FilePathDownload"));
                    }
                }
            }

            newDocument = document;

            return newDocument;

        }


        /// <summary>
        /// Nombre: Eliminar Ac_Mtr_Agreement_Document
        /// Descripcion: Metodo utilizado para eliminar un objeto de tipo Ac_Mtr_Agreement_Document.
        /// Fecha de creacion: 24/07/2019
        /// Autor: Gustavo ZC
        /// </summary>
        /// <param name="message"></param>
        /// <returns></returns>
        [Route("Delete")]
        [HttpPost]
        public async Task<IActionResult> Delete([FromBody] Common.Ac_Mtr_Agreement_Document model)
        {
            try
            {
                var message = new Message();
                message.BusinessLogic = configuration.GetValue<string>("AppSettings:BusinessLogic:Gbl_Mtr_Evidence");
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
                    var resultModel = result.DeSerializeObject<IEnumerable<Common.Ac_Mtr_Agreement_Document>>();
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
        /// Nombre: Eliminar Ac_Mtr_Agreement_Document
        /// Descripcion: Metodo utilizado para eliminar un objeto de tipo Ac_Mtr_Agreement_Document.
        /// Fecha de creacion: 30/04/2019
        /// Autor: Gustavo ZC
        /// </summary>
        /// <param name="message"></param>
        /// <returns></returns>
        [Route("DeleteSpecific")]
        [HttpPost]
        public async Task<IActionResult> DeleteSpecific([FromBody] Common.Ac_Mtr_Agreement_Document model)
        {
            try
            {
                var message = new Message();
                message.BusinessLogic = configuration.GetValue<string>("AppSettings:BusinessLogic:Gbl_Mtr_Evidence");
                message.Operation = Operation.DeleteSpecific;
                message.Connection = configuration.GetValue<string>("ConnectionStrings:MEXPRESS_AC");
                message.MessageInfo = model.SerializeObject();
                using (var businessLgic = new ServiceManager())
                {
                    var result = await businessLgic.DoWork(message);
                    if (result.Status == Status.Failed)
                    {
                        return BadRequest(result.Result);
                    }
                    var resultModel = result.DeSerializeObject<IEnumerable<Common.Ac_Mtr_Agreement_Document>>();
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
