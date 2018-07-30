import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const http_heroes = [
      { id: 13, name: 'Http_Bombasto' },
      { id: 14, name: 'Http_Celeritas' },
      { id: 15, name: 'Http_Magneta' },
      { id: 16, name: 'Http_RubberMan' },
      { id: 17, name: 'Http_Dynama' },
    ];
    return {http_heroes};
  }
}