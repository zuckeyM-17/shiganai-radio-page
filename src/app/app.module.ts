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
import { EpisodeDetailComponent } from './episode-detail/episode-detail.component';
import { FormComponent } from './form/form.component';
import { TwTimelineComponent } from './tw-timeline/tw-timeline.component';
import { HostComponent } from './host/host.component';
import { GuestComponent } from './guest/guest.component';
import { GuestDetailComponent } from './guest/guest-detail/guest-detail.component';
import { UserService } from 'app/user.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BodyComponent,
    FooterComponent,
    EpisodeListComponent,
    EpisodeDetailComponent,
    FormComponent,
    TwTimelineComponent,
    HostComponent,
    GuestComponent,
    GuestDetailComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
  ],
  providers: [
    EpisodeService,
    UserService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
