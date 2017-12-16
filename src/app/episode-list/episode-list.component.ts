import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';

import { EpisodeService } from '../episode.service';
import { Episode } from '../episode';
import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-episode-list',
  templateUrl: './episode-list.component.html',
  styleUrls: ['./episode-list.component.css']
})
export class EpisodeListComponent implements OnInit {
  episodes: Episode[];
  loading: boolean;
  saved_sc_top: number;
  auto_scrolling: boolean;
  trackCount: number;
  currentPageNum: number;
  pages: Array<number>;

  constructor(
    private userService: UserService,
    private episodeService: EpisodeService,
    private router: Router,
    private titleService: Title,
    private metaService: Meta,
    ) {
      this.loading = true;
      this.trackCount = 0;
      this.currentPageNum = 0;
      this.pages = new Array(0);
    }

  ngOnInit() {
    this.getEpisodes(this.currentPageNum);
    this.userService.getUserData().then(user => {
      console.log(Math.round(user.trackCount / 20));
      this.pages = new Array(Math.round(user.trackCount / 20));
    });
    const title = 'しがないラジオ';
    const url = document.location.origin + document.location.pathname;
    this.titleService.setTitle(title);
    this.metaService.updateTag({property: 'og:title', content: 'しがないラジオ'});
    this.metaService.updateTag({property: 'og:url', content: url});
    this.metaService.updateTag({property: 'og:description', content: 'SIerのSEからWeb系エンジニアに転職した2人がお届けするポッドキャスト'});
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (this.auto_scrolling) {
      window.scrollTo(0, this.saved_sc_top);
      this.auto_scrolling = false;
    }
  }

  getEpisodes(pageNumber: number) {
    this.loading = true;
    this
      .episodeService
      .getEpisodes(pageNumber * 20)
      .then(episodes => {
        this.episodes = episodes;
        this.loading = false;
        // スクロール問題を泥臭く解消
        this.saved_sc_top = document.body.scrollTop;
        this.auto_scrolling = true;
        this.currentPageNum = pageNumber;
      });
  }

  gotoDetail(episode: Episode): void {
    const link = ['/ep', episode['id']];
    window.scrollTo(0, 0);
    this.router.navigate(link);
  }
}
