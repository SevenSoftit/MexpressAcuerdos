/*******************************************************
  * Author: Gustavo ZC
  * Creation date: 20/03/2019
  * Description:
  * Properties:
  * Username:
  * Password:
 * *****************************************************
  * Modifications
 * *****************************************************
  * Number:
  * Date:
  * Ticket:
  * Author: 
  * Description:
*******************************************************/
export class FormModel {
    Pk_Glb_Cat_Form: number;
    Fk_Glb_Mtr_Organization: number;
    Creation_User: string;
    Creation_Date: Date;
    Modification_User: string;
    Modification_Date: Date;
    Name: string;
    Description: string;
    Code: string;
    Page_Number: number;
    Rows_Pag: number;
    Total_Row: number;
    Keys: number;


    constructor() {
    this.Pk_Glb_Cat_Form = 0;
    this.Fk_Glb_Mtr_Organization = 0;
    this.Creation_User = '';
    this.Creation_Date = new Date(),
    this.Modification_User = '';
    this.Modification_Date = new Date(),
    this.Name = '';
    this.Description = '';
    this.Code = '';
    this.Page_Number = 0;
    this.Rows_Pag = 0;
    this.Total_Row = 0;
    this.Keys = 0;
    }

}