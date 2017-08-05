import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit, OnDestroy {
  sidebar_w_classes: string;
  sidebar_content_class: string;
  constructor() {
    this.sidebar_w_classes = 'sidebar_wrapper';
    this.sidebar_content_class = 'sidebar_content';
  }

  ngOnInit() {
    window.addEventListener('scroll', () => {
      const html = window.document.documentElement;
      const body = window.document.body;
      const viewHeight = html.clientHeight || body.clientHeight;
      const sidebar_w = document.getElementById('sidebar_wrapper');
      const sidebar_w_top = sidebar_w.getBoundingClientRect().top;
      const sidebar_w_bottom = sidebar_w.getBoundingClientRect().bottom;
      const sidebar_content = document.getElementById('sidebar_content');
      // FIXME: チカチカ対策
      const sidebar_content_height = sidebar_content.clientHeight < 1000 ? sidebar_content.clientHeight : 664;

      if (sidebar_w_top <= 25) {
        if (sidebar_w_bottom < sidebar_content_height + 25) {
          this.sidebar_w_classes = 'sidebar_wrapper relative_bottom';
          this.sidebar_content_class = 'sidebar_content';
        } else {
          this.sidebar_w_classes = 'sidebar_wrapper';
          this.sidebar_content_class = 'sidebar_content fix_top';
        }
      } else {
        this.sidebar_w_classes = 'sidebar_wrapper relative_top';
        this.sidebar_content_class = 'sidebar_content';
      }
    });
  }

  ngOnDestroy() {
    window.removeEventListener('scroll');
  }
}
