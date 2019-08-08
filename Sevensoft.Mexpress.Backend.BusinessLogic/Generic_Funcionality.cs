using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Globalization;
using System.Linq;
using System.Threading;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Spreadsheet;
using Sevensoft.Mexpress.Backend.Common;
using Sevensoft.Mexpress.Backend.DataAccess;

namespace Sevensoft.Mexpress.Backend.BusinessLogic
{
    public class Generic_Funcionality
    {

        #region Region [Variables]
        private string ConnectionString { get; set; }
        #endregion

        #region Region [Constructor]
        public Generic_Funcionality(string connectionString)
        {
            ConnectionString = connectionString;
        }
        #endregion

        #region Region [Methods]

        public int readAsExcelFile(Import_Product model)
        {
            try
            {
                DataTable dataTable = new DataTable();
                CultureInfo newCulture = CultureInfo.CreateSpecificCulture("en-US");
                Thread.CurrentThread.CurrentUICulture = newCulture;
                // Make current UI culture consistent with current culture.
                Thread.CurrentThread.CurrentCulture = newCulture;

                // var model_Line_Work = Enumerable.Empty<Common.Excel_File_Quotation>();
                // var model_Material = Enumerable.Empty<Common.Excel_File_Material>();

                using (SpreadsheetDocument spreadSheetDocument = SpreadsheetDocument.Open(model.File_Path, false))
                {
                    WorkbookPart workbookPart = spreadSheetDocument.WorkbookPart;

                    IEnumerable<Sheet> sheets = spreadSheetDocument.WorkbookPart.Workbook.GetFirstChild<Sheets>().Elements<Sheet>();
                    foreach (var item in sheets)
                    {
                        if (item.Name.ToString() != "CODE")
                        {
                            //DataTable dataTable = new DataTable();
                            string relationshipId = item.Id.Value;
                            WorksheetPart worksheetPart = (WorksheetPart)spreadSheetDocument.WorkbookPart.GetPartById(relationshipId);

                            Worksheet workSheet = worksheetPart.Worksheet;
                            SheetData sheetData = workSheet.GetFirstChild<SheetData>();
                            IEnumerable<Row> rows = sheetData.Descendants<Row>();

                            foreach (Cell cell in rows.ElementAt(0))
                            {
                                dataTable.Columns.Add(GetCellValue(spreadSheetDocument, cell));
                            }

                            foreach (var header in dataTable.Columns)
                            {
                                if (header.ToString() == "Código")
                                {
                                    dataTable.Columns[header.ToString()].ColumnName = "PRODUCT_ID_ALIAS";
                                }
                                else if (header.ToString() == "Nombre")
                                {
                                    dataTable.Columns[header.ToString()].ColumnName = "PRODUCT_NAME";
                                }
                                else if (header.ToString() == "Moneda")
                                {
                                    dataTable.Columns[header.ToString()].ColumnName = "ID_CURRENCY";
                                }
                                else if (header.ToString() == "Monto")
                                {
                                    dataTable.Columns[header.ToString()].ColumnName = "PRODUCT_AMOUNT";
                                }
                                dataTable.AcceptChanges();
                            }
                            dataTable.Columns.Add("CREATION_USER");
                            dataTable.Columns.Add("PK_AC_TRADE_AGREEMENT");

                            var x = 0;
                            foreach (Row row in rows)
                            {
                                if (x != 0)
                                {
                                    if (row.Descendants<Cell>().Count() > 2)
                                    {
                                        DataRow dataRow = dataTable.NewRow();
                                        for (int i = 0; i < row.Descendants<Cell>().Count(); i++)
                                        {
                                            dataRow[i] = GetCellValue(spreadSheetDocument, row.Descendants<Cell>().ElementAt(i));
                                        }
                                        dataRow["CREATION_USER"] = model.Creation_User;
                                        dataRow["PK_AC_TRADE_AGREEMENT"] = model.Pk_Ac_Trade_Agreement;
                                        dataTable.Rows.Add(dataRow);
                                    }
                                }
                                x++;
                            }

                            // buscamos la tabla de parametros
                            var repositoryParameter = new GblParameterRepository(ConnectionString);
                            var parameter = new Sevensoft.Mexpress.Backend.Common.GblParameter();
                            parameter.SEARCH_KEY = "TABLE_IMPORT_PRODUCT";

                            var result = repositoryParameter.Get(parameter).Result;
                            if (dataTable.Rows.Count == 0)
                            {
                                throw new NullReferenceException();
                            }
                            else
                            {
                                SqlBulkCopy bulkcopy = new SqlBulkCopy(ConnectionString);
                                bulkcopy.DestinationTableName = result.VALUE;
                                bulkcopy.WriteToServer(dataTable);
                            }
                        }
                    }
                }
                return dataTable.Rows.Count;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        private string GetCellValue(SpreadsheetDocument document, Cell cell)
        {
            SharedStringTablePart stringTablePart = document.WorkbookPart.SharedStringTablePart;
            string value = "";

            if (cell.CellValue != null)
                value = cell.CellValue.InnerXml;

            if (cell.DataType != null && cell.DataType.Value == CellValues.SharedString)
            {
                return stringTablePart.SharedStringTable.ChildElements[Int32.Parse(value)].InnerText;
            }
            else
            {
                return value;
            }

        }
    }
    #endregion
}

