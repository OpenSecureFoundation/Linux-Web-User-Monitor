import { Component, inject} from '@angular/core';
import { SystemStatsService } from '../../core/services/system-stats.service';
@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css'
})
export class TopbarComponent {
  stats = inject(SystemStatsService);

  // Logique de couleur demandée
  getLoadColor(value: number): string {
    if (value > 1.0) return 'text-red-400 border-red-500/20 bg-red-500/10';
    if (value > 0.7) return 'text-orange-400 border-orange-500/20 bg-orange-500/10';
    return 'text-primary border-primary/20 bg-primary/10';
  }
}
