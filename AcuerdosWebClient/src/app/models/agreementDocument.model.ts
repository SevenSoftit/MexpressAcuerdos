/*******************************************************
  * Author: Gustavo ZC
  * Creation date: 24/07/2019
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
export class AgreementDocumentModel {
  Pk_Cat_Document_Agreement: number;
  Pk_Ac_Trade_Agreement: number;
  Creation_Date: Date;
  Creation_User: string;
  Modification_Date: Date;
  Modification_User: string;
  Url_Attachment: string;
  Archive_Original_Name: string;
  Archive_New_Name: string;
  Name_Agreement: string;
  File_Description: string;
  Active: boolean;
  Extension_Type: string;
  Is_Invoice: boolean;
 
    constructor() {
      this.Pk_Cat_Document_Agreement = 0;
      this.Pk_Ac_Trade_Agreement = 0;
      this.Creation_Date = new Date();
      this.Creation_User = '';
      this.Modification_Date = new Date();
      this.Modification_User = '';
      this.Url_Attachment = '';
      this.Archive_Original_Name = '';
      this.Archive_New_Name = '';
      this.Name_Agreement = '';
      this.File_Description = '';
      this.Active = false;
      this.Extension_Type = '';
      this.Is_Invoice = false;
      
    }
  }
  