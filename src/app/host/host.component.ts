import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-host',
  templateUrl: './host.component.html',
  styleUrls: ['./host.component.css']
})
export class HostComponent implements OnInit {

  constructor(
    private titleService: Title,
    private metaService: Meta,
  ) { }

  ngOnInit() {
    const title = 'パーソナリティ紹介 | しがないラジオ';
    const url = document.location.origin + document.location.pathname;
    this.titleService.setTitle(title);
    this.metaService.updateTag({property: 'og:title', content: title});
    this.metaService.updateTag({property: 'og:url', content: url});
    this.metaService.updateTag({property: 'og:description', content: 'SIerのSEからWeb系エンジニアに転職した2人がお届けするポッドキャスト'});
  }

}
