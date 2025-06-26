import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ReportApiResponse} from '../../interfaces/reports-interfaces';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  REPORTS_API_URL = "http://localhost:8000/reports";

  constructor(private http: HttpClient) {

  }

  getAllReports(){
    return this.http.get<ReportApiResponse[]>(this.REPORTS_API_URL, { withCredentials: true });
  }

  getPatientReports(){
    return this.http.get<ReportApiResponse[]>(this.REPORTS_API_URL + "/patient", { withCredentials: true });
  }
}
