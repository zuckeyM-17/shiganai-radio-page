import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable()
export class EpisodeService {

  constructor() { }

  getEpisodes(): any {
     return axios.get(
       'https://query.yahooapis.com/v1/public/yql?q=select%20title%2Clink' +
      '%2Cdescription%20from%20rss%20where%20url%3D' +
       '\'http%3A%2F%2Ffeeds.soundcloud.com%2Fusers%2Fsoundcloud%3Ausers%3A294673416%2Fsounds.rss' +
        '\'&format=json&diagnostics=true&callback=')
        .then(res => res.data.query.results.item
        ).catch(err => alert(err));
  }
}
