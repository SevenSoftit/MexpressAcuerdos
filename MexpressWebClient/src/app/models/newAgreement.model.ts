
export class NewAgreementModel {

    Pk_Cat_Agreement_Details: number;
    Pk_Ac_Trade_Agreement: number;
    Pk_Glb_Products: number;
    Product_Id_Alias: string;
    Product_Name: string;
    Id_Currency: string;
    Recovery_Amount: number;
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
        this.Id_Currency = '';
        this.Recovery_Amount = 0;
        this.Creation_Date = new Date();
        this.Creation_User = '';
        this.Modification_Date = new Date();
        this.Modification_User = '';
        this.Active = false;
        this.Name_Currency = '';
    }
}
