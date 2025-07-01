import {Component, OnInit} from '@angular/core';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {CdkTextareaAutosize, TextFieldModule} from '@angular/cdk/text-field';
import {MatSelect} from '@angular/material/select';
import {MatOption} from '@angular/material/core';

import {AuthService} from '../../../core/services/auth-service/auth-service';
import {CheckAuthApiResponse, Patient} from '../../../core/interfaces/auth-interfaces';
import {ReportsService} from '../../../core/services/reports-service/reports-service';

@Component({
  selector: 'app-new-report-page',
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
    TextFieldModule,
    MatSelect,
    MatOption
  ],
  templateUrl: './new-report-page.html',
  styleUrl: './new-report-page.scss'
})
export class NewReportPage implements OnInit {

  protected patients: Patient[] = [];

  protected doctorId: string = '';

  protected patientId: string = '';
  protected reportText: string = '';

  constructor(private authService: AuthService, private reportsService: ReportsService) {
  }

  ngOnInit() {
    this.authService.checkAuth().subscribe((response: CheckAuthApiResponse) => {
      this.doctorId = response.user.user_id;
    })
    this.fillPatients();
  }

  private fillPatients(): void {
    this.authService.getAllPatients().subscribe((patients: Patient[]) => this.patients = patients);
  }

  onSubmit(): void {
    this.reportsService.addReport(this.doctorId, this.patientId, this.reportText).subscribe({
      next: () => {
        alert('Report submitted!');
      },
      error: (error: any) => {
        alert(`An error occurred: ${error.status}`);
      }
    });
  }
}
