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
  public stats = inject(SystemStatsService);

  // Logique de couleur dynamique demandée pour ton HTML
  getLoadColor(load: number): string {
    if (load > 2.0) return 'border-red-500 bg-red-500/10 text-red-500'; // Surcharge
    if (load > 1.0) return 'border-orange-500 bg-orange-500/10 text-orange-500'; // Attention
    return 'border-border-dark bg-card-dark text-primary'; // OK
  }
}
