import { Component, OnInit } from '@angular/core';
import { Feedback } from '../feedback';
import axios from 'axios';
import { Http, Response } from '@angular/http';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  isFormSended: boolean;
  feedback: Feedback = {
    id: null,
    tw_account: '',
    content: '',
    date: null,
  };

  constructor(private http: Http) {
    this.isFormSended = false;
  }

  ngOnInit() {
  }

  submitFeedback() {
    if (!this.feedback.content) {
      return;
    };
    this.feedback.id = Number(new Date());
    this.feedback.date = new Date();
    const that = this;
    this.sendFeedback().then(status => {
      if (status === 200) {
        that.clearFeedback();
        that.isFormSended = true;
        setTimeout(() => { that.isFormSended = false; }, 3000);
      }
    });
  }

  sendFeedback(): Promise<number> {
    return axios.post(
      'https://hooks.slack.com/services/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'
      , JSON.stringify({
        attachments: [
          {text: this.makeSlackText()}
        ]
      })
    )
    .then(res => res.status)
    .catch(err => {
      console.error(JSON.stringify(err));
      return 500;
    });
  }

  clearFeedback() {
    this.feedback.id = null;
    this.feedback.tw_account = '';
    this.feedback.content = '';
    this.feedback.date = null;
  }

  makeSlackText(): string {
    const id = this.feedback.id;
    const tw_account = this.feedback.tw_account;
    const content = this.feedback.content;
    const date = this.feedback.date;

    let result = '';
    result += 'id: ' + id + '      ';
    result += 'send_date: ';
    result += date.getFullYear() + '/';
    result += (date.getMonth() + 1) + '/';
    result += date.getDate() + ' ';
    result += date.getHours() + ':' + ('0' + date.getMinutes()).slice(-2) + '\n';
    result += tw_account ? '<https://twitter.com/' + tw_account + '|' + tw_account + '>' : '名無し';
    result += 'さんからのメッセージです。\n';
    result += content;
    return result;
  }
}
