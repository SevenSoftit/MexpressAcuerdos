using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.IO;
using System;
using iText.Html2pdf;
using iText.Kernel.Pdf;
using iText.Layout.Font;
using iText.Html2pdf.Resolver.Font;
using iText.StyledXmlParser.Css.Media;

namespace Sevensoft.Mexpress.Backend.Web.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    // [Authorize(AuthenticationSchemes =
    // JwtBearerDefaults.AuthenticationScheme)]
    public class PdfController : ControllerBase
    {
        private IConfiguration configuration;
        public PdfController(IConfiguration iConfiguration)
        {
            configuration = iConfiguration;
        }
        #region Region [Methods]
        /// Nombre: CreatePdf
        /// Descripcion: Metodo utilizado para crear un archivo PDF a partir de un HTML
        /// Fecha de creacion: 28/08/2019
        /// Autor: Gustavo ZC
        // [Route("CreatePdf")]
        [HttpGet]
        public IActionResult  CreatePdf()
        { 
            ConverterProperties props = new ConverterProperties();

            //baseUri
            props.SetBaseUri("C:/inetpub/wwwroot/Archivos/Acuerdos/Reportes/Recursos/");

            //fonts
            FontProvider dfp = new DefaultFontProvider();
            // dfp.AddFont("");
            props.SetFontProvider(dfp);
            
            //media device
            props.SetMediaDeviceDescription(new MediaDeviceDescription(MediaType.PRINT));
            
            //execute logic
            String input = "C:/inetpub/wwwroot/Archivos/Acuerdos/Reportes/Recursos/home.html";
            String output = "C:/inetpub/wwwroot/Archivos/Acuerdos/Reportes/Recursos/home.pdf";
            PdfWriter writer = new PdfWriter(output, new WriterProperties().SetFullCompressionMode(true));
            HtmlConverter.ConvertToPdf(new FileStream(input, FileMode.Open), writer, props);
            return Ok("Documento de PDF creado!!.");
        }

        #endregion Region [Methods]
    }

}
