import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    // TwitterボタンをActivate
    const result = !function(d, s, id) {
      let js;
      const fjs = d.getElementsByTagName(s)[0],
        p = /^http:/.test(d.location.toString()) ? 'http' : 'https';
      if (!d.getElementById(id)) {
        js = d.createElement(s);
        js.id = id;
        js.src = p + '://platform.twitter.com/widgets.js';
        fjs.parentNode.insertBefore(js, fjs);
      }
    }(document, 'script', 'twitter-wjs');
  }

  goto(link: string): void {
    window.scrollTo(0, 0);
    this.router.navigate([link]);
  }
}
