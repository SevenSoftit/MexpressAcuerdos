/*******************************************************
  * Author: Gustavo ZC
  * Creation date: 10/03/2021
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
export class GoalModel {
  // Pk_Cat_Agreement_Goals: number;
  // Creation_Date: Date;
  // Creation_User: string;
  // Modification_Date: Date;
  // Modification_User: string;
  // Pk_Ac_Trade_Agreement: number;
  // Pk_Cat_Currency: number;
  // Date_Start: Date;
  // Date_Finish: Date;
  // Goal_Amount: number;
  // Type_Goal: boolean;
  // Bonus: number;
  // Name_Currency: string;
  // Active: boolean;
  // Agreement_Amount: number;
  // Id: number;
  // ErrorGoal: boolean;
  // ErrorBonus: boolean;
  // ErrorFinishDate: boolean;
  pk_Cat_Agreement_Goals: number;
  creation_Date: Date;
  creation_User: string;
  modification_Date: Date;
  modification_User: string;
  pk_Ac_Trade_Agreement: number;
  pk_Cat_Currency: number;
  date_Start: Date;
  date_Finish: Date;
  goal_Amount: number;
  type_Goal: boolean;
  bonus: number;
  name_Currency: string;
  active: boolean;
  agreement_Amount: number;
  id: number;
  errorGoal: boolean;
  errorBonus: boolean;
  errorFinishDate: boolean;

  
    constructor() {
      // this.Pk_Cat_Agreement_Goals = 0;
      // this.Creation_Date = new Date();
      // this.Creation_User = '';
      // this.Modification_Date = new Date();
      // this.Modification_User = '';
      // this.Pk_Ac_Trade_Agreement = 0;
      // this.Pk_Cat_Currency = 0;
      // this.Date_Start = new Date();
      // this.Date_Finish = new Date();
      // this.Goal_Amount = 0;
      // this.Type_Goal = false;
      // this.Bonus = 0;
      // this.Name_Currency = '';
      // this.Active = true;
      // this.Agreement_Amount = 0;
      // this.Id = 0;
      // this.ErrorGoal = false;
      // this.ErrorBonus = false;
      // this.ErrorFinishDate = false;
      this.pk_Cat_Agreement_Goals = 0;
      this.creation_Date = new Date();
      this.creation_User = '';
      this.modification_Date = new Date();
      this.modification_User = '';
      this.pk_Ac_Trade_Agreement = 0;
      this.pk_Cat_Currency = 0;
      this.date_Start = new Date();
      this.date_Finish = new Date();
      this.goal_Amount = 0;
      this.type_Goal = false;
      this.bonus = 0;
      this.name_Currency = '';
      this.active = true;
      this.agreement_Amount = 0;
      this.id = 0;
      this.errorGoal = false;
      this.errorBonus = false;
      this.errorFinishDate = false;
      
    }
  }
  