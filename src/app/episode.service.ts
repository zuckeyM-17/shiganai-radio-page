import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import axios from 'axios';

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

  getEpisodes(offset: number, limit: number = 20): Promise<Episode[]> {
     const params = {
       client_id: 'nviGqqUJ1aoaFVSMA7EdLE3IZJLwYFKU',
       offset: offset,
       limit: limit,
     };
     return axios.get('https://api.soundcloud.com/users/294673416/tracks?format=json&' +
        'client_id=' + params.client_id + '&' +
        'offset=' + params.offset + '&' +
        'limit=' + params.limit)
      .then(res => res.data.map(v => {
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
    return this.getEpisodes(0)
      .then(episodes => episodes.find(episode => episode['id'] === id));
  }

  getEmptyEpisode(): Episode {
    return emptyEpisode;
  }

  getGuestsEpisodes(name: string): Promise<Episode[]> {
    return this.getEpisodes(0)
      .then(episodes => episodes.filter(episode => episode['title'].includes(name)));
  }
}
