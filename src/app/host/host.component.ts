import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-host',
  templateUrl: './host.component.html',
  styleUrls: ['./host.component.css']
})
export class HostComponent implements OnInit {

  constructor(
    private metaService: Meta,
  ) { }

  ngOnInit() {
    const url = document.location.origin + document.location.pathname;
    this.metaService.updateTag({property: 'og:url', content: url});
    this.metaService.updateTag({property: 'og:title', content: 'パーソナリティ紹介 | しがないラジオ'});
  }

}
