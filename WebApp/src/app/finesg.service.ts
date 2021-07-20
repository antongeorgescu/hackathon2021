import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class finesgService {

  constructor(private apiService:ApiService) { }

}
