import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'results',
    loadComponent: () => import('./features/results/pages/results-list/results-list')
      .then(m => m.ResultsList)
  },
  {
    path: 'results/:id',
    loadComponent: () => import('./features/results/pages/match-detail/match-detail')
      .then(m => m.MatchDetail)
  },
  {
    path: '',
    redirectTo: '/results',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/results'
  }
];