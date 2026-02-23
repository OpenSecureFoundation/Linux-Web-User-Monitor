import { Injectable,signal,inject,computed, DestroyRef } from '@angular/core';
import { SystemStats } from '../models/system-stats.model';
import { HttpClient } from '@angular/common/http';
import { interval, Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { switchMap, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SystemStatsService {
  private http = inject(HttpClient);
  private destroyRef = inject(DestroyRef);

 // Signal privé contenant l'état brut
  private state = signal<SystemStats>({
    uptime: "00:00:00",
    loadAvg: [0, 0, 0],
    zombieCount: 0,
    cpuUsage: 0,
    memory: { total: 0, used: 0, free: 0, cached: 0 }
  });

  // Sélecteurs publics (Signals calculés pour les composants)
  uptime = computed(() => this.state().uptime);
  loadAvg = computed(() => this.state().loadAvg);
  zombieCount = computed(() => this.state().zombieCount);
  memory = computed(() => this.state().memory);

  constructor() {
    this.startPolling();
  }

  //fonction d'initialisation du polling pour récupérer les stats système toutes les 5 secondes
  private startPolling() {
    interval(5000).pipe(
      switchMap(() => this.http.get<any>(`${environment.apiUrl}/dashboard`)),
      map(data => data.stats),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: (newStats) => this.state.set(newStats),
      error: (err) => console.error('Erreur TopBar:', err)
    });
  }
  
}
