/*******************************************************
  * Author: Gustavo ZC
  * Creation date: 08/07/2019
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
export class MoneyModel {
    Pk_Cat_Currency: number;
    Creation_Date: Date;
    Creation_User: string;
    Modification_Date: Date;
    Modification_User: string;
    Name_Currency: string;
    Id_Currency: string;

  
    constructor() {
      this.Pk_Cat_Currency = 0;
      this.Creation_Date = new Date();
      this.Creation_User = '';
      this.Modification_Date = new Date();
      this.Modification_User = '';
      this.Name_Currency = '';
      this.Id_Currency = '';
    }
  }
  