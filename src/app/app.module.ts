import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { routing } from './app.routing';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BodyComponent } from './body/body.component';
import { EpisodeService } from './episode.service';
import { FooterComponent } from './footer/footer.component';
import { EpisodeListComponent } from './episode-list/episode-list.component';
import { EpisodeSummaryComponent } from './episode-summary/episode-summary.component';
import { EpisodeDetailComponent } from './episode-detail/episode-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BodyComponent,
    FooterComponent,
    EpisodeListComponent,
    EpisodeSummaryComponent,
    EpisodeDetailComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
  ],
  providers: [EpisodeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
