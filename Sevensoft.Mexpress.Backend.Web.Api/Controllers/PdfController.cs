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
                String output = "";
                output = string.Format("{0}{1}", configuration.GetValue<string>("Files:RutaDestinoReporteAcuerdos"), "Informe_General_Acuerdo" + "_" + list.Name_Agree + ".pdf");
                FileStream fs = new FileStream(output, FileMode.Create);
                Document document = new Document(iTextSharp.text.PageSize.A2, 20f, 20f, 0f, 40f); //30f, 20f, 0f, 40f             
                PdfWriter pw = PdfWriter.GetInstance(document, fs);
                pw.PageEvent = new HeaderFooter();

                BaseFont bf = BaseFont.CreateFont(BaseFont.HELVETICA, BaseFont.CP1250, BaseFont.EMBEDDED);
                Font fontVariedInformation = new Font(bf, 16, 0, BaseColor.BLACK);
                Font fontTextTittle = new Font(bf, 24, 1, new BaseColor(0, 173, 239));
                Font fontTextColumnHeader = new Font(bf, 14, 1, BaseColor.WHITE);
                Font fontTextTable = new Font(bf, 12, 0, BaseColor.BLACK);

                
                //Tabla para insertar espacios en blanco
                PdfPTable pdfTableBlack = new PdfPTable(1);
                pdfTableBlack.DefaultCell.Border = 0;
                pdfTableBlack.WidthPercentage = 100f;
                pdfTableBlack.AddCell(new Phrase(" "));

                // Insertar imagen en el documento:
                string imageURL = @"C:\inetpub\wwwroot\Archivos\Acuerdos\Reportes\Recursos\Header_Mexpress.png";
                iTextSharp.text.Image jpg = iTextSharp.text.Image.GetInstance(imageURL);
                // Reescalar imagen:
                jpg.ScaleToFit(1587f, 270f);  //140f, 120f
                // Agregar espacio antes de la imagen:
                jpg.SpacingBefore = 0f;//10f;
                // Agregar espacio despues de la imagen:
                jpg.SpacingAfter = 2f;
                //Alineacion de la imagen:
                jpg.Alignment = Element.ALIGN_CENTER;
                document.Open();
                document.Add(jpg);

                //Tabla para insertar informacion varia del reporte:
                PdfPTable pdfTableVariedInformation = new PdfPTable(1);
                pdfTableVariedInformation.DefaultCell.Border = 0;
                pdfTableVariedInformation.WidthPercentage = 100f;
                pdfTableVariedInformation.DefaultCell.HorizontalAlignment = Element.ALIGN_LEFT;

                PdfPCell cellInfo1 = new PdfPCell(new Paragraph("Nombre del acuerdo: " + list.Name_Agree, fontVariedInformation));
                cellInfo1.Border = 0;
                cellInfo1.ExtraParagraphSpace = 10;
                pdfTableVariedInformation.AddCell(cellInfo1);

                PdfPCell cellInfo2 = new PdfPCell(new Paragraph("Tipo de acuerdo: " + list.Agreement_Type_Name, fontVariedInformation));
                cellInfo2.Border = 0;
                cellInfo2.ExtraParagraphSpace = 10;
                pdfTableVariedInformation.AddCell(cellInfo2);

                PdfPCell cellInfo3 = new PdfPCell(new Paragraph("Proveedor: " + list.Provider_Name, fontVariedInformation));
                cellInfo3.Border = 0;
                cellInfo3.ExtraParagraphSpace = 10;
                pdfTableVariedInformation.AddCell(cellInfo3);

                PdfPCell cellInfo4 = new PdfPCell(new Paragraph("Fecha inicial del acuerdo: " + list.Date_Start, fontVariedInformation));
                cellInfo4.Border = 0;
                cellInfo4.ExtraParagraphSpace = 10;
                pdfTableVariedInformation.AddCell(cellInfo4);

                PdfPCell cellInfo5 = new PdfPCell(new Paragraph("Fecha de finalización del acuerdo: " + list.Date_Finish, fontVariedInformation));
                cellInfo5.Border = 0;
                cellInfo5.ExtraParagraphSpace = 10;
                pdfTableVariedInformation.AddCell(cellInfo5);

                document.Add(pdfTableVariedInformation);
                document.Add(pdfTableBlack);

                //Tabla para insertar titulo del reporte:
                PdfPTable pdfTableTittle = new PdfPTable(1);
                pdfTableTittle.DefaultCell.Border = 0;
                pdfTableTittle.WidthPercentage = 100f;
                pdfTableTittle.DefaultCell.HorizontalAlignment = Element.ALIGN_CENTER;
                Chunk cnkTittle = new Chunk("Lista de productos del acuerdo", fontTextTittle);
                cnkTittle.Font.Size = 16;
                pdfTableTittle.AddCell(new Phrase(cnkTittle));

                document.Add(pdfTableTittle);
                document.Add(pdfTableBlack);


                //Tabla para mostrar la informacion de los productos del acuerdo
                PdfPTable table = new PdfPTable(11);
                table.WidthPercentage = 100f;

                //Creacion de la tabla
                string[] oddArray = new string[] { "Código", "Nombre artículo", "Tienda de venta", "Nombre vendedor", "Cliente", "Tipo de factura", "Nº Factura", "Serie", "Cantidad", "Costo", "Fecha de venta" };
                foreach (string val in oddArray)
                {
                    PdfPCell cell = new PdfPCell();
                    cell = new PdfPCell(new Paragraph(val, fontTextColumnHeader));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.BackgroundColor = new BaseColor(31, 136, 176);
                    table.AddCell(cell);
                }
                foreach (var item in list.AgreementProductInfoDetailList)

                {
                    PdfPCell cell = new PdfPCell();
                    cell = new PdfPCell(new Paragraph(item.Product_Id, fontTextTable));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    table.AddCell(cell);

                    cell = new PdfPCell(new Paragraph(item.Product_Name, fontTextTable));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    table.AddCell(cell);

                    cell = new PdfPCell(new Paragraph(item.Name_Store, fontTextTable));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    table.AddCell(cell);

                    cell = new PdfPCell(new Paragraph(item.Name_Vendor, fontTextTable));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    table.AddCell(cell);

                    cell = new PdfPCell(new Paragraph(item.Client_Name, fontTextTable));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    table.AddCell(cell);

                    cell = new PdfPCell(new Paragraph(item.Name_Document, fontTextTable));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    table.AddCell(cell);

                    cell = new PdfPCell(new Paragraph(item.Bill_Id.ToString(), fontTextTable));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    table.AddCell(cell);

                    cell = new PdfPCell(new Paragraph(item.Product_Serie, fontTextTable));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    table.AddCell(cell);

                    cell = new PdfPCell(new Paragraph(item.Product_Quantity.ToString(), fontTextTable));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    table.AddCell(cell);


                    cell = new PdfPCell(new Paragraph(item.Product_Cost.ToString(), fontTextTable));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    table.AddCell(cell);

                    cell = new PdfPCell(new Paragraph(item.Date_Invoice.ToString(), fontTextTable));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    table.AddCell(cell);
                }

                document.Add(table);
                document.Close();

                var Url_Attachment = output.Replace(configuration.GetValue<string>("Files:FilePathReplace"), configuration.GetValue<string>("Files:FilePathDownload"));
                fs.Close();
                return Ok(Url_Attachment);
            }
            catch (Exception ex)
            {   
                var exception = ex;
                var error = "Debe cerrar el pdf anterior antes de poder generar el siguiente";
                return BadRequest(error);
            }
        }
        #endregion Region [Methods]
    }

    class HeaderFooter : PdfPageEventHelper
    {
        public override void OnEndPage(PdfWriter writer, Document document)
        {
            BaseFont bf = BaseFont.CreateFont(BaseFont.HELVETICA, BaseFont.CP1250, BaseFont.EMBEDDED);
            Font fontTextFooter = new Font(bf, 14, 1, BaseColor.BLACK);

            // // Inicio configuracion Header
            // PdfPTable tbHeader = new PdfPTable(3);
            // tbHeader.TotalWidth = document.PageSize.Width - document.LeftMargin - document.RightMargin;
            // tbHeader.DefaultCell.Border = 0;
            // tbHeader.AddCell(new Paragraph());

            // PdfPCell _cell = new PdfPCell(new Paragraph("Lista de productos"));
            // _cell.HorizontalAlignment = Element.ALIGN_CENTER;
            // _cell.Border = 0;
            // tbHeader.AddCell(_cell);

            // tbHeader.AddCell(new Paragraph());
            // tbHeader.WriteSelectedRows(0, -1, document.LeftMargin, writer.PageSize.GetTop(document.TopMargin) + 40, writer.DirectContent);
            // // Fin configuracion Header

            // Inicio configuracion Footer
            PdfPTable tbFooter = new PdfPTable(3);
            tbFooter.TotalWidth = document.PageSize.Width - document.LeftMargin - document.RightMargin;
            tbFooter.DefaultCell.Border = 0;
            tbFooter.AddCell(new Paragraph());

            PdfPCell _cell = new PdfPCell(new Paragraph("Acuerdos Mexpress", fontTextFooter));
            _cell.HorizontalAlignment = Element.ALIGN_CENTER;
            _cell.Border = 0;
            tbFooter.AddCell(_cell);

            _cell = new PdfPCell(new Paragraph("Página " + writer.PageNumber, fontTextFooter));
            _cell.HorizontalAlignment = Element.ALIGN_RIGHT;
            _cell.Border = 0;
            tbFooter.AddCell(_cell);

            tbFooter.WriteSelectedRows(0, -1, document.LeftMargin, writer.PageSize.GetBottom(document.BottomMargin) - 5, writer.DirectContent);
        }
    }

}
