
export class AgreementProductInfoModel {

    Pk_Cat_Agreement_Details_Resume: number;
    Pk_Ac_Trade_Agreement: number;
    Pk_Glb_Products: number;
    Creation_Date: Date;
    Creation_User: string;
    Modification_Date: Date;
    Modification_User: string;
    Product_Id: string;
    Product_Name: string;
    Product_Amount: number;
    Product_Quantity_Sold: number;
    Product_Amount_Recovery: number;

    
    Id_Currency: string;
    Active: Boolean;
    Name_Currency: string;
    Behavior: string;

    constructor() {
        this.Pk_Cat_Agreement_Details_Resume = 0;
        this.Pk_Ac_Trade_Agreement = 0;
        this.Pk_Glb_Products = 0;
        this.Creation_Date = new Date();
        this.Creation_User = '';
        this.Modification_Date = new Date();
        this.Modification_User = '';
        this.Product_Id = '';
        this.Product_Name = '';
        this.Product_Amount = 0;
        this.Product_Quantity_Sold = 0;
        this.Product_Amount_Recovery = 0;
        
        this.Id_Currency = '';  
        this.Active = false;
        this.Name_Currency = '';
        this.Behavior = '';
    }
}
