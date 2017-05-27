import { Component, OnInit } from '@angular/core';
import { EpisodeService } from '../episode.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  episodes: any;

  constructor(private episodeService: EpisodeService) {  }

  ngOnInit() {
    this.getEpisodes();
  }

  getEpisodes() {
    this.episodeService.getEpisodes().then(episodes => this.episodes = episodes);
  }
}
