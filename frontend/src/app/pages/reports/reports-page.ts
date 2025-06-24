import {Component, OnInit} from '@angular/core';
import {MatTableModule} from '@angular/material/table';

import {ReportsService} from '../../core/services/reports-service/reports-service';

@Component({
  selector: 'app-reports',
  imports: [
    MatTableModule,
  ],
  templateUrl: './reports-page.html',
  styleUrl: './reports-page.scss'
})
export class ReportsPage implements OnInit {
  protected dataSource: any;

  constructor(private reportsService: ReportsService) {
  }

  ngOnInit() {
    this.reportsService.getReports().subscribe(data => this.dataSource = data);
  }
}
