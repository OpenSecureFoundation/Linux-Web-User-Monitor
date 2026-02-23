import { UsersListComponent } from './features/users/users-list/users-list.component';
import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { USER_ROUTES } from './features/users/users.routes';
import { SettingsComponent } from './features/settings/settings.component';
import { LogsComponent } from './features/logs/logs.component';

export const routes: Routes = [
    {
        path : 'home',
        component : MainLayoutComponent,
        children : [
            {
                path : 'dashboard',
                component: DashboardComponent
            },
            {
                path : 'users',
                loadChildren: () => import('./features/users/users.routes').then(m => m.USER_ROUTES)
            },
            {
                path : 'settings',
                component : SettingsComponent
            },
            {
                path : 'logs',
                component : LogsComponent
            },
            {
                path : '',
                redirectTo : 'dashboard',
                pathMatch   : 'full'
            },
        ]

    },
    {
        path: '',
        redirectTo : '/home',
        pathMatch   : 'full'
    },
];
