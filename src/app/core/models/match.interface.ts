export interface Match {
  idEvent: string;
  strEvent: string;
  strHomeTeam: string;
  strAwayTeam: string;
  intHomeScore: string;
  intAwayScore: string;
  dateEvent: string;
  strLeague: string;
  strVenue?: string;
  strThumb?: string;
  strSeason?: string;
}

export interface APIResponse {
  events?: Match[];
}
