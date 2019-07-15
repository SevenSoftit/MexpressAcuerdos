/*******************************************************
  * Author: Gustavo ZC
  * Creation date: 15/07/2019
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
export class TypeOfAgreementModel {
  Pk_Cat_Type_Agreement: number;
  Creation_Date: Date;
  Creation_User: string;
  Modification_Date: Date;
  Modification_User: string;
  Name_Agreement: string;
  Description_Agreement: string;
  Id_Alias: string;
  Behavior: string;




  constructor() {
    this.Pk_Cat_Type_Agreement = 0;
    this.Creation_Date = new Date();
    this.Creation_User = '';
    this.Modification_Date = new Date();
    this.Modification_User = '';
    this.Name_Agreement = '';
    this.Description_Agreement = '';
    this.Id_Alias = '';
    this.Behavior = '';

  }
}
