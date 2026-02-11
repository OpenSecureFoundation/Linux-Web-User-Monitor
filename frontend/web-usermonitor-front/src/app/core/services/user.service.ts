import { Injectable, signal } from '@angular/core';
import { SystemUser } from '../models/system-user.model';
import { Process } from '../models/process.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // Signal pour la liste des utilisateurs
  users = signal<SystemUser[]>([
    { uid: 0, username: 'root', connection: 'tty1', procCount: 12, loginTime: '02:15:22', status: 'active' },
    { uid: 1001, username: 'jdoe', connection: 'pts/0 (192.168.1.42)', procCount: 3, loginTime: '00:45:10', status: 'active' },
    { uid: 33, username: 'nginx', connection: 'system', procCount: 4, loginTime: '--:--:--', status: 'idle' }
  ]);

  constructor() {}

  // Simulation de récupération des processus d'un UID
  getProcessesByUid(uid: number): Process[] {
    if (uid === 1001) {
      return [
        { pid: 1024, name: '/bin/bash', cpu: 0.0, mem: 0.2, isZombie: false },
        { pid: 2045, name: 'python main.py', cpu: 15.4, mem: 4.5, isZombie: false },
        { pid: 3099, name: '[Z] ZOMBIE', cpu: 0, mem: 0, isZombie: true }
      ];
    }
    return [{ pid: 500, name: 'systemd', cpu: 0.1, mem: 0.1, isZombie: false }];
  }

  killProcess(pid: number) {
    console.log(`Sending SIGKILL to PID ${pid} via Backend...`);
    // Ici l'appel API vers FastAPI
  }

  ejectUser(uid: number) {
    console.log(`Ejecting all processes for UID ${uid}...`);
  }
}
