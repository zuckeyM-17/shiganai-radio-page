import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { EpisodeService } from '../episode.service';
import { Episode } from '../episode';

@Component({
  selector: 'app-episode-list',
  templateUrl: './episode-list.component.html',
  styleUrls: ['./episode-list.component.css']
})
export class EpisodeListComponent implements OnInit {
  episodes: Episode[];
  constructor(
    private episodeService: EpisodeService,
    private router: Router,
    ) { }

  ngOnInit() {
    this.getEpisodes();
  }

  getEpisodes() {
    this
      .episodeService
      .getEpisodes()
      .then(episodes => this.episodes = episodes);
  }

  gotoDetail(episode: Episode): void {
    const link = ['/ep', episode['id']];
    this.router.navigate(link);
  }
}
