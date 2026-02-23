import { UsersDetailsComponent } from './users-details/users-details.component';
import { UsersListComponent } from './users-list/users-list.component';
import { Routes } from '@angular/router';

export const USER_ROUTES: Routes = [
    {
        path : '',
        component : UsersListComponent,

    },
    {
        path : '',
        component : UsersDetailsComponent,

    },
];
