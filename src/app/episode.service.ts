import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import axios from 'axios';

import { Episode } from './episode';

const emptyEpisode = {
  id: '',
  title: '',
  link: '',
  description: '',
  summary: '',
};

@Injectable()
export class EpisodeService {

  constructor(private sanitizer: DomSanitizer) { }

  getEpisodes(): Promise<Episode[]> {
     return axios.get(
       'https://query.yahooapis.com/v1/public/yql?q=select' +
       '%20title' +
       '%2Clink' +
       '%2Csummary' +
       '%2Cdescription' +
       '%2CpubDate' +
       '%20from%20rss%20where' +
       '%20url%3D\'http%3A%2F%2Ffeeds.soundcloud.com%2Fusers%2Fsoundcloud%3Ausers%3A294673416%2Fsounds.rss' +
       '\'&format=json&diagnostics=true&callback=')
       .then(res => res.data.query.results.item.map(v => {
         const linkSplitedBySlash = v.link.split('/');
         return {
           id: linkSplitedBySlash[linkSplitedBySlash.length - 1],
           pubDate: new Date(v.pubDate),
           link: this.sanitizer.bypassSecurityTrustResourceUrl(v.link),
           title: v.title,
           summary: v.summary,
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
