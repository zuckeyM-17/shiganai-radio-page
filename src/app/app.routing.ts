import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EpisodeListComponent } from './episode-list/episode-list.component';
import { EpisodeDetailComponent } from './episode-detail/episode-detail.component';
import { HostComponent } from './host/host.component';
import { GuestComponent } from './guest/guest.component';

const appRoutes: Routes = [
    {
        path: '',
        component: EpisodeListComponent,
        data: {
            meta: {
                title: 'しがないラジオ',
                description: 'SIerのSEからWeb系エンジニアに転職した2人がお届けするポッドキャスト.',
                'og:url': 'https://shiganai.org/',
            }
        },
    },
    {
        path: 'ep/:id',
        component: EpisodeDetailComponent,
        data: {
            meta: {
                title: 'しがないラジオ',
                description: 'SIerのSEからWeb系エンジニアに転職した2人がお届けするポッドキャスト.',
            }
        },
    },
    {
        path: 'host',
        component: HostComponent,
        data: {
            meta: {
                title: 'パーソナリティ紹介 | しがないラジオ',
                description: 'SIerのSEからWeb系エンジニアに転職した2人がお届けするポッドキャスト.',
                'og:url': 'https://shiganai.org/host/',
            }
        },
    },
    {
        path: 'guest',
        component: GuestComponent,
        data: {
            meta: {
                title: 'ゲスト紹介 | しがないラジオ',
                description: 'SIerのSEからWeb系エンジニアに転職した2人がお届けするポッドキャスト.',
                'og:url': 'https://shiganai.org/guest/',
            }
        },
    },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
