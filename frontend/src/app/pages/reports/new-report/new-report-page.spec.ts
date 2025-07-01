import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewReportPage } from './new-report-page';

describe('NewReportPage', () => {
  let component: NewReportPage;
  let fixture: ComponentFixture<NewReportPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewReportPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
