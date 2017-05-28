import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EpisodeListComponent } from './episode-list/episode-list.component';
import { EpisodeDetailComponent } from './episode-detail/episode-detail.component';

const appRoutes: Routes = [
    {
        path: '',
        component: EpisodeListComponent,
    },
    {
        path: 'ep/:id',
        component: EpisodeDetailComponent,
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
