import { Component, inject, OnInit, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '../../../shared/material/material-module';
// Services & Constants
import { MatchService } from '../../../../core/services/match';
import { LEAGUES } from '../../../../core/constants/leagues.constants';

// Components
import { KpiTile } from '../../components/kpi-tile/kpi-tile';
import { MatchCard } from '../../components/match-card/match-card';
import { SearchBox } from '../../components/search-box/search-box';

@Component({
  selector: 'app-results-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    SearchBox,
    MaterialModule,
    KpiTile,
    MatchCard
  ],
  templateUrl: './results-list.html',
  styleUrls: ['./results-list.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResultsList implements OnInit {
  matchService = inject(MatchService);
  leagues = LEAGUES;
  searchText = signal('');
  currentSearchTerm = computed(() => this.searchText());
  
  ngOnInit() {
    this.matchService.loadMatches();
  }
  
  onLeagueChange(leagueId: string) {
    this.matchService.updateLeague(leagueId);
    this.searchText.set('');
    this.matchService.updateSearch('');
  }
  
  onSearch(term: string) {
    this.searchText.set(term);
    this.matchService.updateSearch(term);
  }
  
  retry() {
    this.matchService.loadMatches();
  }
}