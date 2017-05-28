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
  feedback: Feedback = {
    id: null,
    tw_account: "test_account",
    content: "test_content",
    date: null,
  }
  status: number;

  constructor(private http: Http) {
  }

  ngOnInit() {
  }

  submitFeedback() {
    this.feedback.id = Number(new Date());
    this.feedback.tw_account = this.feedback.tw_account;
    this.feedback.content = this.feedback.content;
    this.feedback.date = new Date();
    this.sendFeedback().then(function(status){
    });
  }

  sendFeedback():Promise<number> {
    return axios.post(
      'https://hooks.slack.com/services/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'
      ,JSON.stringify({
        attachments:[
          {"text": this.makeSlackText()}
        ]
      })
    )
    .then(function(res) {
      console.log(JSON.stringify(res));
      return res.status;
    })
    .catch(err => alert(err));
  }
  makeSlackText():string {
    const id = this.feedback.id;
    const tw_account = this.feedback.tw_account;
    const content = this.feedback.content;
    const date = this.feedback.date;

    let result = "";
    result += "id: " + id + "      ";
    result += "send_date: ";
    result += date.getFullYear() + "/";
    result += (date.getMonth()+1) + "/";
    result += date.getDate() + " ";
    result += date.getHours() + ":" + date.getMinutes() + "\n";
    result += "<https://twitter.com/" + tw_account + "|" + tw_account + ">";
    result += "さんからのメッセージです。\n";
    result += content;
    return result;
  }
}
