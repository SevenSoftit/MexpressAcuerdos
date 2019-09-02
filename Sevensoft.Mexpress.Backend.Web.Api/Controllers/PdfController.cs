using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.IO;
using System;
using iTextSharp.text;
using iTextSharp.text.pdf;

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
                output = string.Format("{0}{1}", configuration.GetValue<string>("Files:RutaDestinoReporteAcuerdos"), "Informe_General_Acuerdo"+"_"+list.Name_Agreement+".pdf");
                FileStream fs = new FileStream(output, FileMode.Create);
                Document document = new Document(iTextSharp.text.PageSize.A2, 30f, 20f, 50f, 40f);               
                PdfWriter pw = PdfWriter.GetInstance(document, fs);
                document.Open();
                pw.PageEvent = new HeaderFooter();
                

                BaseFont bf = BaseFont.CreateFont(BaseFont.HELVETICA, BaseFont.CP1250, BaseFont.EMBEDDED);
                Font fontTextE = new Font(bf, 14, 1, BaseColor.BLACK);
                Font fontTextT = new Font(bf, 12, 0, BaseColor.BLACK);
                PdfPTable table = new PdfPTable(11);
                table.WidthPercentage = 100f;

                // Insertar la imagen:
                string imageURL = @"\assets\MexpressLogo.png";
                iTextSharp.text.Image png = iTextSharp.text.Image.GetInstance(imageURL);
                // Reescalar imagen:
                png.ScaleToFit(140f,120f);
                // Agregar espacio antes de la imagen:
                png.SpacingBefore = 10f;
                // Agregar espacio despues de la imagen:
                png.SpacingAfter = 1f;
                //Alineacion de la imagen:
                png.Alignment = Element.ALIGN_RIGHT;


                //Creacion de la tabla
                string[] oddArray = new string[] { "Código", "Nombre artículo", "Tienda de venta", "Nombre vendedor", "Cliente", "Tipo de factura", "Nº Factura", "Serie", "Cantidad", "Costo", "Fecha de venta" };
                foreach (string val in oddArray)
                {
                    PdfPCell cell = new PdfPCell();
                    cell = new PdfPCell(new Paragraph(val, fontTextE));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    table.AddCell(cell);
                }
                foreach (var item in list.AgreementProductInfoDetailList)

                {
                    PdfPCell cell = new PdfPCell();

                    cell = new PdfPCell(new Paragraph(item.Product_Id, fontTextT));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    table.AddCell(cell);

                    cell = new PdfPCell(new Paragraph(item.Product_Name, fontTextT));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    table.AddCell(cell);

                    cell = new PdfPCell(new Paragraph(item.Name_Store, fontTextT));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    table.AddCell(cell);

                    cell = new PdfPCell(new Paragraph(item.Name_Vendor, fontTextT));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    table.AddCell(cell);

                    cell = new PdfPCell(new Paragraph(item.Client_Name, fontTextT));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    table.AddCell(cell);

                    cell = new PdfPCell(new Paragraph(item.Name_Document, fontTextT));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    table.AddCell(cell);

                    cell = new PdfPCell(new Paragraph(item.Bill_Id.ToString(), fontTextT));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    table.AddCell(cell);

                    cell = new PdfPCell(new Paragraph(item.Product_Serie, fontTextT));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    table.AddCell(cell);

                    cell = new PdfPCell(new Paragraph(item.Product_Quantity.ToString(), fontTextT));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    table.AddCell(cell);


                    cell = new PdfPCell(new Paragraph(item.Product_Cost.ToString(), fontTextT));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    table.AddCell(cell);

                    cell = new PdfPCell(new Paragraph(item.Date_Invoice.ToString(), fontTextT));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    table.AddCell(cell);

                    //table.AddCell(new Paragraph(item.Product_Id));
                    // table.AddCell(new Paragraph(item2.Product_Name));
                    // table.AddCell(new Paragraph(item2.Name_Store));
                    // table.AddCell(new Paragraph(item2.Name_Vendor));
                    // table.AddCell(new Paragraph(item2.Client_Name));
                    // table.AddCell(new Paragraph(item2.Name_Document));
                    // table.AddCell(new Paragraph(item2.Bill_Id.ToString()));
                    // table.AddCell(new Paragraph(item2.Product_Serie));
                    // table.AddCell(new Paragraph(item2.Product_Quantity.ToString()));
                    // table.AddCell(new Paragraph(item2.Product_Cost.ToString()));
                    // table.AddCell(new Paragraph(item2.Date_Invoice.ToString()));
                }

                document.Add(table);
                

                var Url_Attachment = output.Replace(configuration.GetValue<string>("Files:FilePathReplace"), configuration.GetValue<string>("Files:FilePathDownload"));
                document.Close();
                return Ok(Url_Attachment);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }

            // Aca puede ir
        }
        #endregion Region [Methods]
    }

    class HeaderFooter : PdfPageEventHelper
    {
        public override void OnEndPage(PdfWriter writer, Document document)
        {
            // Inicio configuracion Header
            PdfPTable tbHeader = new PdfPTable(3);
            tbHeader.TotalWidth = document.PageSize.Width - document.LeftMargin - document.RightMargin;
            tbHeader.DefaultCell.Border = 0;
            tbHeader.AddCell(new Paragraph());

            PdfPCell _cell = new PdfPCell(new Paragraph("Lista de productos"));
            _cell.HorizontalAlignment = Element.ALIGN_CENTER;
            _cell.Border = 0;
            tbHeader.AddCell(_cell);

            tbHeader.AddCell(new Paragraph());
            tbHeader.WriteSelectedRows(0, -1, document.LeftMargin, writer.PageSize.GetTop(document.TopMargin) + 40, writer.DirectContent);
            // Fin configuracion Header

            // Inicio configuracion Footer
            PdfPTable tbFooter = new PdfPTable(3);
            tbFooter.TotalWidth = document.PageSize.Width - document.LeftMargin - document.RightMargin;
            tbFooter.DefaultCell.Border = 0;
            tbFooter.AddCell(new Paragraph());

            _cell = new PdfPCell(new Paragraph("Acuerdos Mexpress"));
            _cell.HorizontalAlignment = Element.ALIGN_CENTER;
            _cell.Border = 0;         
            tbFooter.AddCell(_cell);

            _cell = new PdfPCell(new Paragraph("Página " + writer.PageNumber));
            _cell.HorizontalAlignment = Element.ALIGN_RIGHT;
            _cell.Border = 0;
            tbFooter.AddCell(_cell);

            tbFooter.WriteSelectedRows(0, -1, document.LeftMargin, writer.PageSize.GetBottom(document.BottomMargin) - 5, writer.DirectContent);
        }
    }

}
