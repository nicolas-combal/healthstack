import {Component, OnInit, ViewChild} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

import {ReportsService} from '../../core/services/reports-service/reports-service';
import {ReportApiResponse, ReportRow} from '../../core/interfaces/reports-interfaces';
import {AuthService} from '../../core/services/auth-service/auth-service';

@Component({
  selector: 'app-reports',
  imports: [
    MatCardModule,
    MatPaginator,
    MatTableModule
  ],
  templateUrl: './reports-page.html',
  styleUrl: './reports-page.scss'
})
export class ReportsPage implements OnInit {
  protected dataSource: MatTableDataSource<ReportRow> = new MatTableDataSource();
  protected displayedColumns: string[] = ['doctorId', 'patientId', 'text', 'creationDate', 'lastUpdate'];

  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator();

  protected userRole: string = '';

  constructor(private authService: AuthService, private reportsService: ReportsService) {
  }

  ngOnInit() {
    this.authService.checkAuth().subscribe((response) => {
      this.userRole = response.user.role;
    });

    if (this.userRole === 'doctor') {
      this.getAllReports();
    } else {
      this.getPatientReports();
    }
  }

  private getAllReports(): void {
    this.reportsService.getAllReports().subscribe((apiResponse: ReportApiResponse[]) => {
      const formattedData: ReportRow[] = apiResponse.map((report: ReportApiResponse) => ({
        doctorId: report.id_doctor,
        patientId: report.id_patient,
        text: report.text,
        creationDate: report.createdAt,
        lastUpdate: report.updatedAt
      }));

      this.dataSource = new MatTableDataSource(formattedData);
      this.dataSource.paginator = this.paginator;
    });
  }

  private getPatientReports(): void {
    this.reportsService.getPatientReports().subscribe((apiResponse: ReportApiResponse[]) => {
      const formattedData: ReportRow[] = apiResponse.map((report: ReportApiResponse) => ({
        doctorId: report.id_doctor,
        patientId: report.id_patient,
        text: report.text,
        creationDate: report.createdAt,
        lastUpdate: report.updatedAt
      }));

      this.dataSource = new MatTableDataSource(formattedData);
      this.dataSource.paginator = this.paginator;
    });
  }
}
