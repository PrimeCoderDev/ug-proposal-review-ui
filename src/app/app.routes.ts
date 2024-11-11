import { Routes } from '@angular/router';

import { LoginComponent } from '@/components/login/login.component';
import { DashboardComponent } from '@/components/dashboard/dashboard.component';
import { NotFoundComponent } from '@/components/not-found/not-found.component';

import { PeriodPlanningComponent } from './components/secretary/period-planning/period-planning.component';
import { LoadProposalComponent } from './components/secretary/load-proposal/load-proposal.component';

import { ReviewComisionComponent } from './components/management/review-comision/review-comision.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  {
    path: 'secretary',
    children: [
      { path: 'period-planning', component: PeriodPlanningComponent },
      { path: 'load-proposal', component: LoadProposalComponent },
    ],
  },
  {
    path: 'management',
    children: [{ path: 'review-comision', component: ReviewComisionComponent }],
  },
  { path: 'coordination', children: [] },
  { path: 'reviewer', children: [] },
  { path: 'student', children: [] },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found' },
];
