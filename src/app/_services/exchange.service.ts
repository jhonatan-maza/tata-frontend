import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../_services/storage.service';

const API_URL = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root',
})
export class ExchangeRateService {
  currentUser: any;
  httpOptions: any

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {
    this.currentUser = this.storageService.getUser();
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        .append('Authorization', this.currentUser.token)
    };
  }

  getExchangeRate(currency: string): Observable<any> {
    return this.http.get(API_URL + 'exchange/'+currency, this.httpOptions);
  }

}
