import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.css']
})
export class GuestComponent implements OnInit {

  constructor(
    private metaService: Meta,
  ) { }

  ngOnInit() {
    const url = document.location.origin + document.location.pathname;
    this.metaService.updateTag({property: 'og:url', content: url});
    this.metaService.updateTag({property: 'og:title', content: 'ゲスト紹介 | しがないラジオ'});
  }

}
