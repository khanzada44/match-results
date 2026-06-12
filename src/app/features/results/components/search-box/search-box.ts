import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../shared/material/material-module';


@Component({
  selector: 'app-search-box',
  standalone: true,
  imports: [CommonModule, 
    FormsModule,
    MaterialModule
],
  templateUrl: './search-box.html',
  styleUrls: ['./search-box.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchBox {
  searchValue = input<string>('');
  isLoading = input<boolean>(false);
  searchChange = output<string>();
  
  private debounceTimer: any;
  private readonly DEBOUNCE_TIME = 300;
  
  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }
    
    this.debounceTimer = setTimeout(() => {
      this.searchChange.emit(value);
    }, this.DEBOUNCE_TIME);
  }
  
  onKeyUp(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      const target = event.target as HTMLInputElement;
      if (this.debounceTimer) {
        clearTimeout(this.debounceTimer);
      }
      this.searchChange.emit(target.value);
    }
  }
  
  clearSearch(): void {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }
    this.searchChange.emit('');
  }
}