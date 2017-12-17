import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import axios from 'axios';

import { UserService } from './user.service';

import { Episode } from './episode';
import { EpisodeList } from 'app/episode-list';

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

  constructor(
    private userService: UserService,
    private sanitizer: DomSanitizer
  ) { }

  getEpisodes(type: string, offset: number, limit: number = 20): Promise<any> {
     const params = {
       client_id: 'nviGqqUJ1aoaFVSMA7EdLE3IZJLwYFKU',
       offset: offset,
       limit: limit,
     };
     return axios.get('https://api.soundcloud.com/users/294673416/tracks?format=json&' +
        'client_id=' + params.client_id + '&' +
        'offset=' + params.offset + '&' +
        'limit=' + params.limit)
      .then(res => {
        if (type === 'obj') {
          const episodeList = {};
          res.data.forEach(v => {
            const linkSplitedBySlash = v.permalink_url.split('/');
            episodeList[linkSplitedBySlash[linkSplitedBySlash.length - 1]] = {
              id: linkSplitedBySlash[linkSplitedBySlash.length - 1],
              pubDate: new Date(v.created_at),
              link: v.permalink_url,
              title: v.title,
              summary: v.description.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, ''),
              description: v.description,
            };
          });
          return episodeList;
        }
        return res.data.map(v => {
          const linkSplitedBySlash = v.permalink_url.split('/');
          return {
            id: linkSplitedBySlash[linkSplitedBySlash.length - 1],
            pubDate: new Date(v.created_at),
            link: v.permalink_url,
            title: v.title,
            summary: v.description.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, ''),
            description: v.description,
          };
        });
      }).catch(err => console.error(err)
    );
  }

  getAllEpisodes(): Promise<any> {
    return this.userService.getUserData()
      .then(user => {
        const num = [1, 2];
        return Promise.all(num.map((v, i) => this.getEpisodes('obj', i * 50, 50)));
      }).then(arr => {
        let allEps = {};
        arr.forEach(epList => {
          allEps = Object.assign({}, allEps, epList);
        });
        return allEps;
      });
  }

  getEpisode(id: string): Promise<Episode> {
    return this.getAllEpisodes().then(episodes => episodes[id]);
  }

  getEmptyEpisode(): Episode {
    return emptyEpisode;
  }

  getGuestsEpisode(name: string): Promise<Episode> {
    return this.getAllEpisodes().then(episodes => episodes[name]);
  }
}
