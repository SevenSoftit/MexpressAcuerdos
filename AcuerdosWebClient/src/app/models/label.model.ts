import { OrganizationModel } from './organization.model';
import { LanguageModel } from './language.model';
import { FormModel } from './form.model';

/*******************************************************
  * Author: Gustavo ZC
  * Creation date: 18/03/2019
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
export class LabelModel {
  Pk_Gbl_Cat_Label: number;
  Fk_Gbl_Cat_Form: number;
  Fk_Gbl_Cat_Language: number;
  Creation_User: string;
  Creation_Date: Date;
  Modification_User: string;
  Modification_Date: Date;
  Label: string;
  Value: string;
  GblCatForm: FormModel;
  GblCatLanguage: LanguageModel;
  GblOrganization: OrganizationModel;
  Page_Number: number;
  Rows_Pag: number;
  Total_Row: number;
  Keys: number;

  constructor() {
    this.Pk_Gbl_Cat_Label = 0;
    this.Fk_Gbl_Cat_Form = 0;
    this.Fk_Gbl_Cat_Language = 0;
    this.Creation_User = '';
    this.Creation_Date = new Date();
    this.Modification_User = '';
    this.Modification_Date = new Date();
    this.Label = '';
    this.Value = '';
    this.GblCatForm = new FormModel();
    this.GblCatLanguage = new LanguageModel();
    this.GblOrganization = new OrganizationModel();
    this.Page_Number = 0;
    this.Rows_Pag = 0;
    this.Total_Row = 0;
    this.Keys = 0;
  }
}
