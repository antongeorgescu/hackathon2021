import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class FinesgapiService {

  constructor(private apiService:ApiService) { }
  public getGreenScore():any{
    return this.apiService.get('customers/Outdate Qualitatively')
  }
}
