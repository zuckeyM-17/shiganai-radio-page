import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

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
    ) {
      this.episode = episodeService.getEmptyEpisode();
      this.loading = true;
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
        const detailArea = document.getElementById('ep_detail_content');
        detailArea.innerHTML = episode.description;
        this.loading = false;
      });
  }

}
