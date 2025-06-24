import {Routes} from '@angular/router';

import {HomePage} from "./pages/home/home-page";
import {ReportsPage} from './pages/reports/reports-page';
import {LoginPage} from './pages/login/login-page';
import {AuthGuard} from './core/guards/auth-guard-guard';

export const routes: Routes = [
  {path: '', component: HomePage, canActivate: [AuthGuard] },
  {path: 'login', component: LoginPage},
  {path: 'reports', component: ReportsPage, canActivate: [AuthGuard] },
  {path: '**', redirectTo: ''}
];
