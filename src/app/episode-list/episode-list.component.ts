import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';

import { EpisodeService } from '../episode.service';
import { Episode } from '../episode';

@Component({
  selector: 'app-episode-list',
  templateUrl: './episode-list.component.html',
  styleUrls: ['./episode-list.component.css']
})
export class EpisodeListComponent implements OnInit {
  episodes: Episode[];
  display_all: boolean;
  loading: boolean;

  constructor(
    private episodeService: EpisodeService,
    private router: Router,
    private titleService: Title,
    private metaService: Meta,
    ) {
      this.display_all = false;
      this.loading = true;
    }

  ngOnInit() {
    this.getEpisodes(10);
    const title = 'しがないラジオ';
    const url = document.location.origin + document.location.pathname;
    this.titleService.setTitle(title);
    this.metaService.updateTag({property: 'og:title', content: 'しがないラジオ'});
    this.metaService.updateTag({property: 'og:url', content: url});
  }

  getEpisodes(limit = 0) {
    this
      .episodeService
      .getEpisodes()
      .then(episodes => {
        if (limit === 0) {
          this.episodes = episodes;
          this.display_all = true;
        } else {
          this.episodes = episodes.slice(0, limit);
          this.display_all = false;
        }
        this.loading = false;
      });
  }

  gotoDetail(episode: Episode): void {
    const link = ['/ep', episode['id']];
    window.scrollTo(0, 0);
    this.router.navigate(link);
  }
}
