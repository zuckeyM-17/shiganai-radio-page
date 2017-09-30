import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import SC from 'soundcloud';

import { Episode } from './episode';

const emptyEpisode = {
  id: '',
  title: '',
  link: '',
  pubDate: new Date(),
  description: '',
  summary: '',
};

@Injectable()
export class EpisodeService {

  constructor(private sanitizer: DomSanitizer) { }

  getEpisodes(): Promise<Episode[]> {
     SC.initialize({
       client_id: 'nviGqqUJ1aoaFVSMA7EdLE3IZJLwYFKU',
       redirect_uri: 'http://example.com/callback'
     });
     return SC.get('/users/294673416/tracks')
       .then(res => res.map(v => {
         const linkSplitedBySlash = v.permalink_url.split('/');
         return {
           id: linkSplitedBySlash[linkSplitedBySlash.length - 1],
           pubDate: new Date(v.created_at),
           link: v.permalink_url,
           title: v.title,
           summary: v.description.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, ''),
           description: v.description,
        };
      })).catch(err => console.error(err)
    );
  }

  getEpisode(id: string): Promise<Episode> {
    return this.getEpisodes()
      .then(episodes => episodes.find(episode => episode['id'] === id));
  }

  getEmptyEpisode(): Episode {
    return emptyEpisode;
  }

  getGuestsEpisodes(name: string): Promise<Episode[]> {
    return this.getEpisodes()
      .then(episodes => episodes.filter(episode => episode['title'].includes(name)));
  }
}
