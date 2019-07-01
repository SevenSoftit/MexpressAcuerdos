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
export class LanguageModel {
  Pk_Glb_Cat_Language: number;
  Creation_User: string;
  Creation_Date: Date;
  Modification_User: string;
  Modification_Date: Date;
  Language_Family: string;
  Name: string;
  Name_Native: string;
  Iso: string;
  Iso_639_2_B: string;
  Iso_639_2_T: string;
  Iso_639_3: string;
  Iso_639_6: string;
  Notes: string;
  Page_Number: number;
  Rows_Pag: number;
  Total_Row: number;
  Keys: number;

  constructor() {
    this.Pk_Glb_Cat_Language = 0;
    this.Creation_User = '';
    this.Creation_Date = new Date();
    this.Modification_User = '';
    this.Modification_Date = new Date();
    this.Language_Family = '';
    this.Name = '';
    this.Name_Native = '';
    this.Iso = '';
    this.Iso_639_2_B = '';
    this.Iso_639_2_T = '';
    this.Iso_639_3 = '';
    this.Iso_639_6 = '';
    this.Notes = '';
    this.Page_Number = 0;
    this.Rows_Pag = 0;
    this.Total_Row = 0;
    this.Keys = 0;
  }
}