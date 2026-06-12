export interface League {
  id: string;
  name: string;
  code: string;
}

export const LEAGUES: League[] = [
  { id: '4328', name: 'Premier League', code: 'PL' },
  { id: '4335', name: 'La Liga', code: 'LL' },
  { id: '4331', name: 'Bundesliga', code: 'BUND' },
  { id: '4332', name: 'Serie A', code: 'SA' },
  { id: '4334', name: 'Ligue 1', code: 'L1' }
] as const;

export const DEFAULT_LEAGUE_ID = '4328';
// export const API_BASE_URL = 'https://www.thesportsdb.com/api/v1/json/3';