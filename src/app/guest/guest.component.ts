import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.css']
})
export class GuestComponent implements OnInit {

  constructor(
    private titleService: Title,
    private metaService: Meta,
  ) { }

  ngOnInit() {
    const title = 'ゲスト紹介 | しがないラジオ';
    const url = document.location.origin + document.location.pathname;
    this.titleService.setTitle(title);
    this.metaService.updateTag({property: 'og:title', content: title});
    this.metaService.updateTag({property: 'og:url', content: url});
  }

}
