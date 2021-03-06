import { AgreementDocumentModel } from './agreementDocument.model';
import { DecimalPipe } from '@angular/common';

export class NewAgreementDetailHeaderModel {

    Pk_Gbl_Wrk_Agreement: number;
    Product_Id_Alias: string;
    Product_Name: string;
    Id_Currency: string;
    Product_Amount: number;
    Recovery_Amount: number;
    Pk_Ac_Trade_Agreement: number;
    Pk_Cat_Type_Agreement: number;
    Pk_Ac_Cat_Provider: number;
    Creation_Date: Date;
    Creation_User: string;
    Modification_Date: Date;
    Modification_User: string;
    Name_Agreement: string;
    Description_Agreement: string;
    Date_Start: Date;               
    Date_Finish: Date;
    Date_Process: Date;
    Date_Reprocess: Date;
    All_Products: Boolean;
    Provider_Name: string;
    Fk_Status_Agreement: number;
    Agreement_Status_Name: string;
    Active: Boolean;
    Total_Recovery: number;
    String_Total_Recovery: string;
    String_Total_Recovery_Dollars: string;

    Error: Boolean;
    Message_Error: string;
    It_Processed: Boolean;
    Invalid_Amount: Boolean;
    Not_Exist_Product: Boolean;
    Duplicate_Product_Alias: Boolean;
    Not_Exist_Id_Currency: Boolean;
    File_Path: string;
    Total_Records: number;
    Fk_Glb_Mtr_Organization: number;
    Update_Rows: Boolean;
    Name_Currency: String;
    Pk_Cat_Agreement_Details: Number;
    list_Agreement_Document: Array<AgreementDocumentModel>;
    Behavior: string;
    Max_Amount: number;
    Email: String;
    Status_Option: Boolean;
    Expired_Indicator: Boolean;
    Type_Agreement_Name: String;
    String_Recovery_Amount: String;
    Conciliation_User: string
    Conciliation_Date: Date;
    Accounting_Account: string;
    Pk_Ac_Trade_Agreement_Copy: number;
    Inventory_Date: Date;



    constructor() {

            this.Pk_Gbl_Wrk_Agreement = 0;
            this.Product_Id_Alias = '';
            this.Product_Name = '';
            this.Id_Currency = '';
            this.Product_Amount = 0;
            this.Recovery_Amount = 0;
            
            this.Pk_Ac_Trade_Agreement = 0;
            this.Pk_Cat_Type_Agreement = 0;
            this.Pk_Ac_Cat_Provider = 0;
            this.Creation_Date = new Date();
            this.Creation_User = '';
            this.Modification_Date = new Date();
            this.Modification_User = '';
            this.Name_Agreement = '';
            this.Description_Agreement = '';
            this.Date_Start = new Date();
            this.Date_Finish = new Date();
            this.Date_Process = new Date();
            this.Date_Reprocess = new Date();
            this.All_Products = false;
            this.Provider_Name = '';
            this.Fk_Status_Agreement = 0;
            this.Agreement_Status_Name = '';
            this.Active = true;
            this.Total_Recovery = 0;
            this.String_Total_Recovery = '0';
            this.String_Total_Recovery_Dollars = '0';

            this.Error = false;
            this.Message_Error = '';
            this.It_Processed = true;
            this.Invalid_Amount = false;
            this.Not_Exist_Product = false;
            this.Duplicate_Product_Alias = false;
            this.Not_Exist_Id_Currency = false;
            this.File_Path = '';
            this.Total_Records = 0;
            this.Fk_Glb_Mtr_Organization = 0;
            this.Update_Rows = false;
            this.Name_Currency = '';
            this.Pk_Cat_Agreement_Details = 0;
            this.list_Agreement_Document = [];
            this.Behavior = '';
            this.Max_Amount = 0;
            this.Email = '';
            this.Status_Option = false;
            this.Expired_Indicator = false;
            this.Email = '';
            this.Type_Agreement_Name = '';
            this.String_Recovery_Amount = '';
            this.Conciliation_User = '';
            this.Conciliation_Date = new Date();
            this.Accounting_Account = '';
            this.Pk_Ac_Trade_Agreement_Copy = 0;
            this.Inventory_Date = new Date();
    }
}
