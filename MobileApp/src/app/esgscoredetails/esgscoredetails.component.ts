import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-esgscoredetails',
  templateUrl: './esgscoredetails.component.html',
  styleUrls: ['./esgscoredetails.component.scss'],
})
export class EsgscoredetailsComponent implements OnInit {
  
  data:any;
  score:any;
  trandata:any;
  constructor(private router: Router) { }

  ngOnInit() {
    fetch('./assets/data/campaigns.json').then(res => res.json())
    .then(json => {
      this.data = json;
      console.log(this.data)
    });
    fetch('./assets/data/impacttransactions.json').then(res => res.json())
    .then(json => {
      this.trandata = json;
      console.log(this.data)
    });
    this.score = localStorage.getItem('greenscore');
  }

  public closeclick():void{
    this.router.navigate(['esgscore']);
  }

  public programclick():void{
    this.router.navigate(['joincampaign']);
  }

  public actionclick():void{
    this.router.navigate(['esgactions']);
  }

  public rewardclick():void{
    this.router.navigate(['esgrewards']);
  }
}
