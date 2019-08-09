
export class AgreementProductInfoModel {

    Pk_Cat_Agreement_Details: number;
    Pk_Ac_Trade_Agreement: number;
    Pk_Glb_Products: number;
    Product_Id_Alias: string;
    Product_Name: string;
    Agreement_Amount: number;
    Number_Of_Items_Sold: number;
    Recovery_Amount: number;
    Id_Currency: string;

    Creation_Date: Date;
    Creation_User: string;
    Modification_Date: Date;
    Modification_User: string;
    Active: Boolean;
    Name_Currency: string;

    constructor() {
        this.Pk_Cat_Agreement_Details = 0;
        this.Pk_Ac_Trade_Agreement = 0;
        this.Pk_Glb_Products = 0;
        this.Product_Id_Alias = '';
        this.Product_Name = '';
        this.Agreement_Amount = 0;
        this.Number_Of_Items_Sold = 0;
        this.Recovery_Amount = 0;
        this.Id_Currency = '';
        
        this.Creation_Date = new Date();
        this.Creation_User = '';
        this.Modification_Date = new Date();
        this.Modification_User = '';
        this.Active = false;
        this.Name_Currency = '';
    }
}
