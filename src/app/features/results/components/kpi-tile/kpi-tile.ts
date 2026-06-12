import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { MaterialModule } from '../../../shared/material/material-module';
@Component({
  selector: 'app-kpi-tile',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './kpi-tile.html',
  styleUrls: ['./kpi-tile.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KpiTile {
  @Input({ required: true }) label!: string;
  @Input({ required: true }) value!: number | string;
}