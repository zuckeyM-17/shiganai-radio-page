import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  sidebar_class: string = "sidebar";
  sidebar_container_class: string = "sidebar_container";
  constructor() {  }

  ngOnInit() {
    window.addEventListener('scroll', () => {
      const html = window.document.documentElement;
      const body = window.document.body;
      const viewHeight = html.clientHeight || body.clientHeight;
      const sidebar = document.getElementById('sidebar');
      const sidebar_top = sidebar.getBoundingClientRect().top;
      const sidebar_bottom = sidebar.getBoundingClientRect().bottom;
      if (sidebar_top < 25) {
        if (sidebar_bottom < viewHeight - 25) {
          this.sidebar_class = "sidebar relative_bottom";
          this.sidebar_container_class = "sidebar_container";
        } else {
          this.sidebar_class = "sidebar";
          this.sidebar_container_class = "sidebar_container fix_top";
        }
      } else {
        this.sidebar_class = "sidebar relative_top";
        this.sidebar_container_class = "sidebar_container";
      }
    });
  }
}
