import { Component, OnInit, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
    private router: Router,
    private episodeService: EpisodeService,
    private titleService: Title,
    private metaService: Meta,
    private ref: ChangeDetectorRef,
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
        this.ref.detectChanges();
      });
  }
  twButtonClicked(): void {
    let twUrl = 'https://twitter.com/intent/tweet';
    twUrl += '?hashtags=' + encodeURIComponent('しがないラジオ');
    twUrl += '&related=' + encodeURIComponent('shiganaiRadio');
    twUrl += '&url=' + encodeURIComponent('https://shiganai.org' + this.router.url);
    twUrl += '&text=' + encodeURIComponent(`"${this.episode.title}"\n`);
    window.open(twUrl, 'tweetwindow', 'width=650, height=470, personalbar=0, toolbar=0, scrollbars=1, sizable=1');
  }
}
