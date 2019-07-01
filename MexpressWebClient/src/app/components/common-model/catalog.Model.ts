/*******************************************************
  * Author: Gustavo ZC
  * Creation date: 13/03/2019
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
export class CatalogModel {
  pk_Glb_Cat_Catalog: number;
  Creation_Date: Date;
  Creation_User: string;
  Modification_Date: Date;
  Modification_User: string;
  Fk_Glb_Cat_Catalog: number;
  Fk_Glb_Cat_Type_Catalog: number;
  Search_Key: string;
  Value: string;
  Description: string;
  Editable: boolean;
  Active: boolean;
  Search_Key_Type_Catalog: string;
  mask:string;
}
