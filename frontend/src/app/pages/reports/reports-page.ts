import {Component, OnInit, ViewChild} from '@angular/core';
import {RouterLink} from '@angular/router';
import {DatePipe} from '@angular/common';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatIcon} from '@angular/material/icon';

import {ReportsService} from '../../core/services/reports-service/reports-service';
import {ReportApiResponse, ReportRow} from '../../core/interfaces/reports-interfaces';
import {AuthService} from '../../core/services/auth-service/auth-service';
import {CheckAuthApiResponse} from '../../core/interfaces/auth-interfaces';

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

  constructor(private authService: AuthService, private reportsService: ReportsService) {
  }

  ngOnInit() {
    this.authService.checkAuth().subscribe((response: CheckAuthApiResponse) => {
      this.userRole = response.user.role;

      if (this.userRole === 'doctor') {
        this.displayedColumns.push('actions');
        this.getAllReports();
      } else {
        this.getPatientReports();
      }
    });
  }

  private getAllReports(): void {
    this.reportsService.getAllReports().subscribe((apiResponse: ReportApiResponse[]) => {
      const formattedData: ReportRow[] = apiResponse.map((report: ReportApiResponse) => ({
        id: report.id,
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
        id: report.id,
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
