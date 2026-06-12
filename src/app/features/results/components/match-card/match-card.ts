import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Match } from '../../../../core/models/match.interface';
import { formatMatchDate } from '../../../shared/pipes/date.util';
import { MaterialModule } from '../../../shared/material/material-module';

@Component({
  selector: 'app-match-card',
  standalone: true,
  imports: [CommonModule, RouterModule, MaterialModule],
  templateUrl: './match-card.html',
  styleUrls: ['./match-card.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatchCard {
  @Input({ required: true }) match!: Match;
  
  formatDate(date: string): string {
    return formatMatchDate(date);
  }
}