import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { routing } from './app.routing';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BodyComponent } from './body/body.component';
import { EpisodeService } from './episode.service';
import { EpisodeListComponent } from './episode-list/episode-list.component';
import { EpisodeSummaryComponent } from './episode-summary/episode-summary.component';
import { EpisodeDetailComponent } from './episode-detail/episode-detail.component';
import { FormComponent } from './form/form.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BodyComponent,
    FooterComponent,
    EpisodeListComponent,
    EpisodeSummaryComponent,
    EpisodeDetailComponent,
    FormComponent,
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
