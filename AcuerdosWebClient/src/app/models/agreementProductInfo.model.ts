import { NewAgreementDetailHeaderModel } from './newAgreementDetailHeader.model';

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
    String_Product_Amount: string;
    Product_Quantity_Sold: number;
    Product_Amount_Recovery: number;
    String_Product_Amount_Recovery: string;
    Calculate_Recovery_Amount: number;
    String_Calculate_Recovery_Amount: string;
    Id_Currency: string;
    Active: Boolean;
    Name_Currency: string;
    Behavior: string;
    Agreement_Product_Info_List : Array<NewAgreementDetailHeaderModel>;
    Inventory_Quantity: number;
    String_Inventory_Quantity: string;
    Inventory_Date: Date;
    Average_Cost: number;
    String_Average_Cost: string;

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
        this.String_Product_Amount = '0';
        this.Product_Quantity_Sold = 0;
        this.Product_Amount_Recovery = 0;
        this.String_Product_Amount_Recovery = '0';
        this.Calculate_Recovery_Amount = 0;
        this.String_Calculate_Recovery_Amount = '0';
        this.Id_Currency = '';  
        this.Active = false;
        this.Name_Currency = '';
        this.Behavior = '';
        this.Agreement_Product_Info_List = [];
        this.Inventory_Quantity = 0;
        this.Inventory_Date = new Date();
        this.Average_Cost = 0;
        this.String_Inventory_Quantity = '0';
        this.String_Average_Cost = '0';
    }
}
