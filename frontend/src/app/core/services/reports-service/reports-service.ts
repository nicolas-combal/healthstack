import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  REPORTS_API_URL = "http://localhost:8000/reports";

  constructor(private http: HttpClient) {

  }

  getReports(){
    return this.http.get(this.REPORTS_API_URL);
  }
}
