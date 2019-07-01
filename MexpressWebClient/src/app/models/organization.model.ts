/*******************************************************
  * Author: Gustavo ZC
  * Creation date: 18/03/2019
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
export class OrganizationModel {
  Pk_Glb_Mtr_Organization: number;
  Organization_Id: string;
  Organization_Identification: string;
  Organization_Name: string;
  Creation_User: string;
  Creation_Date: Date;
  Modification_User: string;
  Modification_Date: Date;
  Fk_Gbl_Cat_Language: number;
  Page_Number: number;
  Rows_Pag: number;
  Total_Row: number;
  Keys: number;

  constructor() {
    this.Pk_Glb_Mtr_Organization = 0;
    this.Organization_Id = '';
    this.Organization_Identification = '';
    this.Organization_Name = '';
    this.Creation_User = '';
    this.Creation_Date = new Date();
    this.Modification_User = '';
    this.Modification_Date = new Date();
    this.Fk_Gbl_Cat_Language = 0;
    this.Page_Number = 0;
    this.Rows_Pag = 0;
    this.Total_Row = 0;
    this.Keys = 0;
  }
}
