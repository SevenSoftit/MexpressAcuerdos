export class AgreementProductInfoDetailModel {
    Pk_Ac_Trade_Agreement: number;
    Pk_Cat_Agreement_Details_Result: number; 
    Pk_Cat_Agreement_Details_Resume: number; 
    Emp_Id: number;
    Name_Company: string;
    Type_Doc_Id: number;
    Name_Document: string;
    Suc_Id: number;
    Name_Store: string;
    Case_Id: number;
    Bill_Id: number;
    Product_Quantity: number;
    Product_Id: string;
    Product_Name: string;
    Product_Serie: string;
    Product_Cost: number;
    Product_Price: number;
    Date_Invoice: Date;
    Detail_Days_Warranty: number;
    Return_Invoice: boolean;
    Return_Invoice_Date: Date;
    Id_Vendor: string;
    Name_Vendor: string;
    Client_Id: number;
    Client_Identification: string;
    Client_Name: string;
    Date_Process: Date;

   
    Id_Currency: string;
    Active: Boolean;
    Name_Currency: string;
    Behavior: string;
    AgreementProductInfoDetailList : Array<AgreementProductInfoDetailModel>;
    Name_Agreement: string;

    constructor() {
        this.Pk_Ac_Trade_Agreement = 0;
        this.Pk_Cat_Agreement_Details_Result = 0;
        this.Pk_Cat_Agreement_Details_Resume = 0;  
        this.Emp_Id = 0;
        this.Name_Company = '';
        this.Type_Doc_Id = 0;
        this.Name_Document = '';
        this.Suc_Id = 0;
        this.Name_Store = '';
        this.Case_Id = 0;
        this.Bill_Id = 0;
        this.Product_Quantity = 0;
        this.Product_Id = '';
        this.Product_Name = '';
        this.Product_Serie = '';
        this.Product_Cost = 0;
        this.Product_Price = 0;
        this.Date_Invoice = new Date();
        this.Detail_Days_Warranty = 0;
        this.Return_Invoice = false;
        this.Return_Invoice_Date = new Date();
        this.Id_Vendor = '';
        this.Name_Vendor = '';
        this.Client_Id = 0;
        this.Client_Identification = '';
        this.Client_Name = '';
        this.Date_Process = new Date();
     
        this.Id_Currency = '';  
        this.Active = false;
        this.Name_Currency = '';
        this.Behavior = '';
        this.AgreementProductInfoDetailList = [];
        this.Name_Agreement = '';
    }
}
