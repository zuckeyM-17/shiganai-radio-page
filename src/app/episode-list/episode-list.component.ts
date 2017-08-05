import { Component, OnInit, HostListener } from '@angular/core';
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
  saved_sc_top: number;
  auto_scrolling: boolean;

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
    this.metaService.updateTag({property: 'og:description', content: 'SIerのSEからWeb系エンジニアに転職した2人がお届けするポッドキャスト'});
  }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    if (this.auto_scrolling) {
      window.scrollTo(0, this.saved_sc_top);
      this.auto_scrolling = false;
    }
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
        // スクロール問題を泥臭く解消
        this.saved_sc_top = document.body.scrollTop;
        this.auto_scrolling = true;
      });
  }

  gotoDetail(episode: Episode): void {
    const link = ['/ep', episode['id']];
    window.scrollTo(0, 0);
    this.router.navigate(link);
  }
}
