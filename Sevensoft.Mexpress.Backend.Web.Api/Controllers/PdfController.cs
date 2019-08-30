using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.IO;
using System;
using iText.Html2pdf;
using iText.Kernel.Pdf;
using iText.Layout.Font;
using iText.Html2pdf.Resolver.Font;
using iText.StyledXmlParser.Css.Media;
using System.Text;
using iText.Layout;
using iText.Kernel.Geom;
using iText.Layout.Element;

namespace Sevensoft.Mexpress.Backend.Web.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
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
        [Route("CreatePdf")]
        [HttpPost]
        public IActionResult CreatePdf([FromBody] Common.Ac_Mtr_Agreement_Product_Info_Detail list)
        {
            try
            {
                string output = string.Empty;                
                output = string.Format("{0}", configuration.GetValue<string>("Files:RutaDestinoReporteAcuerdos"));
                FileStream fs = new FileStream(output, FileMode.Create);
                //MemoryStream ms = new MemoryStream();
                
                PdfDocument pdf = new PdfDocument(new PdfWriter(fs));   
                //PdfDocument pdf = new PdfDocument(new PdfWriter(ms));    
                Document document = new Document(pdf, PageSize.LETTER);
  
                document.SetMargins(0f, 0f, 0f, 0f);
                
                // document.Add(new Paragraph("Hola PDF \n Trabajando con archivos PDF"));
                Table table = new Table(7);
                

                document.Close();

                // byte[] bytesStream = ms.ToArray();
                // ms = new MemoryStream();
                // ms.Write(bytesStream,0,bytesStream.Length);
                // ms.Position = 0; 

                // return new FileStreamResult(ms, "application/pdf");
                return Ok("Documento creado");            
                }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }

        }


        #endregion Region [Methods]
    }

}
