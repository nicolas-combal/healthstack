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

  getReportById(id: string){
    return this.http.get<ReportApiResponse>(this.REPORTS_API_URL + "/" + id, { withCredentials: true });
  }

  getPatientReports(){
    return this.http.get<ReportApiResponse[]>(this.REPORTS_API_URL + "/patient", { withCredentials: true });
  }

  addReport(id_doctor: string, id_patient: string, text: string) {
    return this.http.post(this.REPORTS_API_URL, {id_doctor, id_patient, text}, {withCredentials: true});
  }

  editReport(id: string, id_doctor: string, id_patient: string, text: string) {
    return this.http.put(this.REPORTS_API_URL + "/" + id, {id_doctor, id_patient, text}, {withCredentials: true});
  }

  deleteReport(id: string) {
    return this.http.delete(this.REPORTS_API_URL + "/" + id, {withCredentials: true});
  }
}
