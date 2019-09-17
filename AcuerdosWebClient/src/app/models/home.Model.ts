
/*******************************************************
  * Author: Gustavo ZC
  * Creation date: 03/07/2019
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
export class HomeModel {


  In_Process_Agreements_Count: number;
  Finished_Agreements_Count: number;
  Conciled_Agreements_Count: number;
  Expired_Agreements_Count: number;
  Active_Agreements_Count: number;
  Inactive_Agreements_Count: number;
  Actual_Month : Date;


  constructor() {
    this.In_Process_Agreements_Count = 0;
    this.Finished_Agreements_Count = 0;
    this.Conciled_Agreements_Count = 0;
    this.Expired_Agreements_Count = 0;
    this.Active_Agreements_Count = 0;
    this.Inactive_Agreements_Count = 0;
    this.Actual_Month = new Date();
  }
}


