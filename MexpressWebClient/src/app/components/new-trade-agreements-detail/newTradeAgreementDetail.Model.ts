
export class NewTradeAgreementDetailModel {
    Pk_Cat_Agreement_Details: number;
    Pk_Ac_Trade_Agreement: number;
    Pk_Cat_Currency: number;
    Pk_Glb_Products: number;
    Pk_Gbl_Wrk_Agreement: number;
    Creation_Date: Date;
    Creation_User: string;
    Modification_Date: Date;
    Modification_User: string;
    Product_Id_Alias: string;
    Product_Name: string;
    Product_Amount: number;
    Id_Currency: string;
    Active: boolean;
    All_Products: boolean;
    Name_Currency: string;


    constructor() {
        this.Pk_Cat_Agreement_Details = 0,
        this.Pk_Ac_Trade_Agreement = 0,
        this.Pk_Cat_Currency = 0,
        this.Pk_Glb_Products = 0,
        this.Creation_Date = new Date(),
        this.Creation_User = '',
        this.Modification_Date = new Date(),
        this.Modification_User = '',
        this.Product_Id_Alias = '',
        this.Product_Name = '',
        this.Product_Amount = 0.0,
        this.Id_Currency = '',
        this.Active = false,
        this.All_Products = false,      
        this.Name_Currency = ''
    }

}
