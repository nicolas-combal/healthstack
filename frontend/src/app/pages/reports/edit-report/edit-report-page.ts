import {Component, OnInit} from '@angular/core';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {CdkTextareaAutosize, TextFieldModule} from '@angular/cdk/text-field';
import {Router} from '@angular/router';

import {AuthService} from '../../../core/services/auth-service/auth-service';
import {CheckAuthApiResponse} from '../../../core/interfaces/auth-interfaces';
import {ReportsService} from '../../../core/services/reports-service/reports-service';
import {ReportApiResponse} from '../../../core/interfaces/reports-interfaces';

@Component({
  selector: 'app-edit-report-page',
  imports: [
    MatCard,
    FormsModule,
    MatButton,
    MatCardContent,
    MatCardTitle,
    MatFormField,
    MatLabel,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    CdkTextareaAutosize,
    TextFieldModule
  ],
  templateUrl: './edit-report-page.html',
  styleUrl: './edit-report-page.scss'
})
export class EditReportPage implements OnInit {

  private reportId: string = '';

  protected doctorId: string = '';

  protected patientId: string = '';
  protected patientName: string = '';
  protected reportText: string = '';

  constructor(
    private authService: AuthService,
    private reportsService: ReportsService,
    private router: Router) {
  }

  ngOnInit() {
    this.reportId = this.router.url.split('/')[3]
    this.authService.checkAuth().subscribe((response: CheckAuthApiResponse) => {
      this.doctorId = response.user.user_id;
    })
    this.prefillForm();
  }

  private prefillForm(): void {
    this.reportsService.getReportById(this.reportId).subscribe((report: ReportApiResponse) => {
      this.doctorId = report.id_doctor;
      this.patientId = report.id_patient;
      this.reportText = report.text;
      this.authService.getUserById(this.patientId).subscribe((patient: {name: string}) => {
        this.patientName = patient.name;
      })
    });
  }

  onSubmit(): void {
    this.reportsService.editReport(this.reportId, this.doctorId, this.patientId, this.reportText).subscribe({
      next: () => {
        alert('Report edited succesfully!');
        void this.router.navigate(['/reports']);
      },
      error: (error: any) => {
        alert(`An error occurred: ${error.status}`);
      }
    });
  }
}
