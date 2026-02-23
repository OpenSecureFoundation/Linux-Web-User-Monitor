import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../core/services/user.service';
import { SystemUser } from '../../../core/models/system-user.model';

@Component({
  selector: 'app-users-list',
  imports: [CommonModule],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent {
  // uid of the user for whom the eject-confirm modal is open, or null
  public ejectModalUid: number | null = null;
  // toast state
  public toast: { type: 'success' | 'error'; pid?: number; message: string } | null = null;
  private toastTimer: any = null;
  constructor(public userService: UserService) {
    console.log(userService.users);
  } 

  toggleUser(user: SystemUser) {
    //modifier l'état d'expansion de l'utilisateur ciblé
    this.userService.users.update(allUsers => 
      allUsers.map(u => u.uid === user.uid ? { ...u, isExpanded: !u.isExpanded } : u)
    );
  }

  kill(pid: number) {
    this.userService.killProcess(pid).subscribe({
      next: () => console.log(`Processus ${pid} supprimé`),
      error: (err) => alert("Erreur lors du kill : " + err.message)
    });
  }

  // Eject all processes for a user (uses UserService.getProcessesFromUser)
  ejectUser(uid: number) {
    /***const procs = this.userService.getProcessesFromUser(uid);
    if (!procs || procs.length === 0) {
      this.showToast('error', undefined, `Aucun processus trouvé pour l'utilisateur ${uid}`);
      this.ejectModalUid = null;
      return;
    }**/

    this.ejectModalUid = null; // close modal immediately

    /**procs.forEach(proc => {
      this.userService.killProcess(proc.pid).subscribe({
        next: () => this.showToast('success', proc.pid, `Signal SIGKILL envoyé avec succès au PID ${proc.pid}`),
        error: (err) => this.showToast('error', proc.pid, `Échec lors de l'envoi du signal au PID ${proc.pid}`)
      });
    });*/
  }

  showToast(type: 'success' | 'error', pid: number | undefined, message: string) {
    this.toast = { type, pid, message };
    if (this.toastTimer) clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => { this.toast = null; this.toastTimer = null; }, 4000);
  }
}
