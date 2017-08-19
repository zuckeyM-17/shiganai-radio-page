import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { GUESTS } from '../guests';
import { EpisodeService } from '../../episode.service';
import { Episode } from '../../episode';
import { Guest } from '../../guest';

@Component({
  selector: 'app-guest-detail',
  templateUrl: './guest-detail.component.html',
  styleUrls: ['./guest-detail.component.css']
})
export class GuestDetailComponent implements OnInit {
  guest: Guest;
  episodes: Episode[];

  constructor(
    private titleService: Title,
    private metaService: Meta,
    private route: ActivatedRoute,
    private router: Router,
    private episodeService: EpisodeService,
  ) {  }

  ngOnInit() {
    let name;
    this.route.params.forEach((params: Params) => {
      name = params['name'];
    });
    this.guest = GUESTS.find(g => g.name === name);
    this.episodeService.getGuestsEpisodes(name)
      .then(episodes => {
        this.episodes = episodes;
      });
      const title = 'ゲスト紹介 | ' + name + ' | しがないラジオ';
      const url = document.location.origin + document.location.pathname;
      this.titleService.setTitle(title);
      this.metaService.updateTag({property: 'og:title', content: title});
      this.metaService.updateTag({property: 'og:url', content: url});
      this.metaService.updateTag({property: 'og:description', content: 'SIerのSEからWeb系エンジニアに転職した2人がお届けするポッドキャスト'});
  }

  gotoDetail(episode: Episode): void {
    const link = ['/ep', episode['id']];
    window.scrollTo(0, 0);
    this.router.navigate(link);
  }
}
