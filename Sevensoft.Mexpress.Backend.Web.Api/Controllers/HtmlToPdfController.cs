using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using System.IO;
using System;
using iText.Html2pdf;
using iText.Kernel.Pdf;

namespace Sevensoft.Mexpress.Backend.Web.Api.Controllers
{
    [Route("api/[controller]")]
    [Authorize(AuthenticationSchemes =
    JwtBearerDefaults.AuthenticationScheme)]
    public class HtmlToPdfController : Controller
    {
        private IConfiguration configuration;
        public HtmlToPdfController(IConfiguration iConfiguration)
        {
            configuration = iConfiguration;
        }
        #region Region [Methods]
        /// Nombre: CreatePdf
        /// Descripcion: Metodo utilizado para crear un archivo PDF a partir de un HTML
        /// Fecha de creacion: 28/08/2019
        /// Autor: Gustavo ZC
        [Route("CreatePdf")]
        [HttpPost]
        public void CreatePdf(String baseUri, String src, String dest)
        {
            ConverterProperties properties = new ConverterProperties();
            properties.SetBaseUri(baseUri);
            PdfWriter writer = new PdfWriter(dest,
            new WriterProperties().SetFullCompressionMode(true));
            HtmlConverter.ConvertToPdf(new FileStream(src, FileMode.Open), writer, properties);
        }

        #endregion Region [Methods]
    }

}
