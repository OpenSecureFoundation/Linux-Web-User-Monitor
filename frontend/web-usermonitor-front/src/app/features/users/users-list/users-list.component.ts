import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-users-list',
  imports: [CommonModule],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent {
  userServ = inject(UserService);
  expandedUid = signal<number | null>(null);

  toggleUser(uid: number) {
    this.expandedUid.update(current => current === uid ? null : uid);
  }
}
