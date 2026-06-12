import { Injectable, inject, signal, computed, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { catchError, map, of } from 'rxjs';
import { Match, APIResponse } from '../models/match.interface';
import { DEFAULT_LEAGUE_ID } from '../constants/leagues.constants';
import fallbackData from '../../../assets/fallback/fallback-matches.json';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class MatchService {
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);
  
  private allMatches = signal<Match[]>([]);
  private searchTerm = signal<string>('');
  selectedLeagueId = signal<string>(DEFAULT_LEAGUE_ID);

  private readonly API_BASE_URL = environment.apiBaseUrl;
  
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  filteredMatches = computed(() => {
    const matches = this.allMatches();
    const term = this.searchTerm().toLowerCase().trim();
    if (!term) return matches;
    return matches.filter(match => 
      match.strHomeTeam.toLowerCase().includes(term) ||
      match.strAwayTeam.toLowerCase().includes(term)
    );
  });

  kpis = computed(() => {
    const matches = this.filteredMatches();
    const totalMatches = matches.length;
    const totalGoals = matches.reduce((sum, m) => 
      sum + this.parseScore(m.intHomeScore) + this.parseScore(m.intAwayScore), 0
    );
    const avgGoals = totalMatches ? (totalGoals / totalMatches).toFixed(1) : '0';
    return { totalMatches, totalGoals, avgGoals };
  });

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.loadMatches();
    }
  }
  
  loadMatches(): void {
    this.loading.set(true);
    this.error.set(null);
    
    const url = `${this.API_BASE_URL}/eventspastleague.php?id=${this.selectedLeagueId()}`;
    console.log('API URL:', url);
    
    this.http.get<APIResponse>(url).pipe(
      map(res => {
        if (!res?.events?.length) throw new Error('No events');
        return res.events;
      }),
      catchError(err => {
        console.error('API Failed:', err.status);
        console.log('Switching to local fallback...');
        return this.loadLocalFallback();
      })
    ).subscribe({
      next: (matches) => {
        console.log('Matches loaded:', matches.length);
        this.allMatches.set(matches);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.error.set('Something went wrong.');
      }
    });
  }
  
  private loadLocalFallback() {
    console.log('Loading fallback from JSON import');
    try {
      const matches = (fallbackData as APIResponse).events || [];
      console.log('Fallback loaded:', matches.length, 'matches');
      return of(matches);
    } catch (e) {
      console.error('Fallback import failed:', e);
      this.loading.set(false);
      return of([] as Match[]);
    }
  }
  
  updateLeague(leagueId: string): void {
    this.selectedLeagueId.set(leagueId);
    this.searchTerm.set('');
    this.loadMatches();
  }
  
  updateSearch(term: string): void {
    this.searchTerm.set(term);
  }
  
  getMatchById(id: string): Match | undefined {
    return this.allMatches().find(m => m.idEvent === id);
  }
  
  private parseScore(score: string): number {
    return parseInt(score) || 0;
  }
}