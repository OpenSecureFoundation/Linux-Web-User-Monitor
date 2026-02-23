import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { SystemUser } from '../models/system-user.model';
import { Process } from '../models/process.model';
import { HttpClient } from '@angular/common/http';
import { interval, map, Observable, switchMap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'; // Pour éviter les fuites mémoire
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);
  private destroyRef = inject(DestroyRef);

  users = signal<SystemUser[]>([]);
  constructor() {
    this.initMonitoring();
  }
  //fonction d'initialisation du monitoring des utilisateurs
  private initMonitoring() {
    interval(5000).pipe(
      switchMap(() => this.http.get<any>(`${environment.apiUrl}/dashboard`)),
      map(data => data.users as SystemUser[]),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(updatedUsers => {
      // Fusionner les nouvelles données avec l'état expanded existant
      this.users.update(currentUsers =>
        updatedUsers.map((newUser: SystemUser) => {
          const existingUser = currentUsers.find(u => u.uid === newUser.uid);
          return {
            ...newUser,
            isExpanded: existingUser?.isExpanded ?? false
          };
        })
      );
    });
  }

  // Fonction pour tuer un processus par son PID
  killProcess(pid: number) {
    return this.http.delete(`${environment.apiUrl}/process/${pid}`);
  }

  // Fonction pour récupérer les processus d'un utilisateur par son UID
  getProcessesFromUser(uid: number): Process[] {
    const user = this.users().find(u => u.uid === uid);
    return user?.processes || [];
  }
}
