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
  pubDate: new Date(),
};

@Injectable()
export class EpisodeService {

  constructor(private sanitizer: DomSanitizer) { }

  getEpisodes(): Promise<Episode[]> {
     SC.initialize({
       client_id: '2t9loNQH90kzJcsFCODdigxfp325aq4z',
       redirect_uri: 'http://example.com/callback'
     });
     return SC.get('/users/294673416/tracks')
       .then(res => res.map(v => {
         const linkSplitedBySlash = v.permalink_url.split('/');
         return {
           id: linkSplitedBySlash[linkSplitedBySlash.length - 1],
           pubDate: new Date(v.created_at),
           link: this.sanitizer.bypassSecurityTrustResourceUrl(v.permalink_url),
           title: v.title,
           summary: v.description.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, ''),
           description: v.description,
        };
      })).catch(err => alert(err)
    );
  }

  getEpisode(id: string): Promise<Episode> {
    return this.getEpisodes()
              .then(episodes => episodes.find(episode => episode['id'] === id));
  }

  getEmptyEpisode(): Episode {
    return emptyEpisode;
  }
}
