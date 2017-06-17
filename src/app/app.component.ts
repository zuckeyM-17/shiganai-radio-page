import { Component } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private titleService:Title,
    private metaService: Meta,
    ) {};
  ngOnInit() {
    // デフォルト値を指定
    const title = 'しがないラジオ';
    const url = document.location.origin + document.location.pathname;
    this.titleService.setTitle(title)
    this.metaService.updateTag({property: 'og:title', content: title});
    this.metaService.updateTag({property: 'og:url', content: url});
  }
}
