import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatIcon } from '@angular/material/icon';

import { ReportsService } from '../../core/services/reports-service/reports-service';
import { ReportApiResponse, ReportRow } from '../../core/interfaces/reports-interfaces';
import { AuthService } from '../../core/services/auth-service/auth-service';
import { CheckAuthApiResponse } from '../../core/interfaces/auth-interfaces';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-reports',
  imports: [
    MatButton,
    MatCardModule,
    MatPaginator,
    MatTableModule,
    RouterLink,
    DatePipe,
    MatIconButton,
    MatIcon
  ],
  templateUrl: './reports-page.html',
  styleUrl: './reports-page.scss'
})
export class ReportsPage implements OnInit {
  protected dataSource: MatTableDataSource<ReportRow> = new MatTableDataSource();
  protected displayedColumns: string[] = ['doctorId', 'patientId', 'text', 'creationDate', 'lastUpdate'];

  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator();

  protected userRole: string = '';

  protected doctorsMap: Map<string, string> = new Map();
  protected patientsMap: Map<string, string> = new Map();

  constructor(private authService: AuthService, private reportsService: ReportsService) {}

  ngOnInit() {
    this.authService.checkAuth().subscribe((response: CheckAuthApiResponse) => {
      this.userRole = response.user.role;

      if (this.userRole === 'doctor') {
        this.displayedColumns.push('actions');
        this.fetchAndDisplayReports(this.reportsService.getAllReports.bind(this.reportsService));
      } else {
        this.fetchAndDisplayReports(this.reportsService.getPatientReports.bind(this.reportsService));
      }
    });
  }

  private fetchAndDisplayReports(fetchFn: () => any): void {
    this.doctorsMap.clear();
    this.patientsMap.clear();

    fetchFn().subscribe((apiResponse: ReportApiResponse[]) => {
      const doctorRequests = apiResponse.map(report =>
        this.authService.getUserById(report.id_doctor)
      );
      const patientRequests = apiResponse.map(report =>
        this.authService.getUserById(report.id_patient)
      );

      forkJoin([forkJoin(doctorRequests), forkJoin(patientRequests)]).subscribe(
        ([doctorResponses, patientResponses]) => {
          apiResponse.forEach((report, index) => {
            this.doctorsMap.set(report.id_doctor, doctorResponses[index].name);
            this.patientsMap.set(report.id_patient, patientResponses[index].name);
          });

          const formattedData: ReportRow[] = apiResponse.map((report: ReportApiResponse): ReportRow => ({
            id: report.id,
            doctorName: this.doctorsMap.get(report.id_doctor),
            patientName: this.patientsMap.get(report.id_patient),
            text: report.text,
            creationDate: report.createdAt,
            lastUpdate: report.updatedAt
          }));

          this.dataSource = new MatTableDataSource(formattedData);
          this.dataSource.paginator = this.paginator;
        }
      );
    });
  }

  onDelete(reportId: string): void {
    this.reportsService.deleteReport(reportId).subscribe({
      next: () => {
        alert('Report deleted!');
        window.location.reload();
      },
      error: (error: any) => {
        alert(`An error occurred: ${error.status}`);
      }
    });
  }
}
