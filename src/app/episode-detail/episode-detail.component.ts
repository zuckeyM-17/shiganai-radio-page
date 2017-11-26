import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';

import SC from 'soundcloud';

import { EpisodeService } from '../episode.service';
import { Episode } from '../episode';

@Component({
  selector: 'app-episode-detail',
  templateUrl: './episode-detail.component.html',
  styleUrls: ['./episode-detail.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class EpisodeDetailComponent implements OnInit {
  episode: Episode;
  loading: boolean;
  constructor(
    private route: ActivatedRoute,
    private episodeService: EpisodeService,
    private titleService: Title,
    private metaService: Meta,
    ) {
      this.episode = episodeService.getEmptyEpisode();
      this.loading = true;
    }

  ngOnInit() {
    const url = document.location.origin + document.location.pathname;
    this.metaService.updateTag({property: 'og:url', content: url});
    this.route.params.forEach((params: Params) => {
      const id = params['id'];
      this.getEpisode(id);
    });

    // tweetボタンをactiveに
    if (window['twttr']) {
      window['twttr'].widgets.load();
    }
    const result = !function(d, s, id) {
      let js;
      const fjs = d.getElementsByTagName(s)[0],
      p = /^http:/.test(d.location.toString()) ? 'http' : 'https';
      if (!d.getElementById(id)) {
        js = d.createElement(s);
        js.id = id;
        js.src = p + '://platform.twitter.com/widgets.js';
        fjs.parentNode.insertBefore(js, fjs);
      }
    } (document, 'script', 'twitter-wjs');
  }

  getEpisode(id: string): void {
    const parser = new DOMParser();
    this.episodeService
      .getEpisode(id)
      .then(episode => {
        this.episode = episode;
        const detailArea = document.getElementById('ep_detail_content');
        detailArea.innerHTML = episode.description;

        const track_url = this.episode.link;
        SC.oEmbed(track_url, {
          auto_play: false,
          maxheight: 150,
        }).then(oEmbed => {
          const soundcloud_embeded = document.getElementById('ep_soundcloud_embeded');
          soundcloud_embeded.innerHTML = oEmbed.html;
        });

        this.loading = false;

        const title = this.episode.title + ' | しがないラジオ';
        this.titleService.setTitle(title);
        this.metaService.updateTag({property: 'og:title', content: title});

        const summary = this.episode.summary;
        const description = summary.substring(0, summary.indexOf('\n'));
        this.metaService.updateTag({property: 'og:description', content: description});
      });
  }

}
