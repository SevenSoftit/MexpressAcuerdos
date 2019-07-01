import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemDataService implements InMemoryDbService {
  createDb() {
    console.log("createDb");
    let customers = [
      { pk_Glb_Mtr_Client: 1, full_Name: 'Windstorm' },
      { pk_Glb_Mtr_Client: 2, full_Name: 'Bombasto' },
      { pk_Glb_Mtr_Clientd: 3, full_Name: 'Magneta' },
      { pk_Glb_Mtr_Client: 4, full_Name: 'Tornado' },
      { pk_Glb_Mtr_Client: 5, full_Name: 'Agnosto' }
    ];
    return {customers: {
      total: customers.length,
      results: customers
    }};
  }
}