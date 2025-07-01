import {Routes} from '@angular/router';

import {HomePage} from "./pages/home/home-page";
import {ReportsPage} from './pages/reports/reports-page';
import {LoginPage} from './pages/login/login-page';
import {AuthGuard} from './core/guards/auth-guard';
import {SignupPage} from './pages/signup/signup-page';
import {NewReportPage} from './pages/reports/new-report/new-report-page';

export const routes: Routes = [
  {path: '', component: HomePage, canActivate: [AuthGuard] },
  {path: 'login', component: LoginPage},
  {path: 'signup', component: SignupPage},
  {path: 'reports', component: ReportsPage, canActivate: [AuthGuard] },
  {path: 'reports/new', component: NewReportPage, canActivate: [AuthGuard] },
  {path: '**', redirectTo: ''}
];
