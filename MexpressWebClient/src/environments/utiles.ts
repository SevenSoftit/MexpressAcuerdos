import { environment } from './environment';

export class utiles {

  constructor() { }


  /************************LIMPIEZA DEL CACHE*********************/

  //#region clean Storage

  static clearCache() {

    localStorage.removeItem('authorizationData');
    localStorage.removeItem('authorizationClient');
    localStorage.removeItem('infoMenu');
  }

  static clearCacheUser() {

    localStorage.removeItem('authorizationData');

  }

  //#endregion clean Storage

    /************************LIMPIEZA DEL CACHE*********************/


    /************************CREACION DEL CACHE*********************/

  //#region Create Storage

  static createCacheUser(dataUsuario) {

    const infoUser = {
      token: dataUsuario.access_token,
      email: dataUsuario.email,
      refreshToken: '',
      useRefreshTokens: false, 
      apiServiceBaseUri: dataUsuario.apiServiceBaseUri,
      uriStartPage: dataUsuario.uriStartPage,
      es_temporal: dataUsuario.es_temporal,
      fk_Sistema: dataUsuario.Fk_Sistema,
      pk_Usuario: dataUsuario.idUser,
      username: dataUsuario.userName,
      Posee_Autenticacion: dataUsuario.Posee_Autenticacion,
      Password_Autenticacion: dataUsuario.Password_Autenticacion,
      Metodo_Autenticacion: dataUsuario.Metodo_Autenticacion,
      Usuario_Autenticacion: dataUsuario.Usuario_Autenticacion,
      Fk_Sistema_Consulta: dataUsuario.Fk_Sistema_Consulta,
      Ubication_List: JSON.parse(dataUsuario.Ubicacion),
      Fk_Glb_Mtr_Head: dataUsuario.idUser
    
    };

    localStorage.setItem('authorizationData', JSON.stringify(infoUser));
  }
 

  static createCacheAuthorizationClient(access_token) {

    const infoUser = {
      token: access_token
    };

    localStorage.setItem('authorizationClient', JSON.stringify(infoUser));

  }

  static createInfoMenu(menu: any) {
    localStorage.setItem('infoMenu', JSON.stringify(menu));
  }


    //#endregion Create Storage

    /************************CREACION DEL CACHE*********************/


    /************************OBTENER INFORMACION DEL CACHE*********************/

  //#region Get Storage

    static getInfoUser() {

      const infoUser = localStorage.getItem('authorizationData');
      const objectUser = JSON.parse(infoUser);

      return objectUser;

    }

    static getInfoAuthorization() {

      var infoAuthorization = localStorage.getItem('authorizationClient');
      var objectAuthorization = JSON.parse(infoAuthorization);

      return objectAuthorization;

    }

    static getInfoMenu(){
      var infoMenu = localStorage.getItem('infoMenu');
      return JSON.parse(infoMenu);
    }
    

  //#endregion Get Storage

    /************************OBTENER INFORMACION DEL CACHE*********************/


}
