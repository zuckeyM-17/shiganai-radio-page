import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { EpisodeService } from '../episode.service';
import { Episode } from '../episode';

@Component({
  selector: 'app-episode-detail',
  templateUrl: './episode-detail.component.html',
  styleUrls: ['./episode-detail.component.css']
})
export class EpisodeDetailComponent implements OnInit {
  episode: Episode;

  constructor(
    private route: ActivatedRoute,
    private episodeService: EpisodeService,
    ) {
      this.episode = episodeService.getEmptyEpisode();
    }

  ngOnInit() {
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
        const detailAria = document.getElementById('episode_detail');
        detailAria.innerHTML = episode.description;
      });
  }

}
