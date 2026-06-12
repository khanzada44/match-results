import { Component, inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../shared/material/material-module';
import { MatchService } from '../../../../core/services/match';
import { formatMatchDate } from '../../../shared/pipes/date.util';

@Component({
  selector: 'app-match-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, MaterialModule],
  templateUrl: './match-detail.html',
  styleUrls: ['./match-detail.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatchDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private matchService = inject(MatchService);
  
  match = this.matchService.getMatchById(this.route.snapshot.params['id']);
  
  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    const match = this.matchService.getMatchById(id);
    
    if (match) {
      this.match = match;
    }
  }
  
  formatDate(date: string): string {
    return formatMatchDate(date);
  }
  
  goBack(): void {
    window.history.back();
  }
}