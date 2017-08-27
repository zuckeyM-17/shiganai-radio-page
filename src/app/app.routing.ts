import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EpisodeListComponent } from './episode-list/episode-list.component';
import { EpisodeDetailComponent } from './episode-detail/episode-detail.component';
import { HostComponent } from './host/host.component';
import { GuestComponent } from './guest/guest.component';
import { GuestDetailComponent } from './guest/guest-detail/guest-detail.component';

const appRoutes: Routes = [
    {
        path: '',
        component: EpisodeListComponent,
    },
    {
        path: 'ep/:id',
        component: EpisodeDetailComponent,
    },
    {
        path: 'host',
        component: HostComponent,
    },
    {
        path: 'guest',
        component: GuestComponent,
    },
    {
        path: 'guest/:name',
        component: GuestDetailComponent,
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
