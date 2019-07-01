
/*******************************************************
  * Author: Gustavo ZC
  * Creation date: 01/07/2019
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
export class LoginModel {
    Username: string;
    Password: string;
    userName: string;
    idRole: string;
    roleList: string;
    Ubicacion: string;
    uriStartPage: string;
    apiServiceBaseUri: string;
    es_temporal: string;
    Fk_Sistema: string;
    Posee_Autenticacion: string;
    Password_Autenticacion: string;
    Metodo_Autenticacion: string;
    Usuario_Autenticacion: string;
    Fk_Sistema_Consulta: string;
    access_token: string;
    tokenClient: string;
    value: string;
    Ubication_List: Array<any>;
    Rol_List: Array<any>;
    Fk_Glb_Mtr_Head: string;
    OpcionUser : string;
    Contrasena : string;
    ContrasenaActual: string;
    pk_Usuario:number;
  
    constructor() {
        this.Username = '',
        this.Password = '',
        this.userName = '',
        this.idRole = '',
        this.roleList = '',
        this.Ubicacion = '',
        this.uriStartPage = '',
        this.apiServiceBaseUri = '',
        this.es_temporal = '',
        this.Fk_Sistema = '',
        this.Posee_Autenticacion = '',
        this.Password_Autenticacion = '',
        this.Metodo_Autenticacion = '',
        this.Usuario_Autenticacion = '',
        this.Fk_Sistema_Consulta = '',
        this.access_token = '',
        this.tokenClient = '',
        this.value = '',
        this.Ubication_List = [],
        this.Rol_List = [],
        this.Fk_Glb_Mtr_Head = '',
        this.OpcionUser= '',
        this.Contrasena = '',
        this.ContrasenaActual = '',
        this.pk_Usuario = 0
    }
  }