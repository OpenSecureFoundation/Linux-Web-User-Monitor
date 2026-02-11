import { Injectable,signal,computed } from '@angular/core';
import { SystemStats } from '../models/system-stats.model';

@Injectable({
  providedIn: 'root'
})
export class SystemStatsService {

  // Signal privé contenant l'état brut
  private state = signal<SystemStats>({
    uptime: "00:00:00",
    loadAvg: [0, 0, 0],
    zombieCount: 0,
    cpuUsage: 0,
    memory: { total: 32, used: 14, free: 18, cached: 4 }
  });

  // Sélecteurs (Signals calculés)
  uptime = computed(() => this.state().uptime);
  loadAvg = computed(() => this.state().loadAvg);
  zombieCount = computed(() => this.state().zombieCount);

  constructor() {
    // Simulation d'une mise à jour (ce sera remplacé par un appel API)
    setInterval(() => {
      this.state.update(s => ({
        ...s,
        loadAvg: [Math.random() * 2, Math.random() * 1.5, Math.random()]
      }));
    }, 5000);
  }
}
