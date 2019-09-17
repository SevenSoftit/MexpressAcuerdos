/*******************************************************
  * Author: Gustavo ZC
  * Creation date: 16/07/2019
  * Description:
  * Properties:
  * Username:
  * Password:
 * *****************************************************
  * Modifications
  * Number:
  * Date:
  * Ticket:
  * Author:
  * Description:
*******************************************************/
export class ProviderModel {
  Pk_Ac_Cat_Provider: number;
  Creation_Date: Date;
  Creation_User: string;
  Modification_Date: Date;
  Modification_User: string;
  Name_Provider: string;
  Identification_Provider: string;
  Email_Provider: string;
  Business_Name: string;
  Id_Provider_Pdv: string;
  Id_Provider_Erp: string;
  Active: boolean;
  Total_Row:number;
  Page_Number:number;
  Rows_Page: number;

  
  constructor() {
    this.Pk_Ac_Cat_Provider = 0;
    this.Creation_Date = new Date();
    this.Creation_User = '';
    this.Modification_Date = new Date();
    this.Modification_User = '';
    this.Name_Provider = '';
    this.Identification_Provider = '';
    this.Email_Provider = '';
    this.Business_Name = '';
    this.Id_Provider_Pdv = '';
    this.Id_Provider_Erp = '';
    this.Active = false;
    this.Total_Row = 0;
    this.Page_Number = 0;
    this.Rows_Page = 0;

  }
}
