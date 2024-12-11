import { Routes } from '@angular/router';

import { LoginComponent } from '@/components/login/login.component';
import { DashboardComponent } from '@/components/dashboard/dashboard.component';
import { NotFoundComponent } from '@/components/not-found/not-found.component';

import { PeriodPlanningComponent } from '@/app/pages/secretary/period-planning/period-planning.component';
import { LoadProposalComponent } from '@/app/pages/secretary/load-proposal/load-proposal.component';
import { CommissionReviewersComponent } from '@/app/pages/management/commission-reviewers/commission-reviewers.component';
import { AssignmentProposalsComponent } from '@/app/pages/coordination/assignment-proposals/assignment-proposals.component';
import { ReviewProposalsComponent } from '@/app/pages/reviewer/review-proposals/review-proposals.component';
import { CorrectionProposalComponent } from '@/app/pages/student/correction-proposal/correction-proposal.component';

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
    children: [
      { path: 'commission-reviewers', component: CommissionReviewersComponent },
    ],
  },
  {
    path: 'coordination',
    children: [
      { path: 'assignment-proposals', component: AssignmentProposalsComponent },
    ],
  },
  {
    path: 'reviewer',
    children: [
      { path: 'review-proposals', component: ReviewProposalsComponent },
    ],
  },
  {
    path: 'student',
    children: [
      { path: 'correction-proposal', component: CorrectionProposalComponent },
    ],
  },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found' },
];
