import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { GUESTS } from './guests';
import { Guest } from '../guest';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.css']
})
export class GuestComponent implements OnInit {
  guests: Guest[];

  constructor(
    private titleService: Title,
    private metaService: Meta,
  ) {
    this.guests = [];
  }

  ngOnInit() {
    const title = 'ゲスト紹介 | しがないラジオ';
    const url = document.location.origin + document.location.pathname;
    this.titleService.setTitle(title);
    this.metaService.updateTag({property: 'og:title', content: title});
    this.metaService.updateTag({property: 'og:url', content: url});
    this.metaService.updateTag({property: 'og:description', content: 'SIerのSEからWeb系エンジニアに転職した2人がお届けするポッドキャスト'});
    this.guests = GUESTS;
  }
}
